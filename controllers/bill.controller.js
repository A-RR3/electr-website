import db from "../models/index.js";
import { bills_data } from "../data.js";
import { Sequelize } from 'sequelize';


const bills = async(req, res) => {
    const array = bills_data
    array.forEach(async(item) => {
        await db.Bill.create({
            Amount: item.Amount,
            PaidAmount: item.PainAmount,
            ServiceID: item.ServiceID
        })
    })

}

const viewBills = async(req, res, customerID) => {
    await db.Bill.findAll({
            include: [{
                model: db.Service,
                attributes: ['CustomerID', 'Address'],
                where: { CustomerID: customerID }
            }],
            order: Sequelize.col('createdAt')
        },


    ).then(data => {
            res.status(200).send(data)
        }

    )
}

export function generateUniqueNumber() {
    const uniqueNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    return uniqueNumber;
}

export default { bills, viewBills }