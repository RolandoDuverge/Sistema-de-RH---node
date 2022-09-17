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

exports.update = (req, res)=>{ 
    const id = req.body.id;
    const nombre = req.body.nombre;
    const estado = req.body.estado;
    conexion.query('UPDATE idiomas SET ? WHERE id = ?', [{nombre:nombre, estado:estado}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');          
        }
    });
    };

    exports.saveCompe = (req, res)=>{
        const descripcion = req.body.descripcion;
        const estado = req.body.estado;
        conexion.query('INSERT INTO competencias SET ?',{descripcion:descripcion, estado:estado}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/indexCompe');     
        }
    });
    };
    
    exports.updateCompe = (req, res)=>{ 
        const id = req.body.id;
        const descripcion = req.body.descripcion;
        const estado = req.body.estado;
        conexion.query('UPDATE competencias SET ? WHERE id = ?', [{descripcion:descripcion, estado:estado}, id], (error, results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/indexCompe');          
            }
        });
        };

        exports.saveCapa = (req, res)=>{
            const descripcion = req.body.descripcion;
            const nivel = req.body.nivel;
            const fechaPre = req.body.fechaPre;
            const fechaPos = req.body.fechaPos;
            const institucion = req.body.institucion;
            conexion.query('INSERT INTO capacitaciones SET ?',{descripcion:descripcion, nivel:nivel, fechaPre:fechaPre, fechaPos:fechaPos, institucion:institucion}, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                //console.log(results);   
                res.redirect('/indexCapa');     
            }
        });
        };
        
        exports.updateCapa = (req, res)=>{ 
            const id = req.body.id;
            const descripcion = req.body.descripcion;
            const nivel = req.body.nivel;
            const fechaPre = req.body.fechaPre;
            const fechaPos = req.body.fechaPos;
            const institucion = req.body.institucion;
            conexion.query('UPDATE capacitaciones SET ? WHERE id = ?', [{descripcion:descripcion, nivel:nivel, fechaPre:fechaPre, fechaPos:fechaPos, institucion:institucion}, id], (error, results)=>{
                if(error){
                    console.log(error);
                }else{
                    res.redirect('/indexCapa');          
                }
            });
        };
    
            exports.savePuesto = (req, res)=>{
                const nombre = req.body.nombre;
                const nivelRiesgo = req.body.nivelRiesgo;
                const nivelSalarioMinimo = req.body.nivelSalarioMinimo;
                const nivelSalarioMaximo = req.body.nivelSalarioMaximo;
                const estado = req.body.estado;
                conexion.query('INSERT INTO puestos SET ?',{nombre:nombre, nivelRiesgo:nivelRiesgo, nivelSalarioMinimo:nivelSalarioMinimo, nivelSalarioMaximo:nivelSalarioMaximo, estado:estado}, (error, results)=>{
                if(error){
                    console.log(error);
                }else{
                    //console.log(results);   
                    res.redirect('/indexPuesto');     
                }
            });
            };
            
            exports.updatePuesto = (req, res)=>{ 
                const id = req.body.id;
                const nombre = req.body.nombre;
                const nivelRiesgo = req.body.nivelRiesgo;
                const nivelSalarioMinimo = req.body.nivelSalarioMinimo;
                const nivelSalarioMaximo = req.body.nivelSalarioMaximo;
                const estado = req.body.estado;
                conexion.query('UPDATE puestos SET ? WHERE id = ?', [{nombre:nombre, nivelRiesgo:nivelRiesgo, nivelSalarioMinimo:nivelSalarioMinimo, nivelSalarioMaximo:nivelSalarioMaximo, estado:estado}, id], (error, results)=>{
                    if(error){
                        console.log(error);
                    }else{
                        res.redirect('/indexPuesto');          
                    }
                });
                };
        

            