import { DataTypes, Sequelize } from "sequelize";
import generateUniqueNumber from '../controllers/bill.controller.js'
// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

// function generateUniqueNumber() {
//     const uniqueNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
//     return uniqueNumber;
// }

const Bill = (sequelize) => {
    s = sequelize;
    return s.define("bill", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: generateUniqueNumber,
        },
        Amount: {
            type: DataTypes.FLOAT(8, 4),
            allowNull: false
        },
        PaidAmount: {
            type: DataTypes.FLOAT(8, 4),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATEONLY
        },
        updatedAt: {
            type: DataTypes.DATEONLY,
        }
    }, {
        timestamps: true,
        freezeTableName: true,

    });
};


export default Bill;