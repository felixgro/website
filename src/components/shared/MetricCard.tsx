import { FC, useState } from 'react';
import useId from '@hooks/useId';
import style from './MetricCard.module.scss';

type Props = {
   label: string;
   value: string;
}

const MetricCard: FC<Props> = ({ label, value }) => {
   const id = useId('card-*');

   return <div className={style.card}>
      <div aria-describedby={id}>{value}</div>
      <p id={id}>{label}</p>
   </div>;
};

export default MetricCard;
