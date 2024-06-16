const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
// Sequelize("db", "user", "pass", {});
const sequelize = new Sequelize("test", "root", null, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate(); // Hàm dùng để xác thực
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = connectDB;
