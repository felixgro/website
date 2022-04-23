import { FC } from 'react';
import style from './Badge.module.scss';

type Props = {
   label: string;
}

const Badge: FC<Props> = ({ label }) => {
   return <span className={style.badge}>{label}</span>;
};

export default Badge;
