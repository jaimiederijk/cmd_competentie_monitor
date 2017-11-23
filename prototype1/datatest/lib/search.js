var connector  = require('../lib/connector');

var search = {
    renderSearchResults: function (req, res, search){
        var text = search;
        connector.find.searchText( text, function(docs){
            console.log(docs)

          res.render('searchResults', {
              title: text,
              page: "search",
              searchQuery: text,
              allSensors: docs
          });
        });
    },
    renderCMSSearchResults: function (req, res, search){
        var text = search;
        connector.find.searchText( text, function(docs){
            console.log(docs)

          res.render('cms', {
              title: "cms",
              page: "cms",
              logged_in: false,
              allSensors: docs
          });
        });
    },
}

module.exports = {search: search};
