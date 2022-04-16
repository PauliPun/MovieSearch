var http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
const app = express();

// AXIOS
var axios = require("axios");

// EJS
app.set("view engine", "ejs");
app.locals.pretty = true;

//Public static files
app.use(express.static("views/"));

// Parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// EJS file routes

// Frontpage
app.get("/", function (req, res) {
  var search = req.query.search;
  console.log(search);

  axios
    .get("https://www.omdbapi.com/?s=" + search + "&apikey=a13895a5")

    .then((response) => {
      const movies = response.data;
      res.render("index", { data: movies.Search });
    })
    .catch((error) => {
      console.log(error);
    });
});
// Error
app.get("*", function (req, res) {
  res.status(404).send("Cant find the page!");
});

// Webserver
app.listen(3000, function () {
  console.log("Listening port 3000");
});
