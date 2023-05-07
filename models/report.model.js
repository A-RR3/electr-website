import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Report = (sequelize) => {
    s = sequelize;
    return s.define("report", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100), //varchar 30
            allowNull: false
        },
        body: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        timestamps: true,
        freezeTableName: true
    });
};

export default Report;