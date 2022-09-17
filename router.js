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

const crud = require('./controllers/crud');
const { application } = require("express");
router.post('/save', crud.save)
router.post('/update', crud.update)

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


module.exports = router;
