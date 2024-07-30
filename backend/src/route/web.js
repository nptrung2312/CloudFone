import express from "express";
import homeController from "../controllers/homeController";
import workController from "../controllers/workController";
import customerController from "../controllers/customerController";
import syntheticController from "../controllers/syntheticController";

let router = express.Router();

let initWebRoutes = (app) => { //Tạo các route tại đây truyền ứng dụng app vào server
    router.get('/', homeController.handleLogin);
    router.post('/api/login', homeController.handleLogin);
    router.post('/api/getInfoUser', homeController.handleGetInfoUser);
    router.post('/api/updateInfoUser', homeController.handleUpdateInfoUser);
    router.post('/api/changePassword', homeController.handleChangePassword);
    router.post('/api/saveImage', homeController.handleSaveImage);
    router.post('/api/handleAddWork', workController.handleAddWork);
    router.post('/api/getWorkUser', workController.handleGetWork);
    router.post('/api/addCustomer', customerController.handleAddCustomer);
    router.post('/api/getListCustomer', customerController.handleGetCustommer);
    router.post('/api/handleAddNote', syntheticController.handleAddNote);
    router.post('/api/handleDeleteNote', syntheticController.handleDeleteNote);
    router.post('/api/getListNote', syntheticController.handleGetNote);
    router.post("/api/nptrung", (req, res) => {
        return res.send("NpTrung!");
    });

    return app.use("/", router);
};

module.exports = initWebRoutes;