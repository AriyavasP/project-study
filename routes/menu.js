const path = require("path");
const express = require("express");
const dbConnection = require("../lib/database");
const multer = require("multer");
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

//หน้าเพิ่มเมนู
routes.get("/add-menu", (req, res, next) => {
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query(
      "SELECT menu_type_id, type_name FROM tmenu_type ",
      (err, result) => {
        if (err) {
          res.render("./menu/add-menu", { Title: "Error Add-Menu", data: "" });
        }
        dbConnection.query("SELECT name FROM store", (err, ingreRusult) => {
          if (err) {
            return console.log("error: " + err.message);
          } else {
            res.render("./menu/add-menu", {
              Title: "Add-Menu",
              data: result,
              ingreData: ingreRusult,
            });
            //console.log(result,ingreRusult)
          }
        });
      }
    );
  } else {
    res.redirect("/err");
  }
});
//กดเพิ่มเมนู + ลงDbase
routes.post("/add-menu", upload.single("image"), (req, res, next) => {
  let ingre_name_b_in = req.body.ingre_name;
  let ingre_number_b_in = req.body.ingre_number;

  const dbmenu_in = [
    req.body.menu_name,
    req.file.filename,
    req.body.menu_type,
    req.body.menu_price,
    ingre_name_b_in[0],
    ingre_number_b_in[0],
    ingre_name_b_in[1],
    ingre_number_b_in[1],
    ingre_name_b_in[2],
    ingre_number_b_in[2],
    ingre_name_b_in[3],
    ingre_number_b_in[3],
    ingre_name_b_in[4],
    ingre_number_b_in[4],
    ingre_name_b_in[5],
    ingre_number_b_in[5],
    ingre_name_b_in[6],
    ingre_number_b_in[6],
    ingre_name_b_in[7],
    ingre_number_b_in[7],
    ingre_name_b_in[8],
    ingre_number_b_in[8],
    ingre_name_b_in[9],
    ingre_number_b_in[9],
    ingre_name_b_in[10],
    ingre_number_b_in[10],
    ingre_name_b_in[11],
    ingre_number_b_in[11],
    ingre_name_b_in[12],
    ingre_number_b_in[12],
    ingre_name_b_in[13],
    ingre_number_b_in[13],
    ingre_name_b_in[14],
    ingre_number_b_in[14],
    ingre_name_b_in[15],
    ingre_number_b_in[15],
    ingre_name_b_in[16],
    ingre_number_b_in[16],
    ingre_name_b_in[17],
    ingre_number_b_in[17],
    ingre_name_b_in[18],
    ingre_number_b_in[18],
    ingre_name_b_in[19],
    ingre_number_b_in[19],
  ];

  //console.log(dbmenu_in)

  if (!req.file) {
    console.log("No file upload");
  } else {
    dbConnection.query(
      "INSERT INTO menu (menu_name, menu_image, menu_type_id, menu_price, ingre_1, v_ingre1, ingre_2, v_ingre2, ingre_3, v_ingre3, ingre_4, v_ingre4, ingre_5, v_ingre5, ingre_6, v_ingre6, ingre_7, v_ingre7, ingre_8, v_ingre8, ingre_9, v_ingre9, ingre_10, v_ingre10, ingre_11, v_ingre11, ingre_12, v_ingre12, ingre_13, v_ingre13, ingre_14, v_ingre14, ingre_15, v_ingre15, ingre_16, v_ingre16, ingre_17, v_ingre17, ingre_18, v_ingre18, ingre_19, v_ingre19, ingre_20, v_ingre20) VALUES (?)",
      [dbmenu_in],
      (err, result) => {
        if (err) throw err;
        // console.log("Success");
      }
    );
  }

  res.redirect("/menu/add-menu");
});

