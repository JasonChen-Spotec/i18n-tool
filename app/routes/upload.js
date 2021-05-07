const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/upload', (req, res, next) => {
  res.json({ name: 'test' });
  next();
});

module.exports = router;
