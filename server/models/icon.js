const mongoose = require('mongoose');

var Icon = mongoose.model('Icon',{
    data :{
        type: Buffer,required: true
    },
    contentType:{
        type: String
    },
    name:{
        type: String, required: true,unique: true
    },
    description:{
        type: String
    }
});

module.exports = {
    Icon
}