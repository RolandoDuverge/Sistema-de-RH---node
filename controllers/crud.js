const conexion = require('../database/db');

exports.save = (req, res)=>{
    const nombre = req.body.nombre;
    const estado = req.body.estado;
    conexion.query('INSERT INTO idiomas SET ?',{nombre:nombre, estado:estado}, (error, results)=>{
    if(error){
        console.log(error);
    }else{
        //console.log(results);   
        res.redirect('/');         
    }
});
};