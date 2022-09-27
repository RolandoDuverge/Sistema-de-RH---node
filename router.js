const express = require("express");
const alert = require("alert");
const router = express.Router();
const conexion = require("./database/db");
const bcryptjs = require('bcryptjs');
const session = require('express-session');

//crear registros
router.get('/create', (req,res)=>{
    if (req.session.loggedin) {
	res.render('create');		
} else {
  res.render('login.ejs');   
}
}); 

//editar registros
router.get('/edit/:id', (req,res)=>{
	if (req.session.loggedin) {
  const id = req.params.id;
  conexion.query('SELECT * FROM idiomas WHERE id=?', [id], (error, results)=>{
  if (error) {
    throw error;
  } else {
    res.render('edit', {idiomas:results[0]});   
  }
})
} else {
    res.redirect('/login'); 
  }
})

//eliminar registros
router.get('/delete/:id', (req,res)=>{ 
	if (req.session.loggedin) {
  const id = req.params.id;
  conexion.query('DELETE FROM idiomas WHERE id= ?',[id], (error, results)=>{
  if (error) {
    throw error;
  } else {
    res.redirect('/');
  }
})
} else {
    res.redirect('/login');
  }
})


//crear registros departamento
router.get('/createDep', (req,res)=>{
  if (req.session.loggedin) {
res.render('createDep');		
} else {
res.render('login.ejs');   
}
}); 

//editar registros departamento
router.get('/editDep/:id', (req,res)=>{
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('SELECT * FROM departamento WHERE id=?', [id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.render('editDep', {departamento:results[0]});   
}
})
} else {
  res.redirect('/login'); 
}
})

//eliminar registros departamento
router.get('/deleteDep/:id', (req,res)=>{ 
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('DELETE FROM departamento WHERE id= ?',[id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.redirect('/indexDep');
}
})
} else {
  res.redirect('/login');
}
})

router.get('/login', (req, res)=>{
  res.render('login');
})

router.get('/register', (req, res)=>{
  res.render('register');
})

//crear registros Compe
router.get('/createCompe', (req,res)=>{
    if (req.session.loggedin) {
	res.render('createCompe');		
} else {
  res.render('login.ejs');   
}
}); 

//editar registros Compe
router.get('/editCompe/:id', (req,res)=>{
	if (req.session.loggedin) {
  const id = req.params.id;
  conexion.query('SELECT * FROM competencias WHERE id=?', [id], (error, results)=>{
  if (error) {
    throw error;
  } else {
    res.render('editCompe', {competencias:results[0]});   
  }
})
} else {
    res.redirect('/login'); 
  }
})

//eliminar registros Compe
router.get('/deleteCompe/:id', (req,res)=>{ 
	if (req.session.loggedin) {
  const id = req.params.id;
  conexion.query('DELETE FROM competencias WHERE id= ?',[id], (error, results)=>{
  if (error) {
    throw error;
  } else {
    res.redirect('/indexCompe');
  }
})
} else {
    res.redirect('/login');
  }
})

//crear registros candidatos
router.get('/createCan', (req,res)=>{
if (req.session.loggedin) {
  conexion.query('SELECT id,nombre FROM departamento WHERE estado = "1"', (error, results)=>{
    conexion.query('SELECT id,descripcion FROM capacitaciones', (error, resultsCapa)=>{
    conexion.query('SELECT id,nombre FROM puestos WHERE estado = "1"', (error, puestoresults)=>{
      conexion.query('SELECT id,descripcion FROM competencias WHERE estado = "1"', (error, resultsCompe)=>{
        conexion.query('SELECT * FROM experiencia', (error, resultsExpe)=>{
    // console.log(results);
    if (error) {
      throw error;
    } else {
      res.render('createCan',{
        results:results,
        puestoresults:puestoresults,
        resultsCompe:resultsCompe,
        resultsExpe:resultsExpe,
        resultsCapa:resultsCapa
      });		
    }
  })	
})	
})	
})	
})	
} else {
res.render('login.ejs');   
}
})

