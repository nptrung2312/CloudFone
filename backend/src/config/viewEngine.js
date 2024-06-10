import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); //đường link static, khi muốn lấy ảnh thì phải lấy trong src/public
    app.set("view engine", "ejs");
    app.set("views", "./src/views"); //set đường link sẽ lấy view engine
}

module.exports = configViewEngine;