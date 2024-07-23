import customerService from "../services/customerService";

let handleAddCustomer = async (req, res) => {

    let dataCustomer = await customerService.handleServiceAddCustomer(req.body);

    return res.status(200).json({
        errCode: dataCustomer.errCode,
        message: dataCustomer.errMessage,
        customer: dataCustomer.customer ? dataCustomer.customer : {},
    });
};

let handleGetCustommer = async (req, res) => {
    setTimeout(async () => {
        let listCustomer = await customerService.handleServiceGetCustomer(req.body);
        return res.status(200).json({
            errCode: listCustomer.errCode,
            message: listCustomer.errMessage,
            customer: listCustomer.list ? listCustomer.list : {},
        });

    }, 1000);
};

module.exports = {
    handleAddCustomer: handleAddCustomer,
    handleGetCustommer: handleGetCustommer,
}