# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: eu-cdbr-west-02.cleardb.net (MySQL 5.6.42-log)
# Base de datos: heroku_de42e77cc297366
# Tiempo de Generación: 2018-12-14 11:31:33 +0000
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


# Volcado de tabla aviso
# ------------------------------------------------------------

DROP TABLE IF EXISTS `aviso`;

CREATE TABLE `aviso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mesa` int(11) NOT NULL,
  `estado` int(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `aviso` WRITE;
/*!40000 ALTER TABLE `aviso` DISABLE KEYS */;

INSERT INTO `aviso` (`id`, `mesa`, `estado`)
VALUES
	(1,8,1),
	(11,5,0),
	(21,4,0);

/*!40000 ALTER TABLE `aviso` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla bebida
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bebida`;

CREATE TABLE `bebida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `precio` double NOT NULL,
  PRIMARY KEY (`id`,`precio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `bebida` WRITE;
/*!40000 ALTER TABLE `bebida` DISABLE KEYS */;

INSERT INTO `bebida` (`id`, `nombre`, `precio`)
VALUES
	(21,'kas',4.8),
	(41,'Zumo de melocoton',1.35);

/*!40000 ALTER TABLE `bebida` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;

INSERT INTO `carta` (`id`, `nombre`, `precio`, `tipo`, `descripcion`)
VALUES
	(81,'Pimientos del piquillo',4,0,'unos pican otros no'),
	(91,'Chuletón de buey',15,0,NULL),
	(101,'zumo_de_tomate',34,1,NULL),
	(261,'Tortilla de patata',3.5,1,'Tortilla con cebolla'),
	(291,'Gambas al ajillo',9.9,0,'Picantes'),
	(311,'Menestra de verduras',3.7,0,'  '),
	(411,'no',5,1,'Este plato no se insertara'),
	(461,'no',5,1,'Este plato no se insertara'),
	(481,'no',5,1,'Este plato no se insertara'),
	(491,'no',5,1,'Este plato no se insertara'),
	(501,'no',5,1,'Este plato no se insertara'),
	(511,'no',5,1,'Este plato no se insertara'),
	(521,'no',5,1,'Este plato no se insertara'),
	(531,'no',5,1,'Este plato no se insertara'),
	(541,'no',5,1,'Este plato no se insertara'),
	(611,'Huevos fritos',32,0,'    ');

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
  `num_pedido` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `comentario` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_item`),
  UNIQUE KEY `num_pedido` (`num_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;

INSERT INTO `item` (`id_item`, `num_pedido`, `nombre`, `cantidad`, `estado`, `comentario`)
VALUES
	(1,1,'Macarrones',2,2,NULL),
	(21,2,'Sopa',3,1,NULL),
	(31,3,'Pasta',1,2,NULL),
	(91,111,'Chuletón de buey',2,0,NULL),
	(101,131,'Chuletón de buey',2,0,NULL),
	(121,141,'Chuletón de buey',2,0,NULL),
	(141,151,'Chuletón de buey',2,0,NULL),
	(161,161,'Chuletón de buey',2,0,NULL),
	(181,171,'Chuletón de buey',2,0,NULL),
	(201,181,'Chuletón de buey',2,0,NULL),
	(221,191,'Chuletón de buey',2,0,NULL),
	(241,201,'Chuletón de buey',2,0,NULL),
	(261,211,'Chuletón de buey',2,0,NULL),
	(281,221,'Chuletón de buey',2,0,NULL),
	(301,231,'Chuletón de buey',2,0,NULL),
	(321,241,'Chuletón de buey',2,0,NULL),
	(421,331,'Chuletón de buey',2,0,NULL),
	(431,341,'Chuletón de buey',2,0,NULL),
	(461,401,'Chuletón de buey',2,0,NULL),
	(471,411,'Chuletón de buey',2,0,NULL),
	(481,421,'Chuletón de buey',2,0,NULL),
	(491,431,'Chuletón de buey',2,0,NULL),
	(501,441,'Chuletón de buey',2,0,NULL),
	(511,451,'Chuletón de buey',2,0,NULL),
	(521,461,'Chuletón de buey',2,0,NULL),
	(531,471,'Chuletón de buey',2,0,NULL),
	(541,481,'Chuletón de buey',2,0,NULL),
	(551,491,'Chuletón de buey',2,0,NULL),
	(561,501,'Chuletón de buey',2,0,NULL),
	(571,511,'Chuletón de buey',2,0,NULL),
	(581,521,'Chuletón de buey',2,0,NULL),
	(591,531,'Chuletón de buey',2,0,NULL),
	(611,551,'Chuletón de buey',2,0,NULL),
	(791,721,'Chuletón de buey',2,0,NULL),
	(801,791,'Chuletón de buey',2,0,NULL),
	(811,801,'Chuletón de buey',2,0,NULL),
	(1011,921,'Gambas al ajillo',1,0,NULL),
	(1161,991,'Gambas al ajillo',1,0,NULL),
	(1171,1001,'Chuletón de buey',1,0,NULL),
	(1181,1011,'Chuletón de buey',1,0,NULL),
	(1191,1021,'Pimientos del piquillo',1,0,NULL),
	(1201,1031,'Gambas al ajillo',1,0,NULL),
	(1211,1041,'Gambas al ajillo',1,0,NULL),
	(1221,1051,'Chuletón de buey',1,0,NULL),
	(1231,1061,'Chuletón de buey',1,0,NULL),
	(1241,1071,'Chuletón de buey',1,0,NULL),
	(1271,1091,'Pimientos del piquillo',1,0,NULL),
	(1281,1101,'Menestra de verduras',1,0,NULL),
	(1291,1111,'Menestra de verduras',1,0,NULL),
	(1301,1121,'Chuletón de buey',1,0,NULL),
	(1311,1131,'Pimientos del piquillo',1,0,NULL),
	(1321,1141,'Chuletón de buey',1,0,NULL),
	(1331,1151,'zumo_de_tomate',1,0,NULL),
	(1361,1181,'Pimientos del piquillo',1,0,NULL),
	(1371,1191,'Chuletón de buey',1,0,NULL),
	(1661,1411,'Gambas al ajillo',1,0,NULL),
	(1711,1441,'Gambas al ajillo',1,0,NULL),
	(1721,1451,'Gambas al ajillo',1,0,NULL),
	(1731,1471,'Gambas al ajillo',1,0,NULL),
	(1741,1581,'Menestra de verduras',1,0,''),
	(1771,1601,'Gambas al ajillo',1,0,''),
	(1781,1611,'Chuletón de buey',1,0,''),
	(1791,1621,'Gambas al ajillo',1,0,''),
	(1801,1631,'Gambas al ajillo',1,0,''),
	(1811,1641,'Gambas al ajillo',1,0,''),
	(1821,1651,'Gambas al ajillo',1,0,''),
	(1831,1661,'Pimientos del piquillo',1,0,''),
	(1841,1671,'Gambas al ajillo',1,0,''),
	(1851,1681,'Chuletón de buey',1,0,''),
	(1881,1701,'Menestra de verduras',1,0,''),
	(1891,1711,'Gambas al ajillo',1,0,''),
	(1901,1721,'Chuletón de buey',1,0,''),
	(2111,1831,'Chuletón de buey',1,0,''),
	(2121,1841,'Chuletón de buey',1,0,''),
	(2151,1861,'Chuletón de buey',1,0,''),
	(2161,1871,'Gambas al ajillo',1,0,''),
	(2171,1881,'Gambas al ajillo',1,0,''),
	(2181,1891,'Chuletón de buey',1,0,''),
	(2191,1901,'Gambas al ajillo',1,0,''),
	(2201,1911,'Chuletón de buey',1,0,''),
	(2211,1921,'Gambas al ajillo',1,0,''),
	(2261,1951,'Gambas al ajillo',1,0,''),
	(2291,1971,'Pimientos del piquillo',1,0,''),
	(2301,1981,'Gambas al ajillo',1,0,''),
	(2371,2021,'Huevos fritos',1,0,''),
	(2421,2051,'Huevos fritos',1,0,''),
	(2431,2061,'Pimientos del piquillo',1,0,''),
	(2461,2081,'Pimientos del piquillo',1,0,''),
	(2501,2101,'Tortilla de patata',1,0,''),
	(2511,2111,'Pimientos del piquillo',1,0,''),
	(2521,2121,'Chuletón de buey',1,0,''),
	(2531,2131,'Pimientos del piquillo',1,0,''),
	(2561,2151,'Pimientos del piquillo',1,0,''),
	(2571,2161,'Gambas al ajillo',1,0,'');

/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla pedido
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pedido`;

CREATE TABLE `pedido` (
  `mesa` int(11) NOT NULL,
  `num_comensales` int(11) NOT NULL,
  `num_pedido` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`num_pedido`),
  UNIQUE KEY `num_pedido` (`num_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;

INSERT INTO `pedido` (`mesa`, `num_comensales`, `num_pedido`)
VALUES
	(1,2,1),
	(2,8,3),
	(5,3,4),
	(7,2,11),
	(7,2,21),
	(7,2,31),
	(7,2,41),
	(7,2,51),
	(7,2,61),
	(7,2,71),
	(7,2,81),
	(7,2,91),
	(7,2,101),
	(7,2,111),
	(6,2,121),
	(6,2,131),
	(5,2,141),
	(4,2,151),
	(3,2,161),
	(3,2,171),
	(3,2,181),
	(3,2,191),
	(3,2,201),
	(3,2,211),
	(3,2,221),
	(5,2,231),
	(5,2,241),
	(5,2,251),
	(5,2,261),
	(5,2,271),
	(5,2,281),
	(5,2,291),
	(5,2,331),
	(5,2,341),
	(5,1,361),
	(5,1,371),
	(5,1,381),
	(5,1,391),
	(5,1,401),
	(5,1,411),
	(5,1,421),
	(5,1,431),
	(5,1,441),
	(5,1,451),
	(5,1,461),
	(5,1,471),
	(5,1,481),
	(5,1,491),
	(5,1,501),
	(5,1,511),
	(5,1,521),
	(5,1,531),
	(5,1,541),
	(5,1,551),
	(5,1,561),
	(5,1,571),
	(5,1,581),
	(5,1,591),
	(5,1,601),
	(5,1,621),
	(5,1,631),
	(5,1,641),
	(5,1,651),
	(5,1,671),
	(5,1,681),
	(1,3,721),
	(1,3,731),
	(1,3,741),
	(1,1,791),
	(1,1,801),
	(3,1,901),
	(10,7,911),
	(10,7,921),
	(5,3,991),
	(5,3,1001),
	(5,3,1011),
	(5,3,1021),
	(5,3,1031),
	(5,3,1041),
	(5,3,1051),
	(5,3,1061),
	(5,3,1071),
	(5,3,1091),
	(5,3,1101),
	(5,3,1111),
	(5,3,1121),
	(5,3,1131),
	(5,3,1141),
	(5,3,1151),
	(5,3,1181),
	(5,3,1191),
	(5,1,1221),
	(5,1,1381),
	(5,1,1391),
	(5,3,1411),
	(5,3,1441),
	(5,3,1451),
	(5,3,1471),
	(5,3,1581),
	(5,1,1591),
	(5,3,1601),
	(5,3,1611),
	(5,3,1621),
	(5,3,1631),
	(5,3,1641),
	(5,3,1651),
	(5,3,1661),
	(5,3,1671),
	(5,3,1681),
	(5,3,1701),
	(5,3,1711),
	(5,3,1721),
	(5,3,1831),
	(5,3,1841),
	(5,3,1861),
	(5,3,1871),
	(5,3,1881),
	(5,3,1891),
	(5,3,1901),
	(5,3,1911),
	(5,3,1921),
	(5,3,1951),
	(5,1,1961),
	(5,3,1971),
	(5,3,1981),
	(5,3,2021),
	(5,3,2051),
	(5,3,2061),
	(5,3,2081),
	(5,3,2101),
	(5,3,2111),
	(5,3,2121),
	(5,3,2131),
	(5,3,2151),
	(5,3,2161),
	(5,1,2171);

/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tiene
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tiene`;

CREATE TABLE `tiene` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_carta` int(11) NOT NULL,
  `id_alergeno` int(11) NOT NULL,
  `id_ingrediente` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
