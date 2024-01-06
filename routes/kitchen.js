const express = require("express");
const dbConnection = require("../lib/database");
const controllers = require("../controllers/controllers");

const routes = express.Router();

routes.get("/", (req, res) => {
  const ss = [session.userid];
  if (ss[0]) {
    controllers.insertorderlist();
    dbConnection.query("SELECT * FROM list_order", (err, result) => {
      if (err) {
        throw err;
      } else {
        controllers.restore_table();
        result.forEach((user) => {
          user.raw_material = user.raw_material.split(" ");
        });
        res.render("./kitchen/ckitchen", {
          Title: "Order",
          data: result,
        });
      }
    });
  } else {
    res.redirect("/err");
  }
});

routes.get("/chuck/(:id)", (req, res) => {
  const ss = [session.userid];
  if (ss[0]) {
    const id = req.params.id;
    dbConnection.query(
      "SELECT name, status FROM list_order WHERE id_order=?",
      [id],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result[0].status == "OUTSTOCK") {
            res.render("./kitchen/alert-popup", { name: result[0].name });
            console.log(result[0].status);
            console.log("FIND FAIL");
          } else {
            res.redirect("/kitchen");
            console.log(result.length);
            console.log(result[0].status);
          }
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.post("/clearALERT", (req, res) => {
  dbConnection.query(
    "UPDATE list_order SET status = 'F' WHERE status='OUTSTOCK'",
    async (err) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/kitchen");
      }
    }
  );
});

routes.get("/update-S/(:id)", async (req, res) => {
  const id = req.params.id;
  const mss = true;
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query(
      "UPDATE list_order SET status = 'P' WHERE id_order = ?",
      [id],
      async (err) => {
        if (err) {
          throw err;
        } else {
          controllers.auto_stock(mss); // Midleware
          await controllers.resolveAfter2Seconds();
          res.redirect("/kitchen/chuck/" + id);
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

routes.get("/update-F/(:id)", async (req, res) => {
  const id = req.params.id;
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query(
      "UPDATE list_order SET status = 'F' WHERE id_order = ?",
      [id],
      async (err) => {
        if (err) {
          throw err;
        } else {
          controllers.restore_table();
          await controllers.resolveAfter2Seconds();
          res.redirect("/kitchen");
        }
      }
    );
  } else {
    res.redirect("/err");
  }
});

exports.routes = routes;
