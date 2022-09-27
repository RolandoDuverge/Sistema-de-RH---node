const conexion = require("../database/db");
const alert = require("alert");
const { parse } = require("dotenv");
exports.save = (req, res) => {
  const nombre = req.body.nombre;
  const estado = req.body.estado;
  conexion.query(
    "INSERT INTO idiomas SET ?",
    { nombre: nombre, estado: estado },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //console.log(results);
        res.redirect("/");
      }
    }
  );
};

exports.update = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const estado = req.body.estado;
  conexion.query(
    "UPDATE idiomas SET ? WHERE id = ?",
    [{ nombre: nombre, estado: estado }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
};

exports.saveCompe = (req, res) => {
  const descripcion = req.body.descripcion;
  const estado = req.body.estado;
  conexion.query(
    "INSERT INTO competencias SET ?",
    { descripcion: descripcion, estado: estado },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //console.log(results);
        res.redirect("/indexCompe");
      }
    }
  );
};

exports.updateCompe = (req, res) => {
  const id = req.body.id;
  const descripcion = req.body.descripcion;
  const estado = req.body.estado;
  conexion.query(
    "UPDATE competencias SET ? WHERE id = ?",
    [{ descripcion: descripcion, estado: estado }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/indexCompe");
      }
    }
  );
};

exports.saveDep = (req, res) => {
  const nombre = req.body.nombre;
  const estado = req.body.estado;
  conexion.query(
    "INSERT INTO departamento SET ?",
    { nombre: nombre, estado: estado },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //console.log(results);
        res.redirect("/indexDep");
      }
    }
  );
};

exports.updateDep = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const estado = req.body.estado;
  conexion.query(
    "UPDATE departamento SET ? WHERE id = ?",
    [{ nombre: nombre, estado: estado }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/indexDep");
      }
    }
  );
};

exports.saveCapa = (req, res) => {
  const descripcion = req.body.descripcion;
  const nivel = req.body.nivel;
  const fechaPre = req.body.fechaPre;
  const fechaPos = req.body.fechaPos;
  const institucion = req.body.institucion;
  if (Date.parse(fechaPos) < Date.parse(fechaPre)) {
    alert("La fecha final debe ser mayor a la fecha inicial");
  } else {
    conexion.query(
      "INSERT INTO capacitaciones SET ?",
      {
        descripcion: descripcion,
        nivel: nivel,
        fechaPre: fechaPre,
        fechaPos: fechaPos,
        institucion: institucion,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexCapa");
        }
      }
    );
  }
};

exports.updateCapa = (req, res) => {
  const id = req.body.id;
  const descripcion = req.body.descripcion;
  const nivel = req.body.nivel;
  const fechaPre = req.body.fechaPre;
  const fechaPos = req.body.fechaPos;
  const institucion = req.body.institucion;
  if (Date.parse(fechaPos) < Date.parse(fechaPre)) {
    alert("La fecha final debe ser mayor a la fecha inicial");
  } else {
    conexion.query(
      "UPDATE capacitaciones SET ? WHERE id = ?",
      [
        {
          descripcion: descripcion,
          nivel: nivel,
          fechaPre: fechaPre,
          fechaPos: fechaPos,
          institucion: institucion,
        },
        id,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexCapa", {
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    );
  }
};

exports.savePuesto = (req, res) => {
  const nombre = req.body.nombre;
  const nivelRiesgo = req.body.nivelRiesgo;
  const nivelSalarioMinimo = req.body.nivelSalarioMinimo;
  const nivelSalarioMaximo = req.body.nivelSalarioMaximo;
  const estado = req.body.estado;
  if (parseInt(nivelSalarioMaximo) < parseInt(nivelSalarioMinimo)) {
    alert("El salario maximo debe ser mayor al salario minimo");
  } else {
    conexion.query(
      "INSERT INTO puestos SET ?",
      {
        nombre: nombre,
        nivelRiesgo: nivelRiesgo,
        nivelSalarioMinimo: nivelSalarioMinimo,
        nivelSalarioMaximo: nivelSalarioMaximo,
        estado: estado,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          //console.log(results);
          res.redirect("/indexPuesto");
        }
      }
    );
  }
};

