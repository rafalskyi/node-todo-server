# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: shared-rails_development
# Generation Time: 2017-07-13 09:09:16 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ar_internal_metadata
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ar_internal_metadata`;

CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ar_internal_metadata` WRITE;
/*!40000 ALTER TABLE `ar_internal_metadata` DISABLE KEYS */;

INSERT INTO `ar_internal_metadata` (`key`, `value`, `created_at`, `updated_at`)
VALUES
	('environment','development','2017-06-20 19:50:41','2017-06-20 19:50:41');

/*!40000 ALTER TABLE `ar_internal_metadata` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `done` tinyint(1) DEFAULT NULL,
  `todo_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_items_on_todo_id` (`todo_id`),
  CONSTRAINT `fk_rails_c01e6b449d` FOREIGN KEY (`todo_id`) REFERENCES `todos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;

INSERT INTO `items` (`id`, `name`, `done`, `todo_id`, `created_at`, `updated_at`)
VALUES
	(116,'123123',1,67,'2017-07-10 12:50:08','2017-07-10 13:20:39'),
	(117,'йцуйцу',0,68,'2017-07-10 12:50:14','2017-07-10 12:50:14'),
	(118,'йуйцу',1,68,'2017-07-10 12:50:16','2017-07-10 13:20:45'),
	(120,'234234234',0,69,'2017-07-10 13:12:02','2017-07-10 13:12:02'),
	(121,'23423423',0,69,'2017-07-10 13:12:05','2017-07-10 13:12:05'),
	(122,'234234234',0,69,'2017-07-10 13:12:07','2017-07-10 13:12:07'),
	(124,'13123',0,68,'2017-07-10 13:21:45','2017-07-10 13:21:45'),
	(131,'234242',0,67,'2017-07-10 14:30:44','2017-07-10 14:30:44'),
	(132,'adasdasd',1,67,'2017-07-12 11:46:10','2017-07-12 11:46:12');

/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table schema_migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `schema_migrations`;

CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;

INSERT INTO `schema_migrations` (`version`)
VALUES
	('20170524124042'),
	('20170524124216'),
	('20170525132311');

/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todos`;

CREATE TABLE `todos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;

INSERT INTO `todos` (`id`, `title`, `created_by`, `created_at`, `updated_at`)
VALUES
	(67,'123','1','2017-07-10 12:33:22','2017-07-10 12:33:22'),
	(68,'123123242342342§§§§§§','1','2017-07-10 12:49:00','2017-07-10 13:15:40'),
	(69,'123123123','1','2017-07-10 13:11:56','2017-07-10 13:11:56');

/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_digest` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `password_digest`, `created_at`, `updated_at`)
VALUES
	(1,'Admin','admin@mail.com','$2a$10$3F2H1bcVyFeoFE9ZJKZQUeeyUkZ0dNbiS5sdiQf8ksFkp0DzWdN2q','2017-06-20 20:00:45','2017-06-20 20:00:45'),
	(2,'admin','admin@mail.ru','$2a$10$udMFqOe34FJyROglBbyLwOB/fwDBk1oRbPIzyaq63PVpK2Ff3an2a','2017-06-23 11:10:28','2017-06-23 11:10:28'),
	(3,'test','test@mail.com','$2a$10$udMFqOe34FJyROglBbyLwOB/fwDBk1oRbPIzyaq63PVpK2Ff3an2a','2017-06-23 13:24:49','2017-06-23 13:24:49'),
	(4,'abc','abs@mail.com','$2a$10$gWR8p8mMJYcvHQhJ3OscvOJcl8wbwa09V4iYq9RfV8kKPAH9.yPB6','2017-06-23 17:11:17','2017-06-23 17:11:17'),
	(5,'q','q@mail.com','$2a$10$VuB8KLZpOqBqahDc5lm5fuFfkN60OIiJi3gw1FpSYPlwv6gHmGRg6','2017-06-26 09:12:57','2017-06-26 09:12:57'),
	(6,'w@mail.ru','w@mail.ru','$2a$10$yasZDflYb7wTITqifKzUp.KHhSbqQXlBp6I8TZe7R0ufXSgM0w5ky','2017-06-26 10:14:39','2017-06-26 10:14:39'),
	(7,'Dawn Hines','xasozuzy@gmail.com','$2a$10$rfU8m68pLJftjXHAGY.WJOS1SXFwexpAXcXC4NLdwSn7QAq6BmXOK','2017-06-26 10:15:42','2017-06-26 10:15:42'),
	(8,'123','123@mail.ru','$2a$10$Ex86qB4AY49oDi.ocy1lhuooA4E3hfM4E70vG95xKGFn1pgaTwzwW','2017-07-01 21:09:04','2017-07-01 21:09:04'),
	(9,'nodejs','nodejs@mail.com','$2a$10$rj9CedjtNKKjsf/KDuf2L.IHEWnu0YFyw9u6qyF.EHNMgNgT4JNcW','2017-07-01 21:10:00','2017-07-01 21:10:00'),
	(10,'node','node@mail.ru','$2a$10$rnoNc.39jTBLqzGohmZHBukaB/V/qzOApx7uWtftjj7p30GpduoIu','2017-07-03 11:10:07','2017-07-03 11:10:07'),
	(11,'Namea','a','$2a$10$WeXjc8TAVWgL3iDXD2jgt.ecLNSFXndB5aqzGnqnE0qWg021a.Uje','2017-07-07 10:50:02','2017-07-07 10:50:02'),
	(12,'Namea','a','$2a$10$cekDnxtjSqRNnB5tWZHNUuPO.pbRvgPaAiGStC6f/cp8lsP2NcV3a','2017-07-07 10:54:16','2017-07-07 10:54:16');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
