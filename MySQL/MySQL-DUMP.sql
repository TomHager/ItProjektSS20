-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 05, 2020 at 12:59 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it-projekt-ss2020`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `articleId` int(11) NOT NULL,
  `articleName` varchar(100) NOT NULL,
  `articleStandard` tinyint(1) NOT NULL,
  `articleRetailerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `entry`
--

CREATE TABLE `entry` (
  `entryId` int(11) NOT NULL,
  `entryUnit` varchar(50) NOT NULL,
  `entryAmount` int(11) NOT NULL,
  `entryArticleId` int(11) NOT NULL,
  `entryArticleName` varchar(100) NOT NULL,
  `entryArticleStandard` tinyint(1) NOT NULL,
  `entryModificationDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `groupId` int(11) NOT NULL,
  `groupName` varchar(50) NOT NULL,
  `groupGroupUserListId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `groupuserlist`
--

CREATE TABLE `groupuserlist` (
  `groupUserListId` int(11) NOT NULL,
  `groupUserListUserId` int(11) NOT NULL,
  `groupUserListGroupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `retailer`
--

CREATE TABLE `retailer` (
  `retailerId` int(11) NOT NULL,
  `retailerName` varchar(50) NOT NULL,
  `retailerGroupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `retailerentrylist`
--

CREATE TABLE `retailerentrylist` (
  `retailerEntryListId` int(11) NOT NULL,
  `retailerEntryListUserId` int(11) NOT NULL,
  `retailerEntryListUserName` varchar(50) NOT NULL,
  `retailerEntryListRetailerId` int(11) NOT NULL,
  `retailerEntryListRetailerName` varchar(50) NOT NULL,
  `retailerEntryListShoppingListId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shoppinglist`
--

CREATE TABLE `shoppinglist` (
  `shoppingListId` int(11) NOT NULL,
  `shoppingListName` varchar(50) NOT NULL,
  `shoppingListGroupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userEmail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`articleId`),
  ADD KEY `retailerId` (`articleRetailerId`) USING BTREE;

--
-- Indexes for table `entry`
--
ALTER TABLE `entry`
  ADD PRIMARY KEY (`entryId`),
  ADD KEY `articleId` (`entryArticleId`,`entryArticleName`,`entryArticleStandard`) USING BTREE;

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupId`),
  ADD KEY `groupUserListId` (`groupGroupUserListId`) USING BTREE;

--
-- Indexes for table `groupuserlist`
--
ALTER TABLE `groupuserlist`
  ADD PRIMARY KEY (`groupUserListId`),
  ADD KEY `userId` (`groupUserListUserId`) USING BTREE,
  ADD KEY `groupId` (`groupUserListGroupId`) USING BTREE;

--
-- Indexes for table `retailer`
--
ALTER TABLE `retailer`
  ADD PRIMARY KEY (`retailerId`),
  ADD KEY `groupId` (`retailerGroupId`) USING BTREE;

--
-- Indexes for table `retailerentrylist`
--
ALTER TABLE `retailerentrylist`
  ADD PRIMARY KEY (`retailerEntryListId`),
  ADD KEY `userRetailerEntryList` (`retailerEntryListUserId`,`retailerEntryListUserName`),
  ADD KEY `RetailerRetailerEntryList` (`retailerEntryListRetailerId`,`retailerEntryListRetailerName`),
  ADD KEY `ShoppingListRetailerEntryList` (`retailerEntryListShoppingListId`);

--
-- Indexes for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD PRIMARY KEY (`shoppingListId`),
  ADD KEY `groupId` (`shoppingListGroupId`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `articleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entry`
--
ALTER TABLE `entry`
  MODIFY `entryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `groupId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groupuserlist`
--
ALTER TABLE `groupuserlist`
  MODIFY `groupUserListId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `retailer`
--
ALTER TABLE `retailer`
  MODIFY `retailerId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `retailerentrylist`
--
ALTER TABLE `retailerentrylist`
  MODIFY `retailerEntryListId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  MODIFY `shoppingListId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
