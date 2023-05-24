import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import loginRouter from './routes/login.route.js';
import customerRouter from './routes/customer.route.js';
import requestRouter from './routes/request.route.js'
import employeeRouter from './routes/employee.route.js'
import reportRouter from './routes/report.route.js'
import refreshRouter from './routes/refresh.route.js'
import advertisementRouter from './routes/advertisement.route.js'
import billRouter from './routes/bill.route.js'
import installmentRouter from './routes/installment.route.js'
import signupRouter from './routes/signup.route.js'
import logoutRouter from './routes/logout.route.js'
import verifyJWT from './middleware/verifyJWT.js';
import userAuthentication from './middleware/userAuthentication.js';
import cookieParser from 'cookie-parser';
import { Sequelize, where } from 'sequelize';
import { config } from 'dotenv';
config();


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const app = express();
// app.maxPayload = 50 * 1024 * 1024; // 50 MB

//cross origin resource sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//middleware for cookies
app.use(cookieParser());

// built-in middleware to handle json
app.use(express.json());



// app.post('/api/news', (req, res) => {
//     news.forEach(item => {
//         const news = new db.News(item);

//         news.save()
//             .then(data => {
//                 res.status(201).send(data);
//             })
//             .catch(err => {
//                 res.status(500).send(err.message || "Something went wrong");
//             });
//     })

// })

app.get('/api/news', (req, res) => {
    db.News.findAll({
            order: Sequelize.col('createdAt')
        })
        .then(results => {
            res.status(200).send(results); // model is a json object
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
})







app.post('/api/services', (req, res) => {
    services_data.forEach(item => {
        db.Service.create(item).then(data => {
                console.log(data);
            })
            .catch(err => {
                res.status(500).send(err.message || "Something went wrong");
            });
    })
    res.send({ success: true });
})

app.use('/api/login', loginRouter);
//refresh api will recieve the cookie that has the refresh token and that will issue a new access token once it is expired
app.use('/api/refresh', refreshRouter)
app.use('/api/logout', logoutRouter);

// app.use(verifyJWT);
app.use("/api/customers", customerRouter);
app.use("/api/employees", employeeRouter);
app.use('/api/request', requestRouter);
app.use('/api/report', reportRouter);
app.use('/api/advertisement', advertisementRouter);
app.use('/api/signup', signupRouter);
app.use('/api/bills', billRouter);
app.use('/api/installments', installmentRouter);










await db.sequelize.sync() //or .authenticate
    .then(() => {
        console.log("DB Sync Done Successfully!")
    })
    .catch((err) => {
        console.log(`Failed to Sync with DB: ${err.message}`);
    });

app.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`)
});