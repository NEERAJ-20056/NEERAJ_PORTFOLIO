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
    console.error('Portfolio ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
            backgroundColor: 'var(--bg-primary, #ffffff)',
            color: 'var(--text-primary, #0f172a)'
          }}
        >
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ maxWidth: '480px', marginBottom: '1.5rem', color: 'var(--text-secondary, #475569)', lineHeight: 1.5 }}>
            An unexpected error occurred while loading this page.
          </p>
          <button
            onClick={this.handleReload}
            type="button"
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color, #e2e8f0)',
              backgroundColor: 'var(--bg-secondary, #f8fafc)',
              color: 'var(--text-primary, #0f172a)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
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
