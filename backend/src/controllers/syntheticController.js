import db from "../models/index"; // trong này đã import tất cả models
import syntheticService from "../services/syntheticService";

let handleAddNote = async (req, res) => {

    let statusAdd = await syntheticService.addNote(req.body);

    return res.status(200).json({
        errCode: statusAdd.errCode,
        message: statusAdd.errMessage,
        note: statusAdd.note ? statusAdd.note : {},
    });
};
let handleDeleteNote = async (req, res) => {
    let statusDelete = await syntheticService.deleteNote(req.body);

    return res.status(200).json({
        errCode: statusDelete.errCode,
        message: statusDelete.errMessage
    });
}

let handleGetNote = async (req, res) => {
    setTimeout(async () => {
        let listGet = await syntheticService.getNote(req.body);
        return res.status(200).json({
            errCode: listGet.errCode,
            message: listGet.errMessage,
            note: listGet.list ? listGet.list : {},
        });

    }, 1000);
};

module.exports = {
    handleAddNote: handleAddNote,
    handleDeleteNote: handleDeleteNote,
    handleGetNote: handleGetNote,
}