exports.updatePuesto = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const nivelRiesgo = req.body.nivelRiesgo;
  const nivelSalarioMinimo = req.body.nivelSalarioMinimo;
  const nivelSalarioMaximo = req.body.nivelSalarioMaximo;
  const estado = req.body.estado;
  if (parseInt(nivelSalarioMaximo) < parseInt(nivelSalarioMinimo)) {
    alert("El salario maximo debe ser mayor al salario minimo");
  } else {
    conexion.query(
      "UPDATE puestos SET ? WHERE id = ?",
      [
        {
          nombre: nombre,
          nivelRiesgo: nivelRiesgo,
          nivelSalarioMinimo: nivelSalarioMinimo,
          nivelSalarioMaximo: nivelSalarioMaximo,
          estado: estado,
        },
        id,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexPuesto");
        }
      }
    );
  }
};

exports.saveExpe = (req, res) => {
  const empresa = req.body.empresa;
  const puesto = req.body.puesto;
  const fechaPre = req.body.fechaPre;
  const fechaPos = req.body.fechaPos;
  const salario = req.body.salario;
  if (Date.parse(fechaPos) < Date.parse(fechaPre)) {
    alert("La fecha final debe ser mayor a la fecha inicial");
  } else {
    conexion.query(
      "INSERT INTO experiencia SET ?",
      {
        empresa: empresa,
        puesto: puesto,
        fechaPre: fechaPre,
        fechaPos: fechaPos,
        salario: salario,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexExpeUsers");
        }
      }
    );
  }
};

exports.updateExpe = (req, res) => {
  const id = req.body.id;
  const empresa = req.body.empresa;
  const puesto = req.body.puesto;
  const fechaPre = req.body.fechaPre;
  const fechaPos = req.body.fechaPos;
  const salario = req.body.salario;
  if (Date.parse(fechaPos) < Date.parse(fechaPre)) {
    alert("La fecha final debe ser mayor a la fecha inicial");
  } else {
    conexion.query(
      "UPDATE experiencia SET ? WHERE id = ?",
      [
        {
          empresa: empresa,
          puesto: puesto,
          fechaPre: fechaPre,
          fechaPos: fechaPos,
          salario: salario,
        },
        id,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexExpe");
        }
      }
    );
  }
};

exports.saveEmp = (req, res) => {
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const fechaIngreso = req.body.fechaIngreso;
  const departamento = req.body.departamento;
  const puesto = req.body.puesto;
  const salarioMensual = req.body.salarioMensual;
  const estado = req.body.estado;
  // console.log(cedula);
  function validar_cedula(cedula) {
    if (typeof cedula != "string") return false;

    //cleanup
    cedula = cedula.replace(/-/g, "");

    // La cédula debe tener 11 dígitos
    if (cedula.length != 11) return false;

    // Validar serie
    if (
      parseInt(cedula.substring(0, 3)) != 402 &&
      parseInt(cedula.substring(0, 3)) > 121 &&
      parseInt(cedula.substring(0, 3)) < 1
    )
      return false;

    var suma = 0;
    var verificador = 0;

    for (var i = 0; i < cedula.length; i++) {
      let n = cedula.charAt(i);
      //No ejecutar el ultimo digito
      if (i == cedula.length - 1) break;

      // Los dígitos pares valen 2 y los impares 1
      let multiplicador = parseInt(i) % 2 == 0 ? 1 : 2;

      // Se multiplica cada dígito por su paridad
      let digito = parseInt(n) * parseInt(multiplicador);

      // Si la multiplicación da de dos dígitos, se suman entre sí
      digito =
        digito > 9
          ? [...digito.toString()]
              .map((e) => parseInt(e))
              .reduce((a, b) => a + b)
          : digito;

      // Se va haciendo la acumulación de esa suma
      suma = suma + digito;
    }
    // Al final se obtiene el verificador con la siguiente fórmula
    verificador = (10 - (suma % 10)) % 10;

    // Se comprueba el verificador
    return verificador == parseInt(cedula.slice(-1));
  }
  if (validar_cedula(cedula)) {
    // console.log(validar_cedula(cedula));
    conexion.query(
      "INSERT INTO empleados SET ?",
      {
        cedula: cedula,
        nombre: nombre,
        fechaIngreso: fechaIngreso,
        departamento: departamento,
        puesto: puesto,
        salarioMensual: salarioMensual,
        estado: estado,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexEmp");
        }
      }
    );
  } else {
    alert("La cedula no es valida");
  }
};

