import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Customer = (sequelize) => {
    s = sequelize;
    // "customer" is going to be the table name in DB
    return s.define("customer", {
        CustomerID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        CustomerName: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PlaceOfResidence: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    }, {
        timestamps: false
    });
};

export default Customer;