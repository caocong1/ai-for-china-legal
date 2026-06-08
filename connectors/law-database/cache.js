/**
 * Simple in-memory TTL cache for connector responses.
 */

export function createCache(ttlSeconds) {
  const store = new Map();
  const ttlMs = ttlSeconds * 1000;

  return {
    get(key) {
      const entry = store.get(key);
      if (!entry) return null;
      if (Date.now() - entry.timestamp > ttlMs) {
        store.delete(key);
        return null;
      }
      return entry.data;
    },

    set(key, data) {
      store.set(key, { data, timestamp: Date.now() });
    },

    delete(key) {
      store.delete(key);
    },

    clear() {
      store.clear();
    },

    get size() {
      return store.size;
    },
  };
}
