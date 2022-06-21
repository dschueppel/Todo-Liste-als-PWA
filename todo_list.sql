-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Jun 2022 um 17:51
-- Server-Version: 10.4.24-MariaDB
-- PHP-Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `todo_list`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `lists`
--

CREATE TABLE `lists` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0,
  `flag_important` tinyint(1) NOT NULL DEFAULT 0,
  `priority` tinyint(4) NOT NULL DEFAULT 0,
  `hex_color` int(11) NOT NULL DEFAULT 0,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `todo_text` varchar(1023) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `lists`
--

INSERT INTO `lists` (`id`, `userid`, `done`, `flag_important`, `priority`, `hex_color`, `date`, `time`, `todo_text`) VALUES
(1, 1, 0, 1, 40, 16409600, NULL, NULL, 't5vt'),
(29, 2, 1, 0, 0, 2428632, NULL, NULL, '35tw53vzw45zw4'),
(3, 1, 1, 0, 127, 2743256, '2022-06-30', '14:59:00', 'zbe46ze6zue'),
(6, 1, 1, 0, 0, 0, NULL, NULL, '2'),
(23, 2, 0, 0, 0, 12584946, NULL, NULL, NULL),
(10, 1, 0, 0, 13, 16514816, NULL, NULL, '34t3t 7 hier'),
(12, 1, 0, 0, 0, 16711901, NULL, NULL, NULL),
(26, 2, 1, 0, 0, 15788032, NULL, NULL, NULL),
(13, 2, 1, 0, 33, 2678800, '2022-06-08', NULL, '3t3tth\n4tz*t*t3´r'),
(30, 2, 0, 0, 0, 12033951, NULL, NULL, NULL),
(20, 1, 0, 0, 0, 16040981, NULL, NULL, '2434'),
(21, 1, 0, 0, 0, 13625862, NULL, NULL, 'ef+we+-3'),
(31, 2, 0, 0, 0, 1227234, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sessions`
--

CREATE TABLE `sessions` (
  `sessionid` int(11) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `sessions`
--

INSERT INTO `sessions` (`sessionid`, `userid`) VALUES
(366, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(63) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(1, 'David Schüppel', '$2y$10$P12N4Fd1pnmnKHPZLrzTae.DGskUZyv359zszSA57XUEtXZhLWqRe'),
(2, 'Test 1', '$2y$10$CYr3dvwCBGdueH70cqOzouZX9TX94c1owKSZi4scQbaKk9oQn9Fey');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sessionid`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT für Tabelle `sessions`
--
ALTER TABLE `sessions`
  MODIFY `sessionid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
