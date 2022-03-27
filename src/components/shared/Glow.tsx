import { FC } from 'react';
import styles from '../../styles/modules/Glow.module.css';

type GlowProps = {};

const Glow: FC<GlowProps> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<div>{children}</div>
			<div className={styles.bg} aria-hidden={true}></div>
		</div>
	);
};

export default Glow;
