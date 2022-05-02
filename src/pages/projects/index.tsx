import { NextPage } from 'next';
import Head from '@components/Head';
import Link from 'next/link';

type ProjectProps = {
	projects: any[];
};

const Projects: NextPage<ProjectProps> = ({ projects }) => {
	return (
		<div className='container grid-cell'>
			<Head title="Projects" />

			<main>
				<h1>Projects</h1>
				<section>
					<ul>
						{projects.map((project, idx) => {
							return (
								<li key={idx}>
									<Link href={project.route}>
										<a>{project.title}</a>
									</Link>
								</li>
							);
						})}
					</ul>
				</section>
			</main>
		</div>
	);
};

export default Projects;

export async function getStaticProps() {
	//requiring path and fs modules
	const path = require('path');
	const fs = require('fs');

	const projectsDirectoryPath = path.join(
		__dirname,
		'../../../src/pages/projects'
	);

	const files: string[] = fs.readdirSync(projectsDirectoryPath);

	const projects = files
		.filter(f => !f.includes('index'))
		.map(f => {
			const title = f.replace('.tsx', '');

			return {
				title,
				route: `/projects/${title}`
			};
		});

	return {
		props: {
			projects
		}
	};
}
