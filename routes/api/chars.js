const express = require("express");
const router = express.Router();
const passport = require("passport");

const validateCharInput = require("../../validation/char");

const AqChars = require("../../models/AqChars");
const OcChars = require("../../models/OcChars");
const keys = require("../../config/keys");

//Create new aq char
router.post(
  "/aq/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCharInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, charClass } = req.body;

    AqChars.findOne({ name }).then(char => {
      if (char) {
        errors.name = "There is already an AQ char with that name.";
        return res.status(400).json(errors);
      } else {
        const newChar = new AqChars({
          name: name,
          charClass: charClass
        });

        newChar
          .save()
          .then(char => {
            res.json(char);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
);

//Get all aq chars
router.get("/aq", (req, res) => {
  AqChars.find()
    .sort({ date: -1 })
    .then(chars => {
      res.json(chars);
    })
    .catch(err => {
      res.status(404).json({ nocharsfound: "No chars found" });
    });
});

//get aq char by id
router.get("/aq/:id", (req, res) => {
  AqChars.findById(req.params.id)
    .then(char => {
      res.json(char);
    })
    .catch(err => {
      res.status(404).json({ charnotfound: "No char found" });
    });
});

//Delete aq char
router.delete(
  "/aq/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    AqChars.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        res.status(404).json({ charnotfound: "No char found" });
      });
  }
);

//Create new oc char
router.post(
  "/oc/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCharInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, charClass } = req.body;

    OcChars.findOne({ name }).then(char => {
      if (char) {
        errors.name = "There is already an Orfen&Core char with that name.";
        return res.status(400).json(errors);
      } else {
        const newChar = new OcChars({
          name: name,
          charClass: charClass
        });

        newChar
          .save()
          .then(char => {
            res.json(char);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
);

//Get all oc chars
router.get("/oc", (req, res) => {
  OcChars.find()
    .sort({ date: -1 })
    .then(chars => {
      res.json(chars);
    })
    .catch(err => {
      res.status(404).json({ nocharsfound: "No chars found" });
    });
});

//get oc char by id
router.get("/oc/:id", (req, res) => {
  OcChars.findById(req.params.id)
    .then(char => {
      res.json(char);
    })
    .catch(err => {
      res.status(404).json({ charnotfound: "No char found" });
    });
});

//Delete oc char
router.delete(
  "/oc/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    OcChars.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        res.status(404).json({ charnotfound: "No char found" });
      });
  }
);

module.exports = router;
