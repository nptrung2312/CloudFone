import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";
const { works } = require('../models');

let handleServiceAddWork = async (infoWork) => {
  try {
    let userData = {};
    if (infoWork.startDate > infoWork.endDate) {
      return ({
        errCode: 2,
        errMessage: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc!!",
        work: infoWork,
      })
    }

    let work = await db.works.create({
      userId: infoWork.userId,
      workName: infoWork.nameItem,
      startDate: infoWork.startDate,
      endDate: infoWork.endDate,
      typeOf: infoWork.typeOf,
      workDetail: infoWork.desc
    });
    if (work) {
      userData.errCode = 0;
      userData.errMessage = "Oke";
      userData.work = infoWork;
    } else {
      userData.errCode = 1;
      userData.errMessage = "Lỗi khi thêm công việc!";
      userData.work = '';
    }

    return userData;

  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

let handleGetWorkUser = async (userId) => {
  try {
    let workData = {};
    if (userId && userId.id) {
      let workUser = await db.works.findAll({
        where: { userId: userId.id },
        order: [
          ['workId', 'DESC']
        ],
        raw: true,
      });

      if (workUser) {
        workData.errCode = 0;
        workData.errMessage = "Oke";
        workData.list = workUser;
      } else {
        workData.errCode = 2;
        workData.errMessage = "Không có dữ liệu!";
      }
    }
    return workData;
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

module.exports = {
  handleServiceAddWork: handleServiceAddWork,
  handleGetWorkUser: handleGetWorkUser
};
