'use client';

import { ApiError } from './types';

// Global error handler that can be used throughout the application
export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private toastFunction: ((toast: any) => void) | null = null;

  private constructor() {}

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  // Set the toast function from the toast context
  setToastFunction(toastFn: (toast: any) => void) {
    this.toastFunction = toastFn;
  }

  // Handle API errors with appropriate user feedback
  handleApiError(error: ApiError, context?: string) {
    console.error('API Error:', error, context ? `Context: ${context}` : '');

    // Don't show toast for certain error types that should be handled locally
    const silentErrors = ['NOT_FOUND', 'VALIDATION_ERROR'];
    if (silentErrors.includes(error.code)) {
      return;
    }

    if (this.toastFunction) {
      let title = 'Error';
      let message = error.message;
      let type: 'error' | 'warning' = 'error';

      // Customize toast based on error type
      switch (error.code) {
        case 'NETWORK_ERROR':
        case 'CONNECTION_ERROR':
          title = 'Connection Problem';
          type = 'warning';
          break;
        case 'TIMEOUT_ERROR':
          title = 'Request Timeout';
          message = 'The request took too long. Please try again.';
          break;
        case 'RATE_LIMITED':
          title = 'Too Many Requests';
          type = 'warning';
          break;
        case 'INTERNAL_ERROR':
        case 'BAD_GATEWAY':
        case 'SERVICE_UNAVAILABLE':
          title = 'Server Error';
          message = 'We\'re experiencing technical difficulties. Please try again later.';
          break;
        default:
          title = context ? `${context} Error` : 'Error';
      }

      this.toastFunction({
        type,
        title,
        message,
        duration: error.isRetryable ? 0 : 5000, // Don't auto-dismiss retryable errors
        action: error.isRetryable ? {
          label: 'Retry',
          onClick: () => {
            // This will be handled by the component that called this function
            window.dispatchEvent(new CustomEvent('retry-last-action'));
          }
        } : undefined
      });
    }
  }

  // Handle JavaScript errors
  handleJavaScriptError(error: Error, errorInfo?: any) {
    console.error('JavaScript Error:', error, errorInfo);

    if (this.toastFunction && process.env.NODE_ENV === 'development') {
      this.toastFunction({
        type: 'error',
        title: 'Application Error',
        message: 'A JavaScript error occurred. Check the console for details.',
        duration: 0
      });
    }
  }

  // Handle network status changes
  handleNetworkChange(isOnline: boolean) {
    if (this.toastFunction) {
      if (isOnline) {
        this.toastFunction({
          type: 'success',
          title: 'Connection Restored',
          message: 'You are back online',
          duration: 3000
        });
      } else {
        this.toastFunction({
          type: 'warning',
          title: 'No Internet Connection',
          message: 'Some features may not work properly',
          duration: 0 // Don't auto-dismiss
        });
      }
    }
  }

  // Handle form validation errors
  handleValidationError(errors: Record<string, string[]>, context = 'Form') {
    if (this.toastFunction) {
      const errorMessages = Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('\n');

      this.toastFunction({
        type: 'error',
        title: `${context} Validation Error`,
        message: errorMessages,
        duration: 8000
      });
    }
  }
}

// Export singleton instance
export const globalErrorHandler = GlobalErrorHandler.getInstance();

// Hook to integrate with toast system
export function useGlobalErrorHandler() {
  const setToastFunction = (toastFn: (toast: any) => void) => {
    globalErrorHandler.setToastFunction(toastFn);
  };

  return {
    handleApiError: globalErrorHandler.handleApiError.bind(globalErrorHandler),
    handleJavaScriptError: globalErrorHandler.handleJavaScriptError.bind(globalErrorHandler),
    handleNetworkChange: globalErrorHandler.handleNetworkChange.bind(globalErrorHandler),
    handleValidationError: globalErrorHandler.handleValidationError.bind(globalErrorHandler),
    setToastFunction
  };
}