import jwt from 'jsonwebtoken';
import db from '../models/index.js';
// import { config } from 'dotenv';
// config();

const handleLogout = async(req, res) => {
    const cookies = req.cookies;
    //if we get cookies but no jwt or didn't get cookies at all
    if (!cookies && !cookies.jwt) { return res.status(204) } //no content to send back, jwt is erased anyway
    const refreshToken = cookies.jwt;
    const foundCustomer = await db.Customer.findOne({
        where: { RefreshToken: refreshToken }
    })
    if (!foundCustomer) {
        //if no user has the jwt, erase the cookie
        res.clearCookie('jwt', { httpOnly: true, }) // maxAge: 24 * 60 * 60 * 1000
            // res.end()
        console.log("!foundCustomer");
        console.log(cookies);

        const foundEmployee = await db.Employee.findOne({
            RefreshToken: refreshToken
        });
        if (!foundEmployee) {
            res.clearCookie('jwt', { httpOnly: true, }); // maxAge: 24 * 60 * 60 * 1000
            console.log("!foundEmp");
            console.log(cookies);
            return res.sendStatus(204) //no content
        } else {
            //delete the refresh token in the database
            db.Employee.update({ RefreshToken: null }, { where: { EmployeeID: foundEmployee.EmployeeID } })
            res.clearCookie('jwt', { httpOnly: true, }); //maxAge: 24 * 60 * 60 * 1000
            console.log("delete emp refresh token");
            console.log(cookies);
            return res.sendStatus(204)
        }

    } else {
        //delete the refresh token in the database
        db.Customer.update({ RefreshToken: null }, { where: { CustomerID: foundCustomer.CustomerID } })
        res.clearCookie('jwt', { httpOnly: true, }); //maxAge: 24 * 60 * 60 * 1000 
        console.log("delete emp refresh token");
        console.log(cookies);
        return res.sendStatus(204)
    }


}
export default { handleLogout }