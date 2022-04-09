import '../styles/globals.css';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import AnimatedGrid from '../components/AnimatedGrid';
import Footer from '../components/Footer';
import useRouterState from '../hooks/useRouterState';

function App ({ Component, pageProps }: AppProps) {
	const routerState = useRouterState();

	return (
		<AnimatedGrid routerState={routerState}>
			<div className='container'>
				<Header />
				<Component {...pageProps} />
				<div className='grid-cell'>
					<Footer />
				</div>
			</div>
		</AnimatedGrid>
	);
}

export default App;
