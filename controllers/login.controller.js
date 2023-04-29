import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


function generateToken(user) {
    const token = jwt.sign({ role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return token;
}

function refreshToken(user) {
    const token = jwt.sign({ role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return token;
}

export default {
    generateToken,
    refreshToken
}