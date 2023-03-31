import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working!
let s = new Sequelize({ dialect: 'mysql' });

const Employee = (sequelize) => {
    s = sequelize;
    return s.define("employee", {
        EmployeeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        EmployeeName: {
            type: DataTypes.STRING(30), //varchar 30
            allowNull: false
        },
        Department: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(30),
        }
    }, {
        timestamps: false,
        tableName: 'employee'
    });
};

export default Employee;