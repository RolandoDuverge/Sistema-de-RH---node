const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_crudnode",
});

conexion.connect((error) => {
  if (error) {
    console.error("El error de conexion es: " + error);
    return;
  }
  console.log("Conectado a BD");
});

module.exports = conexion;