//editar registros candidatos
router.get('/editCan/:id', (req,res)=>{
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('SELECT * FROM candidato WHERE id=?', [id], (error, results)=>{
  conexion.query('SELECT * FROM candidato',(error, results)=>{
    conexion.query('SELECT id,nombre FROM departamento WHERE estado = "1"',(error, resultsdep)=>{
      conexion.query('SELECT id,nombre FROM puestos WHERE estado = "1"',(error, resultspues)=>{
        conexion.query('SELECT id,descripcion FROM capacitaciones',(error, resultscap)=>{
          conexion.query('SELECT id,descripcion FROM competencias WHERE estado = "1"',(error, resultscom)=>{
            conexion.query('SELECT id,empresa FROM experiencia',(error, resultsexp)=>{
      datos = resultsdep;
      datospu = resultspues;
      datoscom = resultscom;
      datoscap = resultscap;
      datosexp = resultsexp;
if (error) {
  throw error;
} else {
  res.render('editCan', {candidato:results[0]});   
}
})
})
})
})
})
})
})
} else {
  res.redirect('/login'); 
}
})

//eliminar registros candidatos
router.get('/deleteCan/:id', (req,res)=>{ 
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('DELETE FROM candidato WHERE id= ?',[id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.redirect('/indexCan');
}
})
} else {
  res.redirect('/login');
}
})


//crear registros Capa
router.get('/createCapa', (req,res)=>{
  if (req.session.loggedin) {
res.render('createCapa');		
} else {
res.render('login.ejs');   
}
}); 

//editar registros Capa
router.get('/editCapa/:id', (req,res)=>{
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('SELECT * FROM capacitaciones WHERE id=?', [id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.render('editCapa', {capacitaciones:results[0]});   
}
})
} else {
  res.redirect('/login'); 
}
})

//eliminar registros Capa
router.get('/deleteCapa/:id', (req,res)=>{ 
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('DELETE FROM capacitaciones WHERE id= ?',[id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.redirect('/indexCapa');
}
})
} else {
  res.redirect('/login');
}
})


//crear registros Puesto
router.get('/createPuesto', (req,res)=>{
  if (req.session.loggedin) {
res.render('createPuesto');		
} else {
res.render('login.ejs');   
}
}); 

//editar registros Puesto
router.get('/editPuesto/:id', (req,res)=>{
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('SELECT * FROM puestos WHERE id=?', [id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.render('editPuesto', {puestos:results[0]});   
}
})
} else {
  res.redirect('/login'); 
}
})

//eliminar registros Puesto
router.get('/deletePuesto/:id', (req,res)=>{ 
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('DELETE FROM puestos WHERE id= ?',[id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.redirect('/indexPuesto');
}
})
} else {
  res.redirect('/login');
}
})

//crear registros experiencia
router.get('/createExpe', (req,res)=>{
  if (req.session.loggedin) {
res.render('createExpe');		
} else {
res.render('login.ejs');   
}
}); 

//editar registros experiencia
router.get('/editExpe/:id', (req,res)=>{
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('SELECT * FROM experiencia WHERE id=?', [id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.render('editExpe', {experiencia:results[0]});   
}
})
} else {
  res.redirect('/login'); 
}
})

//eliminar registros experiencia
router.get('/deleteExpe/:id', (req,res)=>{ 
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('DELETE FROM experiencia WHERE id= ?',[id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.redirect('/indexExpe');
}
})
} else {
  res.redirect('/login');
}
})


//crear registros empleados
router.get('/createEmp', (req,res)=>{
  if (req.session.loggedin) {
  conexion.query('SELECT id,nombre FROM departamento WHERE estado = "1"', (error, results)=>{
    conexion.query('SELECT id,nombre FROM puestos WHERE estado = "1"', (error, puestoresults)=>{
    // console.log(results);
    if (error) {
      throw error;
    } else {
      res.render('createEmp',{
        results:results,
        puestoresults:puestoresults
      });		
    }
    })	
  })	
} else {
res.render('login.ejs');   
}
}); 

//editar registros empleados
router.get('/editEmp/:id', (req,res)=>{
if (req.session.loggedin) {
const id = req.params.id;
conexion.query('SELECT * FROM empleados WHERE id=?', [id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.render('editEmp', {empleados:results[0]});   
}
})
} else {
  res.redirect('/login'); 
}
})

//eliminar registros empleados
router.get('/deleteEmp/:id', (req,res)=>{ 
if (req.session.loggedin) {
    const id = req.params.id;
conexion.query('DELETE FROM empleados WHERE id= ?',[id], (error, results)=>{
if (error) {
  throw error;
} else {
  res.redirect('/indexEmp');
}
})
} else {
  res.redirect('/login');
}
})

router.get('/login', (req, res)=>{
  res.render('login');
})

const crud = require('./controllers/crud');
const { application } = require("express");
router.post('/save', crud.save)
router.post('/update', crud.update)

router.post('/saveCompe', crud.saveCompe)
router.post('/updateCompe', crud.updateCompe)

router.post('/saveCapa', crud.saveCapa)
router.post('/updateCapa', crud.updateCapa)

