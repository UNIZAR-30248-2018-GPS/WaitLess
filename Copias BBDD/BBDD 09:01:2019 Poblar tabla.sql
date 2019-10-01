# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: eu-cdbr-west-02.cleardb.net (MySQL 5.6.42-log)
# Base de datos: heroku_de42e77cc297366
# Tiempo de Generación: 2019-01-09 18:49:17 +0000
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
	(21,261,3),
	(31,611,3),
	(41,951,4),
	(51,951,14),
	(61,1011,7),
	(71,1041,1),
	(81,1051,3),
	(91,1051,4),
	(101,1061,1),
	(111,1071,14),
	(121,1071,4),
	(131,1111,4),
	(141,1121,4),
	(151,1131,3),
	(161,1131,7),
	(171,1141,1),
	(181,1141,7),
	(191,1161,1),
	(201,1161,7);

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
	(81,'Pimientos de Padrón',4,0,'unos pican otros no',1),
	(91,'Chuletón de buey',15,0,NULL,1),
	(101,'Zumo de Tomate',34,1,NULL,1),
	(261,'Tortilla de patata',3.5,1,'Tortilla con cebolla',1),
	(291,'Gambas al ajillo',9.9,0,'Picantes',1),
	(311,'Menestra de verduras',3.7,0,'  ',1),
	(611,'Huevos fritos',32,0,'    ',1),
	(941,'Hamburguesa de pollo',8.5,0,'Con salsa barbacoa',1),
	(951,'Sopa de marisco',16,0,'Con fideos importados de Perú',1),
	(961,'Arroz tres delicias',10,0,'Con jamon dulce y maiz',0),
	(971,'Coca Cola',1.8,1,'330cc',1),
	(981,'Kas Naranja',1.8,1,'330cc',1),
	(991,'Kas Limon',1.8,1,'330cc',1),
	(1001,'Mosto',2,1,'200cc',0),
	(1011,'Batido de chocolate',2,1,'220cc',1),
	(1021,'Combinado',6.5,1,'Marcas basicas: brugal, cutty, sherinton',1),
	(1031,'Combinado Premium',9,1,'Puerto de indias, jack daniel',1),
	(1041,'Cerveza',1.4,1,'Ambar',1),
	(1051,'Ensalada de la casa',4,2,'Lechuga, Tomate, Atun, Olivas',1),
	(1061,'Macarrones Boloñesa',4,2,NULL,1),
	(1071,'Paella Valenciana',6,2,'Con marisco',0),
	(1081,'Lentejas',4,2,NULL,1),
	(1091,'Pechugas de pollo',3,3,'A la plancha',1),
	(1101,'Solomillo de Cerdo',4,3,'Ibérico',1),
	(1111,'Lubina con Límon',4,3,'Al horno',0),
	(1121,'Merluza',4,3,'En salsa verde',1),
	(1131,'Flan de huevo',2,4,'Con nata',1),
	(1141,'Natillas con galleta',2,4,'Sabor vainilla',1),
	(1151,'Macedonia de frutas',3,4,'Con frutas de temporada',0),
	(1161,'Brownie de chocolate',5,4,'Con chocolate caliente',1);

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
	(2,'Patatas Fritas'),
	(3,'Pimientos'),
	(4,'Chuletón de Buey'),
	(11,'Tomate'),
	(21,'Patatas'),
	(31,'Huevos'),
	(41,'Cebolla'),
	(51,'Gambas'),
	(61,'Ajo'),
	(71,'Salteado de Verduras'),
	(81,'Hamburguesa de Pollo'),
	(91,'Almejas'),
	(101,'Fideos'),
	(111,'Arroz'),
	(121,'Jamón cocido'),
	(131,'Maíz'),
	(141,'Limón'),
	(151,'Ron'),
	(161,'Ginebra'),
	(171,'Vodka'),
	(181,'Ambar'),
	(191,'Estrella Galicia'),
	(201,'Heineken'),
	(211,'Macarrones'),
	(221,'Carne Picada'),
	(231,'Lechuga'),
	(241,'Atún'),
	(251,'Olivas'),
	(261,'Mejillones'),
	(271,'Calamares'),
	(281,'Chorizo'),
	(291,'Pechugas de pollo'),
	(301,'Solomillo de Cerdo'),
	(311,'Lubina'),
	(321,'Merluza'),
	(331,'Galletas'),
	(341,'Nata Montada'),
	(351,'Pera'),
	(361,'Melón'),
	(371,'Sandía'),
	(381,'Manzana'),
	(391,'Kiwi'),
	(401,'Chocolate'),
	(411,'Helado'),
	(421,'Lentejas');

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
	(1,91,4),
	(2,91,1),
	(11,81,1),
	(21,81,3),
	(31,91,21),
	(41,101,11),
	(51,101,1),
	(61,261,21),
	(71,261,31),
	(81,291,51),
	(91,261,41),
	(101,291,61),
	(111,611,31),
	(121,611,1),
	(131,941,81),
	(141,941,21),
	(151,951,91),
	(161,951,101),
	(171,951,261),
	(181,961,111),
	(191,961,121),
	(201,961,131),
	(211,1021,151),
	(221,1021,161),
	(231,1021,171),
	(241,1021,241),
	(251,1031,151),
	(261,1031,161),
	(271,1031,171),
	(281,1031,241),
	(291,1041,181),
	(301,1041,191),
	(311,1041,201),
	(321,1051,231),
	(331,1051,241),
	(341,1051,251),
	(351,1061,211),
	(361,1061,221),
	(371,1071,111),
	(381,1071,261),
	(391,1071,271),
	(401,1081,421),
	(411,1081,281),
	(421,1091,291),
	(431,1091,2),
	(441,1101,301),
	(451,1101,2),
	(461,1111,311),
	(471,1111,2),
	(481,1121,321),
	(491,1121,2),
	(501,1131,341),
	(511,1141,331),
	(521,1151,351),
	(531,1151,361),
	(541,1151,371),
	(551,1151,381),
	(561,1151,391),
	(571,1161,401),
	(581,1161,411);

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
	(7701,981,1,0,''),
	(7711,91,1,0,''),
	(7721,1141,1,0,''),
	(7731,1101,1,0,'');

/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla pedido
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pedido`;

CREATE TABLE `pedido` (
  `mesa` int(11) NOT NULL,
  `num_comensales` int(11) NOT NULL,
  `num_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `estado_aviso` int(11) DEFAULT NULL,
  `estado_aviso_cuenta` int(11) DEFAULT NULL,
  PRIMARY KEY (`num_pedido`),
  UNIQUE KEY `num_pedido` (`num_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;

INSERT INTO `pedido` (`mesa`, `num_comensales`, `num_pedido`, `estado_aviso`, `estado_aviso_cuenta`)
VALUES
	(3,3,1,0,0);

/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
