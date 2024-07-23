import db from "../models/index"; // trong này đã import tất cả models
import workService from "../services/workService";

let handleAddWork = async (req, res) => {

    let statusAddWork = await workService.handleServiceAddWork(req.body);

    return res.status(200).json({
        errCode: statusAddWork.errCode,
        message: statusAddWork.errMessage,
        work: statusAddWork.work ? statusAddWork.work : {},
    });
};

let handleGetWork = async (req, res) => {
    setTimeout(async () => {
        let listWork = await workService.handleGetWorkUser(req.body);
        return res.status(200).json({
            message: listWork.errMessage ? listWork.errMessage : {},
            work: listWork.list ? listWork.list : {},
        });

    }, 1000);
};

module.exports = {
    handleAddWork: handleAddWork,
    handleGetWork: handleGetWork,
}