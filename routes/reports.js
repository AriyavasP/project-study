const express = require("express");
const dbConnection = require("../lib/database");
const htmlToPdf = require("html-pdf-node");

const routes = express.Router();

var today = new Date();
var date = today.getFullYear() + "-" + (today.getMonth() - 1) + "-" + 1;

routes.get("/", (req, res) => {
  const ss = [session.userid];
  if (ss[0] == "admin") {
    dbConnection.query("SELECT id_employee FROM employee", (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render("./reports/reports-way", {
          Title: "Reports Way😊",
          data: result,
        });
      }
    });
  } else {
    res.redirect("/err");
  }
});

//  -->> Store PDF
routes.get("/store", (req, res) => {
  dbConnection.query(
    "SELECT id_item, name, quantity, type, id_employee, timecheck FROM store",
    (err, result) => {
      if (err) {
        res.render("./reports/report-store", { Title: "คลังสินค้า", data: "" });
        throw err;
      } else {
        res.render("./reports/report-store", {
          Title: "คลังสินค้า",
          data: result,
        });
      }
    }
  );
});

routes.post("/store", (req, res) => {
  let options = {
    format: "A4",
    margin: { top: 40, left: 10, right: 10, bottom: 20 },
  };
  let file = {
    url: "http://127.0.0.1:3000/reports/store",
    name: "store.pdf",
  };
  htmlToPdf.generatePdf(file, options).then((pdfBuffer) => {
    res
      .writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Displo": "attachment",
      })
      .end(pdfBuffer);
  });
});

// -->> Employee PDF
routes.get("/employee", (req, res) => {
  dbConnection.query(
    "SELECT id_employee, id_card, firstname, lastname, tel, gender, address, email, timecheck FROM employee",
    (err, result) => {
      if (err) {
        res.render("./reports/report-employee", {
          Title: "รายละเอียดพนักงาน",
          data: "",
        });
        throw err;
      } else {
        res.render("./reports/report-employee", {
          Title: "รายละเอียดพนักงาน",
          data: result,
        });
      }
    }
  );
});

routes.post("/employee", (req, res) => {
  let options = {
    format: "A4",
    margin: { top: 40, left: 10, right: 10, bottom: 20 },
  };
  let file = {
    url: "http://127.0.0.1:3000/reports/employee",
    name: "employees.pdf",
  };
  htmlToPdf.generatePdf(file, options).then((pdfBuffer) => {
    res
      .writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Displo": "attachment",
      })
      .end(pdfBuffer);
  });
});

// -->> Employee ADD STORE PDF
routes.get("/employee-add-store/(:id)", (req, res) => {
  const id = req.params.id;
  dbConnection.query(
    "SELECT * FROM employee INNER JOIN store ON employee.id_employee = store.id_employee WHERE store.id_employee = ?",
    [id],
    (err, result) => {
      if (err) {
        res.render("./reports/report-add-store", {
          Title: "รายงานรหัสพนักงานที่เพิ่มสินค้า",
          data: "",
        });
        throw err;
      } else {
        res.render("./reports/report-add-store", {
          Title: "รายงานรหัสพนักงานที่เพิ่มสินค้า",
          data: result,
          id: id,
        });
      }
    }
  );
});

routes.post("/employee-add-store", (req, res) => {
  id = req.body.id;
  let options = {
    format: "A4",
    margin: { top: 40, left: 10, right: 10, bottom: 20 },
  };
  let file = {
    url: "http://127.0.0.1:3000/reports/employee-add-store/" + id,
    name: "employees-add-store.pdf",
  };
  htmlToPdf.generatePdf(file, options).then((pdfBuffer) => {
    res
      .writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Displo": "attachment",
      })
      .end(pdfBuffer);
  });
});

// -->> Total PDF
routes.get("/income", (req, res) => {
  dbConnection.query(
    "SELECT * FROM income WHERE timecheck>=?",
    date,
    (err, result) => {
      if (err) {
        res.render("./incomes/income", { Title: "รายรับ", data: "" });
      } else {
        console.log(result);
        let data = [
          parseInt(today.getMonth() - 1),
          parseInt(today.getMonth()),
          parseInt(today.getMonth() + 1),
        ];
        let income0 = [];
        let income1 = [];
        let income2 = [];

        result.forEach((user) => {
          var year = user.timecheck.toLocaleString("default", {
            year: "numeric",
          });
          var month = user.timecheck.toLocaleString("default", {
            month: "2-digit",
          });
          var day = user.timecheck.toLocaleString("default", {
            day: "2-digit",
          });

          let formattedDate = parseInt(month);

          if (data[0] == formattedDate) {
            income0.push(user.income);
            console.log(income0);
          }
          if (data[1] == formattedDate) {
            income1.push(user.income);
            console.log(income1);
          }
          if (data[2] == formattedDate) {
            income2.push(user.income);
            console.log(income2);
          }
        });
        let sum0 = income2.reduce((pre, cur) => pre + cur);
        let sum1 = income1.reduce((pre, cur) => pre + cur);
        let sum2 = income0.reduce((pre, cur) => pre + cur);

        // console.log(data[0], data[1], data[2]);
        res.render("./reports/report-total", {
          Title: "รายรับ",
          sum0: sum0,
          sum1: sum1,
          sum2: sum2,
          data: result,
        });
      }
    }
  );
});

routes.post("/income", (req, res) => {
  let options = {
    format: "A4",
    margin: { top: 40, left: 10, right: 10, bottom: 20 },
  };
  let file = {
    url: "http://127.0.0.1:3000/reports/income",
    name: "income.pdf",
  };
  htmlToPdf.generatePdf(file, options).then((pdfBuffer) => {
    res
      .writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Displo": "attachment",
      })
      .end(pdfBuffer);
  });
});
exports.routes = routes;
