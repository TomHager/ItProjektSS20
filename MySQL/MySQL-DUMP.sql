-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 03. Jul 2020 um 10:26
-- Server-Version: 5.7.24
-- PHP-Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+02:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `it-projekt-ss2020`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `standard` tinyint(1) NOT NULL,
  `retailer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entries`
--

CREATE TABLE `entries` (
  `id` int(11) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `modification_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `groupmemberships`
--

CREATE TABLE `groupmemberships` (
  `member` int(11) NOT NULL,
  `group_membership` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `groupmemberships`
--

INSERT INTO `groupmemberships` (`member`, `group_membership`) VALUES
(1, 1),
(1, 2),
(2, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Alpha'),
(2, 'Bravo'),
(3, 'Charlie');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `retailerentrylists`
--

CREATE TABLE `retailerentrylists` (
  `shopping_list_id` int(11) NOT NULL,
  `retailer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `retailergroups`
--

CREATE TABLE `retailergroups` (
  `retailer_member` int(11) NOT NULL,
  `retailer_group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `retailers`
--

CREATE TABLE `retailers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `groups_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `shoppinglists`
--

CREATE TABLE `shoppinglists` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `groups_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `external_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `external_id`) VALUES
(1, 'Alex', 'alexalex', 1),
(2, 'Bernd', 'berndbernd', 2),
(3, 'Chris', 'chrischris', 3);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `retailer.id` (`retailer_id`) USING BTREE;

--
-- Indizes für die Tabelle `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indizes für die Tabelle `groupmemberships`
--
ALTER TABLE `groupmemberships`
  ADD KEY `groupMembership` (`member`,`group_membership`),
  ADD KEY `group_membership` (`group_membership`);

--
-- Indizes für die Tabelle `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `retailerentrylists`
--
ALTER TABLE `retailerentrylists`
  ADD KEY `retailer_entry_list` (`shopping_list_id`,`retailer_id`,`user_id`,`entry_id`);

--
-- Indizes für die Tabelle `retailergroups`
--
ALTER TABLE `retailergroups`
  ADD KEY `retailergroup` (`retailer_member`,`retailer_group`);

--
-- Indizes für die Tabelle `retailers`
--
ALTER TABLE `retailers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_id` (`groups_id`);

--
-- Indizes für die Tabelle `shoppinglists`
--
ALTER TABLE `shoppinglists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_id` (`groups_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