exports.updateEmp = (req, res) => {
  const id = req.body.id;
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const fechaIngreso = req.body.fechaIngreso;
  const departamento = req.body.departamento;
  const puesto = req.body.puesto;
  const salarioMensual = req.body.salarioMensual;
  const estado = req.body.estado;
  function validar_cedula(cedula) {
    if (typeof cedula != "string") return false;

    //cleanup
    cedula = cedula.replace(/-/g, "");

    // La cédula debe tener 11 dígitos
    if (cedula.length != 11) return false;

    // Validar serie
    if (
      parseInt(cedula.substring(0, 3)) != 402 &&
      parseInt(cedula.substring(0, 3)) > 121 &&
      parseInt(cedula.substring(0, 3)) < 1
    )
      return false;

    var suma = 0;
    var verificador = 0;

    for (var i = 0; i < cedula.length; i++) {
      let n = cedula.charAt(i);
      //No ejecutar el ultimo digito
      if (i == cedula.length - 1) break;

      // Los dígitos pares valen 2 y los impares 1
      let multiplicador = parseInt(i) % 2 == 0 ? 1 : 2;

      // Se multiplica cada dígito por su paridad
      let digito = parseInt(n) * parseInt(multiplicador);

      // Si la multiplicación da de dos dígitos, se suman entre sí
      digito =
        digito > 9
          ? [...digito.toString()]
              .map((e) => parseInt(e))
              .reduce((a, b) => a + b)
          : digito;

      // Se va haciendo la acumulación de esa suma
      suma = suma + digito;
    }
    // Al final se obtiene el verificador con la siguiente fórmula
    verificador = (10 - (suma % 10)) % 10;

    // Se comprueba el verificador
    return verificador == parseInt(cedula.slice(-1));
  }
  if (validar_cedula(cedula)) {
    conexion.query(
      "UPDATE empleados SET ? WHERE id = ?",
      [
        {
          cedula: cedula,
          nombre: nombre,
          fechaIngreso: fechaIngreso,
          departamento: departamento,
          puesto: puesto,
          salarioMensual: salarioMensual,
          estado: estado,
        },
        id,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexEmp");
        }
      }
    );
  } else {
    alert("La cedula no es valida");
  }
};

