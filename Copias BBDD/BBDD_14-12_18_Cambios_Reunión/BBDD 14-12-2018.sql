# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: eu-cdbr-west-02.cleardb.net (MySQL 5.6.42-log)
# Base de datos: heroku_de42e77cc297366
# Tiempo de Generación: 2018-12-14 12:43:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla alergenos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `alergenos`;

CREATE TABLE `alergenos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) NOT NULL,
  `img_alergeno` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `alergenos` WRITE;
/*!40000 ALTER TABLE `alergenos` DISABLE KEYS */;

INSERT INTO `alergenos` (`id`, `nombre`, `img_alergeno`)
VALUES
	(1,'Gluten','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png'),
	(2,'Crustáceos','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoCrustaceo-Crustaceans_icon-icons.com_67603.png'),
	(3,'Huevos','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoHuevo-Egg_icon-icons.com_67598.png'),
	(4,'Pescado','https://cdn.icon-icons.com/icons2/852/PNG/512/Fish_icon-icons.com_67594.png'),
	(5,'Cacahuetes','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoCacahuete-Peanuts_icon-icons.com_67604.png'),
	(6,'Soja','https://cdn.icon-icons.com/icons2/852/PNG/512/Soy_icon-icons.com_67593.png'),
	(7,'Lácteos','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoLacteos-DairyProducts_icon-icons.com_67597.png'),
	(8,'Frutos de Cáscara','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoFrutosCascaraPeelFruits_icon-icons.com_67601.png'),
	(9,'Apio','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoApio-Celery_icon-icons.com_67605.png'),
	(10,'Mostaza','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoMostaza-Mustard_icon-icons.com_67595.png'),
	(11,'Granos de Sésamo','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGranosSesamo-SesameGrains_icon-icons.com_67599.png'),
	(12,'Dióxido de Azufre y Sulfitos','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoDioxidoAzufreSulfitosSulfurDioxideSulphites_icon-icons.com_67602.png'),
	(13,'Altramuces','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoAltramuces-Lupins_icon-icons.com_67606.png'),
	(14,'Moluscos','https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoMoluscos-Mollusks_icon-icons.com_67596.png');

/*!40000 ALTER TABLE `alergenos` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla alergenos_carta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `alergenos_carta`;

CREATE TABLE `alergenos_carta` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_carta` int(11) DEFAULT NULL,
  `id_alergeno` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alergeno_carta` (`id_carta`),
  KEY `alergeno_carta2` (`id_alergeno`),
  CONSTRAINT `alergeno_carta` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `alergeno_carta2` FOREIGN KEY (`id_alergeno`) REFERENCES `alergenos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `alergenos_carta` WRITE;
/*!40000 ALTER TABLE `alergenos_carta` DISABLE KEYS */;

INSERT INTO `alergenos_carta` (`id`, `id_carta`, `id_alergeno`)
VALUES
	(1,91,1),
	(11,91,4);

/*!40000 ALTER TABLE `alergenos_carta` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla carta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `carta`;

CREATE TABLE `carta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `precio` double NOT NULL,
  `tipo` int(11) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;

INSERT INTO `carta` (`id`, `nombre`, `precio`, `tipo`, `descripcion`, `disponible`)
VALUES
	(81,'Pimientos del piquillo',4,0,'unos pican otros no',1),
	(91,'Chuletón de buey',15,0,NULL,1),
	(101,'zumo_de_tomate',34,1,NULL,1),
	(261,'Tortilla de patata',3.5,1,'Tortilla con cebolla',1),
	(291,'Gambas al ajillo',9.9,0,'Picantes',1),
	(311,'Menestra de verduras',3.7,0,'  ',1),
	(411,'no',5,1,'Este plato no se insertara',1),
	(461,'no',5,1,'Este plato no se insertara',1),
	(481,'no',5,1,'Este plato no se insertara',1),
	(491,'no',5,1,'Este plato no se insertara',1),
	(501,'no',5,1,'Este plato no se insertara',1),
	(511,'no',5,1,'Este plato no se insertara',1),
	(521,'no',5,1,'Este plato no se insertara',1),
	(531,'no',5,1,'Este plato no se insertara',1),
	(541,'no',5,1,'Este plato no se insertara',1),
	(611,'Huevos fritos',32,0,'    ',1);

/*!40000 ALTER TABLE `carta` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla ingrediente
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ingrediente`;

CREATE TABLE `ingrediente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ingrediente` WRITE;
/*!40000 ALTER TABLE `ingrediente` DISABLE KEYS */;

