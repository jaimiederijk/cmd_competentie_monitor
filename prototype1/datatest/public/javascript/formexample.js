var ejs = require('ejs');

var people = ['geddy', 'neil', 'alex']
var html = ejs.render('<%= people.join(", "); %>', {people: people});

var test = function () {
   document.getElementById('output').innerHTML = html;
}

module.exports = test;
