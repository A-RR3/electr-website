import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const verifyJWT = (req, res, next) => {
    //checks if the authHeader is present inside the request
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.sendStatus(401); //unauthorized 
    console.log(authHeaders) //barear token
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403) //invalid token,expired
            }
            //decoded includes the userID we passed to the payload
            req.userID = decoded.userID
            next()

        }
    )

}

export default verifyJWT