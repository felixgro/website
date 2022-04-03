import '../styles/globals.css';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import AnimatedGrid from '../components/AnimatedGrid';
import Footer from '../components/Footer';

function App ({ Component, pageProps }: AppProps) {
	return (
		<AnimatedGrid>
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