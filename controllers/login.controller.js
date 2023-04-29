import db from "../models/index.js";
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// require('dotenv').config();
import { config } from 'dotenv';

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