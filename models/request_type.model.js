import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const RequestType = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("request_type", {
        TypeID: {
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.UUIDV1,
            autoIncrement: true,
            primaryKey: true,
        },
        TypeName: {
            type: DataTypes.STRING(),
        },


    }, {
        timestamps: false,
        tableName: 'request_type'

    });
};

export default RequestType;