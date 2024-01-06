const dbConnection = require("../lib/database");

exports.insertorderlist = () => {
  let ordername = [];
  let orderamount = [];
  let ingre = [];
  let id_table;
  dbConnection.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      throw err;
    } else {
      result.forEach((user) => {
        id_table = user.table_number;
        console.log(id_table);
        user.order_item = user.order_item.split(" ");
        console.log(user.order_item);
        for (let i = 0; i < user.order_item.length; i++) {
          if (i % 2) {
            ordername.push(user.order_item[i]);
            console.log(ordername);
          } else {
            if (user.order_item[i].length > 0) {
              console.log(user.order_item[i].length);
              orderamount.push(user.order_item[i]);
              console.log(orderamount);
            }
          }
        }
      });
      for (let i = 0; i < ordername.length; i++) {
        dbConnection.query(
          "SELECT menu_price ,ingre_1, ingre_2, ingre_3, ingre_4, ingre_5, ingre_6, ingre_7, ingre_8, ingre_9, ingre_10, ingre_11, ingre_12, ingre_13, ingre_14, ingre_15, ingre_16, ingre_17, ingre_18, ingre_19, ingre_20 FROM menu WHERE menu_name=?",
          [ordername[i]],
          (err, result) => {
            if (err) {
              throw err;
            } else {
              ingre.price = result[0].menu_price;
              ingre.raw_marterial = result[0].ingre_1.concat(
                " ",
                result[0].ingre_2,
                " ",
                result[0].ingre_3,
                " ",
                result[0].ingre_4,
                " ",
                result[0].ingre_5,
                " ",
                result[0].ingre_6,
                " ",
                result[0].ingre_7,
                " ",
                result[0].ingre_8,
                " ",
                result[0].ingre_9,
                " ",
                result[0].ingre_10,
                " ",
                result[0].ingre_11,
                " ",
                result[0].ingre_12,
                " ",
                result[0].ingre_13,
                " ",
                result[0].ingre_14,
                " ",
                result[0].ingre_15,
                " ",
                result[0].ingre_16,
                " ",
                result[0].ingre_17,
                " ",
                result[0].ingre_18,
                " ",
                result[0].ingre_19,
                " ",
                result[0].ingre_20
              );
              console.log(ingre.price);
              console.log(ingre.raw_marterial);
              console.log(orderamount[i]);
              dbConnection.query(
                "INSERT INTO list_order (table_id, name, amount, price, raw_material) VALUES (?,?,?,?,?)",
                [
                  id_table,
                  ordername[i],
                  orderamount[i],
                  ingre.price,
                  ingre.raw_marterial,
                ],
                (err) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log("Success");
                    dbConnection.query("DELETE FROM orders", (err, result) => {
                      if (err) throw err;
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
};

exports.auto_stock = async (mss) => {
  let cut_stock = [];
  let name_stock = [];
  let ingre_v = [];
  console.log(mss);
  dbConnection.query(
    "SELECT id_order ,name, amount, raw_material FROM list_order WHERE status='P'",
    async (err, result) => {
      if (err) {
        throw err;
      } else {
        for (let i = 0; i < result.length; i++) {
          cut_stock[i] = await result[i].raw_material.split(" ");
          name_stock[i] = await result[i].name;
        }
        for (let i = 0; i < name_stock.length; i++) {
          mss = true;
          dbConnection.query(
            "SELECT v_ingre1, v_ingre2, v_ingre3, v_ingre4, v_ingre5, v_ingre6, v_ingre7, v_ingre8, v_ingre9, v_ingre10, v_ingre11, v_ingre12, v_ingre13, v_ingre14, v_ingre15, v_ingre16, v_ingre17, v_ingre18, v_ingre19, v_ingre20 FROM menu WHERE menu_name = ?",
            [name_stock[i]],
            async (err, result_1) => {
              if (err) {
                throw err;
              } else {
                ingre_v =
                  (await result_1[0].v_ingre1) +
                  " " +
                  result_1[0].v_ingre2 +
                  " " +
                  result_1[0].v_ingre3 +
                  " " +
                  result_1[0].v_ingre4 +
                  " " +
                  result_1[0].v_ingre5 +
                  " " +
                  result_1[0].v_ingre6 +
                  " " +
                  result_1[0].v_ingre7 +
                  " " +
                  result_1[0].v_ingre8 +
                  " " +
                  result_1[0].v_ingre9 +
                  " " +
                  result_1[0].v_ingre10 +
                  " " +
                  result_1[0].v_ingre11 +
                  " " +
                  result_1[0].v_ingre12 +
                  " " +
                  result_1[0].v_ingre13 +
                  " " +
                  result_1[0].v_ingre14 +
                  " " +
                  result_1[0].v_ingre15 +
                  " " +
                  result_1[0].v_ingre16 +
                  " " +
                  result_1[0].v_ingre17 +
                  " " +
                  result_1[0].v_ingre18 +
                  " " +
                  result_1[0].v_ingre19 +
                  " " +
                  result_1[0].v_ingre20;

                ingre_v = await ingre_v.split(" ");
                for (let x = 0; x < cut_stock[i].length; x++) {
                  if (cut_stock[i][x].length > 0 && mss) {
                    dbConnection.query(
                      "SELECT quantity FROM store WHERE name=?",
                      [cut_stock[i][x]],
                      async (err, result_2) => {
                        if (err) {
                          throw err;
                        } else {
                          // console.log(mss);
                          const sum = (await ingre_v[x]) * result[i].amount;
                          if ((await result_2[0].quantity) - sum >= 0 && mss) {
                            dbConnection.query(
                              "UPDATE store SET quantity=? WHERE name=?",
                              [
                                (await result_2[0].quantity) - sum,
                                cut_stock[i][x],
                              ],
                              async (err, result_3) => {
                                if (err) {
                                  throw err;
                                } else {
                                  // console.log(result_2[0].quantity);
                                  // console.log(sum);
                                  // console.log(result_2[0].quantity - sum);
                                  // console.log("id: " + result[i].id_order);
                                  // console.log("จำนวน: " + result[i].amount);
                                  // // console.log(cut_stock[i].length);
                                  // // console.log(name_stock[i]);
                                  // // console.log(cut_stock[i][x]);
                                  // console.log(
                                  //   "stock: " + ingre_v[x] * result[i].amount
                                  // );
                                  dbConnection.query(
                                    "UPDATE list_order SET status = 'COMPLETE' WHERE id_order = ?",
                                    [await result[i].id_order],
                                    (err, result_5) => {
                                      if (err) {
                                        throw err;
                                      } else {
                                        console.log("STOCK_UPDATE");
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          } else {
                            mss = false;
                            dbConnection.query(
                              "UPDATE list_order SET status = 'OUTSTOCK' WHERE id_order = ?",
                              [await result[i].id_order],
                              (err, result_4) => {
                                if (err) {
                                  throw err;
                                } else {
                                  console.log("STOCK IS LESS");
                                }
                              }
                            );
                          }
                        }
                      }
                    );
                  }
                }
              }
            }
          );
        }
      }
    }
  );
};

exports.restore_table = async () => {
  let update_table = [];
  dbConnection.query(
    "SELECT * FROM list_order WHERE status='F'",
    async (err, result_1) => {
      if (err) {
        throw err;
      } else {
        console.log(result_1);
        await result_1.forEach((listable) => {
          dbConnection.query(
            "SELECT * FROM tables WHERE table_id=?",
            [listable.table_id],
            async (err, result_2) => {
              if (err) {
                // throw err;
              } else {
                console.log(result_2);
                update_table.item = await result_2[0].table_item.split(
                  listable.amount + " " + listable.name
                );
                update_table.amount =
                  parseInt(result_2[0].table_total_price) -
                  parseInt(listable.price) * parseInt(listable.amount);
                if (update_table.amount <= 0) {
                  update_table.amount = 0;
                }
                update_table.id = await result_2[0].table_id;
                const item = await update_table.item.join("");
                dbConnection.query(
                  "UPDATE tables SET table_item=?, table_total_price=? WHERE table_id=?",
                  [
                    await item,
                    await update_table.amount,
                    await update_table.id,
                  ],
                  (err) => {
                    if (err) {
                      throw err;
                    }
                    console.log("SUCCESS RETURN ITEM");
                  }
                );
                dbConnection.query(
                  "UPDATE list_order SET status='RETURNED' WHERE status='F'",
                  [
                    await item,
                    await update_table.amount,
                    await update_table.id,
                  ],
                  (err) => {
                    if (err) {
                      throw err;
                    }
                    console.log("SUCCESS RETURN STATUS");
                  }
                );
              }
            }
          );
        });
      }
    }
  );
};

exports.resolveAfter2Seconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 700);
  });
};
