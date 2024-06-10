import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => { //Tạo các route tại đây truyền ứng dụng app vào server
    router.get('/', homeController.getHomePage);

    return app.use("/", router);
};

module.exports = initWebRoutes;