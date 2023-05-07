import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    //if we get cookies but no jwt or didn't get cookies at all
    if (!cookies && !cookies.jwt) return res.status(401) //unauthorized
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

}