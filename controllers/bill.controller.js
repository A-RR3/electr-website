import db from "../models/index.js";
import { bills_data } from "../data.js";

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

const viewBills = async(req, res) => {
    await db.Bill.findAll({ order: Sequelize.col('createdAt') })
}

export function generateUniqueNumber() {
    const uniqueNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    return uniqueNumber;
}

export default { bills, viewBills }