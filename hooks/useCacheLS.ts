import { useCallback } from 'react';

interface CachedElement<T> {
	timestamp: number;
	data: T;
}

interface CacheOptions {
	ttl?: number; // cache lifetime in ms
}

// use localhost as cache for single value of type T
export default function useCache<T> (key: string, opts?: CacheOptions) {
	const get = useCallback((): T | null => {
		const item = localStorage.getItem(key);
		if (item) {
			const cacheValue = JSON.parse(item);
			const cacheAge = Date.now() - cacheValue.timestamp;
			// console.debug(`Cache age: ${cacheAge / 1000}s`);

			if ((opts?.ttl || 0) > cacheAge) {
				return cacheValue.data;
			}

			// console.debug('Cache expired');
			localStorage.removeItem(key);
		}

		return null;
	}, [key, opts]);

	const set = useCallback(
		(data: T) => {
			const cached: CachedElement<T> = {
				timestamp: Date.now(),
				data
			};
			localStorage.setItem(key, JSON.stringify(cached));
		},
		[key]
	);

	return { get, set };
}
