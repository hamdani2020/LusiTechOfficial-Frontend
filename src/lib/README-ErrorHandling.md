# Error Handling System Documentation

## Overview

The LusiTech website implements a comprehensive error handling system that provides:

- **React Error Boundaries** for catching component errors
- **Global error handling** for unhandled promises and JavaScript errors
- **Toast notifications** for user-friendly error messages
- **Offline detection** with appropriate user messaging
- **API error handling** with retry mechanisms
- **Fallback UI components** for different error states

## Components

### 1. ErrorProvider

The main error handling provider that wraps the entire application.

```tsx
import { ErrorProvider } from '@/components/ui/ErrorProvider';

function App() {
  return (
    <ErrorProvider>
      {/* Your app content */}
    </ErrorProvider>
  );
}
```

**Features:**
- Integrates all error handling components
- Sets up global error listeners
- Connects error handling to toast notifications
- Handles unhandled promise rejections

### 2. ErrorBoundary

React error boundary for catching component errors.

```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

function MyComponent() {
  return (
    <ErrorBoundary
      fallback={<CustomErrorUI />}
      onError={(error, errorInfo) => {
        // Custom error handling
      }}
    >
      <ComponentThatMightError />
    </ErrorBoundary>
  );
}
```

**Features:**
- Catches JavaScript errors in component tree
- Provides default error UI with retry functionality
- Supports custom fallback components
- Logs errors in development mode

### 3. Toast System

User-friendly notification system for errors and other messages.

```tsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { addToast } = useToast();

  const handleError = () => {
    addToast({
      type: 'error',
      title: 'Something went wrong',
      message: 'Please try again later',
      duration: 5000
    });
  };
}
```

**Toast Types:**
- `success` - Green toast for successful operations
- `error` - Red toast for errors
- `warning` - Yellow toast for warnings
- `info` - Blue toast for information

### 4. Offline Detection

Detects network status and shows appropriate messages.

```tsx
import { OfflineDetector, useOnlineStatus } from '@/components/ui/OfflineDetector';

function MyComponent() {
  const isOnline = useOnlineStatus();

  return (
    <OfflineDetector
      onOnline={() => console.log('Back online')}
      onOffline={() => console.log('Gone offline')}
    >
      {isOnline ? 'Online' : 'Offline'}
    </OfflineDetector>
  );
}
```

### 5. Error Fallback Components

Pre-built UI components for different error states.

```tsx
import { 
  ErrorFallback,
  NetworkErrorFallback,
  NotFoundFallback,
  LoadingErrorFallback,
  SkeletonFallback
} from '@/components/ui/ErrorFallbacks';

// Generic error
<ErrorFallback 
  error={error} 
  onRetry={handleRetry}
  title="Custom Error Title"
/>

// Network error
<NetworkErrorFallback onRetry={handleRetry} />

// Not found
<NotFoundFallback onGoHome={() => router.push('/')} />

// Loading error
<LoadingErrorFallback 
  onRetry={handleRetry}
  resourceName="blog posts"
/>

// Loading skeleton
<SkeletonFallback lines={3} showAvatar={true} />
```

## Hooks

### 1. useApiCall

Enhanced API hook with built-in error handling.

```tsx
import { useApiCall } from '@/hooks/useApiCall';
import { blogApi } from '@/lib/api';

function BlogComponent() {
  const {
    data: posts,
    loading,
    error,
    execute: fetchPosts,
    retry
  } = useApiCall(
    () => blogApi.getPosts(),
    {
      immediate: true,
      errorContext: 'Loading blog posts',
      showErrorToast: true,
      onSuccess: (data) => console.log('Posts loaded:', data),
      onError: (error) => console.error('Failed to load posts:', error)
    }
  );

  if (error) {
    return <LoadingErrorFallback onRetry={retry} resourceName="posts" />;
  }

  return (
    <div>
      {loading ? <SkeletonFallback /> : <PostsList posts={posts} />}
    </div>
  );
}
```

**Options:**
- `immediate` - Execute immediately on mount
- `errorContext` - Context for error messages
- `showErrorToast` - Show toast notification on error
- `onSuccess` - Success callback
- `onError` - Error callback
- `dependencies` - Re-execute when dependencies change

