import { AppProps } from 'next/app';
import Header from '@components/base/Header';
import AnimatedGrid from '@components/shared/AnimatedGrid';
import Footer from '@components/base/Footer';
import useRouterState from '@hooks/useRouterState';
import '@styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
	const routerState = useRouterState();

	return (
		<AnimatedGrid
			className='container'
			routerState={routerState}
			config={{
				cellSelector: '.grid-cell',
				lineColor: '#DEE2E6',
				lineWidth: 2,
				duration: 1700,
				easing: 'ease-out'
			}}
		>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</AnimatedGrid>
	);
}

export default App;
