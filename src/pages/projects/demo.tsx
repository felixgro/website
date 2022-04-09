import { NextPage } from 'next';
import Head from 'next/head';
import { greet } from '../../utils/test';

const Demo: NextPage = () => {
	greet();

	return (
		<div className='grid-cell'>
			<Head>
				<title>Demo Project</title>
			</Head>

			<main>
				<section id='project'>
					<canvas
						height={200}
						width={400}
						style={{ background: '#000' }}
					></canvas>
				</section>

				<section id='meta'>
					<h1>Demo</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</section>
			</main>
		</div>
	);
};

export default Demo;
