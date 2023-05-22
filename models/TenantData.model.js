import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const TenantData = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("tenant-data", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        TenantImage: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        TenantName: {
            type: DataTypes.STRING(60),
            allowNull: true,
        },
        CustomerImage: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    }, {
        timestamps: false,
        tableName: "tenant-data"
    });
};

export default TenantData;