const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const Admin = require("../../models/Admin");
const keys = require("../../config/keys");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new Admin({
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  Admin.findOne({ username }).then(user => {
    if (!user) {
      errors.username = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          //User matched
          id = user.id;
          //Create JWT payload
          const payload = {
            id: user.id,
            username: user.username
          };

          //Sign token

          jwt.sign(payload, keys.secretOrKey, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password inncorrect";
          return res.status(400).json(errors);
        }
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
