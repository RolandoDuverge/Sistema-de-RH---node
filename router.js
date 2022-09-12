const express = require("express");
const router = express.Router();
const conexion = require("./database/db");
const bcryptjs = require('bcryptjs');

router.get('/', (req, res) => {
  conexion.query('SELECT * FROM idiomas',(error, results)=>{
    if (error) {
      throw error;
    } else {
      res.render('index.ejs', {results:results});   
    }
  })
})
//crear registros
router.get('/create', (req,res)=>{
  res.render('create');
})

//editar registros
router.get('/edit/:id', (req,res)=>{
  const id = req.params.id;
  conexion.query('SELECT * FROM idiomas WHERE id=?', [id], (error, results)=>{
  if (error) {
    throw error;
  } else {
    res.render('edit', {idiomas:results[0]});   
  }
})
})

//eliminar registros
router.get('/delete/:id', (req,res)=>{ 
  const id = req.params.id;
  conexion.query('DELETE FROM idiomas WHERE id= ?',[id], (error, results)=>{
  if (error) {
    throw error;
  } else {
    res.redirect('/');
  }
})
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

module.exports = router;

