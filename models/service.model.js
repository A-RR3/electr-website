import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Service = (sequelize) => {
    s = sequelize;
    // "service" is going to be the table name in DB
    return s.define("service", {
        ServiceID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        SubscriptionType: {
            type: DataTypes.CHAR(4), //bill or card
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING(60), //varchar(60)
            allowNull: false
        },
        SubscriptionStatus: {
            type: DataTypes.CHAR(9), //temporary ,permanent
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'services',
        updatedAt: false
    });
};

export default Service;