import { NextFetchEvent, NextRequest } from 'next/server';

const hostWhitelist = ['localhost'];

export function middleware (req: NextRequest, ev: NextFetchEvent) {
	if (!req.url.startsWith('http://')) {
		return new Response('Not Allowed', {
			status: 401
		});
	}
}
