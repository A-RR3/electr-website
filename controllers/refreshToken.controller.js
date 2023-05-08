import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import loginController from './login.controller.js'
import { config } from 'dotenv';
config();

const handleRefreshToken = async(req, res) => {
    const cookies = req.cookies;
    //if we get cookies but no jwt or didn't get cookies at all
    if (!cookies && !cookies.jwt) return res.status(401) //unauthorized
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundCustomer = await db.Customer.findOne({
        where: { RefreshToken: refreshToken }
    });
    if (!foundCustomer) {
        const foundEmployee = await db.Employee.findOne({
            RefreshToken: refreshToken
        });
        if (!foundEmployee) { return res.sendStatus(403) } else {
            //evaluate jwt for employee
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async(err, decoded) => {
                    if (err || foundEmployee.EmployeeID !== decoded.userID) {
                        return res.sendStatus(403) //invalid token,expired
                    }
                    const accessToken = await loginController.generateAccessToken(foundCustomer.EmployeeID);
                    res.json({ accessToken })
                }
            )
        }
    } else {
        //evaluate jwt for customer
        console.log('evaluate jwt for customer');
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async(err, decoded) => {
                console.log(decoded.userID, foundCustomer.CustomerID);
                if (foundCustomer.CustomerID !== decoded.userID) {
                    return res.sendStatus(403) //invalid refresh token,expired
                }
                const accessToken = await loginController.generateAccessToken(foundCustomer.CustomerID);
                res.json({ accessToken })

            }
        )
    }


}
export default { handleRefreshToken }