const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "workout router get requested" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "requested single workout /:id" });
});

router.post("/", (req, res) => {
  res.json({ mssg: "post requested on workout", body: req.body });
});

router.delete("/:id", (req, res) => {
  res.json({ mssg: "delete requested workouts!!" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "update requested on workouts" });
});

module.exports = router;
