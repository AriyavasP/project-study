const express = require("express");
const dbConnection = require("../lib/database");

var today = new Date();

const routes = express.Router();
//สั่ง
routes.get("/table/(:id)", (req, res, next) => {
  const id = req.params.id;
  dbConnection.query(
    "SELECT * FROM cart WHERE table_number=?",
    [id],
    (err, cartshowIcon) => {
      if (err) {
        return console.log("error: " + err.message);
      }
      dbConnection.query("SELECT * FROM menu", (err, result) => {
        //console.log(result)
        if (err) {
          res.render("./order/table", { Title: "Error Table" });
        }
        dbConnection.query(
          "SELECT menu_type_id, type_name FROM tmenu_type ",
          (err, ingreType) => {
            if (err) {
              return console.log("error: " + err.message);
            } else {
              res.render("./order/table", {
                Title: "Table",
                data: result,
                ingre_type: ingreType,
                table_id: id,
                cartIcon: cartshowIcon,
              });
              //console.log(result)
            }
          }
        );
      });
    }
  );
});

//สั่งลง db ตะกร้า
routes.post("/table/(:id)", (req, res, next) => {
  const id = req.params.id;
  const cart_order_name = req.body.menu_oreder_name;
  const cart_in = [
    req.body.table_id,
    req.body.menu_oreder_name,
    req.body.menu_oreder_price,
  ];
  dbConnection.query(
    "INSERT INTO cart (table_number, menu_name, menu_price) VALUES (?)",
    [cart_in],
    (err, result) => {
      if (err) throw err;
      //console.log("Success");
      res.redirect("/order/table/" + id);
    }
  );
});
//หน้าตะกร้า
routes.get("/carts/(:id)", (req, res, next) => {
  const id = req.params.id;
  dbConnection.query(
    "SELECT SUM(menu_price) FROM cart WHERE table_number=?",
    [id],
    (err, TotalSum) => {
      if (err) {
        return console.log("error: " + err.message);
      }

      dbConnection.query(
        "SELECT * FROM cart LEFT JOIN menu ON cart.menu_name = menu.menu_name WHERE table_number=?",
        [id],
        (err, result) => {
          if (err) {
            res.render("./order/carts", { Title: "Error Cart" });
          } else {
            var a = 0;
            result.forEach((e) => {
              a += e.totalEach;
            });
            res.render("./order/carts", {
              Title: "My Cart",
              data: result,
              id: id,
              totalSummary: a,
            });
          }
        }
      );
      //console.log(TotalSum)
    }
  );
});
//ลบอาหารในตะกร้า
routes.get("/carts/delete/(:id)", (req, res, next) => {
  const id = req.params.id;
  //console.log(id)
  dbConnection.query(
    "SELECT * FROM cart WHERE cart_id=?",
    [id],
    (err, result) => {
      if (err) {
        return console.log("error: " + err.message);
      } else {
        const cid = result[0].table_number;
        res.redirect(`/order/carts/${cid}`);
        dbConnection.query(
          "DELETE FROM cart WHERE cart_id=?",
          [id],
          (err, eresult) => {
            if (err) throw err;
            //console.log("DELETE complet");
          }
        );
      }
    }
  );
});
//อับเดตจำนวนอาหารเพิ่ม
routes.get("/carts/update/(:id)", (req, res, next) => {
  const id = req.params.id;
  //console.log(id)
  dbConnection.query(
    "SELECT * FROM cart WHERE cart_id=?",
    [id],
    (err, result) => {
      if (err) {
        return console.log("error: " + err.message);
      } else {
        const cid = result[0].table_number;
        res.redirect(`/order/carts/${cid}`);
        dbConnection.query(
          "UPDATE cart SET qty = qty + 1 WHERE cart_id=?",
          [id],
          (err, eresult) => {
            if (err) throw err;
            //console.log("DELETE complet");
          }
        );
      }
    }
  );
});
//อับเดตจำนวนอาหารลง
routes.get("/carts/updateMinuse/(:id)", (req, res, next) => {
  const id = req.params.id;
  //console.log(id)
  dbConnection.query(
    "SELECT * FROM cart WHERE cart_id=?",
    [id],
    (err, result) => {
      if (err) {
        return console.log("error: " + err.message);
      } else {
        const cid = result[0].table_number;
        res.redirect(`/order/carts/${cid}`);
        dbConnection.query(
          "UPDATE cart SET qty = qty - 1 WHERE cart_id=?",
          [id],
          (err, eresult) => {
            if (err) throw err;
            //console.log("DELETE complet");
          }
        );
      }
    }
  );
});
//กดสั่ง checkout
routes.post("/carts/(:id)/checkout", (req, res, next) => {
  const summary = parseInt(req.body.order_in_sum);
  const id = req.params.id;
  dbConnection.query(
    "SELECT * FROM cart WHERE table_number=?",
    [id],
    (err, result) => {
      if (err) {
        return console.log("error: " + err.message);
      }
      const order_b = [];
      order_b.push(id);
      order_b.push(summary);
      order_b.push(today);

      var a = "";
      for (var i = 0; i < result.length; i++) {
        a += result[i].qty + " " + result[i].menu_name + " ";
      }

      order_b.push(a);
      //console.log(order_b)

      //ลง orders
      dbConnection.query(
        "INSERT INTO orders (table_number, order_sum_price, order_in_time , order_item) VALUES (?)",
        [order_b],
        (err, result) => {
          if (err) throw err;
        }
      );
      //select ก่อน if table_item มี=> รวมของเก่า=> อับเดต //ไม่มี=> อับเดตเลข
      //UPDATE เพิ่มของเข้าโต๊ะ
      dbConnection.query(
        "SELECT * FROM tables WHERE table_id=?",
        [id],
        (err, beupResult) => {
          if (err) {
            throw err;
          } else {
            if (beupResult[0].table_item == "") {
              dbConnection.query(
                "UPDATE tables SET ? WHERE table_id = ?",
                [
                  {
                    table_item: a,
                    table_total_price: summary,
                    table_status: "in",
                    table_time: today,
                  },
                  id,
                ],
                (err, result) => {
                  if (err) throw err;
                }
              );
            } else {
              beupResult[0].table_item = beupResult[0].table_item + " " + a;
              beupResult[0].table_total_price =
                beupResult[0].table_total_price + summary;
              dbConnection.query(
                "UPDATE tables SET ? WHERE table_id = ?",
                [
                  {
                    table_item: beupResult[0].table_item,
                    table_total_price: beupResult[0].table_total_price,
                  },
                  id,
                ],
                (err, result) => {
                  if (err) throw err;
                }
              );
            }
          }
        }
      );
      //
      dbConnection.query(
        "UPDATE dining_table SET status='in' WHERE id_table=?",
        [id],
        (err) => {
          if (err) throw err;
        }
      );
      //ลบของจากตะกร้า
      dbConnection.query(
        "DELETE FROM cart WHERE table_number=?",
        [id],
        (err, result) => {
          if (err) throw err;
        }
      );
    }
  );
  res.redirect("/order/successfulythnakyou");
});
//หน้าสั่งเสร็จ
routes.get("/successfulythnakyou", (req, res, next) => {
  res.render("./order/ordersuccess", {
    Title: "success",
  });
});

exports.routes = routes;
