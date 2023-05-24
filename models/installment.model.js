import { DataTypes, Sequelize } from "sequelize";
import { generateUniqueNumber } from '../controllers/installment.controller.js';


// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Installment = (sequelize) => {
    s = sequelize;
    return s.define("installment", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: generateUniqueNumber,
        },
        Type: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        InstallmentNumber: {
            type: DataTypes.INTEGER(2),
            allowNull: false
        },
        Amount: {
            type: DataTypes.FLOAT(8, 4),
            allowNull: false
        },
        PaymentTimesNumber: {
            type: DataTypes.INTEGER(2),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATEONLY
        },
        updatedAt: {
            type: DataTypes.DATEONLY
        }
    }, {
        timestamps: true,
        freezeTableName: true
    });
};

export default Installment;