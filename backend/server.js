const express = require('express');
	const cors = require('cors');
	const mysql = require('mysql');
	
	const app = express();
    app.use(cors());

	const db = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "test"
	});

	app.get("/student", async (req, res) =>{
		const sql = "SELECT * FROM users";
		await db.query(sql, (err, data) => {
			if(err) return res.json("ERROR");
            return res.json(data);
		})
	});

	app.listen(8081, ()=>{
		console.log("Listing...");
	});