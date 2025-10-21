// API Response Types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Blog Types
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  tags?: Tag[];
  author?: User;
  author_name?: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  reading_time: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

// Product Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  detailed_description?: string;
  status: 'development' | 'beta' | 'live';
  status_display?: string;
  status_badge_class?: string;
  image: string | null;
  tagline?: string;
  target_audience?: string;
  features?: string[];
  features_list?: string[];
  technology_stack?: string[];
  technology_list?: string[];
  launch_date: string | null;
  order: number;
  created_at?: string;
  updated_at?: string;
}

// Team Types
export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  photo: string | null;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  skills_list: string[];
  specializations_list?: string[];
  first_name: string;
  initials: string;
  is_leadership: boolean;
  is_active?: boolean;
  order: number;
  joined_date?: string;
  created_at?: string;
  updated_at?: string;
}

// Case Study Types
export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  client: string;
  problem?: string;
  solution?: string;
  impact?: string;
  image: string | null;
  industry?: string;
  project_duration?: string;
  summary_metrics?: any[];
  metrics?: Record<string, any>;
  is_featured?: boolean;
  created_at: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type?: 'general' | 'partnership' | 'product' | 'support' | 'career' | 'media';
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: number;
  submitted_at: string;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
  delay?: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

// API Error Types
export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
  isNetworkError?: boolean;
  isRetryable?: boolean;
}

// Retry Configuration
export interface RetryConfig {
  maxRetries?: number;
  delay?: number;
  backoff?: boolean;
}

// Loading State Types
export interface LoadingState {
  isLoading: boolean;
  error: ApiError | null;
  lastFetch?: Date;
}

// Toast Notification Types
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}