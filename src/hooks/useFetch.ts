import { useState, useEffect } from 'react';
import useCacheLS from './useCacheLS';

interface FetchResponse<T> {
	isLoading: boolean;
	data?: T;
	error?: unknown;
}

interface FetchRequestOptions {
	ttl?: number;
	fetchOptions?: RequestInit;
}

export default function useFetch<T> (url: string, opts?: FetchRequestOptions) {
	const [data, setData] = useState<FetchResponse<T>>({
		isLoading: true
	});

	const cache = useCacheLS<T>(`FETCH_CACHE__${url}`, {
		ttl: opts?.ttl ?? 1000 * 60 * 60 * 24 * 10 // 10 days by default
	});

	const sendRequest = async () => {
		const response = await fetch(url, opts?.fetchOptions);
		if (response.ok) {
			return await response.json();
		}

		throw new Error(`Fetch failed with status ${response.status}`);
	};

	useEffect(() => {
		const cachedData = cache.get();

		if (cachedData) {
			return setData({
				isLoading: false,
				data: cachedData
			});
		}

		sendRequest()
			.then(data => {
				setData({ isLoading: false, data });
				requestIdleCallback(() => cache.set(data));
			})
			.catch(error => {
				setData({ isLoading: false, error });
			});
	}, [url]);

	return data;
}
