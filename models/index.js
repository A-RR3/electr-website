import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";
import Customer from "./customer.model.js";
import Service from "./service.model.js";
import Request from "./request.model.js";
import RequestType from "./request_type.model.js";
import RequestStatus from "./request_status.model.js";
import Employee from "./employee.model.js";
import PropertyTypeModification from "./PTM.model.js";
import News from "./news.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect, //mysql
    pool: {
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
    },
});

const db = {};
db.sequelize = sequelize;
db.Customer = Customer(db.sequelize);
db.Service = Service(db.sequelize);
db.Request = Request(db.sequelize);

db.Service.hasMany(
    db.Request, { foreignKey: "ServiceID" }, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }
);
db.Customer.hasMany(
    db.Service, { foreignKey: "CustomerID" }, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }
);
db.RequestType = RequestType(db.sequelize);
db.Request.belongsTo(
    db.RequestType, { foreignKey: "TypeID" }, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }
);

db.RequestStatus = RequestStatus(db.sequelize);
db.Request.belongsTo(
    db.RequestStatus, { foreignKey: "StatusID" }, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }
);

db.Employee = Employee(db.sequelize);
db.Employee.hasMany(
    db.Request, { foreignKey: "EmployeeID" }, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }
);


db.PropertyTypeModification = PropertyTypeModification(db.sequelize);
// db.Request.hasOne(db.PropertyTypeModification, { foreignKey: "RequestID", onDelete: "CASCADE", onUpdate: "CASCADE" });


db.News = News(db.sequelize);
db.Employee.hasMany(
    db.News, { foreignKey: "EmployeeID" }, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }
);
// db.News.belongsTo(db.Employee);
// db.Customer.sync({ alter: true }).then(() => "Database created");
// db.sequelize.sync({ alter: true }).then(() => "Database created");

db.sequelize.sync({ alter: true }).then(() => "Database created");

export default db;