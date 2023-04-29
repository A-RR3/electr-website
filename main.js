import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import loginRouter from './routes/login.route.js';
import customerRouter from './routes/customer.route.js';
import requestRouter from './routes/request.route.js'
import employeeRouter from './routes/employee.route.js'
import { customers_data, news, req_status, req_type, services_data } from './data.js';
import { Sequelize, where } from 'sequelize';
import { config } from 'dotenv';
config();


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const app = express();
app.maxPayload = 50 * 1024 * 1024; // 50 MB

app.use(cors());
// static assets
// app.use(express.static('./methods-public'))

// parse data from url
// app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json());

app.post('/api/news', (req, res) => {
    news.forEach(item => {
        const news = new db.News(item);

        news.save()
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send(err.message || "Something went wrong");
            });
    })

})

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
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send(err.message || "Something went wrong");
            });
    })
    res.send({ success: true });
})


app.use("/api/login", loginRouter);

app.use("/api/customers", customerRouter);
app.use("/api/employees", employeeRouter);

app.use('/api/request', requestRouter);


// app.post('/api/request', async(req, res) => {

//     const type = req.body.Type;
//     console.log(type);
//     const status = req.body.Status;
//     const type_id = await db.RequestType.findOne({
//         where: {
//             TypeName: type
//         },
//         attributes: [
//             'TypeID'
//         ]
//     })

//     const status_id = await db.RequestStatus.findOne({ attributes: ['StatusID'], where: { StatusName: status } })

//     const request = new db.Request({
//         Reason: req.body.Reason,
//         EmployeeID: req.body.EmployeeID,
//         ServiceID: req.body.ServiceID,
//         TypeID: type_id.dataValues.TypeID,
//         StatusID: status_id.dataValues.StatusID
//     });


//     request.save()
//         .then(data => {
//             res.status(201).send(data);
//         })
//         .catch(err => {
//             res.status(500).send(err.message || "Something went wrong");
//         });
// });


db.sequelize.sync() //or .authenticate
    .then(() => {
        console.log("DB Sync Done Successfully!")
    })
    .catch((err) => {
        console.log(`Failed to Sync with DB: ${err.message}`);
    });

app.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`)
});