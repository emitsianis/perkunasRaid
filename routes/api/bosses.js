const express = require("express");
const router = express.Router();
const passport = require("passport");

const Bosses = require("../../models/Bosses");
const EpicBosses = require("../../models/EpicBosses");
const keys = require("../../config/keys");

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

router.post(
  "/epic/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, tod, tor, tor2 } = req.body;

    EpicBosses.findOneAndUpdate({ name }, { tod: tod, tor: tor, tor2: tor2 })
      .then(boss => res.json(boss))
      .catch(err => console.log(err));
  }
);

router.get("/epic", (req, res) => {
  EpicBosses.find()
    .then(bosses => res.json(bosses))
    .catch(err => console.log(err));
});

module.exports = router;