router.post('/savePuesto', crud.savePuesto)
router.post('/updatePuesto', crud.updatePuesto)

router.post('/saveExpe', crud.saveExpe)
router.post('/updateExpe', crud.updateExpe)

router.post('/saveDep', crud.saveDep)
router.post('/updateDep', crud.updateDep)

router.post('/saveEmp', crud.saveEmp)
router.post('/updateEmp', crud.updateEmp)

router.post('/saveCan', crud.saveCan)
router.post('/updateCan', crud.updateCan)


router.post('/register', async (req, res)=>{
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;

  let passwordHaash = await bcryptjs.hash(pass, 8);
  conexion.query('INSERT INTO users SET ?', {user:user, name:name, rol:rol, pass:passwordHaash}, async(error, results)=>{
    if (error) {
      throw error;
    } else {
      res.render('register', {
				alert: true,
				alertTitle: "Registration",
				alertMessage: "¡Successful Registration!",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: 'login'
			});
    }
  })
})

router.post('/auth', async (req, res)=> {
	const user = req.body.user;
	const pass = req.body.pass;    
    let passwordHash = await bcryptjs.hash(pass, 8);
	if (user && pass) {
		conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results, fields)=> {
			if( results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass)) ) {    
				res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "USUARIO y/o PASSWORD incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    });
							
			} else {           
				req.session.loggedin = true;                
				req.session.name = results[0].name;
        conexion.query("SELECT rol FROM users WHERE user=? ", [user], function (err, row) {
          if (row[0].rol == 'admin') {
				res.render('login', {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: ''
				});			
				}else{
          {
            res.render('login', {
              alert: true,
              alertTitle: "Conexión exitosa",
              alertMessage: "¡LOGIN CORRECTO!",
              alertIcon:'success',
              showConfirmButton: false,
              timer: 1500,
              ruta: 'indexCanUsers'
            });	
        }
			    res.end();
        }
        })
		  }
    })
  } else {	
		res.send('Please enter user and Password!');
		res.end();
	}
});


router.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

router.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/login') 
	})
});

router.get('/', (req, res)=> {
	conexion.query('SELECT * FROM idiomas',(error, results)=>{
		if(error) {
		  throw error;
	  } else {
	  if (req.session.loggedin) {
		  res.render('index',{
			  login: true,
			  name: req.session.name,
			  results:results
		  });		
	  } else {
		res.render('index.ejs', {results:results,login:false,
			name:'Debe iniciar sesión',	});   	
	  }
	  res.end();
  }
  })
  });
  
