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
    let x = req.body.tod.split("/");
    const temp = x[0];
    x[0] = x[1];
    x[1] = temp;
    const y = x.join("/");

    const { name } = req.params;
    const tod = new Date(y);

    let tor = new Date(y);
    tor.setHours(tor.getHours() + 30);

    Bosses.findOneAndUpdate({ name }, { tod: tod, tor: tor })
      .then(boss => res.json(boss))
      .catch(
        err => console.log(err)
        // res.json({
        //   date:
        //     "Invalid date format. Please use month/day/year hours/minutes format."
        // })
      );
  }
);

router.get("/", (req, res) => {
  Bosses.find()
    .then(bosses => res.json(bosses))
    .catch(err => console.log(err));
});

module.exports = router;
