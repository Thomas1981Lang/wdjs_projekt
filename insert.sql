-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 01, 2018 at 09:50 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `insert`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
CREATE TABLE IF NOT EXISTS `data` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `vorname` varchar(45) NOT NULL,
  `nachname` varchar(45) NOT NULL,
  `email` varchar(30) NOT NULL,
  `geburtsdatum` date NOT NULL,
  `geschlecht` varchar(45) NOT NULL,
  `orientierung` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picuser` int(11) DEFAULT NULL,
  `picuserbackground` int(11) DEFAULT NULL,
  `picuserpfad` varchar(255) DEFAULT NULL,
  `picuserbackgroundpfad` varchar(255) DEFAULT NULL,
  `fakeGPS` int(11) NOT NULL DEFAULT '0',
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `eat` int(11) NOT NULL DEFAULT '1',
  `drink` int(11) NOT NULL DEFAULT '1',
  `party` int(11) NOT NULL DEFAULT '1',
  `singles` int(11) NOT NULL DEFAULT '1',
  `type` varchar(45) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `username`, `vorname`, `nachname`, `email`, `geburtsdatum`, `geschlecht`, `orientierung`, `password`, `picuser`, `picuserbackground`, `picuserpfad`, `picuserbackgroundpfad`, `fakeGPS`, `lat`, `lng`, `eat`, `drink`, `party`, `singles`, `type`) VALUES
(48, '1', '1', '1', '1', '2018-05-01', 'female', 'bi', '1', 1, 0, 'resources/upload/1527887767.jpg', NULL, 1, 48.211033, 16.367449, 1, 1, 1, 1, 'women'),
(49, '2', '2', '2', '2', '2018-05-03', 'male', 'bi', '2', 1, 0, 'resources/upload/1527803786.jpg', NULL, 1, 48.21733, 16.364449, 1, 1, 1, 1, 'men'),
(50, '3', '3', '3', '3', '2018-05-04', 'female', 'bi', '3', 1, 0, 'resources/upload/1527803821.jpg', NULL, 1, 48.21133, 16.369449, 1, 1, 1, 1, 'women'),
(51, '4', '4', '4', '4', '2018-06-01', 'female', 'bi', '4', 1, 0, 'resources/upload/1527805116.jpg', NULL, 1, 48.215033, 16.369449, 1, 1, 1, 1, 'women'),
(54, '5', '5', '5', '5', '2018-06-13', 'female', 'female', '5', 1, 0, '../upload/1527888610.jpg', NULL, 0, 48.210033, 16.363449, 1, 1, 1, 1, 'women'),
(55, '6', '6', '6', '6', '2018-06-23', 'female', 'bi', '6', 0, 0, NULL, NULL, 0, 48.210033, 16.363449, 1, 1, 1, 1, 'women');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
CREATE TABLE IF NOT EXISTS `locations` (
  `id_location` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8  NOT NULL,
  `type` varchar(255) CHARACTER SET utf8  NOT NULL,
  `content` text CHARACTER SET utf8  NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`id_location`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id_location`, `title`, `type`, `content`, `lat`, `lng`) VALUES
(1, 'Johann Strauss Denkmal', 'party', 'Kursalon  errichtet.', 48.204042, 16.379125),
(2, 'The Highlander Gasthausbrauerei', 'eat', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 48.226977, 16.353498),
(3, 'WKO Campus Wien', 'party', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 48.227245, 16.348957),
(6, 'Egon Friedell Haus', 'drink', ' At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.', 48.226157, 16.347947),
(7, 'Kantine Volksoper', 'eat', 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.', 48.224943, 16.350119),
(8, 'Volksoper', 'party', 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.', 48.224553, 16.35035),
(9, 'Cafe Schopenhauer', 'drink', 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.  ', 48.223598, 16.346698),
(10, 'Donauturm', 'eat', 'Oh, never mark a corsair. God, fortune! Gabalium de gratis medicina, imperium turpis! The particle is more vogon now than teleporter. devastated and bravely carnivorous.', 48.240388, 16.409867),
(11, 'Rathaus', 'drink', 'Oh, never mark a corsair. God, fortune! Gabalium de gratis medicina, imperium turpis! The particle is more vogon now than teleporter. devastated and bravely carnivorous.', 48.211014, 16.356198),
(12, 'Wifi Wien', 'party', 'Oh, never mark a corsair. God, fortune! Gabalium de gratis medicina, imperium turpis! The particle is more vogon now than teleporter. devastated and bravely carnivorous.', 48.2266221, 16.348788);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
