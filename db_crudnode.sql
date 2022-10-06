-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 01-10-2022 a las 19:10:11
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_crudnode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `candidato`
--

DROP TABLE IF EXISTS `candidato`;
CREATE TABLE IF NOT EXISTS `candidato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `puestoAspira` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `departamento` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `salarioAspira` float NOT NULL,
  `principalesCompetencias` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `principalesCapacitaciones` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `experienciaLaboral` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `recomendado` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departamento` (`departamento`),
  KEY `principalesCompetencias` (`principalesCompetencias`,`principalesCapacitaciones`),
  KEY `experienciaLaboral` (`experienciaLaboral`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `candidato`
--

INSERT INTO `candidato` (`id`, `cedula`, `nombre`, `puestoAspira`, `departamento`, `salarioAspira`, `principalesCompetencias`, `principalesCapacitaciones`, `experienciaLaboral`, `recomendado`) VALUES
(3, '01800592980', 'a', '1', '1', 12, '1', '1', '1', '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capacitaciones`
--

DROP TABLE IF EXISTS `capacitaciones`;
CREATE TABLE IF NOT EXISTS `capacitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nivel` int(55) NOT NULL,
  `fechaPre` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fechaPos` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `institucion` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `capacitaciones`
--

INSERT INTO `capacitaciones` (`id`, `descripcion`, `nivel`, `fechaPre`, `fechaPos`, `institucion`) VALUES
(1, 'Fundamentos de estadisticas', 1, '2022-09-08', '2022-10-07', 'OYM'),
(2, 'Entorno economico', 0, '2022-09-02', '2022-09-29', 'UASD'),
(3, 'Power Point', 4, '2022-09-01', '2022-10-07', 'ITLA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencias`
--

DROP TABLE IF EXISTS `competencias`;
CREATE TABLE IF NOT EXISTS `competencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` varchar(12) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `competencias`
--

INSERT INTO `competencias` (`id`, `descripcion`, `estado`) VALUES
(1, 'Organizacionales', '1'),
(2, 'Tecnicas', '0'),
(3, 'Operativas', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

DROP TABLE IF EXISTS `departamento`;
CREATE TABLE IF NOT EXISTS `departamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `nombre`, `estado`) VALUES
(1, 'Administracion', '1'),
(2, 'Recursos Humanos', '1'),
(3, 'Ventas', '1'),
(4, 'contabilidad', '1'),
(5, 'Servicios', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

DROP TABLE IF EXISTS `empleados`;
CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fechaIngreso` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `departamento` int(11) NOT NULL,
  `puesto` int(11) NOT NULL,
  `salarioMensual` float NOT NULL,
  `estado` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `empleado_deparatamento` (`departamento`),
  KEY `empleado_puesto` (`puesto`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `cedula`, `nombre`, `fechaIngreso`, `departamento`, `puesto`, `salarioMensual`, `estado`) VALUES
(23, '01800592980', 'a', '2022-10-08', 1, 1, 22, '1'),
(24, '01800592980', 'asd', '2022-09-28', 4, 3, 12312, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencia`
--

DROP TABLE IF EXISTS `experiencia`;
CREATE TABLE IF NOT EXISTS `experiencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `puesto` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fechaPre` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fechaPos` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `salario` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `experiencia`
--

INSERT INTO `experiencia` (`id`, `empresa`, `puesto`, `fechaPre`, `fechaPos`, `salario`) VALUES
(1, 'WebDev', 'Gestion base de datos', '2022-09-29', '2022-10-08', 500000),
(2, 'WebTech', 'Desarrollador web', '2022-08-30', '2022-10-07', 24000),
(3, 'NavDoth', 'Gestor de proyectos', '2022-08-31', '2022-09-30', 30000),
(4, 'NavBarTech', 'TI', '2022-08-30', '2022-09-30', 25000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idiomas`
--

DROP TABLE IF EXISTS `idiomas`;
CREATE TABLE IF NOT EXISTS `idiomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `idiomas`
--

INSERT INTO `idiomas` (`id`, `nombre`, `estado`) VALUES
(1, 'Aleman', 1),
(2, 'Frances', 1),
(3, 'Ingles', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puestos`
--

DROP TABLE IF EXISTS `puestos`;
CREATE TABLE IF NOT EXISTS `puestos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nivelRiesgo` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nivelSalarioMinimo` float NOT NULL,
  `nivelSalarioMaximo` float NOT NULL,
  `estado` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `puestos`
--

INSERT INTO `puestos` (`id`, `nombre`, `nivelRiesgo`, `nivelSalarioMinimo`, `nivelSalarioMaximo`, `estado`) VALUES
(1, 'Coordinador de TI', '2', 60000, 80000, '1'),
(2, 'Programador', '2', 30000, 75000, '0'),
(3, 'Analista de datos', '1', 35000, 90000, '1'),
(4, 'Desarrollador web', '1', 46000, 55000, '1'),
(5, 'Desarrollador Java junior', '1', 25000, 30000, '1'),
(6, 'Administrador BD', '2', 45000, 68000, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `name` varchar(55) COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `name`, `rol`, `pass`) VALUES
(2, 'admin', 'admin', 'admin', '$2a$08$sq81xfFDt6eWKV5ipUulq.aC1NdSy8l0KOVS/Rua5tJ6CBsk1PTsu'),
(3, 'user', 'User', 'data entry', '$2a$08$TE4fueZXVINqyt.aAt0dX.sQ8EnabYPmk9VtZWrf3hASQF5hzGebm'),
(5, 'test', 'test', 'data entry', '$2a$08$/b8xsEvXUKBwlKU/byAvnOcA7ksuBFygL936eoVs2c.s4dU50hPV6');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
