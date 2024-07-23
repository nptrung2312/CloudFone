import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";
const { users, partners } = require('../models');
import userService from "./userService";

let handleServiceAddCustomer = async (infoCustomer) => {
  try {
    let userData = {};
    let isExistEmail = await userService.checkUserEmail(infoCustomer.email);
    if (isExistEmail) {
      return ({
        errCode: 2,
        errMessage: "Email này đã được sử dụng!!!",
        customer: infoCustomer,
      })
    }
    let customer = await db.users.create({
      lastName: infoCustomer.nameItem,
      email: infoCustomer.email,
      phone: infoCustomer.phone,
      address: infoCustomer.address,
      type: 2
    });
    if (customer) {
      let partner = await db.partners.create({
        businessId1: infoCustomer.userId,
        businessId2: customer.userId,
      });
      if (partner) {
        userData.errCode = 0;
        userData.errMessage = "Oke";
        userData.customer = { customer, partner };
      } else {
        userData.errCode = 1;
        userData.errMessage = "Lỗi khi thêm đối tác!";
        userData.customer = '';
      }
    } else {
      userData.errCode = 1;
      userData.errMessage = "Lỗi khi thêm khách hàng!";
      userData.customer = '';
    }

    return userData;

  } catch (e) {
    console.log(e);
  }
}

let handleServiceGetCustomer = async (userId) => {
  try {
    let customerData = {};
    let listCustomer = await db.partners.findAll({
      where: { businessId1: userId.id },
      order: [
        ['partnerId', 'DESC']
      ],
      attributes: ["partnerId", "businessId1", "businessId2"],
      raw: true,
    });

    if (listCustomer) {

      const listDataPromises = listCustomer.map(async (customer) => {
        let listInfo = await db.users.findOne({
          where: { userId: customer.businessId2 },
          order: [
            ['userId', 'DESC']
          ],
          raw: true,
        });
        return listInfo;
      });

      const listData = await Promise.all(listDataPromises);
      customerData.errCode = 0;
      customerData.errMessage = "Oke";
      customerData.list = listData;
    } else {
      customerData.errCode = 2;
      customerData.errMessage = "Không có dữ liệu!";
    }
    return customerData;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  handleServiceAddCustomer: handleServiceAddCustomer,
  handleServiceGetCustomer: handleServiceGetCustomer
};
