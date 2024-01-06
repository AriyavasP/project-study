const express = require("express");
const dbConnection = require("../lib/database");

const routes = express.Router();
//หน้าใส่ชื่อเบอร์
routes.get("/getqueue", (req, res, next) => {
  res.render("./queue/get-queue", { Title: "เข้าคิว" });
});
//รับ ลง db
routes.post("/getqueue", (req, res, next) => {
  cusdata = [req.body.cusname, req.body.custel, req.body.cuspeople];

  dbConnection.query(
    "INSERT INTO queue (cus_name, cus_tel, cus_sum_people) VALUE (?)",
    [cusdata],
    (err, result) => {
      if (err) throw err;
    }
  );
  res.redirect("/queue/wait-queue");
});
//หน้าดูคิวลูกค้า
routes.get("/wait-queue", (req, res, next) => {
  dbConnection.query("SELECT * FROM queue", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.render("./queue/wait-queue", {
        Title: "Queue - Waiting",
        data: result,
      });
    }
  });
});

//หน้าจัดการคิว #พนักงาน
routes.get("/queue-mng", (req, res, next) => {
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query("SELECT * FROM queue", (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render("./queue/queue-mng", {
          Title: "Queue Management",
          data: result,
          Vstart: 0,
        });
      }
    });
  } else {
    res.redirect("/err");
  }
});
//ลบคิว
routes.get("/queue-mng/delete/(:id)", (req, res, next) => {
  const ss = [session.userid];
  if (ss[0]) {
    id = req.params.id;
    dbConnection.query(
      "DELETE FROM queue WHERE queue_id=?",
      [id],
      (err, result) => {
        if (err) throw err;
      }
    );
    res.redirect("/queue/queue-mng");
  } else {
    res.redirect("/err");
  }
});

exports.routes = routes;
