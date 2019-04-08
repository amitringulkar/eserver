-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2019 at 08:40 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `land_and_expand`
--

-- --------------------------------------------------------

--
-- Table structure for table `actionitems`
--

CREATE TABLE `actionitems` (
  `actionItemsId` int(11) NOT NULL,
  `userId` int(5) NOT NULL,
  `description` varchar(50) NOT NULL,
  `comments` varchar(250) NOT NULL,
  `status` varchar(250) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `headcount`
--

CREATE TABLE `headcount` (
  `headCountId` int(11) NOT NULL,
  `userId` int(3) NOT NULL,
  `year` varchar(10) NOT NULL,
  `quarter` varchar(25) NOT NULL,
  `onsite` int(5) NOT NULL,
  `Offshore` int(5) NOT NULL,
  `actual` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `headcount`
--

INSERT INTO `headcount` (`headCountId`, `userId`, `year`, `quarter`, `onsite`, `Offshore`, `actual`) VALUES
(1, 4, '2018', 'Q1', 1, 63, 1),
(2, 4, '2018', 'Q2', 2, 65, 1),
(3, 4, '2018', 'Q3', 2, 68, 1),
(4, 4, '2018', 'Q4', 2, 68, 1),
(5, 4, '2019', 'Q1', 2, 70, 1),
(6, 4, '2019', 'Q2', 2, 75, 1),
(7, 4, '2019', 'Q3', 2, 75, 0),
(8, 4, '2019', 'Q4', 2, 80, 0),
(9, 4, '2020', 'Q1', 2, 80, 0),
(10, 4, '2020', 'Q2', 2, 85, 0),
(11, 4, '2020', 'Q3', 2, 80, 0),
(12, 4, '2020', 'Q4', 2, 90, 0),
(13, 5, '2018', 'Q1', 12, 23, 1),
(14, 6, '2018', 'Q2', 12, 25, 1),
(15, 5, '2018', 'Q3', 12, 26, 1),
(16, 5, '2018', 'Q4', 12, 27, 1),
(17, 5, '2019', 'Q1', 12, 75, 1),
(18, 5, '2019', 'Q2', 12, 75, 1),
(19, 5, '2019', 'Q3', 12, 75, 0),
(20, 5, '2019', 'Q4', 12, 80, 0),
(21, 5, '2020', 'Q1', 12, 80, 0),
(22, 5, '2020', 'Q2', 12, 85, 0),
(23, 5, '2020', 'Q3', 12, 80, 0),
(24, 5, '2020', 'Q4', 12, 90, 0);

-- --------------------------------------------------------

--
-- Table structure for table `monthheadcount`
--

CREATE TABLE `monthheadcount` (
  `monthCountId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `m-4` int(3) NOT NULL,
  `m-3` int(3) NOT NULL,
  `m-2` int(3) NOT NULL,
  `m-1` int(3) NOT NULL,
  `m` int(3) NOT NULL,
  `m+1` int(3) NOT NULL,
  `m+2` int(3) NOT NULL,
  `m+3` int(3) NOT NULL,
  `m+4` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthheadcount`
--

INSERT INTO `monthheadcount` (`monthCountId`, `userId`, `m-4`, `m-3`, `m-2`, `m-1`, `m`, `m+1`, `m+2`, `m+3`, `m+4`) VALUES
(1, 4, 85, 87, 89, 89, 89, 90, 92, 94, 95),
(2, 5, 50, 50, 50, 50, 50, 51, 52, 53, 54),
(3, 6, 92, 93, 94, 95, 96, 97, 98, 99, 100),
(4, 7, 35, 37, 38, 39, 40, 41, 42, 43, 44);

-- --------------------------------------------------------

--
-- Table structure for table `revenue`
--

CREATE TABLE `revenue` (
  `revenueId` int(11) NOT NULL,
  `userId` int(3) NOT NULL,
  `year` varchar(10) NOT NULL,
  `quarter` varchar(25) NOT NULL,
  `revenueOnsite` decimal(10,2) NOT NULL,
  `revenueoffshore` decimal(10,2) NOT NULL,
  `actual` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `revenue`
--

INSERT INTO `revenue` (`revenueId`, `userId`, `year`, `quarter`, `revenueOnsite`, `revenueoffshore`, `actual`) VALUES
(1, 4, '2018', 'Q1', '0.00', '2.00', 1),
(2, 4, '2018', 'Q2', '0.30', '1.30', 1),
(3, 4, '2018', 'Q3', '0.50', '1.80', 1),
(4, 4, '2018', 'Q4', '0.40', '1.60', 1),
(5, 4, '2019', 'Q1', '1.10', '1.90', 1),
(6, 4, '2019', 'Q2', '1.20', '2.40', 1),
(7, 4, '2019', 'Q3', '1.20', '3.00', 0),
(8, 4, '2019', 'Q4', '1.30', '3.10', 0),
(9, 4, '2020', 'Q1', '1.40', '3.20', 0),
(10, 4, '2020', 'Q2', '1.50', '3.20', 0),
(11, 4, '2020', 'Q3', '1.60', '3.30', 0),
(12, 4, '2020', 'Q4', '1.70', '3.40', 0),
(13, 5, '2018', 'Q2', '0.30', '1.30', 1),
(14, 5, '2018', 'Q3', '0.50', '1.80', 1),
(15, 5, '2018', 'Q4', '0.40', '1.60', 1),
(16, 5, '2019', 'Q1', '1.10', '1.90', 1),
(17, 5, '2019', 'Q2', '1.12', '2.40', 1),
(18, 5, '2019', 'Q3', '1.12', '3.00', 0),
(19, 5, '2019', 'Q4', '1.13', '3.10', 0),
(20, 5, '2020', 'Q1', '1.14', '3.20', 0),
(21, 5, '2020', 'Q2', '1.15', '3.12', 0),
(22, 5, '2020', 'Q3', '1.16', '3.13', 0),
(23, 5, '2020', 'Q4', '1.70', '3.70', 0);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `assess` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleId`, `roleName`, `active`, `assess`) VALUES
(1, 'AVP', 1, ''),
(2, 'VBU Head', 1, ''),
(3, 'Delivery Manager', 1, ''),
(4, 'Program Manager', 1, ''),
(5, 'Engagement Manager', 1, ''),
(6, 'GMR', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `srf`
--

CREATE TABLE `srf` (
  `id` int(11) NOT NULL,
  `cancelled` int(3) NOT NULL,
  `closed` int(3) NOT NULL,
  `Offerd` int(3) NOT NULL,
  `0-2` int(3) NOT NULL,
  `2-4` int(3) NOT NULL,
  `4+` int(3) NOT NULL,
  `activeTotal` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `srf`
--

INSERT INTO `srf` (`id`, `cancelled`, `closed`, `Offerd`, `0-2`, `2-4`, `4+`, `activeTotal`) VALUES
(1, 111, 58, 7, 1, 0, 15, 16);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `roleId` int(2) DEFAULT NULL,
  `firstName` varchar(50) NOT NULL,
  `middleName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `emailId` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `username` varchar(25) NOT NULL,
  `allocation` int(3) NOT NULL,
  `password` varchar(100) NOT NULL,
  `managerId` int(10) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `roleId`, `firstName`, `middleName`, `lastName`, `emailId`, `description`, `username`, `allocation`, `password`, `managerId`, `active`) VALUES
(1, 1, 'Prameela', '', 'K', 'prameela.k@zensar.com', 'ADC - need to update', 'PK0001', 0, 'prameela123', 0, 1),
(2, 2, 'Raju', '', 'Hari', 'Raju.H@zensar.com', 'ADC - Need to check', 'RH0002', 0, 'Raju123', 1, 1),
(3, 3, 'Niraj', '', 'N', 'Niraj.N@zensar.com', 'Derivco ODC', 'NN0003', 0, 'NirajN123', 2, 1),
(4, 4, 'Pallavi', '', 'Kale', 'Pallavi.k@zensar.com', 'Game Changers', 'PK0004', 0, 'Pallavi123', 3, 1),
(5, 4, 'Anand', '', 'Joshi', 'Anand.J@zensar.com', 'Platforms', 'AJ0005', 0, 'Anand123', 3, 1),
(6, 4, 'Ashish', '', 'Dhagat', 'Ashish.D@zensar.com', 'Testing Shared Services', 'AD0006', 0, 'Ashish123', 3, 1),
(7, 4, 'Ashfaq', '', 'Sorathia', 'Ashfaq.S@zensar.com', 'Portfolio', 'AS0007', 0, 'Ashfaq123', 3, 1),
(8, 5, 'Ravi', '', 'Saha', 'Ravi.S@zensar.com', '', 'RS0008', 0, 'Ravi123', 2, 3),
(9, 6, 'Ruhi', '', 'B', 'Ruhi.S@zensar.com', '.', 'RB0009', 0, 'Ruhi123', 2, 3),
(10, 2, 'K', '', 'K', 'K.K@zensar.com', '.', 'KK0010', 0, 'KK123', 1, 2);

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actionitems`
--
ALTER TABLE `actionitems`
  ADD PRIMARY KEY (`actionItemsId`),
  ADD KEY `actionItems_fk0` (`userId`);

--
-- Indexes for table `headcount`
--
ALTER TABLE `headcount`
  ADD PRIMARY KEY (`headCountId`),
  ADD KEY `HeadCount_fk0` (`userId`);

--
-- Indexes for table `monthheadcount`
--
ALTER TABLE `monthheadcount`
  ADD PRIMARY KEY (`monthCountId`),
  ADD KEY `MonthHeadCount_fk0` (`userId`);

--
-- Indexes for table `revenue`
--
ALTER TABLE `revenue`
  ADD PRIMARY KEY (`revenueId`),
  ADD KEY `Revenue_fk0` (`userId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `srf`
--
ALTER TABLE `srf`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `User_fk0` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actionitems`
--
ALTER TABLE `actionitems`
  MODIFY `actionItemsId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `headcount`
--
ALTER TABLE `headcount`
  MODIFY `headCountId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `monthheadcount`
--
ALTER TABLE `monthheadcount`
  MODIFY `monthCountId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `revenue`
--
ALTER TABLE `revenue`
  MODIFY `revenueId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `srf`
--
ALTER TABLE `srf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actionitems`
--
ALTER TABLE `actionitems`
  ADD CONSTRAINT `ActionItems_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `headcount`
--
ALTER TABLE `headcount`
  ADD CONSTRAINT `HeadCount_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `monthheadcount`
--
ALTER TABLE `monthheadcount`
  ADD CONSTRAINT `MonthHeadCount_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `revenue`
--
ALTER TABLE `revenue`
  ADD CONSTRAINT `Revenue_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
