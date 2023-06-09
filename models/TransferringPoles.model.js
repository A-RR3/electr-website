import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const TransferringPoles = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("TransferringPoles", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        Footprint: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        LocationOfPole: {
            type: DataTypes.TEXT,
            allowNull: true,
        }

    }, {
        timestamps: false,
        tableName: "poles-transfer"
    });
};

export default TransferringPoles;