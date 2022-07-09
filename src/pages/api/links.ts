import type { NextApiRequest, NextApiResponse } from 'next';
import basicAuthMiddleware from 'nextjs-basic-auth-middleware';
import prisma from '@lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   switch (req.method) {
      case 'POST':
         await postLink(req, res);
         break;
      default:
         res.status(405).json({ message: 'Method not allowed', success: false });
   }

   prisma.$disconnect();
}

async function postLink(req: NextApiRequest, res: NextApiResponse) {
   await basicAuthMiddleware(req, res);

   const { url } = req.body;

   const domainMatch = /\.(.*)\./.exec(new URL(url).hostname);
   if (!domainMatch || !domainMatch[1]) {
      return res.status(400).json({ message: 'Invalid URL', success: false });
   }

   const slug = domainMatch[1];

   let platform = await prisma.platform.findUnique({
      where: { slug }
   });

   if (!platform) {
      platform = await prisma.platform.findUnique({
         where: { slug: 'other' }
      });
   }

   await prisma.link.create({
      data: {
         url,
         platformId: platform!.id
      }
   });

   return res.status(200).json({ success: true });
}