import { NextPage } from 'next';
import Head from 'next/head';

const Demo: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Demo Project</title>
			</Head>

			<main>
				<section id='project'>
					<canvas height={200} width={200}></canvas>
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
