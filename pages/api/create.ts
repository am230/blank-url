import {NextApiRequest, NextApiResponse} from "next";
import normalizeUrl from 'normalize-url';
import {encode} from "../../lib/shortener";
import prisma from "../../lib/prisma";

interface CreateLink {
    url: string;
}

export interface Response {
    id?: string
    error?: string
    ok: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>,) {
    const {url}: CreateLink = req.body;
    if (!url) {
        return res.status(200).json({
            ok: false, error: 'うまく入力できてないようです…',
        });
    }
    let normalized;
    try {
        normalized = normalizeUrl(url)
    } catch (error) {
        return res.status(200).json({
            ok: false, error: '意味の分からないエラーが出ました…',
        });
    }
    prisma.link.create({
        data: {
            url: normalized,
        },
    }).then(link => {
        res.status(200).json({
            ok: true, id: encode(link.id),
        });
    }).catch(reason => {
        res.status(200).json({
            ok: false, error: reason.toString(),
        });
    })
}
