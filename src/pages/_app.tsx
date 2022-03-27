import '../styles/globals.css';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import AnimatedGrid from '../components/AnimatedGrid';

function App ({ Component, pageProps }: AppProps) {
	return (
		<AnimatedGrid>
			<Header />
			<Component {...pageProps} />
		</AnimatedGrid>
	);
}

export default App;
