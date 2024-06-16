import db from "../models/index"; // trong này đã import tất cả models
import userService from "../services/userService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

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

module.exports = {
    getHomePage: getHomePage,
    handleLogin: handleLogin
}