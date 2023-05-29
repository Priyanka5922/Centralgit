var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
router.get('/users', (req, res) => {
  const connection = req.app.get('connection');
  connection.query('SELECT * FROM hestabit', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