//หน้ารวมเมนู
routes.get("/menu-show", (req, res, next) => {
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query("SELECT * FROM menu", (err, result) => {
      if (err) {
        return console.log("error: " + err.message);
      } else {
        res.render("./menu/menu-show", {
          Title: "Edit-Menu",
          menushow: result,
        });
      }
    });
  } else {
    res.redirect("/err");
  }
});
//ลบเมนู
routes.get("/menu-show/delete/(:id)", upload.single("image"), (req, res) => {
  const ss = [session.userid];
  if (ss[0]) {
    let id = req.params.id;
    var img = "";
    //console.log(id)
    dbConnection.query(
      "SELECT menu_image FROM menu WHERE id_menu=?",
      [id],
      async (err, result) => {
        if (err) throw err;
        img = result[0].menu_image;
        console.log(img);
        if (img.length > 0) {
          await unlinkAsync("./views/images/" + img);
        }
      }
    );

    dbConnection.query(
      "DELETE FROM menu WHERE id_menu=?",
      [id],
      (err, result) => {
        if (err) throw err;
        // console.log("DELETE complet");
      }
    );

    res.redirect("/menu/menu-show");
  } else {
    res.redirect("/err");
  }
});

//แก้ราคาเมนู
routes.post("/menu-show", (req, res, next) => {
  let id = req.body.getid;
  const newprice = req.body.edit_price;
  dbConnection.query(
    "UPDATE menu SET menu_price=? WHERE id_menu=?",
    [newprice, id],
    (err, result) => {
      if (err) throw err;
      //console.log("update complet");
    }
  );
  res.redirect("/menu/menu-show");
});
//หน้ารวมโต๊ะ
routes.get("/table-show", (req, res, next) => {
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query("SELECT * FROM tables", (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render("./menu/table-show", {
          Title: "Show-Table",
          data: result,
        });
      }
      //console.log(result)
    });
  } else {
    res.redirect("/err");
  }
});
//ตั้ง status โต๊ะ in
routes.get("/table-show/updatestatusin/(:id)", (req, res, next) => {
  const id = req.params.id;
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query(
      "UPDATE tables SET table_status='in' WHERE table_id=?",
      [id],
      (err, result) => {
        if (err) throw err;
      }
    );
    dbConnection.query(
      "UPDATE dining_table SET status='in' WHERE id_table=?",
      [id],
      (err) => {
        if (err) throw err;
      }
    );
    res.redirect("/menu/table-show");
  } else {
    res.redirect("/err");
  }
});
//ตั้ง status โต๊ะ out + เอาลง income
routes.get("/table-show/updatestatusout/(:id)", (req, res, next) => {
  const id = req.params.id;
  const ss = [session.userid];
  if (ss[0]) {
    dbConnection.query(
      "SELECT * FROM tables WHERE table_id=?",
      [id],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          //ลง income
          let inc;
          if (result[0].table_total_price) {
            inc = result[0].table_total_price;
          } else {
            inc = 0;
          }
          const d_b_in = [inc, today, id, result[0].table_item];
          console.log(d_b_in);
          dbConnection.query(
            "INSERT INTO income (income, timecheck, table_id, income_item) VALUES (?)",
            [d_b_in],
            (err, result) => {
              if (err) throw err;
            }
          );
        }
      }
    );
    //out
    dbConnection.query(
      "UPDATE tables SET table_status='out' WHERE table_id=?",
      [id],
      (err, result) => {
        if (err) throw err;
      }
    );
    //ล้างของในโต๊ะ
    dbConnection.query(
      "UPDATE tables SET ? WHERE table_id=?",
      [
        {
          table_item: "",
          table_total_price: "",
          table_status: "out",
          table_time: "",
        },
        id,
      ],
      (err, result) => {
        if (err) throw err;
      }
    );
    dbConnection.query(
      "UPDATE dining_table SET status='out' WHERE id_table=?",
      [id],
      (err) => {
        if (err) throw err;
      }
    );
    res.redirect("/menu/table-show");
  } else {
    res.redirect("/err");
  }
});

exports.routes = routes;
