import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Request = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("request", {
        RequestID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Reason: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        ApplicantName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        ApplicantPhoneNumber: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATEONLY
        },
        updatedAt: {
            type: DataTypes.DATE
        }

    }, {
        timestamps: true,

    });
};

export default Request;