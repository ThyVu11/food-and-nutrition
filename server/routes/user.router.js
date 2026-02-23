const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

router.post("/register", (req, res, next) => {
  const username = req.body.username.replace(/ /g, "").toLowerCase();
  const name = req.body.name;
  const password = encryptLib.encryptPassword(req.body.password);
  const queryText =
    'INSERT INTO "user" (username, email, password, name ) VALUES ($1, $2, $3, $4) RETURNING id';
  pool
    .query(queryText, [username, username, password, name])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
    console.log("pool", pool);
});

router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
