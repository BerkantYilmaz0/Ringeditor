-- Optimised Schema for Ring Planner
-- Contains only used tables and columns
-- Generated for GitHub Publication

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `account`
-- only strictly used fields kept
--

CREATE TABLE `account` (
  `accountID` varchar(32) NOT NULL,
  `contactName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `isActive` tinyint DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `device`
-- Simplified for Ring Planner (Tracking fields removed)
--

CREATE TABLE `device` (
  `accountID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `deviceID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci,
  `isActive` tinyint DEFAULT 1,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Table structure for table `devicelist`
-- used for grouping devices (e.g. 'servisler')
--

CREATE TABLE `devicelist` (
  `accountID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `groupID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `deviceID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int NOT NULL,
  `deviceid` int NOT NULL,
  `status` tinyint DEFAULT NULL,
  `duetime` bigint NOT NULL,
  `type` tinyint DEFAULT '1',
  `route_id` int DEFAULT NULL,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `ring_stop_pivot`
--

CREATE TABLE `ring_stop_pivot` (
  `id` int NOT NULL,
  `ring_type_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `sequence_order` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `ring_types`
--

CREATE TABLE `ring_types` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL,
  `type_id` int NOT NULL,
  `color` varchar(7) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ring_type_id` int NOT NULL,
  `geometry` longtext COLLATE utf8mb4_unicode_ci COMMENT 'GeoJSON LineString',
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `route_stops`
--

CREATE TABLE `route_stops` (
  `route_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `sequence` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `stops`
--

CREATE TABLE `stops` (
  `id` int NOT NULL,
  `name` text COLLATE utf8mb4_general_ci NOT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `template_jobs`
--

CREATE TABLE `template_jobs` (
  `id` int NOT NULL,
  `template_id` int NOT NULL,
  `duetime` bigint NOT NULL,
  `type_id` int NOT NULL,
  `route_id` int DEFAULT NULL,
  `deviceid` int DEFAULT NULL,
  `status` int DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `accountID` varchar(32) NOT NULL,
  `userID` varchar(32) NOT NULL,
  `userType` smallint UNSIGNED DEFAULT NULL,
  `roleID` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `contactName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `isActive` tinyint DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes
--

ALTER TABLE `account`
  ADD PRIMARY KEY (`accountID`);

ALTER TABLE `device`
  ADD PRIMARY KEY (`accountID`,`deviceID`);

ALTER TABLE `devicelist`
  ADD PRIMARY KEY (`accountID`,`groupID`,`deviceID`);

ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `deviceid_duetime` (`deviceid`,`duetime`);

ALTER TABLE `ring_stop_pivot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ring_type_id` (`ring_type_id`),
  ADD KEY `stop_id` (`stop_id`);

ALTER TABLE `ring_types`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ring_type_id` (`ring_type_id`);

ALTER TABLE `route_stops`
  ADD PRIMARY KEY (`route_id`,`stop_id`),
  ADD KEY `stop_id` (`stop_id`);

ALTER TABLE `stops`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `template_jobs`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`accountID`,`userID`);

--
-- AUTO_INCREMENT
--

ALTER TABLE `jobs` MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `ring_stop_pivot` MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `ring_types` MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `routes` MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `stops` MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `templates` MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `template_jobs` MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints
--

ALTER TABLE `ring_stop_pivot`
  ADD CONSTRAINT `fk_rsp_ring` FOREIGN KEY (`ring_type_id`) REFERENCES `ring_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rsp_stop` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`id`) ON DELETE CASCADE;

ALTER TABLE `routes`
  ADD CONSTRAINT `fk_route_ring` FOREIGN KEY (`ring_type_id`) REFERENCES `ring_types` (`id`) ON DELETE CASCADE;

ALTER TABLE `route_stops`
  ADD CONSTRAINT `fk_rs_route` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rs_stop` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
