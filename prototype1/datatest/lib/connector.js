var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

var dbPassword = "tauw22"//ask jaimie
var url = 'mongodb://jaimie2:'+ dbPassword +'@tauw-shard-00-00-rkjng.mongodb.net:27017,tauw-shard-00-01-rkjng.mongodb.net:27017,tauw-shard-00-02-rkjng.mongodb.net:27017/tauw?ssl=true&replicaSet=tauw-shard-0&authSource=admin';

var findDocuments = function(collection, query, db, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Find some documents
  collection.find( query ).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

var findDocumentsWithId = function (collection, query, db, callback) {
    // Get the documents collection
    var collection = db.collection(collection);

    collection.find({_id: ObjectId(query.id)} ).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
 });
}

var findDocumentsWithField = function(collection, query, field, db, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Find some documents
  collection.find( query,field ).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

var searchText = function(collection, query, db, callback) {
  var collection = db.collection(collection);

  collection.ensureIndex({
    //   _id: ObjectId("text"),
      name:"text",
      sector:"text",
      branch:"text",
      tags:"text",
      level:"text",
      contact: "text"
    }, function(err, indexName ){

    collection.find( {$text: {$search: query, $caseSensitive:false} }).toArray(function(err, docs) {
      assert.equal(err, null);

      callback(docs);
    });
  })
}

var createDocument = function(collection, json, db) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Find some documents
  collection.insertOne(json, function(err, r) {
    assert.equal(err, null);
    assert.equal(1, r.insertedCount)
  });
}

var updateDocument = function(collection, query, json, db, callback){
    var collection = db.collection(collection);
    collection.updateOne({_id: ObjectId(query.id)}, {$set: json}, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.matchedCount);
      });
};

var updateSetting = function(collection, json, db, callback){
    var collection = db.collection(collection);
    collection.updateOne({}, json, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.matchedCount);
      });
};

var removeDocument = function(collection, query, db, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Remove a single document
    collection.deleteOne({_id: ObjectId(query.id)}, function(err, docs) {
      assert.equal(null, err);
      //console.log(docs.deletedCount)
     callback(docs);
      });
};


var find = {
  findSensors : function (query, callback) {
   MongoClient.connect(url, function(err, db) {
     assert.equal(null, err);
     console.log("Connected successfully to server");

     findDocuments("sensors", query ,db, function(docs) {
       callback(docs);
       db.close();
     });
   });
 },
 findSensorId : function (query, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    findDocumentsWithId("sensors", query ,db, function(docs) {
      callback(docs);
      db.close();
    });
  });
 },
 findSettings : function (query,field, callback) {
   MongoClient.connect(url, function(err, db) {
     assert.equal(null, err);
     console.log("Connected successfully to server");

     findDocumentsWithField("settings", query, field, db, function(docs) {
       callback(docs);
       db.close();
     });
   });
 },
 searchText : function (query, callback) {
   MongoClient.connect(url, function(err, db) {
     assert.equal(null,err);

     searchText("sensors", query, db, function(docs) {
       callback(docs);
       db.close();
     });
   })
 },
 createNewSensor : function (json) {
   MongoClient.connect(url, function(err, db){
     assert.equal(null,err);

     createDocument("sensors", json, db);
   })
 },
 editSensor: function (query, json, callback) {
     MongoClient.connect(url, function(err, db){
       assert.equal(null,err);
       updateDocument("sensors", query, json, db, function(docs) {
           callback(docs);
         db.close();
        })
    })
 },
 editSettings: function (json) {
     MongoClient.connect(url, function(err, db){
       assert.equal(null,err);

       updateSetting("settings", json, db, function() {
           console.log("Item successfully edited")
         db.close();
        })
    })
 },
 removeItem : function (query, callback) {
   MongoClient.connect(url, function(err, db) {
     assert.equal(null, err);
     console.log("Connected successfully to server");

     removeDocument("sensors", query, db, function(docs) {
         callback(docs);
         console.log("Item successfully removed")
       db.close();
     });
 })
 },

}

module.exports = {find: find};
