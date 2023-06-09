import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Customer = (sequelize) => {
    s = sequelize;
    // "customer" is going to be the table name in DB
    return s.define("customer", {
        CustomerID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        CustomerName: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.BIGINT(10),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter you phonenumber',
                },
                isNumeric: true
            }
        },
        PlaceOfResidence: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        id: {
            type: DataTypes.BIGINT(9),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        RefreshToken: {
            type: DataTypes.TEXT("tiny"),
        },
        signedup: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0,
        }

    }, {
        timestamps: false,
        indexes: [
            // Define an index on the 'id' field
            {
                unique: true,
                fields: ['id']
            },
        ]
    });
};

export default Customer;