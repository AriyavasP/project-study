const express = require("express");
const dbConnection = require("../lib/database");

const routes = express.Router();

var today = new Date();
var date = today.getFullYear() + "-" + (today.getMonth() - 1) + "-" + 1;

routes.get("/", (req, res) => {
  const ss = [session.userid];
  if (ss[0] == "admin") {
    dbConnection.query(
      "SELECT * FROM income WHERE timecheck>=?",
      date,
      (err, result) => {
        if (err) {
          res.render("./incomes/income", { Title: "Income", data: "" });
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
          res.render("./incomes/income", {
            Title: "Income",
            sum0: sum0,
            sum1: sum1,
            sum2: sum2,
            data: result,
          });
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

exports.routes = routes;
