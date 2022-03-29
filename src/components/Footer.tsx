import { FC } from 'react';
import FooterNav from './FooterNav';
import styles from '../styles/modules/Footer.module.css';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div>
				<small>felixgrohs.dev</small>
			</div>
			<div>
				<FooterNav />
			</div>
		</footer>
	);
};

export default Footer;
