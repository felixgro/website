import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type ProjectProps = {
	projects: any[];
};

const Projects: NextPage<ProjectProps> = ({ projects }) => {
	console.log(projects);
	return (
		<div>
			<Head>
				<title>Projects</title>
			</Head>

			<main>
				<section>
					{projects.map((project, idx) => {
						return (
							<Link key={idx} href={project.route}>
								<a>{project.title}</a>
							</Link>
						);
					})}
				</section>
			</main>
		</div>
	);
};

export default Projects;

export async function getStaticProps () {
	//requiring path and fs modules
	const path = require('path');
	const fs = require('fs');
	//joining path of directory
	const projectsDirectoryPath = path.join(
		__dirname,
		'../../../src/pages/projects'
	);

	//passsing directoryPath
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
