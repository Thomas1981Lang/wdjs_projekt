-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 25, 2018 at 05:03 AM
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
  `vonalter` int(11) NOT NULL,
  `bisalter` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `username`, `vorname`, `nachname`, `email`, `geburtsdatum`, `geschlecht`, `orientierung`, `vonalter`, `bisalter`, `password`) VALUES
(18, 'test', 'test', 'test', 'test', '2012-01-01', 'male', 'female', 18, 36, 'test'),
(20, 'tom', 'sdfg', 'dsfg', 'sdfg', '2018-05-01', 'male', 'female', 18, 35, 'test'),
(23, '1', '1', '1', '1', '2018-05-01', 'male', 'female', 20, 40, '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
