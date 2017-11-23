var express = require('express');
var router = express.Router();
var connector  = require('../lib/connector');

router.get('/', function(req, res, next) {

  res.render('index', {
      title: 'Home',
      curentSector: "",
      page: "index",
      allSensors: {sector: "nothing"}
  });

});

module.exports = {router: router};
