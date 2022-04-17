const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

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
  const search = req.query.search;
  console.log(search);

  if (search) {
    axios
      .get("https://www.omdbapi.com/?s=" + search + "&apikey=a13895a5")

      .then((response) => {
        const movies = response.data;

        if (movies.Search) {
          res.render("index", { data: movies.Search });
        } else {
          res.render("index", { data: [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.render("index", { data: [] });
  }
});

// Error
app.get("*", function (req, res) {
  res.status(404).send("Can't find the page!");
});

//Webserver
app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
