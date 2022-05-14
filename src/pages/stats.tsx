import { NextPage } from 'next';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string, config: RequestInit) => fetch(url, config).then((r) => r.json());

const Stats: NextPage = () => {
   const { data, error } = useSWR('/api/views/page-stats', fetcher);

   useEffect(() => {
      fetch('/api/views/page-stats', {
         method: 'POST'
      });
   }, []);

   return (
      <div className='container grid-cell'>
         <h1>Stats</h1>
         <p>Views of this page: {data?.total ?? 0}</p>
      </div>
   );
};

export default Stats;