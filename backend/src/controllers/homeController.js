import db from "../models/index"; // trong này đã import tất cả models
import userService from "../services/userService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.users.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // chuyển data thành chuỗi string
        });
    } catch (e) {
        console.log(e);
    }
}

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let handleGetInfoUser = async (req, res) => {
    let infoUser = await userService.handleGetInfo(req.body);

    return res.status(200).json({
        user: infoUser.user,
    });
}
let handleUpdateInfoUser = async (req, res) => {
    let inFoUser = await userService.handleUpdateInfoUser(req.body);

    return res.status(200).json({
        errCode: inFoUser.errCode,
        message: inFoUser.message,
        user: inFoUser.user,
    });
}

let handleChangePassword = async (req, res) => {
    let dataPassWord = await userService.handleUpdatePassUser(req.body);
    return res.status(200).json({
        code: dataPassWord.code,
        message: dataPassWord.message
    });
}

let handleSaveImage = async (req, res) => {
    let dataUpdateAvatar = await userService.handleUpdateAvatar(req.body);
    return res.status(200).json({
        code: dataUpdateAvatar.code,
        message: dataUpdateAvatar.message
    });
}

module.exports = {
    getHomePage: getHomePage,
    handleLogin: handleLogin,
    handleUpdateInfoUser: handleUpdateInfoUser,
    handleGetInfoUser: handleGetInfoUser,
    handleChangePassword: handleChangePassword,
    handleSaveImage: handleSaveImage,
}