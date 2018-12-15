//const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const fileType = require('file-type');
const {MongoClient, ObjectID,Binary} = require('mongodb');

var obj = new ObjectID();
console.log(obj.getTimestamp());
var src = fs.readFileSync("test.png"); 
console.log(src.length);
console.log('mime.Type ',fileType(src));
var icon = {};
icon.obj = Binary(src);
icon.description = 'This is test image';
MongoClient.connect('mongodb://localhost:27019/TodoApp',(err,db)=>{
    if(err){
       return console.log(`unable to connect to mongodb server`);
    }
    console.log('Connected to Mongodb server');
    // db.collection('Icons').insertOne(icon,(err,result)=>{
    //     if(err){
    //         return console.log('unable to save images ',err);
    //     }
    //     console.log('Save images...');
    // });
    // db.collection('Todos').insertOne({
    //     "text":"Do sometihng now",
    //     "completed":"false"
    // },(err,result)=>{
    //     if(err){
    //         return console.log(`unable to insert todo`,err);
    //      }
    //      console.log(JSON.stringify(result.ops),undefined,2);
    // });

    // db.collection('Users').insertOne({
    //     name:"Isha",
    //     age:"18",
    //     location:"Pune"
    // },(err,result)=>{
    //     if(err){
    //         return console.log(`unable to insert Users`,err);
    //      }
    //      console.log(JSON.stringify(result.ops),undefined,2);
    // });

    db.close();
});