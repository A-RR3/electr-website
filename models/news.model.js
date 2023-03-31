import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const News = (sequelize) => {
    s = sequelize;
    return s.define("news", {
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
            type: DataTypes.STRING(),
            allowNull: false
        },
    }, {
        timestamps: true,
        freezeTableName: true
    });
};

export default News;