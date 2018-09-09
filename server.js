const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const admin = require("./routes/api/amdin");
const chars = require("./routes/api/chars");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

//Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//Use routes
app.use("/api/admin", admin);
app.use("/api/chars", chars);

const port = process.env.PORT || 5000;

//Server static assets (production)
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
