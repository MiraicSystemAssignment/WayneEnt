-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 06:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wayne_ent`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `userId` varchar(100) NOT NULL,
  `texts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`texts`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`userId`, `texts`) VALUES
('U0311f42d3d7dbb085c91d116588399e0', '[\"R Hello\",\"S hey how are you?\"]');

-- --------------------------------------------------------

--
-- Table structure for table `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `form_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`form_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clubs`
--

INSERT INTO `clubs` (`id`, `form_data`) VALUES
(40, '[{\"name\":\"test1\",\"type\":\"form name\",\"required\":false},{\"name\":\"name\",\"type\":\"text\",\"required\":false}]'),
(41, '[{\"name\":\"bikers\",\"type\":\"form name\",\"required\":false},{\"name\":\"name\",\"type\":\"text\",\"required\":true},{\"name\":\"mail\",\"type\":\"email\",\"required\":true},{\"name\":\"address\",\"type\":\"text\",\"required\":true},{\"name\":\"event\",\"type\":\"date range\",\"required\":false},{\"name\":\"gender\",\"type\":\"Radio\",\"options\":[\"male\",\"female\"],\"required\":true}]'),
(42, '[{\"name\":\"cosplay\",\"type\":\"form name\",\"required\":false},{\"name\":\"name\",\"type\":\"text\",\"required\":true},{\"name\":\"event\",\"type\":\"date\",\"required\":false}]'),
(43, '[{\"name\":\"test again\",\"type\":\"form name\",\"required\":false},{\"name\":\"name\",\"type\":\"text\",\"required\":false}]'),
(44, '[{\"name\":\"test101\",\"type\":\"form name\",\"required\":false},{\"name\":\"name\",\"type\":\"text\",\"required\":false},{\"name\":\"gender\",\"type\":\"Radio\",\"options\":[\"male\",\"female\"],\"required\":true}]');

-- --------------------------------------------------------

--
-- Table structure for table `container`
--

CREATE TABLE `container` (
  `id` int(5) NOT NULL,
  `forms` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group40`
--

CREATE TABLE `group40` (
  `Line_id` varchar(35) NOT NULL,
  `name` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group40`
--

INSERT INTO `group40` (`Line_id`, `name`) VALUES
('U8a41781a5f7c0847792703a2a71dc8a6', 'saru');

-- --------------------------------------------------------

--
-- Table structure for table `group41`
--

CREATE TABLE `group41` (
  `Line_id` varchar(35) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `mail` varchar(40) DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  `event` varchar(40) DEFAULT NULL,
  `gender` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group41`
--

INSERT INTO `group41` (`Line_id`, `name`, `mail`, `address`, `event`, `gender`) VALUES
('U8a41781a5f7c0847792703a2a71dc8a6', '\"kk\"', '\"kk\"', '\"looo\"', '{\"Start\":\"2024-03-30\",\"End\":\"2024-03-23\"', '\"female\"');

-- --------------------------------------------------------

--
-- Table structure for table `group42`
--

CREATE TABLE `group42` (
  `Line_id` varchar(35) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `event` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group42`
--

INSERT INTO `group42` (`Line_id`, `name`, `event`) VALUES
('U8a41781a5f7c0847792703a2a71dc8a6', 'saru', '2024-03-01');

-- --------------------------------------------------------

--
-- Table structure for table `group43`
--

CREATE TABLE `group43` (
  `Line_id` varchar(35) NOT NULL,
  `name` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group43`
--

INSERT INTO `group43` (`Line_id`, `name`) VALUES
('U0311f42d3d7dbb085c91d116588399e0', '\"zoro\"');

-- --------------------------------------------------------

--
-- Table structure for table `group44`
--

CREATE TABLE `group44` (
  `Line_id` varchar(35) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `gender` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group44`
--

INSERT INTO `group44` (`Line_id`, `name`, `gender`) VALUES
('U0311f42d3d7dbb085c91d116588399e0', '\"zoro\"', '\"male\"');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `container`
--
ALTER TABLE `container`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group40`
--
ALTER TABLE `group40`
  ADD PRIMARY KEY (`Line_id`);

--
-- Indexes for table `group41`
--
ALTER TABLE `group41`
  ADD PRIMARY KEY (`Line_id`);

--
-- Indexes for table `group42`
--
ALTER TABLE `group42`
  ADD PRIMARY KEY (`Line_id`);

--
-- Indexes for table `group43`
--
ALTER TABLE `group43`
  ADD PRIMARY KEY (`Line_id`);

--
-- Indexes for table `group44`
--
ALTER TABLE `group44`
  ADD PRIMARY KEY (`Line_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `container`
--
ALTER TABLE `container`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
