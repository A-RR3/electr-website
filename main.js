import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import customerRouter from './routes/customer.route.js';
import requestRouter from './routes/request.route.js'
import { customers_data, news, req_status, req_type, services_data } from './data.js';
import { Sequelize, where } from 'sequelize';

const PORT = 5000;
const HOST = '127.0.0.1';
const app = express();
app.use(cors());
// static assets
// app.use(express.static('./methods-public'))

// parse form data
// app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json());

// app.post('/login', (req, res) => {
// if (name) {
//     return res.status(200).send(`Welcome ${name}`)
// }

// res.status(401).send('Please Provide Credentials')
// })
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
    // res.status(200).json({ success: true, data: news })
})

// app.post('/api/types', (req, res) => {
//     req_type.forEach(item => {
//         const types = new db.RequestType(item); //build an obj
//         types.save()
//             .then(data => {
//                 res.status(201).send(data);
//             })
//             .catch(err => {
//                 res.status(500).send(err.message || "Something went wrong");
//             });
//     })

// })

// app.post('/api/status', (req, res) => {
//     req_status.forEach(item => {
//         db.RequestStatus.create(item).then(data => {
//                 // res.status(201).send(data);
//                 console.log(data)
//             })
//             .catch(err => {
//                 res.status(500).send(err.message || "Something went wrong");
//             });
//     })
//     res.send({ success: true });
// })





// app.post('/api/customers', (req, res) => {
//     customers_data.forEach(item => {
//         db.Customer.create(item).then(data => {
//                 // res.status(201).send(data);
//                 console.log(data)
//             })
//             .catch(err => {
//                 res.status(500).send(err.message || "Something went wrong");
//             });
//     })
//     res.send({ success: true });
// })

app.post('/api/services', (req, res) => {
    services_data.forEach(item => {
        db.Service.create(item).then(data => {
                // res.status(201).send(data);
                console.log(data)
            })
            .catch(err => {
                res.status(500).send(err.message || "Something went wrong");
            });
    })
    res.send({ success: true });
})



app.use("/api/customers", customerRouter);
app.post('/api/emp', (req, res) => {
    db.Employee.create({
            EmployeeName: "wisam",
            Department: "PRD"
        })
        .then(data => {
            res.status(201).send(data);
            console.log(data)
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
})

app.use('/api/request', requestRouter);
// app.post('/test', (req, res) => {
//     const type = req.body.Type;

//     res.send({
//         success: true,
//         data
//     })
// })


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
})