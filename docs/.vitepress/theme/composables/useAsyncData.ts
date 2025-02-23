import { RetryOptions } from "./useRetry";
import { useCache } from "./useCache";
import { useRetry } from "./useRetry";
import { ref, onMounted, watch } from 'vue'


export interface AsyncDataOptions<T> {
  immediate?: boolean
  retryOPtions?: RetryOptions,
  transform?: (data: T) => T
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}


export function useAsyncData<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  options: AsyncDataOptions<T> = {}
) {
  const {
    immediate = true,
    retryOPtions,
    transform,
    onSuccess,
    onError
  } = options

  const data = ref<T | null>(null)
  const err = ref<Error | null>(null)
  const loading = ref(true)
  const isValidating = ref(false)
  const cache = useCache()
  const { retry } = useRetry()

  if (cacheKey) {
    const cacheData = cache.get<T>(cacheKey)
    if (cacheData) {
      data.value = cacheData
    }
  }

  const execute = async (validateCache = true) => {

    // avoid duplicate execution
    if (validateCache && isValidating.value) return

    loading.value = true
    isValidating.value = true

    try {
      const fetchData = async () => {
        const response = await fetcher()
        return transform?.(response)
      }

      const result = await retry(fetchData, retryOPtions)
      data.value = result
      if (cacheKey) {
        cache.set(cacheKey, result)
      }
      onSuccess?.(result)
    } catch (err) {
      err.value = err as Error
      onError?.(err as Error)
    } finally {
      loading.value = false
      isValidating.value = false
    }
  }


  const refresh = () => execute(false)


  const mutate = (newData: T | ((prev: T | null) => T)) => {
    const updateData = typeof newData === 'function'
      ? (newData as Function)(data.value)
      : newData

    data.value = updateData
    if (cacheKey) {
      cache.set(cacheKey, updateData)
    }
  }

  onMounted(() => {
    if (immediate) {
      execute()
    }
  })

  return {
    data,
    err,
    loading,
    isValidating,
    execute,
    refresh,
    mutate
  }

}
