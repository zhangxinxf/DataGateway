-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.27 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 mybatis 的数据库结构
DROP DATABASE IF EXISTS `mybatisTest`;
CREATE DATABASE IF NOT EXISTS `mybatisTest` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mybatisTest`;


-- 导出  表 mybatis.classes 结构
DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- 正在导出表  mybatis.classes 的数据：~3 rows (大约)
DELETE FROM `classes`;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` (`id`, `name`) VALUES
	(1, '高三一班'),
	(2, '高三二班'),
	(3, '高三三班');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;


-- 导出  表 mybatis.user 结构
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) DEFAULT NULL,
  `loginName` varchar(50) DEFAULT NULL,
  `classes_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_classes` (`classes_id`),
  CONSTRAINT `FK_user_classes` FOREIGN KEY (`classes_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- 正在导出表  mybatis.user 的数据：~3 rows (大约)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `userName`, `loginName`, `classes_id`) VALUES
	(1, '方斌', 'fangb', 1),
	(2, '刘未', 'liuw', 2),
	(3, '泽文', 'lizw', 3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
