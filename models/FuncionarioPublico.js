var mongoose = require ('mongoose');

var FPModel = new mongoose.Schema({
    nombre:{
        type: String,
        unique: true,
        index: true
    },
    partidoPolitico: String,
    sueldo: String
});

module.exports = mongoose.model('FPModel', FPModel);