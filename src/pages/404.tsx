import { NextPage } from 'next';

const Error404: NextPage = () => {
	return (
		<div
			className='grid-cell'
			style={{
				display: 'grid',
				placeItems: 'center'
			}}
		>
			<h1 style={{ padding: '50px' }}>404</h1>
		</div>
	);
};

export default Error404;
