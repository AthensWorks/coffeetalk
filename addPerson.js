var MongoClient = require('mongodb').MongoClient                                                                            
   2 , assert = require('assert');                                                                                               
   3                                                                                                                             
   4 //connection url                                                                                                            
   5 var url = 'mongodb://localhost:27017/mongoproject';                                                                         
   6                                                                                                                             
   7 // use connect method to connect to the server                                                                              
   8 //                                                                                                                          
-  9 MongoClient.connect(url, function(err, db) {                                                                                
| 10     assert.equal(null, err);                                                                                                
| 11     console.log("Connected successfully to server");                                                                        
| 12                                                                                                                             
- 13     insertDocuments(db,function(){                                                                                          
- 14       findDocuments(db,function() {                                                                                         
3 15         db.close();                                                                                                         
3 16       });                                                                                                                   
2 17     });                                                                                                                     
| 18 });                                                                                                                         
  19                                                                                                                             
  20                                                                                                                             
- 21 var insertDocuments = function(db, callback) {                                                                              
| 22     //get the documetns collection                                                                                          
| 23     var collection = db.collection('documents');                                                                            
| 24     // Insert some documents                                                                                                
| 25     collection.insertMany([                                                                                                 
- 26         {                                                                                                                   
2 27             "name":"Barney",                                                                                                
2 28             "email":"jjooeh@gmail.com",                                                                                     
2 29             "availability": "none",                                                                                         
2 30             "previousMatches": [                                                                                            
2 31             ]                                                                                                               
2 32         }                                                                                                                   
- 33     ], function(err,result) {                                                                                               
2 34         assert.equal(err, null);                                                                                            
2 35         assert.equal(1,result.result.n);                                                                                    
2 36         assert.equal(1, result.ops.length);                                                                                 
2 37         console.log("Inserted 1 person into the database");                                                                 
2 38         callback(result);                                                                                                   
2 39         });                                                                                                                 
| 40 }                                                                                                                           
  41                                                                                                                             
- 42 var findDocuments = function(db,callback) {                                                                                 
| 43     //Get the documents collection                                                                                          
| 44     var collection = db.collection('documents');                                                                            
| 45     //Find some documents                                                                                                   
- 46     collection.find({}).toArray(function(err,docs) {                                                                        
2 47         assert.equal(err,null);                                                                                             
2 48         console.log("Found the following records");                                                                         
2 49         console.log(docs);                                                                                                  
2 50         callback(docs);                                                                                                     
2 51     });                                                                                                                     
| 52 }       
