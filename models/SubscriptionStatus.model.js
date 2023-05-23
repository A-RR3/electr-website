import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const SubscriptionStatus = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("subscription-status", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        ElectricianNo: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
        },
        ElectricianName: {
            type: DataTypes.STRING(60),
            allowNull: true,
        },

    }, {
        timestamps: false,
        freezeTableName: true
    });
};

export default SubscriptionStatus;