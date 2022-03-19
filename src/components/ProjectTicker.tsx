import { FC } from 'react';
import { Repository } from '../types/github';

type ProjectTickerProps = {
	projects: Repository[];
};

const ProjectTicker: FC<ProjectTickerProps> = ({ projects }) => {
	return (
		<ul>
			{projects.map(repo => {
				return <li key={repo.id}>{repo.name}</li>;
			})}
		</ul>
	);
};

export default ProjectTicker;
