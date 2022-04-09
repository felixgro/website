import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';

export enum RouterState {
	INITIAL = 'INITIAL',
	LOADING = 'LOADING',
	LOADED = 'LOADED'
}

export default function useRouterState () {
	const [routerState, setRouterState] = useState<RouterState>(
		RouterState.INITIAL
	);
	const router = useRouter();

	useEffect(() => {
		const handleChangeStart = () => {
			setRouterState(RouterState.LOADING);
		};
		const handleChangeComplete = () => {
			setRouterState(RouterState.LOADED);
		};

		router.events.on('routeChangeStart', handleChangeStart);
		router.events.on('routeChangeComplete', handleChangeComplete);
		return () => {
			router.events.off('routeChangeStart', handleChangeStart);
			router.events.off('routeChangeComplete', handleChangeComplete);
		};
	}, []);

	return routerState;
}
