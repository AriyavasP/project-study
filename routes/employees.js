const path = require("path");
const express = require("express");
const multer = require("multer");
const dbConnection = require("../lib/database");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const routes = express.Router();

var today = new Date();

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./views/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

routes.get("/add-employees", (req, res) => {
  const ss = [session.userid];
  if (ss[0] == "admin") {
    res.render("./employee/employees", { Title: "Add-Employees" });
  } else {
    res.redirect("/err");
  }
});

routes.post("/add-employees/submit", upload.single("image"), (req, res) => {
  const values = [
    req.body.id,
    req.body.firstname,
    req.body.lastname,
    req.body.number,
    req.body.gender,
    req.body.address,
    req.body.email,
    req.file.filename,
    today,
  ];

  if (!req.file) {
    console.log("No file upload");
  } else {
    console.log(req.file.filename);
    dbConnection.query(
      "INSERT INTO employee (id_card, firstname, lastname, tel, gender, address, email, img, timecheck) VALUES (?)",
      [values],
      (err, result) => {
        if (err) throw err;
        console.log("Suscess");
      }
    );
  }

  res.redirect("/employee");
});

routes.get("/", (req, res) => {
  const ss = [session.userid];
  if (ss[0] == "admin") {
    dbConnection.query(
      "SELECT id_employee, status_employee, firstname, lastname, tel, gender, address, email, img, password_employee FROM employee",
      (err, result) => {
        if (err) {
          res.render("./employee/Cemployees", { Title: "Employee", data: "" });
        } else {
          res.render("./employee/Cemployees", {
            Title: "Employee",
            data: result,
          });
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.get("/view/(:id)", (req, res) => {
  const ss = [session.userid];
  if (ss[0] == "admin") {
    let id = req.params.id;
    dbConnection.query(
      "SELECT id_card, firstname, lastname, tel, gender, address, email FROM employee WHERE id_employee=?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.render("./employee/views", {
          Title: "View",
          id: id,
          id_card: result[0].id_card,
          firstname: result[0].firstname,
          lastname: result[0].lastname,
          number: result[0].tel,
          gender: result[0].gender,
          address: result[0].address,
          email: result[0].email,
        });
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.post("/add-employees/update", (req, res) => {
  let id = req.body.id;
  const id_card = req.body.id_card;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const number = req.body.number;
  const gender = req.body.gender;
  const address = req.body.address;
  const email = req.body.email;
  console.log(id);
  dbConnection.query(
    "UPDATE employee SET id_card=?, firstname=?, lastname=?, tel=?, gender=?, address=?, email=? WHERE id_employee=?",
    [id_card, firstname, lastname, number, gender, address, email, id],
    (err, result) => {
      if (err) throw err;
      console.log("Success");
    }
  );
  res.redirect("/employee");
});

routes.get("/view/delete/(:id)", upload.single("image"), (req, res) => {
  var img = "";
  const ss = [session.userid];
  if (ss[0] == "admin") {
    let id = req.params.id;
    dbConnection.query(
      "SELECT img FROM employee WHERE id_employee = ?",
      [id],
      async (err, result) => {
        if (err) throw err;
        img = result[0].img;
        console.log(img);
        if (img.length > 0) {
          await unlinkAsync("./views/images/" + img);
        }
      }
    );
    dbConnection.query(
      "DELETE FROM employee WHERE id_employee=?",
      [id],
      (err, result) => {
        if (err) throw err;
        console.log("DELETE complet");
      }
    );
    res.redirect("/employee");
  } else {
    res.redirect("/err");
  }
});

routes.get("/view/create/(:id)", (req, res) => {
  const ss = [session.userid];
  if (ss[0] == "admin") {
    let id = req.params.id;
    dbConnection.query(
      "SELECT id_employee FROM employee WHERE id_employee=?",
      [id],
      (err, result) => {
        if (result.length <= 0) {
          res.render("./employee/account", {
            Title: "create accout",
            id: id,
            ms_pass: true,
          });
        } else {
          res.render("./employee/account", {
            Title: "create accout",
            id: id,
            ms_pass: true,
          });
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.post("/view/create/submit/(:id)", (req, res) => {
  let id = req.params.id;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  if (password.length > 0) {
    if (password == confirmpassword) {
      bcrypt.hash(password, 10, (err, hash) => {
        dbConnection.query(
          "UPDATE employee SET password_employee=? WHERE id_employee=?",
          [hash, id],
          (err, result) => {
            if (err) {
              res.render("./employee/account", {
                Title: "Wong ID or PASS",
                id: id,
                ms_pass: false,
              });
            } else {
              res.redirect("/employee");
            }
          }
        );
      });
    } else {
      res.render("./employee/account", {
        Title: "Wong ID or PASS",
        id: id,
        ms_pass: false,
      });
    }
  } else {
    dbConnection.query(
      "UPDATE employee SET password_employee=? WHERE id_employee=?",
      [null, id],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.redirect("/employee");
        }
      }
    );
  }
});

routes.post("/update/status/(:id)", (req, res) => {
  const id = req.params.id;
  dbConnection.query(
    "SELECT status_employee FROM employee WHERE id_employee = ?",
    [id],
    (err_1, result_1) => {
      if (err_1) {
        throw err_1;
      }
      console.log("Success Status: " + result_1[0].status_employee + id);
      if (result_1[0].status_employee == "employee") {
        dbConnection.query(
          "UPDATE employee SET status_employee = 'admin' WHERE id_employee = ?",
          [id],
          (err_2) => {
            res.redirect("/employee");
          }
        );
      } else {
        dbConnection.query(
          "UPDATE employee SET status_employee = 'employee' WHERE id_employee = ?",
          [id],
          (err_2) => {
            res.redirect("/employee");
          }
        );
      }
    }
  );
});

routes.get("/update/img/(:id)", (req, res) => {
  const ss = [session.userid];
  if (ss[0] == "admin") {
    const id = req.params.id;
    res.render("./employee/updateimg", { Title: "Update img", id: id });
  } else {
    res.redirect("/err");
  }
});

routes.post("/update/img/(:id)", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const img = req.file.filename;

  dbConnection.query(
    "SELECT img FROM employee WHERE id_employee=?",
    [id],
    async (err, result) => {
      if (err) {
        throw err;
      } else {
        await unlinkAsync("./views/images/" + result[0].img);
        dbConnection.query(
          "UPDATE employee SET img=? WHERE id_employee=?",
          [img, id],
          (err) => {
            if (err) {
              throw err;
            } else {
              res.redirect("/employee");
            }
          }
        );
      }
    }
  );
});

exports.routes = routes;
