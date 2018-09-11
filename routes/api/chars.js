const express = require("express");
const router = express.Router();
const passport = require("passport");

const validateCharInput = require("../../validation/char");
const validatePointsInput = require("../../validation/points");
const validateDayInput = require("../../validation/day");

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

    let { name, charClass, points } = req.body;

    AqChars.findOne({ name }).then(char => {
      if (char) {
        errors.name = "There is already an AQ char with that name.";
        return res.status(400).json(errors);
      } else {
        points = points === "" ? 0 : parseInt(points);

        const newChar = new AqChars({
          name: name,
          charClass: charClass,
          points: points
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

//Remove points from aq char
router.post(
  "/removepoints/aq/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePointsInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { points } = req.body;

    AqChars.findById(req.params.id)
      .then(char => {
        if (points > char.points) {
          errors.points = "Exceeded total points";
          return res.status(400).json(errors);
        }

        char.points -= points;
        char.save().then(res.json(char));
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//Add new aq event
router.post(
  "/newevent/aq/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const data = {
      day: req.body.day
    };
    const { errors, isValid } = validateDayInput(data);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { ids } = req.body;
    const day = req.body.day - 1;

    ids.forEach(id => {
      AqChars.findById(id).then(char => {
        char.points += 1;
        visits = char.visits.split(" ");
        visits[day] = "1";
        char.visits = visits.join(" ");
        char.save();
      });
    });

    res.json({ success: true });
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

    let { name, charClass, points } = req.body;

    OcChars.findOne({ name }).then(char => {
      if (char) {
        errors.name = "There is already an Orfen&Core char with that name.";
        return res.status(400).json(errors);
      } else {
        points = points === "" ? 0 : parseInt(points);

        const newChar = new OcChars({
          name: name,
          charClass: charClass,
          points: points
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

//Remove points from oc char
router.post(
  "/removepoints/oc/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePointsInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { points } = req.body;

    OcChars.findById(req.params.id)
      .then(char => {
        if (points > char.points) {
          errors.points = "Exceeded total points";
          return res.status(400).json(errors);
        }

        char.points -= points;
        char.save().then(res.json(char));
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//Add new oc event
router.post(
  "/newevent/oc/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const data = {
      day: req.body.day
    };
    const { errors, isValid } = validateDayInput(data);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { ids } = req.body;
    const day = req.body.day - 1;

    ids.forEach(id => {
      OcChars.findById(id).then(char => {
        char.points += 3;
        visits = char.visits.split(" ");
        visits[day] = "1";
        char.visits = visits.join(" ");
        char.save();
      });
    });

    res.json({ success: true });
  }
);

router.get(
  "/reset",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    AqChars.find().then(chars => {
      chars.forEach(char => {
        char.visits =
          "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
        char.save();
      });
    });

    OcChars.find().then(chars => {
      chars.forEach(char => {
        char.visits =
          "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
        char.save();
      });
    });

    res.json({ success: true });
  }
);

module.exports = router;
