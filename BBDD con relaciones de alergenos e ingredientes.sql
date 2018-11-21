# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: eu-cdbr-west-02.cleardb.net (MySQL 5.6.38-log)
# Base de datos: heroku_de42e77cc297366
# Tiempo de Generación: 2018-11-21 16:13:49 +0000
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
	(81,'Pimientos del piquillo',1.2,0,'pica pica '),
	(91,'Chuletón de buey',15,0,NULL),
	(101,'zumo_de_tomate',34,1,NULL);

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
  PRIMARY KEY (`id_item`),
  UNIQUE KEY `num_pedido` (`num_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;

INSERT INTO `item` (`id_item`, `num_pedido`, `nombre`, `cantidad`, `estado`)
VALUES
	(1,1,'Macarrones',2,2),
	(21,2,'Sopa',3,1),
	(31,3,'Pasta',1,2),
	(91,111,'Chuletón de buey',2,0),
	(101,131,'Chuletón de buey',2,0),
	(121,141,'Chuletón de buey',2,0);

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
	(5,2,141);

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