exports.saveCan = (req, res) => {
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const puestoAspira = req.body.puestoAspira;
  const departamento = req.body.departamento;
  const salarioAspira = req.body.salarioAspira;
  const principalesCompetencias = req.body.principalesCompetencias;
  const principalesCapacitaciones = req.body.principalesCapacitaciones;
  const experienciaLaboral = req.body.experienciaLaboral;
  const recomendado = req.body.recomendado;
  function validar_cedula(cedula) {
    if (typeof cedula != "string") return false;

    //cleanup
    cedula = cedula.replace(/-/g, "");

    // La cédula debe tener 11 dígitos
    if (cedula.length != 11) return false;

    // Validar serie
    if (
      parseInt(cedula.substring(0, 3)) != 402 &&
      parseInt(cedula.substring(0, 3)) > 121 &&
      parseInt(cedula.substring(0, 3)) < 1
    )
      return false;

    var suma = 0;
    var verificador = 0;

    for (var i = 0; i < cedula.length; i++) {
      let n = cedula.charAt(i);
      //No ejecutar el ultimo digito
      if (i == cedula.length - 1) break;

      // Los dígitos pares valen 2 y los impares 1
      let multiplicador = parseInt(i) % 2 == 0 ? 1 : 2;

      // Se multiplica cada dígito por su paridad
      let digito = parseInt(n) * parseInt(multiplicador);

      // Si la multiplicación da de dos dígitos, se suman entre sí
      digito =
        digito > 9
          ? [...digito.toString()]
              .map((e) => parseInt(e))
              .reduce((a, b) => a + b)
          : digito;

      // Se va haciendo la acumulación de esa suma
      suma = suma + digito;
    }
    // Al final se obtiene el verificador con la siguiente fórmula
    verificador = (10 - (suma % 10)) % 10;

    // Se comprueba el verificador
    return verificador == parseInt(cedula.slice(-1));
  }
  if (validar_cedula(cedula)) {
    conexion.query(
      "INSERT INTO candidato SET ?",
      {
        cedula: cedula,
        nombre: nombre,
        puestoAspira: puestoAspira,
        departamento: departamento,
        salarioAspira: salarioAspira,
        principalesCompetencias: principalesCompetencias,
        principalesCapacitaciones: principalesCapacitaciones,
        experienciaLaboral: experienciaLaboral,
        recomendado: recomendado,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexCanUsers");
        }
      }
    );
  } else {
    alert("La cedula no es valida");
  }
};

exports.updateCan = (req, res) => {
  const id = req.body.id;
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const puestoAspira = req.body.puestoAspira;
  const departamento = req.body.departamento;
  const salarioAspira = req.body.salarioAspira;
  const principalesCompetencias = req.body.principalesCompetencias;
  const principalesCapacitaciones = req.body.principalesCapacitaciones;
  const experienciaLaboral = req.body.experienciaLaboral;
  const recomendado = req.body.recomendado;
  function validar_cedula(cedula) {
    if (typeof cedula != "string") return false;

    //cleanup
    cedula = cedula.replace(/-/g, "");

    // La cédula debe tener 11 dígitos
    if (cedula.length != 11) return false;

    // Validar serie
    if (
      parseInt(cedula.substring(0, 3)) != 402 &&
      parseInt(cedula.substring(0, 3)) > 121 &&
      parseInt(cedula.substring(0, 3)) < 1
    )
      return false;

    var suma = 0;
    var verificador = 0;

    for (var i = 0; i < cedula.length; i++) {
      let n = cedula.charAt(i);
      //No ejecutar el ultimo digito
      if (i == cedula.length - 1) break;

      // Los dígitos pares valen 2 y los impares 1
      let multiplicador = parseInt(i) % 2 == 0 ? 1 : 2;

      // Se multiplica cada dígito por su paridad
      let digito = parseInt(n) * parseInt(multiplicador);

      // Si la multiplicación da de dos dígitos, se suman entre sí
      digito =
        digito > 9
          ? [...digito.toString()]
              .map((e) => parseInt(e))
              .reduce((a, b) => a + b)
          : digito;

      // Se va haciendo la acumulación de esa suma
      suma = suma + digito;
    }
    // Al final se obtiene el verificador con la siguiente fórmula
    verificador = (10 - (suma % 10)) % 10;

    // Se comprueba el verificador
    return verificador == parseInt(cedula.slice(-1));
  }
  if (validar_cedula(cedula)) {
    conexion.query(
      "UPDATE candidato SET ? WHERE id = ?",
      [
        {
          cedula: cedula,
          nombre: nombre,
          puestoAspira: puestoAspira,
          departamento: departamento,
          salarioAspira: salarioAspira,
          principalesCompetencias: principalesCompetencias,
          principalesCapacitaciones: principalesCapacitaciones,
          experienciaLaboral: experienciaLaboral,
          recomendado: recomendado,
        },
        id,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/indexCan");
        }
      }
    );
  } else {
    alert("La cedula no es valida");
  }
};
