import { NextApiRequest, NextApiResponse } from "next";
import normalizeUrl from 'normalize-url';
import { encode } from "../../lib/shortener";
import prisma from "../../lib/prisma";

interface CreateLink {
    url: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { url }: CreateLink = req.body;
    const link = await prisma.link.create({
        data: {
            url: normalizeUrl(url),
        },
    });
    res.status(200).json({
        id: encode(link.id),
        createdAt: link.createdAt,
        url: link.url,
    });
}
