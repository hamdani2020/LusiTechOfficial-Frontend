import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import {
  ApiResponse,
  PaginatedResponse,
  BlogPost,
  Product,
  TeamMember,
  CaseStudy,
  ContactFormData,
  ContactSubmission,
  Tag,
  ApiError,
  RetryConfig
} from './types';

// API Configuration
// Use Next.js API rewrites for seamless proxy to backend
const API_BASE_URL = '/api';
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Network status tracking
let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
let networkListenersAdded = false;

// Add network status listeners (client-side only)
if (typeof window !== 'undefined' && !networkListenersAdded) {
  window.addEventListener('online', () => {
    isOnline = true;
    console.log('Network connection restored');
  });
  
  window.addEventListener('offline', () => {
    isOnline = false;
    console.log('Network connection lost');
  });
  
  networkListenersAdded = true;
}

// Retry mechanism with exponential backoff
const retryRequest = async (
  requestFn: () => Promise<any>,
  config: RetryConfig = {}
): Promise<any> => {
  const { maxRetries = MAX_RETRIES, delay = RETRY_DELAY, backoff = true } = config;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      const axiosError = error as AxiosError;
      
      // Don't retry on client errors (4xx) except for 408, 429, 504
      if (axiosError.response?.status && 
          axiosError.response.status >= 400 && 
          axiosError.response.status < 500 &&
          ![408, 429, 504].includes(axiosError.response.status)) {
        throw error;
      }
      
      // Always retry timeout errors
      if (axiosError.code === 'ECONNABORTED') {
        console.log(`Timeout error detected, retrying... (attempt ${attempt + 1}/${maxRetries + 1})`);
      }
      
      // Don't retry if we're offline
      if (!isOnline) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const currentDelay = backoff ? delay * Math.pow(2, attempt) : delay;
      console.log(`Request failed, retrying in ${currentDelay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }
};

// Enhanced error handling function
const createApiError = (error: any): ApiError => {
  if (!isOnline) {
    return {
      message: 'No internet connection. Please check your network and try again.',
      code: 'NETWORK_ERROR',
      status: 0,
      isNetworkError: true,
      isRetryable: true
    };
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<any>>;
    
    if (axiosError.code === 'ECONNABORTED') {
      return {
        message: 'Request timed out. Please try again.',
        code: 'TIMEOUT_ERROR',
        status: 0,
        isNetworkError: true,
        isRetryable: true
      };
    }
    
    if (!axiosError.response) {
      return {
        message: 'Unable to connect to the server. Please check your internet connection.',
        code: 'CONNECTION_ERROR',
        status: 0,
        isNetworkError: true,
        isRetryable: true
      };
    }
    
    const { status, data } = axiosError.response;
    
    // Handle different HTTP status codes
    switch (status) {
      case 400:
        return {
          message: data?.message || 'Invalid request. Please check your input.',
          code: data?.code || 'BAD_REQUEST',
          status,
          errors: data?.errors,
          isRetryable: false
        };
      case 401:
        return {
          message: 'Authentication required. Please log in.',
          code: 'UNAUTHORIZED',
          status,
          isRetryable: false
        };
      case 403:
        return {
          message: 'Access denied. You don\'t have permission to perform this action.',
          code: 'FORBIDDEN',
          status,
          isRetryable: false
        };
      case 404:
        return {
          message: data?.message || 'The requested resource was not found.',
          code: 'NOT_FOUND',
          status,
          isRetryable: false
        };
      case 408:
        return {
          message: 'Request timed out. Please try again.',
          code: 'REQUEST_TIMEOUT',
          status,
          isRetryable: true
        };
      case 429:
        return {
          message: 'Too many requests. Please wait a moment and try again.',
          code: 'RATE_LIMITED',
          status,
          isRetryable: true
        };
      case 500:
        return {
          message: 'Internal server error. Please try again later.',
          code: 'INTERNAL_ERROR',
          status,
          isRetryable: true
        };
      case 502:
        return {
          message: 'Service temporarily unavailable. Please try again.',
          code: 'BAD_GATEWAY',
          status,
          isRetryable: true
        };
      case 503:
        return {
          message: 'Service temporarily unavailable. Please try again later.',
          code: 'SERVICE_UNAVAILABLE',
          status,
          isRetryable: true
        };
      default:
        return {
          message: data?.message || 'An unexpected error occurred. Please try again.',
          code: data?.code || 'UNKNOWN_ERROR',
          status,
          isRetryable: status >= 500
        };
    }
  }
  
  return {
    message: error.message || 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR',
    status: 0,
    isRetryable: false
  };
};

// Request interceptor for adding auth tokens and request logging
apiClient.interceptors.request.use(
  (config) => {
    // Add request timestamp for performance monitoring
    config.metadata = { startTime: new Date() };
    
    // Add auth token if available (future use)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(createApiError(error));
  }
);

// Response interceptor for error handling and response logging
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = response.config.metadata?.startTime 
      ? new Date().getTime() - response.config.metadata.startTime.getTime()
      : 0;
    
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    }
    
    return response;
  },
  (error) => {
    // Calculate request duration if available
    const duration = error.config?.metadata?.startTime 
      ? new Date().getTime() - error.config.metadata.startTime.getTime()
      : 0;
    
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms)`, error);
    }
    
    return Promise.reject(createApiError(error));
  }
);

