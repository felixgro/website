import { FC } from 'react';
import HeaderNav from './HeaderNav';
import styles from '../styles/modules/Header.module.css';

const HeaderSticky: FC = () => {
	return (
		<header className={styles.sticky}>
			<div>
				<div>HeaderSticky</div>
			</div>
			<div>
				<HeaderNav />
			</div>
		</header>
	);
};

export default HeaderSticky;
