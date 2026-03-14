import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-8 text-center">
          <h1 className="text-4xl font-serif italic text-gray-900 dark:text-white mb-4">Something went wrong</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
            className="bg-primary text-white px-8 py-3 text-sm uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-all rounded-sm"
          >
            Return Home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
