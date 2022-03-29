import { FC } from 'react';
import Link from 'next/link';

const FooterNav: FC = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link href='/privacy'>
						<a>
							<small>Privacy</small>
						</a>
					</Link>
				</li>
				<li>
					<Link href=''>
						<a>
							<small>Imprint</small>
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default FooterNav;
