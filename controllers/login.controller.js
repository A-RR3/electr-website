import db from "../models/index.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


function generateAccessToken(id) {
    // const token = jwt.sign({ role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    // return token;
    return new Promise((resolve, reject) => {
        const payload = { userID: id };
        const options = { expiresIn: '1h' }
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(err);
            } else resolve(token)
        });
    })

}

function generateRefreshToken(id) {
    // const token = jwt.sign({ role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    // return token;
    return new Promise((resolve, reject) => {
        const payload = { userID: id };
        const options = { expiresIn: '7d' }
        const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(err);
            } else resolve(token)
        });
    })
}

const customerLogin = async(req, res) => {
    const accessToken = await generateAccessToken(req.customer.CustomerID);
    const refreshToken = await generateRefreshToken(req.customer.CustomerID);
    console.log('2222');
    //saving refreshToken with current user
    await db.Customer.upsert({
        CustomerID: req.customer.CustomerID,
        RefreshToken: refreshToken
    }).then(result => { console.log(result[0]); })
    console.log('3333');
    const cus = await db.Customer.findByPk(req.customer.CustomerID);
    console.log(cus.RefreshToken);
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // prevent client-side JavaScript from accessing the cookie
        // sameSite: 'None',
        //secure: true, only send the cookie over HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000 // set the cookie to expire in 7 days
    })
    res.status(200).json({
        success: true,
        message: 'Successfully logged in',
        token: accessToken,
        // refresToken: refreshToken,
        userId: req.customer.CustomerID,
        role: "customer"
    });
}


const employeeLogin = async(req, res) => {
    const accessToken = await generateAccessToken(req.employee.EmployeeID);
    const refreshToken = await generateRefreshToken(req.employee.EmployeeID);
    console.log('employee login');
    //saving refreshToken with current user
    await db.Employee.upsert({
        EmployeeID: req.employee.EmployeeID,
        RefreshToken: refreshToken
    }).then(result => { console.log(result[0]); })
    const emp = await db.Employee.findByPk(req.employee.EmployeeID);
    res.cookie('jwt', refreshToken, {
            httpOnly: true, // prevent client-side JavaScript from accessing the cookie
            // sameSite: 'None',
            //secure: true, only send the cookie over HTTPS
            maxAge: 30 * 24 * 60 * 60 * 1000
        }) //30days / sameSite: 'None', secure: true,24 * 60 * 60 * 1000
    res.status(200).json({
        success: true,
        message: 'Successfully logged in',
        token: accessToken,
        // refresToken: refreshToken,
        userId: req.employee.EmployeeID,
        role: emp.role
    });
}


export default {
    generateAccessToken,
    generateRefreshToken,
    customerLogin,
    employeeLogin

}