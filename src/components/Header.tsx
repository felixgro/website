import { FC, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/modules/Header.module.css';
import HeaderNav from './HeaderNav';
import HeaderSticky from './HeaderSticky';

const Header: FC = () => {
	return (
		<>
			<header className={`${styles.header} grid-cell`}>
				<div>
					<Link href='/'>
						<a style={{ display: 'flex' }} title='Home'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 171.47 253.04'
							>
								<path d='M102.4,186.79l-31,14.49A276.05,276.05,0,0,1,80.18,253,50.68,50.68,0,0,0,102.4,186.79Z' />
								<path d='M149,86.62l-104.84,49a275.69,275.69,0,0,1,21.12,46.06L124.59,154A50.67,50.67,0,0,0,149,86.62Z' />
								<path d='M166.69,0,0,77.91a278.1,278.1,0,0,1,33.33,40.35L142.24,67.35A50.66,50.66,0,0,0,166.69,0Z' />
							</svg>
						</a>
					</Link>
				</div>

				<div>
					<HeaderNav />
				</div>
			</header>
			<HeaderSticky />
		</>
	);
};

export default Header;
