import { DataTypes, Sequelize } from "sequelize";

// This line just to get the autocomplete working
let s = new Sequelize({ dialect: 'mysql' });

const Employee = (sequelize) => {
    s = sequelize;
    return s.define("employee", {
        EmployeeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        EmployeeName: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER(9),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false,

        },
        PhoneNumber: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },

        RefreshToken: {
            type: DataTypes.TEXT("tiny"),
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        }
    }, {
        timestamps: false,
        tableName: 'employee',
        indexes: [{
            unique: true,
            fields: ['id']
        }]
    });
};

export default Employee;