INSERT INTO `ingrediente` (`id`, `nombre`)
VALUES
	(1,'Sal'),
	(2,'Patatas Fritas');

/*!40000 ALTER TABLE `ingrediente` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla ingredientes_carta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ingredientes_carta`;

CREATE TABLE `ingredientes_carta` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_carta` int(11) DEFAULT NULL,
  `id_ingrediente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carta` (`id_carta`),
  KEY `ingrediente` (`id_ingrediente`),
  CONSTRAINT `carta` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ingrediente` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingrediente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ingredientes_carta` WRITE;
/*!40000 ALTER TABLE `ingredientes_carta` DISABLE KEYS */;

INSERT INTO `ingredientes_carta` (`id`, `id_carta`, `id_ingrediente`)
VALUES
	(1,91,1),
	(2,91,2);

/*!40000 ALTER TABLE `ingredientes_carta` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item` (
  `id_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_carta` int(11) DEFAULT NULL,
  `num_pedido` int(11) DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `comentario` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_item`),
  KEY `id_carta` (`id_carta`),
  KEY `num_pedido` (`num_pedido`),
  CONSTRAINT `id_carta` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `num_pedido` FOREIGN KEY (`num_pedido`) REFERENCES `pedido` (`num_pedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;

INSERT INTO `item` (`id_item`, `id_carta`, `num_pedido`, `estado`, `comentario`)
VALUES
	(1,81,NULL,2,NULL),
	(21,NULL,NULL,1,NULL),
	(31,NULL,NULL,2,NULL),
	(91,NULL,NULL,0,NULL),
	(101,NULL,NULL,0,NULL),
	(121,NULL,NULL,0,NULL),
	(141,NULL,NULL,0,NULL),
	(161,NULL,NULL,0,NULL),
	(181,NULL,NULL,0,NULL),
	(201,NULL,NULL,0,NULL),
	(221,NULL,NULL,0,NULL),
	(241,NULL,NULL,0,NULL),
	(261,NULL,NULL,0,NULL),
	(281,NULL,NULL,0,NULL),
	(301,NULL,NULL,0,NULL),
	(321,NULL,NULL,0,NULL),
	(421,NULL,NULL,0,NULL),
	(431,NULL,NULL,0,NULL),
	(461,NULL,NULL,0,NULL),
	(471,NULL,NULL,0,NULL),
	(481,NULL,NULL,0,NULL),
	(491,NULL,NULL,0,NULL),
	(501,NULL,NULL,0,NULL),
	(511,NULL,NULL,0,NULL),
	(521,NULL,NULL,0,NULL),
	(531,NULL,NULL,0,NULL),
	(541,NULL,NULL,0,NULL),
	(551,NULL,NULL,0,NULL),
	(561,NULL,NULL,0,NULL),
	(571,NULL,NULL,0,NULL),
	(581,NULL,NULL,0,NULL),
	(591,NULL,NULL,0,NULL),
	(611,NULL,NULL,0,NULL),
	(791,NULL,NULL,0,NULL),
	(801,NULL,NULL,0,NULL),
	(811,NULL,NULL,0,NULL),
	(1011,NULL,NULL,0,NULL),
	(1161,NULL,NULL,0,NULL),
	(1171,NULL,NULL,0,NULL),
	(1181,NULL,NULL,0,NULL),
	(1191,NULL,NULL,0,NULL),
	(1201,NULL,NULL,0,NULL),
	(1211,NULL,NULL,0,NULL),
	(1221,NULL,NULL,0,NULL),
	(1231,NULL,NULL,0,NULL),
	(1241,NULL,NULL,0,NULL),
	(1271,NULL,NULL,0,NULL),
	(1281,NULL,NULL,0,NULL),
	(1291,NULL,NULL,0,NULL),
	(1301,NULL,NULL,0,NULL),
	(1311,NULL,NULL,0,NULL),
	(1321,NULL,NULL,0,NULL),
	(1331,NULL,NULL,0,NULL),
	(1361,NULL,NULL,0,NULL),
	(1371,NULL,NULL,0,NULL),
	(1661,NULL,NULL,0,NULL),
	(1711,NULL,NULL,0,NULL),
	(1721,NULL,NULL,0,NULL),
	(1731,NULL,NULL,0,NULL),
	(1741,NULL,NULL,0,''),
	(1771,NULL,NULL,0,''),
	(1781,NULL,NULL,0,''),
	(1791,NULL,NULL,0,''),
	(1801,NULL,NULL,0,''),
	(1811,NULL,NULL,0,''),
	(1821,NULL,NULL,0,''),
	(1831,NULL,NULL,0,''),
	(1841,NULL,NULL,0,''),
	(1851,NULL,NULL,0,''),
	(1881,NULL,NULL,0,''),
	(1891,NULL,NULL,0,''),
	(1901,NULL,NULL,0,''),
	(2111,NULL,NULL,0,''),
	(2121,NULL,NULL,0,''),
	(2151,NULL,NULL,0,''),
	(2161,NULL,NULL,0,''),
	(2171,NULL,NULL,0,''),
	(2181,NULL,NULL,0,''),
	(2191,NULL,NULL,0,''),
	(2201,NULL,NULL,0,''),
	(2211,NULL,NULL,0,''),
	(2261,NULL,NULL,0,''),
	(2291,NULL,NULL,0,''),
	(2301,NULL,NULL,0,''),
	(2371,NULL,NULL,0,''),
	(2421,NULL,NULL,0,''),
	(2431,NULL,NULL,0,''),
	(2461,NULL,NULL,0,''),
	(2501,NULL,NULL,0,''),
	(2511,NULL,NULL,0,''),
	(2521,NULL,NULL,0,''),
	(2531,NULL,NULL,0,''),
	(2561,NULL,NULL,0,''),
	(2571,NULL,NULL,0,'');

/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla pedido
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pedido`;

CREATE TABLE `pedido` (
  `mesa` int(11) NOT NULL,
  `num_comensales` int(11) NOT NULL,
  `num_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `estado_aviso` varchar(50) DEFAULT NULL,
  `estado_aviso_cuenta` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`num_pedido`),
  UNIQUE KEY `num_pedido` (`num_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;

INSERT INTO `pedido` (`mesa`, `num_comensales`, `num_pedido`, `estado_aviso`, `estado_aviso_cuenta`)
VALUES
	(1,2,1,NULL,NULL),
	(2,8,3,NULL,NULL),
	(5,3,4,NULL,NULL),
	(7,2,11,NULL,NULL),
	(7,2,21,NULL,NULL),
	(7,2,31,NULL,NULL),
	(7,2,41,NULL,NULL),
	(7,2,51,NULL,NULL),
	(7,2,61,NULL,NULL),
	(7,2,71,NULL,NULL),
	(7,2,81,NULL,NULL),
	(7,2,91,NULL,NULL),
	(7,2,101,NULL,NULL),
	(7,2,111,NULL,NULL),
	(6,2,121,NULL,NULL),
	(6,2,131,NULL,NULL),
	(5,2,141,NULL,NULL),
	(4,2,151,NULL,NULL),
	(3,2,161,NULL,NULL),
	(3,2,171,NULL,NULL),
	(3,2,181,NULL,NULL),
	(3,2,191,NULL,NULL),
	(3,2,201,NULL,NULL),
	(3,2,211,NULL,NULL),
	(3,2,221,NULL,NULL),
	(5,2,231,NULL,NULL),
	(5,2,241,NULL,NULL),
	(5,2,251,NULL,NULL),
	(5,2,261,NULL,NULL),
	(5,2,271,NULL,NULL),
	(5,2,281,NULL,NULL),
	(5,2,291,NULL,NULL),
	(5,2,331,NULL,NULL),
	(5,2,341,NULL,NULL),
	(5,1,361,NULL,NULL),
	(5,1,371,NULL,NULL),
	(5,1,381,NULL,NULL),
	(5,1,391,NULL,NULL),
	(5,1,401,NULL,NULL),
	(5,1,411,NULL,NULL),
	(5,1,421,NULL,NULL),
	(5,1,431,NULL,NULL),
	(5,1,441,NULL,NULL),
	(5,1,451,NULL,NULL),
	(5,1,461,NULL,NULL),
	(5,1,471,NULL,NULL),
	(5,1,481,NULL,NULL),
	(5,1,491,NULL,NULL),
	(5,1,501,NULL,NULL),
	(5,1,511,NULL,NULL),
	(5,1,521,NULL,NULL),
	(5,1,531,NULL,NULL),
	(5,1,541,NULL,NULL),
	(5,1,551,NULL,NULL),
	(5,1,561,NULL,NULL),
	(5,1,571,NULL,NULL),
	(5,1,581,NULL,NULL),
	(5,1,591,NULL,NULL),
	(5,1,601,NULL,NULL),
	(5,1,621,NULL,NULL),
	(5,1,631,NULL,NULL),
	(5,1,641,NULL,NULL),
	(5,1,651,NULL,NULL),
	(5,1,671,NULL,NULL),
	(5,1,681,NULL,NULL),
	(1,3,721,NULL,NULL),
	(1,3,731,NULL,NULL),
	(1,3,741,NULL,NULL),
	(1,1,791,NULL,NULL),
	(1,1,801,NULL,NULL),
	(3,1,901,NULL,NULL),
	(10,7,911,NULL,NULL),
	(10,7,921,NULL,NULL),
	(5,3,991,NULL,NULL),
	(5,3,1001,NULL,NULL),
	(5,3,1011,NULL,NULL),
	(5,3,1021,NULL,NULL),
	(5,3,1031,NULL,NULL),
	(5,3,1041,NULL,NULL),
	(5,3,1051,NULL,NULL),
	(5,3,1061,NULL,NULL),
	(5,3,1071,NULL,NULL),
	(5,3,1091,NULL,NULL),
	(5,3,1101,NULL,NULL),
	(5,3,1111,NULL,NULL),
	(5,3,1121,NULL,NULL),
	(5,3,1131,NULL,NULL),
	(5,3,1141,NULL,NULL),
	(5,3,1151,NULL,NULL),
	(5,3,1181,NULL,NULL),
	(5,3,1191,NULL,NULL),
	(5,1,1221,NULL,NULL),
	(5,1,1381,NULL,NULL),
	(5,1,1391,NULL,NULL),
	(5,3,1411,NULL,NULL),
	(5,3,1441,NULL,NULL),
	(5,3,1451,NULL,NULL),
	(5,3,1471,NULL,NULL),
	(5,3,1581,NULL,NULL),
	(5,1,1591,NULL,NULL),
	(5,3,1601,NULL,NULL),
	(5,3,1611,NULL,NULL),
	(5,3,1621,NULL,NULL),
	(5,3,1631,NULL,NULL),
	(5,3,1641,NULL,NULL),
	(5,3,1651,NULL,NULL),
	(5,3,1661,NULL,NULL),
	(5,3,1671,NULL,NULL),
	(5,3,1681,NULL,NULL),
	(5,3,1701,NULL,NULL),
	(5,3,1711,NULL,NULL),
	(5,3,1721,NULL,NULL),
	(5,3,1831,NULL,NULL),
	(5,3,1841,NULL,NULL),
	(5,3,1861,NULL,NULL),
	(5,3,1871,NULL,NULL),
	(5,3,1881,NULL,NULL),
	(5,3,1891,NULL,NULL),
	(5,3,1901,NULL,NULL),
	(5,3,1911,NULL,NULL),
	(5,3,1921,NULL,NULL),
	(5,3,1951,NULL,NULL),
	(5,1,1961,NULL,NULL),
	(5,3,1971,NULL,NULL),
	(5,3,1981,NULL,NULL),
	(5,3,2021,NULL,NULL),
	(5,3,2051,NULL,NULL),
	(5,3,2061,NULL,NULL),
	(5,3,2081,NULL,NULL),
	(5,3,2101,NULL,NULL),
	(5,3,2111,NULL,NULL),
	(5,3,2121,NULL,NULL),
	(5,3,2131,NULL,NULL),
	(5,3,2151,NULL,NULL),
	(5,3,2161,NULL,NULL),
	(5,1,2171,NULL,NULL),
	(5,1,2181,NULL,NULL);

/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
