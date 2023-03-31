import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const PropertyTypeModification = (sequelize) => {
    s = sequelize;
    // "request" is going to be the table name in DB
    return s.define("PTM", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ElectricianNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ElectricianName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

    }, {
        timestamps: false,
        tableName: "PTM"
    });
};

export default PropertyTypeModification;