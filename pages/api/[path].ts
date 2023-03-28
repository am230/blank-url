import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "../../lib/shortener";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const id = decode(req.query.path as string);
    const link = await prisma.link.findUnique({
        where: {
            id,
        },
    });
    if (link) {
        res.status(200).redirect(encodeURI(link.url));
    }
    res.status(404).json({
        message: "Link not found",
    })
}
