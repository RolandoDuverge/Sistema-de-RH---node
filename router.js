const express = require("express");
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
				ruta: ''
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
				res.render('login', {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: ''
				});        			
			}			
			res.end();
		});
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

module.exports = router;
