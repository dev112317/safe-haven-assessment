/**
 * error-boundary.jsx
 * Error boundary component to catch and handle React errors gracefully.
 * Provides fallback UI when components crash.
 */
'use client';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // @todo: Send to error reporting service (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-semibold mb-2">Something went wrong</h2>
          <p className="text-red-600 text-sm mb-3">
            We're sorry, but there was an error loading this component.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 