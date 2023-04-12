import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const PropertyTypeModification = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("property-type", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ElectricianNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ElectricianName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

    }, {
        timestamps: false,
        tableName: "property-type"
    });
};

export default PropertyTypeModification;