// Enhanced API Service Functions with retry logic
export const blogApi = {
  // Get all blog posts with filtering and search
  getPosts: async (
    page = 1, 
    limit = 10, 
    search?: string, 
    tags?: string[],
    retryConfig?: RetryConfig
  ): Promise<PaginatedResponse<BlogPost>> => {
    return retryRequest(async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (search) {
        params.append('search', search);
      }
      
      if (tags && tags.length > 0) {
        tags.forEach(tag => params.append('tags', tag));
      }
      
      const response: AxiosResponse<ApiResponse<PaginatedResponse<BlogPost>>> =
        await apiClient.get(`/blog/posts?${params.toString()}`);
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch blog posts');
      }
      
      return response.data.data!;
    }, retryConfig);
  },

  // Get single blog post by slug
  getPost: async (slug: string, retryConfig?: RetryConfig): Promise<BlogPost> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<BlogPost>> =
        await apiClient.get(`/blog/posts/${slug}`);
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch blog post');
      }
      
      return response.data.data!;
    }, retryConfig);
  },

  // Get featured posts
  getFeaturedPosts: async (limit = 3, retryConfig?: RetryConfig): Promise<BlogPost[]> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<BlogPost[]>> =
        await apiClient.get(`/blog/posts/featured?limit=${limit}`);
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch featured posts');
      }
      
      return response.data.data!;
    }, retryConfig);
  },

  // Get all tags
  getTags: async (retryConfig?: RetryConfig): Promise<Tag[]> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<Tag[]>> =
        await apiClient.get('/blog/tags');
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch tags');
      }
      
      return response.data.data!;
    }, retryConfig);
  },

  // Get related posts
  getRelatedPosts: async (slug: string, limit = 3, retryConfig?: RetryConfig): Promise<BlogPost[]> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<BlogPost[]>> =
        await apiClient.get(`/blog/posts/${slug}/related?limit=${limit}`);
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch related posts');
      }
      
      return response.data.data!;
    }, retryConfig);
  },
};

export const productApi = {
  // Get all products
  getProducts: async (retryConfig?: RetryConfig): Promise<Product[]> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<{ results: Product[] }>> =
        await apiClient.get('/products');
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
      
      return response.data.data!.results;
    }, retryConfig);
  },

  // Get single product by slug
  getProduct: async (slug: string, retryConfig?: RetryConfig): Promise<Product> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<Product>> =
        await apiClient.get(`/products/${slug}`);
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch product');
      }
      
      return response.data.data!;
    }, retryConfig);
  },

  // Get single product by ID (fallback method)
  getProductById: async (id: number, retryConfig?: RetryConfig): Promise<Product> => {
    return retryRequest(async () => {
      // First get all products, then find by ID
      const products = await productApi.getProducts(retryConfig);
      const product = products.find(p => p.id === id);
      if (!product) {
        const error = new Error(`Product with ID ${id} not found`);
        (error as any).status = 404;
        throw error;
      }
      return product;
    }, retryConfig);
  },
};

export const teamApi = {
  // Get all team members
  getTeamMembers: async (retryConfig?: RetryConfig): Promise<TeamMember[]> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<PaginatedResponse<TeamMember>>> =
        await apiClient.get('/team', {
          timeout: 45000, // Longer timeout specifically for team endpoint
        });
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch team members');
      }
      
      if (!response.data.data || !response.data.data.results) {
        throw new Error('Invalid response structure from team API');
      }
      
      return response.data.data.results;
    }, { 
      ...retryConfig, 
      maxRetries: retryConfig?.maxRetries || 4, // More retries for team endpoint
      delay: retryConfig?.delay || 2000, // Longer delay between retries
    });
  },
};

export const caseStudyApi = {
  // Get all case studies
  getCaseStudies: async (retryConfig?: RetryConfig): Promise<CaseStudy[]> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<{ results: CaseStudy[] }>> =
        await apiClient.get('/case-studies');
      
      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Failed to fetch case studies');
      }
      
      return response.data.data!.results;
    }, retryConfig);
  },
};

export const contactApi = {
  // Submit contact form
  submitContact: async (data: ContactFormData, retryConfig?: RetryConfig): Promise<ContactSubmission> => {
    return retryRequest(async () => {
      const response: AxiosResponse<ApiResponse<ContactSubmission>> =
        await apiClient.post('/contact/submit', data);
      
      if (response.data.status === 'error') {
        const error = new Error(response.data.message || 'Failed to submit contact form');
        (error as any).errors = response.data.errors;
        throw error;
      }
      
      return response.data.data!;
    }, { ...retryConfig, maxRetries: 1 }); // Limit retries for form submissions
  },
};

// Enhanced utility functions
export const handleApiError = (error: any): ApiError => {
  if (error instanceof Error && 'message' in error && 'code' in error && 'status' in error) {
    return error as ApiError;
  }
  return createApiError(error);
};

// Get user-friendly error message
export const getErrorMessage = (error: ApiError): string => {
  return error.message;
};

// Check if error is retryable
export const isRetryableError = (error: ApiError): boolean => {
  return error.isRetryable || false;
};

// Check network status
export const getNetworkStatus = (): boolean => {
  return isOnline;
};

// Health check endpoint
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health', { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Export the enhanced API client
export default apiClient;