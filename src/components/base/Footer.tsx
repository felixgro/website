import { FC } from 'react';
import FooterNav from './FooterNav';
import styles from '@styles/modules/Footer.module.css';

const Footer: FC = () => {
	return (
		<footer className={styles.footer + ' grid-cell'}>
			<div>
				<small></small>
			</div>
			<div>
				<FooterNav />
			</div>
		</footer>
	);
};

export default Footer;
