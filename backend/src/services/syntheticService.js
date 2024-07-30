import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";
const { notes } = require('../models');

let addNote = async (infoNote) => {
  try {
    let noteData = {};

    let note = await db.notes.create({
      userId: infoNote.userId,
      noteName: infoNote.nameItem,
      noteDate: infoNote.date,
      noteDetail: infoNote.detail
    });
    if (note) {
      noteData.errCode = 0;
      noteData.errMessage = "Oke";
      noteData.note = note;
    } else {
      noteData.errCode = 1;
      noteData.errMessage = "Lỗi khi thêm ghi chú mới!";
      noteData.note = '';
    }

    return noteData;

  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

let deleteNote = async (infoNote) => {
  try {
    let noteData = {};
    let note = await db.notes.findOne({
      where: { noteId: infoNote.id },
    });
    if (note) {
      note.destroy();
      noteData.errCode = 0;
      noteData.errMessage = "Xóa ghi chú thành công!";
    } else {
      noteData.errCode = 1;
      noteData.errMessage = "Lỗi khi xóa dữ liệu!";
      noteData.note = '';
    }

    return noteData;

  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

let getNote = async (userId) => {
  try {
    let noteData = {};
    if (userId && userId.id) {
      let list = await db.notes.findAll({
        where: { userId: userId.id },
        order: [
          ['noteId', 'DESC']
        ],
        raw: true,
      });

      if (list) {
        noteData.errCode = 0;
        noteData.errMessage = "Oke";
        noteData.list = list;
      } else {
        noteData.errCode = 2;
        noteData.errMessage = "Không có dữ liệu!";
      }
    }
    return noteData;
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

module.exports = {
  addNote: addNote,
  deleteNote: deleteNote,
  getNote: getNote
};
