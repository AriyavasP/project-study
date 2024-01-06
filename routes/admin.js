const express = require("express");
const dbConnection = require("../lib/database");

const routes = express.Router();

var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

routes.get("/add-item", (req, res) => {
  console.log(session.employeeid);
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query(
      "SELECT name,quantity,type FROM store WHERE timecheck>=? and timecheck<=?",
      [
        date,
        today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          (today.getDate() + 1),
      ],
      (err, result) => {
        if (err) {
          res.render("./Store/Store", { Title: "Add-Item", data: "" });
        } else {
          res.render("./Store/Store", { Title: "Add-Item", data: result });
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.post("/add-item/submit", (req, res, next) => {
  const values = [
    req.body.name,
    req.body.quantity,
    req.body.type,
    session.employeeid,
    today,
  ];
  dbConnection.query(
    "INSERT INTO store ( name, quantity, type, id_employee, timecheck) VALUES (?)",
    [values],
    (err, result) => {
      if (err) throw err;
      console.log("Success");
    }
  );

  res.redirect("/admin/add-item");
});

routes.get("/store", (req, res) => {
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query(
      "SELECT id_item, name, type, quantity FROM store",
      (err, result) => {
        if (err) {
          res.render("./Store/Cstore", {
            data: "",
            Title: "Store",
            search: "",
          });
        } else {
          res.render("./Store/Cstore", {
            data: result,
            Title: "Store",
            search: "",
          });
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.get("/store/edit/(:id)", (req, res, next) => {
  const ss = [session.userid];
  if (ss[0]) {
    let id = req.params.id;

    dbConnection.query(
      "SELECT name,quantity FROM store WHERE id_item=?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.render("./Store/edit", {
          Title: "Editing",
          id: id,
          name: result[0].name,
          quantity: result[0].quantity,
        });
        console.log(result);
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.post("/store/update", (req, res) => {
  const name = req.body.name;
  const amount = req.body.quantity;
  let id = req.body.id;
  dbConnection.query(
    "SELECT * FROM store WHERE id_item=?",
    [id],
    (err, result_1) => {
      if (err) throw err;
      let countamount = parseInt(result_1[0].quantity) + parseInt(amount);
      console.log(countamount);
      dbConnection.query(
        "UPDATE store SET name=?,quantity=?,timecheck=? WHERE id_item=?",
        [name, countamount, today, id],
        (err) => {
          if (err) throw err;
          console.log("Success");
        }
      );
    }
  );

  res.redirect("/admin/store");
});

routes.get("/store/delete/(:id)", (req, res) => {
  const ss = [session.userid];
  if (ss[0]) {
    let id = req.params.id;

    dbConnection.query(
      "DELETE FROM store WHERE id_item=?",
      [id],
      (err, result) => {
        if (err) throw err;
        console.log("DELETE Success");
      }
    );

    res.redirect("/admin/store");
  } else {
    res.redirect("/err");
  }
});

routes.post("/search", (req, res) => {
  const filters = req.body.filter;
  if (filters == "ทั้งหมด") {
    res.redirect("/admin/store");
  } else {
    dbConnection.query(
      "SELECT id_item, name, type, quantity FROM store WHERE type=?",
      [filters],
      (err, result) => {
        if (err) {
          res.render("./Store/Cstore", {
            Title: "Store",
            data: "",
            search: "",
          });
        } else {
          res.render("./Store/Cstore", {
            Title: "Store",
            data: result,
            search: filters,
          });
        }
      }
    );
  }
});

exports.routes = routes;
