const express = require("express");
const router = express.Router();
const conexion = require("./database/db");

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

const crud = require('./controllers/crud');
router.post('/save', crud.save)
router.post('/update', crud.update)


module.exports = router;

