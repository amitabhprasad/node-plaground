//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID,Binary} = require('mongodb');

MongoClient.connect('mongodb://localhost:27019/TodoApp',(err,db)=>{
    if(err){
       return console.log(`unable to connect to mongodb server`);
    }
    console.log('Connected to Mongodb server');
    //deleteMany
    // db.collection('Todos').deleteMany({text:'Go for run on sunday'}).then((result)=>{
    //     console.log(result);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Do 20 min streaching'}).then((result)=>{
    //     console.log(result);
    // });
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((doc)=>{
    //     console.log(JSON.stringify(doc,undefined,2))
    // });

    db.collection('Users').deleteMany({name:'Isha'}).then((result)=>{
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5c138e606c634466bcd243a6')
    }).then((doc)=>{
        console.log(JSON.stringify(doc,undefined,2));
    });
    //db.close();
});