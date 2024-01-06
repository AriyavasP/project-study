const express = require("express");

const routes = express.Router();

routes.get("/(:id)", (req, res) => {
  const id = req.params.id;
  res.render("./tables/table", { title: "Table", id: id });
});

exports.routes = routes;