### 2. useErrorHandler

Hook for manual error handling with toast integration.

```tsx
import { useErrorHandler } from '@/components/ui/ErrorProvider';

function MyComponent() {
  const { 
    showError, 
    showSuccess, 
    showWarning, 
    showInfo,
    handleApiError 
  } = useErrorHandler();

  const handleSubmit = async () => {
    try {
      await submitForm();
      showSuccess('Form submitted successfully');
    } catch (error) {
      handleApiError(error, 'Form submission');
    }
  };
}
```

## API Error Handling

### Error Types

The API service automatically handles different types of errors:

```typescript
interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
  isNetworkError?: boolean;
  isRetryable?: boolean;
}
```

**Error Codes:**
- `NETWORK_ERROR` - No internet connection
- `CONNECTION_ERROR` - Cannot connect to server
- `TIMEOUT_ERROR` - Request timed out
- `BAD_REQUEST` - Invalid request (400)
- `UNAUTHORIZED` - Authentication required (401)
- `FORBIDDEN` - Access denied (403)
- `NOT_FOUND` - Resource not found (404)
- `RATE_LIMITED` - Too many requests (429)
- `INTERNAL_ERROR` - Server error (500)

### Retry Logic

The API service includes automatic retry logic:

```typescript
// Automatic retries for retryable errors
const posts = await blogApi.getPosts();

// Custom retry configuration
const posts = await blogApi.getPosts(1, 10, undefined, undefined, {
  maxRetries: 5,
  delay: 2000,
  backoff: true
});
```

## Global Error Handler

The global error handler provides centralized error management:

```typescript
import { globalErrorHandler } from '@/lib/errorHandler';

// Handle API errors
globalErrorHandler.handleApiError(error, 'Loading data');

// Handle JavaScript errors
globalErrorHandler.handleJavaScriptError(error, errorInfo);

// Handle validation errors
globalErrorHandler.handleValidationError(errors, 'Contact Form');
```

## Best Practices

### 1. Use Error Boundaries

Wrap components that might throw errors:

```tsx
<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>
```

### 2. Handle API Errors Gracefully

Use the `useApiCall` hook for consistent error handling:

```tsx
const { data, loading, error, retry } = useApiCall(apiFunction, {
  errorContext: 'Loading data',
  showErrorToast: true
});
```

### 3. Provide Fallback UI

Always provide fallback UI for error states:

```tsx
if (error) {
  return <LoadingErrorFallback onRetry={retry} />;
}

if (loading) {
  return <SkeletonFallback />;
}

return <DataComponent data={data} />;
```

### 4. Use Appropriate Error Messages

Provide context-specific error messages:

```tsx
const { handleApiError } = useErrorHandler();

try {
  await submitContactForm(data);
} catch (error) {
  handleApiError(error, 'Contact form submission');
}
```

### 5. Handle Offline States

Consider offline scenarios:

```tsx
const isOnline = useOnlineStatus();

if (!isOnline) {
  return <OfflineMessage />;
}
```

## Testing Error Handling

### 1. Test Error Boundaries

```tsx
// Test that error boundary catches errors
const ThrowError = () => {
  throw new Error('Test error');
};

render(
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>
);

expect(screen.getByText('Something went wrong')).toBeInTheDocument();
```

### 2. Test API Error Handling

```tsx
// Mock API error
jest.spyOn(blogApi, 'getPosts').mockRejectedValue(new Error('API Error'));

render(<BlogComponent />);

await waitFor(() => {
  expect(screen.getByText('Failed to load posts')).toBeInTheDocument();
});
```

### 3. Test Offline Handling

```tsx
// Mock offline state
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: false
});

render(<MyComponent />);

expect(screen.getByText('You are currently offline')).toBeInTheDocument();
```

## Configuration

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Error Reporting (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Error Reporting Integration

To integrate with error reporting services like Sentry:

```typescript
// In ErrorBoundary component
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // Log to Sentry in production
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      contexts: { react: errorInfo }
    });
  }
}
```

This comprehensive error handling system ensures a robust user experience even when things go wrong, providing clear feedback and recovery options for users.