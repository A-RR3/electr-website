import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Advertisement = (sequelize) => {
    s = sequelize;
    return s.define("Advertisement", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        body: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        image: {
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
        }
    }, {
        timestamps: true,
        freezeTableName: true
    });
};

export default Advertisement;