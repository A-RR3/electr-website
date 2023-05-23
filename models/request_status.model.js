import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const RequestStatus = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("request_status", {
        StatusID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        StatusName: {
            type: DataTypes.STRING(10),
        },

    }, {
        timestamps: false,
        tableName: 'request_status'

    });
};

export default RequestStatus;