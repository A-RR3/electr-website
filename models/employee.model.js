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
            allowNull: false,
        },
        PhoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        EmployeeName: {
            type: DataTypes.STRING(30), //varchar 30
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING(30),
        }
    }, {
        timestamps: false,
        tableName: 'employee',
        indexes: [
            // Define an index on the 'id' field
            {
                unique: true,
                fields: ['id']
            }
        ]
    });
};

export default Employee;