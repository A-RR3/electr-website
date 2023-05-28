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
        pdf: {
            type: DataTypes.TEXT,
            length: 'long',
            allowNull: false
        },
        coverImage: {
            type: DataTypes.TEXT,
            length: 'long',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATEONLY
        },
        updatedAt: {
            type: DataTypes.DATE
        },
    }, {
        timestamps: true,
        freezeTableName: true
    });
};

export default Report;