const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const assert = require('assert');

const url = 'mongodb://localhost:27017';
//https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
//https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032
const dbName = 'monitor';

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.urlencoded({extened:true}));

app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('/', function(req, res) {
  res.json('you did it');
});


app.post('/api/save', function(req, res) {
  const jsonObject = req.body;

  MongoClient.connect(url, function(err, client){
    assert.equal(null,err);


    console.log("succes connect");
    const db = client.db(dbName);

    createDocument("forms", jsonObject, db);
  })

});

app.post('/api/update', function(req, res) {
  const jsonObject = req.body;

  MongoClient.connect(url, function(err, client){
         assert.equal(null,err);

         console.log("succes connect");
         const db = client.db(dbName);

         updateDocument("forms", query, jsonObject, db);
      })
  MongoClient.connect(url, function(err, client){
    assert.equal(null,err);


    console.log("succes connect");
    const db = client.db(dbName);

    createDocument("forms", jsonObject, db);
  })

});

app.get("/api/return", (req,res) => {

})

var updateDocument = function(collection, query, json, db){
    var collection = db.collection(collection);
    collection.updateOne({_id: ObjectId(query.id)}, {$set: json}, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.matchedCount);
      });
};

var createDocument = function(collection, json, db) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Find some documents
  collection.insertOne(json, function(err, r) {
    assert.equal(err, null);
    assert.equal(1, r.insertedCount)
  });
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
