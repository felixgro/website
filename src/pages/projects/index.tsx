import { NextPage } from 'next';
import Head from '@components/base/Head';
import Link from 'next/link';
import { globby } from 'globby';
import path from 'path';

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
	// Find all projects located in projects directory (excluding index)
	const basePath = path.join(__dirname, '../../../src/pages/projects');
	const projectPaths = await globby([
		path.join(basePath, '*.tsx'),
		path.join('!', basePath, 'index.tsx')
	]);

	// Convert project paths to project objects for rendering
	const projects = projectPaths.map(projectPath => {
		const base = path.basename(projectPath, '.tsx');
		return {
			title: base[0].toUpperCase() + base.slice(1),
			route: `/projects/${base}`
		}
	});

	return {
		props: { projects }
	};
}
