var mongoose = require ('mongoose');

var FPModel = new mongoose.Schema({
    nombre:{
        type: String,
        unique: true,
        index: true
    },
    partidoPolitico: String,
    sueldo: Number
});

module.exports = mongoose.model('FPModel', FPModel);