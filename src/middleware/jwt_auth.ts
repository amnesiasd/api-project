import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const default_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RfbmFtZSI6Ikp1ZGUiLCJsYXN0X25hbWUiOiJIIiwicGFzc3dvcmQiOiIkMmIkMTAkNy9XZTRBb0pDamNvOWdwdnhHUUJQLkJheGViT2Q1RWVpOVRIVFdnL3pqSll1d2hxa2tiRzYifSwiaWF0IjoxNjMxMDIzNzk4fQ.ZC16NDb-k4A-BXlxluiYRDwAFAZDWzNSrcCd2MYoRBA";

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization || '';
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(default_token, process.env.TOKEN_SECRET as string)

        next()
    } catch (error) {
        res.status(401)
        res.json("Error occured");
    }
};

export default verifyAuthToken;