var express = require('express');
var router = express.Router();
var connector  = require('../lib/connector');

router.get('/', function(req, res, next) {
  connector.find.findSettings ({},  { studie: 1 }, function(docs) {
    console.log(docs[0].studie);
    res.render('index', {
      title: "forms",
      studie: docs[0].studie
    });
  })
});

router.get('/newform', function(req, res, next) {
  res.render('newform', {
    title: "new form"
  })
})

module.exports = {router: router};
