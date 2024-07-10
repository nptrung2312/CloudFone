import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => { //Tạo các route tại đây truyền ứng dụng app vào server
    router.get('/', homeController.handleLogin);
    router.post('/api/login', homeController.handleLogin);
    router.post('/api/getInfoUser', homeController.handleGetInfoUser);
    router.post('/api/updateInfoUser', homeController.handleUpdateInfoUser);
    router.post('/api/changePassword', homeController.handleChangePassword);
    router.post("/api/nptrung", (req, res) => {
        return res.send("NpTrung!");
    });

    return app.use("/", router);
};

module.exports = initWebRoutes;