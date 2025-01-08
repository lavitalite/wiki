export interface RetryOptions {
  maxRetires?: number
  retryDelay?: number
  onRetry?: (error: Error, retryCount: number) => void
}

// Connection resiliency
export function calcBackOff(attempt: number, base?: number): number {
  return Math.pow(base || 2, attempt)
}

export function delay(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}




export function useRetry() {

  const DEFAULT_MAX_RETRIES = 3
  const DEFAULT_RETRY_DELAY = 1000
  async function retry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {

    const {
      maxRetires = DEFAULT_MAX_RETRIES,
      retryDelay = DEFAULT_RETRY_DELAY,
      onRetry
    } = options

    let retryCount = 0

    while (true) {
      try {
        return await fn()
      } catch (error) {
        retryCount++
        if (retryCount > maxRetires) {
          throw error
        }

        retryCount++
        onRetry?.(error as Error, retryCount)
        await delay(calcBackOff(retryCount))
      }
    }
  }

  return {
    retry
  }
}