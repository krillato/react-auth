const express = require("express");
const app = express();
//const mysql = require("mysql");
const mysql = require("mysql2");
const cors = require("cors");
//Test ใน postman
var bodyParser = require("body-parser"); // ใช้ฝั่ง api ลงไปใน body
var jsonParser = bodyParser.json();
//token
var jwt = require("jsonwebtoken");
const secert = "TeeTime"; //รหัสลับ

// hash
const bcrypt = require("bcrypt");
const saltRounds = 10; 

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "react_data",
});

//ใช้ Postman ตรวจสอบ API http://localhost:3001/register
app.post("/register", jsonParser, function (req, res, next) { 
  // req ต้องการ , res ตอบกลับ
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    db.execute(
      "INSERT INTO employee (fname, lname, email, password, career, salary) VALUES (?,?,?,?,?,?)",
      [
        req.body.fname,
        req.body.lname,
        req.body.email,
        hash,
        req.body.career,
        req.body.salary,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});

app.post("/login", jsonParser, function (req, res, next) {
  db.execute(
    "SELECT * FROM employee WHERE email=?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length == 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      }
      //ตรวจสอบ pass
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          // result == true
          if (isLogin) {
            //สร้าง token ในการ login และกำหนดอายุ
            var token = jwt.sign({ email: users[0].email }, secert, { expiresIn: '1h' }); //
            res.json({ status: "ok", message: "login sucess", token });

          } else {
            res.json({ status: "error", message: "login failed" });
          }
        }
      );
    }
  );
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; //ตัดช่องว่างใน token ออก
    var decoded = jwt.verify(token, secert); // เอาอีเมลมาใช้ และวันเวลาหมดอายุ
    res.json({status: 'ok', decoded})
    //res.json({decoded})
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
  
})

app.get("/employee", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const career = req.body.career;
  const salary = req.body.salary;

  db.query(
    "INSERT INTO employee (name, email, password, career, salary) VALUES(?,?,?,?,?)",
    [name, email, password, career, salary],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Value insert Success");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const salary = req.body.salary;

  db.query(
    "UPDATE employee SET salary = ? WHERE employee_id = ?",
    [salary, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employee WHERE employee_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen("3001", () => {
  console.log("Sever is Running on port 3001");
});

app.post("/AddOrder", (req, res) => {
  const name = req.body.nameorder;
  const email = req.body.email;
  const amount = req.body.amount;

  db.query(
    "INSERT INTO `orders_income` (order_name, order_amount, email) VALUES(?,?,?)",
    [name, amount, email],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Value insert Success");
      }
    }
  );
});
