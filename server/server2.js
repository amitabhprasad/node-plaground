var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var upload = require("express-fileupload");
const fileType = require('file-type');
const path = require("path");

var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {Icon} = require('./models/icon');

var v2 = JSON.parse(fs.readFileSync(path
    .join(__dirname, './resource/v2.json')));


var app = express();

app.use(bodyParser.json());

app.use(upload({
    limits: { fileSize: 1 * 1024 * 1024 },
}));


app.get('api/todos',(req,res)=>{
    Todo.find({},'text completed').then((todos)=>{
        res.send({
            todos
        });
    },(err)=>{
        console.log('unable to get data ',err);
        res.status(400).send(err);
    });
});

app.get('/api/icons/id', function(req, res) {
    console.log('inside REST call');
    var id = '5c153e37b9a05dad110d875b';
    Icon.findById(id).then((doc)=>{
        if(!doc){
            res.status(404).send(`Requested ID ${id} do not exist`);
        }
        res.setHeader('Content-Disposition', 'attachment; filename=' + doc.name);
        res.setHeader('Content-Transfer-Encoding', 'binary');
        res.setHeader('Content-Type', 'application/octet-stream');
        //res.sendFile(fullFileName)
        //res.send(new Buffer(pdfData, 'binary')), or the res.type() / res.end(pdfData, 'binary')

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(doc.data, 'binary');
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
    
   // res.end(data);
});

app.get('/api/icons/render/id', function(req, res) {
    console.log('inside REST call');
    var id = '5c153e37b9a05dad110d875b';
    Icon.findById(id).then((doc)=>{
        if(!doc){
            res.status(404).send(`Requested ID ${id} do not exist`);
        }
        res.setHeader('Content-Transfer-Encoding', 'binary');
        res.setHeader('Content-Type', 'application/octet-stream');

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(doc.data, 'binary');
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
    
   // res.end(data);
});

app.get('/api/icons', function(req, res) {
    var reqParam = req.query.param
    console.log(`reqParam == ${reqParam}`);
    Icon.find({},'name contentType description').then((icons)=>{
        res.send({
            icons
        });
    },(err)=>{
        console.log('unable to get data ',err);
        res.status(400).send(err);
    });
    
   // res.end(data);
});

app.get('/convertv2tov3',function (req, res){
    var data = convertV2toV3();
    res.send(data);
});

function convertV2toV3 () {
    var v3 = v2;
  
    v3.service.specVersion = 'v3';
    v3.service.catalog_metadata.documentationUrl = getValue(v2.service.catalog_metadata.documentationUrl);
    v3.service.catalog_metadata.supportUrl = getValue(v2.service.catalog_metadata.supportUrl);
    v3.service.catalog_metadata.bindable = getValue(v2.service.catalog_metadata.bindable);
    v3.service.catalog_metadata.updatable = getValue(v2.service.catalog_metadata.updatable);
  
    // delete v3.service.catalog_metadata.author;
  
    var actions = [];
    var action = {
      'type': 'provision',
      'name': 'Provision',
      'input_parameters': [],
      'flow': {},
      'output_parameters': [],
    };
    action.input_parameters = v2.service.parameters;
    action.flow = v2.service.flow;
    actions.push(action);
    v3.service.actions = actions;
  
    delete v3.service.parameters;
    delete v3.service.flow;
    
    if (v3.service.plans) {
      v3.service.plans.forEach(function(plan) {
        plan.actions = [];
      });
    }
    return v3;
  };

  function getValue(key) {
    if (key !== undefined) {
      return key;
    } else {
      return '';
    }
  }
app.listen(5001,()=>{
    console.log('Server started at port 5001');
});

module.exports = {app};