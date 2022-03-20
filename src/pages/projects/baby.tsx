import { NextPage } from 'next';
import Head from 'next/head';
import { greet } from '../../utils/test';

const Baby: NextPage = () => {
	greet();

	return (
		<div>
			<Head>
				<title>Demo Project</title>
			</Head>

			<main>
				<section id='project'>
					<canvas
						height={200}
						width={400}
						style={{ background: '#f00' }}
					></canvas>
				</section>

				<section id='meta'>
					<h1>Babyyy</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</section>
			</main>
		</div>
	);
};

export default Baby;
