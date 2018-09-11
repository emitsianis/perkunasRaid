const express = require("express");
const router = express.Router();
const passport = require("passport");

const Bosses = require("../../models/Bosses");
const keys = require("../../config/keys");

//Create new aq char
router.post(
  "/edit/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, tod, tor } = req.body;

    Bosses.findOneAndUpdate({ name }, { tod: tod, tor: tor })
      .then(boss => res.json(boss))
      .catch(err => console.log(err));
  }
);

router.get("/", (req, res) => {
  Bosses.find()
    .then(bosses => res.json(bosses))
    .catch(err => console.log(err));
});

module.exports = router;
