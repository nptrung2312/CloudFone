import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs"; // Thư viện dùng để mã hóa pass cũng như so sánh pass
import { raw } from "body-parser";

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

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["id", "lastName", "firstName", "address", "phonenumber", "positionId", "email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Oke";
            // delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 1;
            userData.errMessage = "Mật khẩu không đúng!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Tài khoản không tồn tại!`;
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = `Email của bạn không có trong hệ thống!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetInfo = (infoUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        // attributes: ['id', 'firstName', 'lastName', 'positionId', 'roleId', 'email', 'phonenumber', 'address'],
        where: {
          id: infoUser.id,
        },
      });
      resolve({
        user: user.get({ plain: true }),
      });
    } catch (e) {
      reject(e);
    }
  });
}

let handleUpdateInfoUser = (inFoUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'positionId', 'roleId', 'email', 'phonenumber', 'address'],
        where: {
          id: inFoUser.id,
        },
      });

      if (user) {
        Object.assign(user, {
          firstName: inFoUser.firstName,
          lastName: inFoUser.lastName,
          positionId: inFoUser.position,
          roleId: inFoUser.company,
          email: inFoUser.email,
          phonenumber: inFoUser.phone,
          address: inFoUser.address,
        });

        await user.save();
        resolve({
          errCode: 0,
          message: "Cập nhật thông tin thành công!",
          user: user.get({ plain: true })
        });
      } else {
        resolve({
          errCode: 1,
          message: "Lỗi!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleUpdatePassUser = (dataPass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataUpdatePass = {};
      let getUser = await db.User.findOne({
        where: {
          id: dataPass.id,
        },
      })
      let check = await bcrypt.compareSync(dataPass.currentPassword, getUser.password);
      if (check) {
        let hashPassWord = await bcrypt.hashSync(dataPass.newPassword, salt);
        Object.assign(getUser, {
          password: hashPassWord,
        });

        await getUser.save();

        resolve({
          code: 0,
          message: "Cập nhật mật khẩu thành công!"
        });
      } else {
        resolve({
          code: 1,
          message: "Mật khẩu không đúng!"
        });
      }
    } catch (e) {
      reject(e);
    }
  })
}

let handleUpdateAvatar = (dataImg) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dataImg.img);
      let getUser = await db.User.findOne({
        where: {
          id: dataImg.id,
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
};
