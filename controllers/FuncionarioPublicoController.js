var mongoose = require('mongoose');

var FPModel = require('../models/FuncionarioPublico');

var FPController ={};

//CREATE
FPController.create = function(req,res){
    let data ={
        nombre: req.body.nombre,
        partidoPolitico: req.body.partidoPolitico,
        sueldo: req.body.sueldo
    }
    //se valida
    if(data.nombre && data.partidoPolitico && data.sueldo && data.nombre != "" && data.partidoPolitico!="" && data.sueldo !=""){
        let nuevoRegistro = new FPModel(data);
        nuevoRegistro.save(function(err, guardado){
            if(err){
                res.status(500);
                res.json({status: 500, err});
            }else{
                res.json({ok: true, message:'se guardó correctamente',guardado});
            }
        });
    }else{
        console.log("faltaron datos")
    }
}
//READ TODOS
FPController.getAll = function(req, res){
    FPModel.find({}, function(err, FPS){
        if(err){
            res.status(500);
            res.json({status: 500, err});
        }else{
            res.json({ok: true,FPS});
        }
    });
}
//READ
FPController.get = function(req, res){
    FPModel.findById(req.params.id, function(err, FP){
        if(err){
            res.status(500);
            res.json({status: 500, err});
        }else{
            res.json({ok: true,FP});
        }
    });
}
//UPDATE
FPController.update = function(req, res){
    let nuevaInfo = {
        nombre: req.body.nombre,
        partidoPolitico: req.body.partidoPolitico,
        sueldo: req.body.sueldo
    } 
    FPModel.findOneAndUpdate(req.params.id, nuevaInfo, function(err, old){
        if(err){
            res.status(500);
            res.json({status: 500, err});
        }else{
            res.json({ok: true,old, nuevaInfo});
        }
    });
}


//DELETE
FPController.delete = function(req, res){
    FPModel.findByIdAndDelete(req.params.id, function(err,eliminado){
        if(err){
            res.status(500);
            res.json({status: 500, err});
        }else{
            res.json({ok: true, eliminado});
        }
    });
}
module.exports = FPController;