import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "../../../lib/shortener";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const id = decode(req.query.path as string);
    const link = await prisma.link.findUnique({
        where: {
            id,
        },
    })
    res.status(200).json({
        id: link.id,
        createdAt: link.createdAt,
        url: link.url,
    })
}