router.get('/indexCanUsers', (req, res)=> {
  conexion.query('SELECT nombre,nivelRiesgo,nivelSalarioMinimo,nivelSalarioMaximo FROM puestos WHERE estado = "1"', (error, puestoresults)=>{
	  if (req.session.loggedin) {
		  res.render('indexCanUsers',{
			  login: true,
			  name: req.session.name,
        puestoresults:puestoresults
		  });		
	  } else {
		res.render('indexCanUsers.ejs', {login:false,
			name:'Debe iniciar sesión',	});   	
	  }
	  res.end();
  })
});

    
router.get('/indexExpeUsers', (req, res)=> {
  conexion.query('SELECT empresa,puesto,fechaPre,fechaPos,salario FROM experiencia', (error, results)=>{
	  if (req.session.loggedin) {
		  res.render('indexExpeUsers',{
			  login: true,
			  name: req.session.name,
        results:results
		  });		
	  } else {
		res.render('indexExpeUsers.ejs', {login:false,
			name:'Debe iniciar sesión',	});   	
	  }
	  res.end();
  })
  });

  router.get('/indexCompe', (req, res)=> {
	conexion.query('SELECT * FROM competencias',(error, results)=>{
		if(error) {
		  throw error;
	  } else {
	  if (req.session.loggedin) {
		  res.render('indexCompe',{
			  login: true,
			  name: req.session.name,
			  results:results
		  });		
	  } else {
		res.render('indexCompe.ejs', {results:results,login:false,
			name:'Debe iniciar sesión',	});   	
	  }
	  res.end();
  }
  })
  });

  

  router.get('/indexCapa', (req, res)=> {
    conexion.query('SELECT * FROM capacitaciones',(error, results)=>{
      if(error) {
        throw error;
      } else {
      if (req.session.loggedin) {
        res.render('indexCapa',{
          login: true,
          name: req.session.name,
          results:results
        });		
      } else {
      res.render('indexCapa.ejs', {results:results,login:false,
        name:'Debe iniciar sesión',	});   	
      }
      res.end();
    }
    })
    });
    
    router.get('/indexPuesto', (req, res)=> {
      conexion.query('SELECT * FROM puestos',(error, results)=>{
        if(error) {
          throw error;
        } else {
        if (req.session.loggedin) {
          res.render('indexPuesto',{
            login: true,
            name: req.session.name,
            results:results
          });		
        } else {
        res.render('indexPuesto.ejs', {results:results,login:false,
          name:'Debe iniciar sesión',	});   	
        }
        res.end();
      }
      })
      });

      router.get('/indexExpe', (req, res)=> {
        conexion.query('SELECT * FROM experiencia',(error, results)=>{
          if(error) {
            throw error;
          } else {
          if (req.session.loggedin) {
            res.render('indexExpe',{
              login: true,
              name: req.session.name,
              results:results
            });		
          } else {
          res.render('indexExpe.ejs', {results:results,login:false,
            name:'Debe iniciar sesión',	});   	
          }
          res.end();
        }
        })
        });

        router.get('/indexDep', (req, res)=> {
          conexion.query('SELECT * FROM departamento',(error, results)=>{
            if(error) {
              throw error;
            } else {
            if (req.session.loggedin) {
              res.render('indexDep',{
                login: true,
                name: req.session.name,
                results:results
              });		
            } else {
            res.render('indexDep.ejs', {results:results,login:false,
              name:'Debe iniciar sesión',	});   	
            }
            res.end();
          }
          })
          });

        router.get('/indexEmp', (req, res)=> {
          conexion.query('SELECT id,nombre FROM departamento',(error, resultsdep)=>{
            conexion.query('SELECT id,nombre FROM puestos',(error, resultspues)=>{
              conexion.query('SELECT * FROM candidatos',(error, resultsCan)=>{
          conexion.query('SELECT * FROM empleados',(error, results)=>{
            datos = resultsdep;
                datospu = resultspues;
                datoscan = resultsCan;
            if(error) {
              throw error;
            } else {
            if (req.session.loggedin) {
              res.render('indexEmp',{
                login: true,
                name: req.session.name,
                results:results,
                resultsdep:resultsdep
              });		
            } else {
            res.render('indexEmp.ejs', {results:results,login:false,
              name:'Debe iniciar sesión',	});   	
            }
            res.end();
          }
          })
        })
      })
    })
          });

          router.get('/indexCan', (req, res)=> {
            conexion.query('SELECT * FROM candidato',(error, results)=>{
              conexion.query('SELECT id,nombre FROM departamento',(error, resultsdep)=>{
                conexion.query('SELECT id,nombre FROM puestos',(error, resultspues)=>{
                  conexion.query('SELECT id,descripcion FROM capacitaciones',(error, resultscap)=>{
                    conexion.query('SELECT id,descripcion FROM competencias',(error, resultscom)=>{
                      conexion.query('SELECT id,empresa FROM experiencia',(error, resultsexp)=>{
                datos = resultsdep;
                datospu = resultspues;
                datoscom = resultscom;
                datoscap = resultscap;
                datosexp = resultsexp;
              if(error) {
                throw error;
              } else {
              if (req.session.loggedin) {
                res.render('indexCan',{
                  login: true,
                  name: req.session.name,
                  results:results,
                });		
              } else {
              res.render('indexCan.ejs', {results:results,login:false,
                name:'Debe iniciar sesión',	});   	
              }
              res.end();
            }
            })
          })
        })
      })
    })
  })
            });

            router.get('/pushCan/:id', (req, res)=> {
              conexion.query('SELECT id,cedula,nombre,departamento,puestoAspira,salarioAspira FROM candidato',(error, results)=>{
                  datos = results;
                  const id = req.params.id;
                  numero = id - 1;
                  const date = new Date();
                  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];  
                  datofecha = day + "-" + month + "-" + year;
                  datoestado = '1';
                  conexion.query('INSERT INTO empleados SET ?',{cedula:datos[numero].cedula, fechaIngreso:datofecha, 
                    nombre:datos[numero].nombre, departamento:datos[numero].departamento, puesto:datos[numero].puestoAspira,
                     salarioMensual:datos[numero].salarioAspira, estado:datoestado }, (error, resultsemp)=>{
                    conexion.query('DELETE FROM candidato WHERE id= ?',[id], (error, results)=>{
                if(error) {
                  throw error;
                } else {
                  res.redirect('/indexCan');
                  alert('Promocion realizada con exito!') 
                }
              })
            })
            })
            
            });
            
module.exports = router;
