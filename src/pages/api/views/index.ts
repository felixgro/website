import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   try {
      const totalViews = await prisma.views.aggregate({
         _sum: {
            count: true
         }
      });

      const total = totalViews._sum.count ? totalViews._sum.count.toString() : '0';

      return res.status(200).json({ total });
   } catch (e: any) {
      return res.status(500).json({ message: e.message });
   }
}