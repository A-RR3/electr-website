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
            type: DataTypes.STRING(6), //bill or card
            defaultValue: 'مؤقت',
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING(80), //varchar(60)
            allowNull: false
        },
        SubscriptionStatus: {
            type: DataTypes.CHAR(4), //temporary ,permanent
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATEONLY
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        PropertyType: {
            type: DataTypes.STRING(10), //bill or card
            allowNull: false,
            defaultValue: 'تجاري'
        },

    }, {
        timestamps: true,
        tableName: 'services',
    });
};

export default Service;