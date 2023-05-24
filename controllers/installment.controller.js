import db from "../models/index.js";
import { installment_data } from "../data.js";

const installments = async(req, res) => {
    const array = installment_data
    array.forEach(async(item) => {
        await db.Installment.create({
            Type: item.Type,
            InstallmentNumber: item.InstallmentNumber,
            Amount: item.Amount,
            PaymentTimesNumber: item.PaymentTimesNumber,
            CustomerID: item.CustomerID
        })
    })

}

const viewInstallments = async(req, res) => {
    await db.Installment.findAll({ order: Sequelize.col('createdAt') })
}

export function generateUniqueNumber() {
    const uniqueNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    return uniqueNumber;
}

export default { installments, viewInstallments }