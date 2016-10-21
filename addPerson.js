var MongoClient = require('mongodb').MongoClient, assert = require('assert');

//connection url
var url = 'mongodb://localhost:27017/mongoproject';

// use connect method to connect to the server
//
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertDocuments(db,function(){
      findDocuments(db,function() {
        db.close();
      });
    });
});


var insertDocuments = function(db, callback) {
    //get the documetns collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {
            "name":"Barney",
            "email":"jjooeh@gmail.com",
            "availability": "none",
            "previousMatches": [
            ]
        }
    ], function(err,result) {
        assert.equal(err, null);
        assert.equal(1,result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 person into the database");
        callback(result);
        });
}

var findDocuments = function(db,callback) {
    //Get the documents collection
    var collection = db.collection('documents');
    //Find some documents
    collection.find({}).toArray(function(err,docs) {
        assert.equal(err,null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}
