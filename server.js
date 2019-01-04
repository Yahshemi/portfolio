const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var profile = require("./profile");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/profile", profile);

//Here we're setting the views directory to be ./views
//thereby letting the app know where to find the template files
app.set("views", "./views");

//Here we're setting the default engine to be ejs
//note we don't need to require it, express will do that for us
app.set("view engine", "ejs");

//Now instead of using res.send we can use
//res.render to send the output of the template by filename
app.get("/", (req, res) => {
  const data = {
    person: {
      firstName: "Yahshemi",
      lastName: "Walters",
      title: "Full Stack Developer"
    }
  };
  // Notice now the data is the second argument passed to the template render method
  res.render("index", data);
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/thanks", (req, res) => {
  res.render("thanks");
});

app.listen(8080, () => {
  console.log("listening at http://localhost:8080");
});
