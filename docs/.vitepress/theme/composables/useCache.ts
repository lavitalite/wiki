
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions<T> {
  duration?: number;
}

const cache = new Map<string, CacheItem<any>>();
const DEFAULT_DURATION = 1000 * 60 * 5;


export function useCache(options?: CacheOptions<any>) {

  const { duration = DEFAULT_DURATION } = options;

  function set<T>(key: string, data: T) {
    cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  function get<T>(key: string): T | null {
    const item = cache.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > duration
    if (isExpired) {
      cache.delete(key)
      return null
    }
    return item.data as T
  }

  function clear(key?: string) {
    if (key) {
      cache.delete(key)
    } else {
      cache.clear()
    }
  }
  return {
    get,
    set,
    clear
  }
}