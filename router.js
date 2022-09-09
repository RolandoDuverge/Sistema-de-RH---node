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

const crud = require('./controllers/crud');
router.post('/save', crud.save)

module.exports = router;