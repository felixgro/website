import { FC, useState, useEffect } from 'react';
import { disableScrolling, enableScrolling } from '@lib/scroll';
import Link from '@components/shared/Link';
import styles from './Header.module.scss';

const Header: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		isOpen ? disableScrolling() : enableScrolling();
	}, [isOpen]);

	return (
		<>
			<header className={`${styles.header} ${isOpen ? styles.headerNavOpen : ""} grid-cell`}>
				<div>
					<Link href='/'>
						<a style={{ display: 'flex' }} title='Home'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 171.47 253.04'
								role='img'
							>
								<title>Felix Grohs Logo</title>
								<path d='M102.4,186.79l-31,14.49A276.05,276.05,0,0,1,80.18,253,50.68,50.68,0,0,0,102.4,186.79Z' />
								<path d='M149,86.62l-104.84,49a275.69,275.69,0,0,1,21.12,46.06L124.59,154A50.67,50.67,0,0,0,149,86.62Z' />
								<path d='M166.69,0,0,77.91a278.1,278.1,0,0,1,33.33,40.35L142.24,67.35A50.66,50.66,0,0,0,166.69,0Z' />
							</svg>
						</a>
					</Link>
				</div>

				<div>
					<nav className={styles.nav}>
						<button
							type="button"
							className={`hamburger hamburger--squeeze ${isOpen ? 'is-active' : ''}`}
							onClick={() => setIsOpen(!isOpen)}
							title='Toggle Main'
						>
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						</button>
						<ul hidden={!isOpen}>
							<li>
								<Link href='/' activeClassName="is-active">
									<a>Hello</a>
								</Link>
							</li>
							<li>
								<Link href='/projects' activeClassName="is-active">
									<a>Projects</a>
								</Link>
							</li>
							<li>
								<Link href='/about' activeClassName="is-active">
									<a>About</a>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
