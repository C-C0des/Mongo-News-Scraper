const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const html_routes = require("./routes/html_routes.js");
const api_routes = require("./routes/api_routes.js");


const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars")

app.use(express.static("public"));
app.use(express.static(__dirname + "public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytscraper"

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.use(html_routes);
app.use(api_routes);


app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});

