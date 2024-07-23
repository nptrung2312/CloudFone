import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs"; // Thư viện dùng để mã hóa pass cũng như so sánh pass
import { raw } from "body-parser";
const { users, accounts } = require('../models');

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWord = await bcrypt.hashSync(password, salt);
      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = async (email, password) => {
  try {
    let userData = {};

    let isExist = await checkUserEmail(email);
    if (isExist) {
      let user = await db.users.findOne({
        where: { email: email },
        include: [{
          model: db.accounts,
          attributes: ["password", "policy"],  // Chỉ lấy các thuộc tính cần thiết từ bảng accounts
        }],
        attributes: ["userId", "email", "lastName", "firstName", "birthday", "sex", "address", "phone", "type", "cardId", "companyId"],
        raw: true,
      });

      if (user) {
        let check = bcrypt.compareSync(password, user['account.password']);
        if (check) {
          userData.errCode = 0;
          userData.errMessage = "Oke";
          delete user['account.password'];
          userData.user = user;
        } else {
          userData.errCode = 1;
          userData.errMessage = "Mật khẩu không đúng!";
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = "Tài khoản không tồn tại!";
      }
    } else {
      userData.errCode = 2;
      userData.errMessage = "Email của bạn không có trong hệ thống!";
    }

    return userData;
  } catch (e) {
    console.error(e);
    throw e;  // Ném lỗi ra ngoài để xử lý tiếp
  }
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.accounts.findOne({
        where: {
          email: userEmail,
        },
      });
      if (account) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetInfo = async (infoUser) => {
  // return new Promise(async (resolve, reject) => {
  try {
    let user = await db.users.findOne({
      attributes: ["userId", "email", "lastName", "firstName", "birthday", "sex", "address", "phone", "type", "cardId", "companyId", "image"],
      where: {
        userId: infoUser.userId,
      },
      include: [{
        model: db.accounts,
        attributes: ["accountId", "password", "policy"],
      }],
    });
    return ({
      user: user.get({ plain: true }),
    });
  } catch (e) {
    console.log(e);
  }
  // });
}

let handleUpdateInfoUser = async (inFoUser) => {
  try {
    let user = await db.users.findOne({
      attributes: ["userId", "email", "lastName", "firstName", "birthday", "sex", "address", "phone", "type", "cardId", "companyId"],
      where: {
        userId: inFoUser.userId,
      },
      include: [{
        model: db.accounts,
        attributes: ["accountId", "email", "password", "policy"],
      }],
    });

    if (user) {
      await db.users.update({
        firstName: inFoUser.firstName,
        lastName: inFoUser.lastName,
        companyId: inFoUser.company,
        email: inFoUser.email,
        phone: inFoUser.phone,
        address: inFoUser.address,
      }, {
        where: {
          userId: inFoUser.userId,
        },
      });

      if (user.account) {
        user.account.policy = inFoUser.policy;
        user.account.email = inFoUser.email;
        await user.account.save();
      }
      // Làm mới user sau khi update để lấy dữ liệu mới nhất
      user = await db.users.findOne({
        attributes: ["userId", "email", "lastName", "firstName", "birthday", "sex", "address", "phone", "type", "cardId", "companyId"],
        where: {
          userId: inFoUser.userId,
        },
        include: [{
          model: db.accounts,
          attributes: ["accountId", "email", "password", "policy"],
        }],
        raw: true,
      });



      return ({
        errCode: 0,
        message: "Cập nhật thông tin thành công!",
        user: user
      });
    } else {
      return ({
        errCode: 1,
        message: "Lỗi!",
      });
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

let handleUpdatePassUser = async (dataPass) => {
  try {
    let getAccount = await db.accounts.findOne({
      where: {
        accountId: dataPass.id,
      },
    })
    let check = await bcrypt.compareSync(dataPass.currentPassword, getAccount.password);
    if (check) {
      let hashPassWord = await bcrypt.hashSync(dataPass.newPassword, salt);
      Object.assign(getAccount, {
        password: hashPassWord,
      });
      await getAccount.save();

      return ({
        code: 0,
        message: "Cập nhật mật khẩu thành công!"
      });
    } else {
      return ({
        code: 1,
        message: "Mật khẩu không đúng!"
      });
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

let handleUpdateAvatar = (dataImg) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dataImg.img);
      let getUser = await db.users.findOne({
        where: {
          userId: dataImg.id,
        },
      })

      Object.assign(getUser, {
        image: dataImg.img,
      });

      await getUser.save();

      resolve({
        code: 0,
        message: "Cập nhật ảnh thành công!"
      });
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  handleGetInfo: handleGetInfo,
  handleUpdateInfoUser: handleUpdateInfoUser,
  handleUpdatePassUser: handleUpdatePassUser,
  handleUpdateAvatar: handleUpdateAvatar,
  checkUserEmail: checkUserEmail
};
