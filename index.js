const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const admin = require("./routes/admin");
const employees = require("./routes/employees");
const reprots = require("./routes/reports");
const income = require("./routes/incomes");
const table = require("./routes/table");
const kitchen = require("./routes/kitchen");
const menu = require("./routes/menu"); //เมนู
const order = require("./routes/order"); //ออเดอร์
const queue = require("./routes/queue");
const dbConnection = require("./lib/database");

app.use("/admin", admin.routes);
app.use("/employee", employees.routes);
app.use("/reports", reprots.routes);
app.use("/total", income.routes);
app.use("/table", table.routes);
app.use("/kitchen", kitchen.routes);
app.use("/menu", menu.routes); //เมนู
app.use("/order", order.routes); //ออเดอร์
app.use("/queue", queue.routes);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, //24hr
  })
);

let ms_pass = true;

app.get("/", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.redirect("/menu/table-show");
    console.log(session.userid);
  } else {
    dbConnection.query("SELECT * FROM dining_table", (err, result) => {
      if (err) {
        res.render("Home-user", {
          Title: "ViewDee 🤑",
          ms_pass: ms_pass,
          data: "",
        });
        throw err;
      } else {
        res.render("Home-user", {
          Title: "ViewDee 🤑",
          ms_pass: ms_pass,
          data: result,
        });
      }
    });
  }
});

app.post("/login", (req, res) => {
  session = req.session;
  const id = req.body.ID;
  const pass = req.body.PASS;
  if (pass) {
    dbConnection.query(
      "SELECT password_employee, status_employee FROM employee WHERE id_employee=?",
      [id],
      (err, result) => {
        if (err) {
          console.log("ERR");
        }
        if (result.length == 0) {
          ms_pass = false;
          res.redirect("/");
        } else {
          bcrypt.compare(pass, result[0].password_employee, (err, isMacth) => {
            console.log(isMacth);
            if (isMacth) {
              session.userid = result[0].status_employee;
              session.employeeid = id;
              ms_pass = true;
              res.redirect("/");
            } else {
              console.log("SO bad");
              console.log(id);
              console.log(pass);
              console.log(result);
              ms_pass = false;
              res.redirect("/");
            }
          });
        }
      }
    );
  } else {
    ms_pass = false;
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session = null;
  ms_pass = true;
  console.log("Logout Complete");
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server is running..." + PORT));
