function Validation(values) {
    let error = {};
    // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (values.email === "") {
        error.email = "Email không được để trống!!!";
        // } else if (!email_pattern.test(values.email)) {
        //     error.email = "Email không đúng định dạng!!!";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Mật khẩu không được để trống!!!";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;
