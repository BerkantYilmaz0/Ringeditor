-- Bu dosya sadece veritabanı şemasını içerir. Gerçek verileri içermez.
-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Anamakine: db
-- Üretim Zamanı: 12 Şub 2026, 18:55:36
-- Sunucu sürümü: 8.0.45
-- PHP Sürümü: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `aa`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `account`
--

CREATE TABLE `account` (
  `accountID` varchar(32) NOT NULL,
  `accountType` smallint UNSIGNED DEFAULT NULL,
  `notifyEmail` varchar(128) DEFAULT NULL,
  `speedUnits` tinyint UNSIGNED DEFAULT NULL,
  `distanceUnits` tinyint UNSIGNED DEFAULT NULL,
  `volumeUnits` tinyint UNSIGNED DEFAULT NULL,
  `economyUnits` tinyint UNSIGNED DEFAULT NULL,
  `temperatureUnits` tinyint UNSIGNED DEFAULT NULL,
  `latLonFormat` tinyint UNSIGNED DEFAULT NULL,
  `geocoderMode` tinyint UNSIGNED DEFAULT NULL,
  `privateLabelName` varchar(32) DEFAULT NULL,
  `isBorderCrossing` tinyint DEFAULT NULL,
  `retainedEventAge` int UNSIGNED DEFAULT NULL,
  `autoAddDevices` tinyint DEFAULT NULL,
  `expirationTime` int UNSIGNED DEFAULT NULL,
  `defaultUser` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `contactName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `contactPhone` varchar(32) DEFAULT NULL,
  `contactEmail` varchar(128) DEFAULT NULL,
  `timeZone` varchar(32) DEFAULT NULL,
  `passwdQueryTime` int UNSIGNED DEFAULT NULL,
  `lastLoginTime` int UNSIGNED DEFAULT NULL,
  `isActive` tinyint DEFAULT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL,
  `pressureUnits` tinyint UNSIGNED DEFAULT NULL,
  `maximumDevices` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `account`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `accountstring`
--

CREATE TABLE `accountstring` (
  `accountID` varchar(32) NOT NULL,
  `stringID` varchar(32) NOT NULL,
  `singularTitle` varchar(64) DEFAULT NULL,
  `pluralTitle` varchar(64) DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `accountstring`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cron`
--

CREATE TABLE `cron` (
  `id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `stop` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `warnin` tinyint NOT NULL,
  `repeats` tinyint NOT NULL,
  `lastwarned` bigint DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `cron`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `device`
--

CREATE TABLE `device` (
  `accountID` varchar(32) COLLATE utf8mb3_turkish_ci NOT NULL,
  `deviceID` varchar(32) COLLATE utf8mb3_turkish_ci NOT NULL,
  `groupID` varchar(32) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `equipmentType` varchar(40) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `vehicleID` varchar(24) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `driverID` varchar(32) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `uniqueID` varchar(40) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `deviceCode` varchar(24) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `deviceType` varchar(24) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `pushpinID` varchar(32) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `serialNumber` varchar(24) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `simPhoneNumber` varchar(24) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `smsEmail` varchar(64) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `imeiNumber` varchar(24) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `ignitionIndex` smallint DEFAULT NULL,
  `codeVersion` varchar(32) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `featureSet` varchar(64) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `ipAddressValid` varchar(128) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `lastTotalConnectTime` int UNSIGNED DEFAULT NULL,
  `lastDuplexConnectTime` int UNSIGNED DEFAULT NULL,
  `pendingPingCommand` mediumtext COLLATE utf8mb3_turkish_ci,
  `lastPingTime` int UNSIGNED DEFAULT NULL,
  `totalPingCount` smallint UNSIGNED DEFAULT NULL,
  `maxPingCount` smallint UNSIGNED DEFAULT NULL,
  `expectAck` tinyint DEFAULT NULL,
  `lastAckCommand` mediumtext COLLATE utf8mb3_turkish_ci,
  `lastAckTime` int UNSIGNED DEFAULT NULL,
  `dcsConfigMask` int UNSIGNED DEFAULT NULL,
  `supportsDMTP` tinyint DEFAULT NULL,
  `supportedEncodings` tinyint UNSIGNED DEFAULT NULL,
  `unitLimitInterval` smallint UNSIGNED DEFAULT NULL,
  `maxAllowedEvents` smallint UNSIGNED DEFAULT NULL,
  `totalProfileMask` blob,
  `totalMaxConn` smallint UNSIGNED DEFAULT NULL,
  `totalMaxConnPerMin` smallint UNSIGNED DEFAULT NULL,
  `duplexProfileMask` blob,
  `duplexMaxConn` smallint UNSIGNED DEFAULT NULL,
  `duplexMaxConnPerMin` smallint UNSIGNED DEFAULT NULL,
  `ipAddressCurrent` varchar(32) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `remotePortCurrent` smallint UNSIGNED DEFAULT NULL,
  `listenPortCurrent` smallint UNSIGNED DEFAULT NULL,
  `lastInputState` int UNSIGNED DEFAULT NULL,
  `lastValidLatitude` double DEFAULT NULL,
  `lastValidLongitude` double DEFAULT NULL,
  `lastGPSTimestamp` int UNSIGNED DEFAULT NULL,
  `lastOdometerKM` double DEFAULT NULL,
  `odometerOffsetKM` double DEFAULT NULL,
  `isActive` tinyint DEFAULT NULL,
  `displayName` varchar(40) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `description` varchar(128) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb3_turkish_ci,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL,
  `licensePlate` varchar(24) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `fuelCapacity` double DEFAULT NULL,
  `speedLimitKPH` double DEFAULT NULL,
  `expirationTime` int UNSIGNED DEFAULT NULL,
  `displayColor` varchar(16) COLLATE utf8mb3_turkish_ci DEFAULT NULL,
  `dataKey` mediumtext COLLATE utf8mb3_turkish_ci,
  `lastBatteryLevel` double DEFAULT NULL,
  `lastFuelLevel` double DEFAULT NULL,
  `lastOilLevel` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `device`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `devicegroup`
--

CREATE TABLE `devicegroup` (
  `accountID` varchar(32) NOT NULL,
  `groupID` varchar(32) NOT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `devicegroup`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `devicelist`
--

CREATE TABLE `devicelist` (
  `accountID` varchar(32) COLLATE utf8mb3_turkish_ci NOT NULL,
  `groupID` varchar(32) COLLATE utf8mb3_turkish_ci NOT NULL,
  `deviceID` varchar(32) COLLATE utf8mb3_turkish_ci NOT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `devicelist`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `diagnostic`
--

CREATE TABLE `diagnostic` (
  `accountID` varchar(32) NOT NULL,
  `deviceID` varchar(32) NOT NULL,
  `isError` tinyint NOT NULL,
  `codeKey` int UNSIGNED NOT NULL,
  `timestamp` int UNSIGNED NOT NULL,
  `binaryValue` blob
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `driver`
--

CREATE TABLE `driver` (
  `accountID` varchar(32) NOT NULL,
  `driverID` varchar(32) NOT NULL,
  `contactPhone` varchar(32) DEFAULT NULL,
  `licenseType` varchar(24) DEFAULT NULL,
  `licenseNumber` varchar(32) DEFAULT NULL,
  `licenseExpire` int UNSIGNED DEFAULT NULL,
  `badgeID` varchar(32) DEFAULT NULL,
  `address` varchar(90) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `birthdate` int UNSIGNED DEFAULT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL,
  `contactEmail` varchar(128) DEFAULT NULL,
  `deviceID` varchar(32) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `eventdata`
--

CREATE TABLE `eventdata` (
  `accountID` varchar(32) NOT NULL,
  `deviceID` varchar(32) NOT NULL,
  `timestamp` int UNSIGNED NOT NULL,
  `statusCode` int UNSIGNED NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `gpsAge` int UNSIGNED DEFAULT NULL,
  `speedKPH` double DEFAULT NULL,
  `heading` double DEFAULT NULL,
  `altitude` double DEFAULT NULL,
  `transportID` varchar(32) DEFAULT NULL,
  `inputMask` int UNSIGNED DEFAULT NULL,
  `address` varchar(90) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `dataSource` varchar(32) DEFAULT NULL,
  `rawData` text,
  `distanceKM` double DEFAULT NULL,
  `odometerKM` double DEFAULT NULL,
  `geozoneIndex` int UNSIGNED DEFAULT NULL,
  `geozoneID` varchar(32) DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `eventtemplate`
--

CREATE TABLE `eventtemplate` (
  `accountID` varchar(32) NOT NULL,
  `deviceID` varchar(32) NOT NULL,
  `customType` tinyint UNSIGNED NOT NULL,
  `repeatLast` tinyint DEFAULT NULL,
  `template` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `geozone`
--

CREATE TABLE `geozone` (
  `accountID` varchar(32) NOT NULL,
  `geozoneID` varchar(32) NOT NULL,
  `sortID` int UNSIGNED NOT NULL,
  `minLatitude` double DEFAULT NULL,
  `maxLatitude` double DEFAULT NULL,
  `minLongitude` double DEFAULT NULL,
  `maxLongitude` double DEFAULT NULL,
  `reverseGeocode` tinyint DEFAULT NULL,
  `arrivalZone` tinyint DEFAULT NULL,
  `departureZone` tinyint DEFAULT NULL,
  `zoomRegion` tinyint DEFAULT NULL,
  `zoneType` tinyint UNSIGNED DEFAULT NULL,
  `radius` int UNSIGNED DEFAULT NULL,
  `latitude1` double DEFAULT NULL,
  `longitude1` double DEFAULT NULL,
  `latitude2` double DEFAULT NULL,
  `longitude2` double DEFAULT NULL,
  `latitude3` double DEFAULT NULL,
  `longitude3` double DEFAULT NULL,
  `latitude4` double DEFAULT NULL,
  `longitude4` double DEFAULT NULL,
  `latitude5` double DEFAULT NULL,
  `longitude5` double DEFAULT NULL,
  `latitude6` double DEFAULT NULL,
  `longitude6` double DEFAULT NULL,
  `clientUpload` tinyint DEFAULT NULL,
  `clientID` int UNSIGNED DEFAULT NULL,
  `streetAddress` varchar(90) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `city` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `stateProvince` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `postalCode` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `country` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `subdivision` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL,
  `shapeColor` varchar(12) DEFAULT NULL,
  `latitude7` double DEFAULT NULL,
  `longitude7` double DEFAULT NULL,
  `latitude8` double DEFAULT NULL,
  `longitude8` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `geozone`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `grouplist`
--

CREATE TABLE `grouplist` (
  `accountID` varchar(32) NOT NULL,
  `userID` varchar(32) NOT NULL,
  `groupID` varchar(32) NOT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `jobs`
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

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pendingpacket`
--

CREATE TABLE `pendingpacket` (
  `accountID` varchar(32) NOT NULL,
  `deviceID` varchar(32) NOT NULL,
  `queueTime` int UNSIGNED NOT NULL,
  `sequence` smallint UNSIGNED NOT NULL,
  `packetBytes` mediumblob,
  `autoDelete` tinyint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `property`
--

CREATE TABLE `property` (
  `accountID` varchar(32) NOT NULL,
  `deviceID` varchar(32) NOT NULL,
  `propKey` int UNSIGNED NOT NULL,
  `timestamp` int UNSIGNED DEFAULT NULL,
  `binaryValue` blob
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `resource`
--

CREATE TABLE `resource` (
  `accountID` varchar(32) NOT NULL,
  `resourceID` varchar(64) NOT NULL,
  `title` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `properties` text,
  `value` blob,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ring_stop_pivot`
--

CREATE TABLE `ring_stop_pivot` (
  `id` int NOT NULL,
  `ring_type_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `sequence_order` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ring_types`
--

CREATE TABLE `ring_types` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL,
  `type_id` int NOT NULL,
  `color` varchar(7) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `ring_types`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `role`
--

CREATE TABLE `role` (
  `accountID` varchar(32) NOT NULL,
  `roleID` varchar(32) NOT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roleacl`
--

CREATE TABLE `roleacl` (
  `accountID` varchar(32) NOT NULL,
  `roleID` varchar(32) NOT NULL,
  `aclID` varchar(64) NOT NULL,
  `accessLevel` smallint UNSIGNED DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `routes`
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
-- Tablo döküm verisi `routes`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `route_stops`
--

CREATE TABLE `route_stops` (
  `route_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `sequence` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `route_stops`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `statuscode`
--

CREATE TABLE `statuscode` (
  `accountID` varchar(32) NOT NULL,
  `deviceID` varchar(32) NOT NULL,
  `statusCode` int UNSIGNED NOT NULL,
  `statusName` varchar(18) DEFAULT NULL,
  `iconSelector` varchar(128) DEFAULT NULL,
  `iconName` varchar(24) DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `stops`
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
-- Tablo döküm verisi `stops`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `systemprops`
--

CREATE TABLE `systemprops` (
  `propertyID` varchar(32) NOT NULL,
  `value` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `systemprops`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `templates`
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
-- Tablo döküm verisi `templates`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `template_jobs`
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
-- Tablo döküm verisi `template_jobs`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `transport`
--

CREATE TABLE `transport` (
  `accountID` varchar(32) NOT NULL,
  `transportID` varchar(32) NOT NULL,
  `assocAccountID` varchar(32) DEFAULT NULL,
  `assocDeviceID` varchar(32) DEFAULT NULL,
  `uniqueID` varchar(40) DEFAULT NULL,
  `deviceCode` varchar(24) DEFAULT NULL,
  `deviceType` varchar(24) DEFAULT NULL,
  `serialNumber` varchar(24) DEFAULT NULL,
  `simPhoneNumber` varchar(24) DEFAULT NULL,
  `smsEmail` varchar(64) DEFAULT NULL,
  `imeiNumber` varchar(24) DEFAULT NULL,
  `lastInputState` int UNSIGNED DEFAULT NULL,
  `ignitionIndex` smallint UNSIGNED DEFAULT NULL,
  `codeVersion` varchar(32) DEFAULT NULL,
  `featureSet` varchar(64) DEFAULT NULL,
  `ipAddressValid` varchar(128) DEFAULT NULL,
  `ipAddressCurrent` varchar(32) DEFAULT NULL,
  `remotePortCurrent` smallint UNSIGNED DEFAULT NULL,
  `pendingPingCommand` text,
  `lastPingTime` int UNSIGNED DEFAULT NULL,
  `totalPingCount` smallint UNSIGNED DEFAULT NULL,
  `maxPingCount` smallint UNSIGNED DEFAULT NULL,
  `expectAck` tinyint DEFAULT NULL,
  `lastAckCommand` text,
  `lastAckTime` int UNSIGNED DEFAULT NULL,
  `supportsDMTP` tinyint DEFAULT NULL,
  `supportedEncodings` tinyint UNSIGNED DEFAULT NULL,
  `unitLimitInterval` smallint UNSIGNED DEFAULT NULL,
  `maxAllowedEvents` smallint UNSIGNED DEFAULT NULL,
  `totalProfileMask` blob,
  `totalMaxConn` smallint UNSIGNED DEFAULT NULL,
  `totalMaxConnPerMin` smallint UNSIGNED DEFAULT NULL,
  `duplexProfileMask` blob,
  `duplexMaxConn` smallint UNSIGNED DEFAULT NULL,
  `duplexMaxConnPerMin` smallint UNSIGNED DEFAULT NULL,
  `lastTotalConnectTime` int UNSIGNED DEFAULT NULL,
  `lastDuplexConnectTime` int UNSIGNED DEFAULT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `uniquexid`
--

CREATE TABLE `uniquexid` (
  `uniqueID` varchar(40) NOT NULL,
  `accountID` varchar(32) DEFAULT NULL,
  `transportID` varchar(32) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user`
--

CREATE TABLE `user` (
  `accountID` varchar(32) NOT NULL,
  `userID` varchar(32) NOT NULL,
  `userType` smallint UNSIGNED DEFAULT NULL,
  `roleID` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `gender` tinyint UNSIGNED DEFAULT NULL,
  `contactName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `contactPhone` varchar(32) DEFAULT NULL,
  `contactEmail` varchar(64) DEFAULT NULL,
  `timeZone` varchar(32) DEFAULT NULL,
  `firstLoginPageID` varchar(24) DEFAULT NULL,
  `preferredDeviceID` varchar(32) DEFAULT NULL,
  `passwdQueryTime` int UNSIGNED DEFAULT NULL,
  `lastLoginTime` int UNSIGNED DEFAULT NULL,
  `isActive` tinyint DEFAULT NULL,
  `displayName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL,
  `notifyEmail` varchar(128) DEFAULT NULL,
  `maxAccessLevel` smallint UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `user`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `useracl`
--

CREATE TABLE `useracl` (
  `accountID` varchar(32) NOT NULL,
  `userID` varchar(32) NOT NULL,
  `aclID` varchar(64) NOT NULL,
  `accessLevel` smallint UNSIGNED DEFAULT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lastUpdateTime` int UNSIGNED DEFAULT NULL,
  `creationTime` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `useracl`
--

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountID`),
  ADD KEY `email` (`contactEmail`);

--
-- Tablo için indeksler `accountstring`
--
ALTER TABLE `accountstring`
  ADD PRIMARY KEY (`accountID`,`stringID`);

--
-- Tablo için indeksler `cron`
--
ALTER TABLE `cron`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`accountID`,`deviceID`),
  ADD KEY `altIndex` (`uniqueID`);

--
-- Tablo için indeksler `devicegroup`
--
ALTER TABLE `devicegroup`
  ADD PRIMARY KEY (`accountID`,`groupID`);

--
-- Tablo için indeksler `devicelist`
--
ALTER TABLE `devicelist`
  ADD PRIMARY KEY (`accountID`,`groupID`,`deviceID`);

--
-- Tablo için indeksler `diagnostic`
--
ALTER TABLE `diagnostic`
  ADD PRIMARY KEY (`accountID`,`deviceID`,`isError`,`codeKey`,`timestamp`);

--
-- Tablo için indeksler `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`accountID`,`driverID`);

--
-- Tablo için indeksler `eventdata`
--
ALTER TABLE `eventdata`
  ADD PRIMARY KEY (`accountID`,`deviceID`,`timestamp`,`statusCode`),
  ADD KEY `event_time_ndx` (`timestamp`);

--
-- Tablo için indeksler `eventtemplate`
--
ALTER TABLE `eventtemplate`
  ADD PRIMARY KEY (`accountID`,`deviceID`,`customType`);

--
-- Tablo için indeksler `geozone`
--
ALTER TABLE `geozone`
  ADD PRIMARY KEY (`accountID`,`geozoneID`,`sortID`),
  ADD KEY `bounds` (`minLatitude`,`maxLatitude`,`minLongitude`,`maxLongitude`),
  ADD KEY `altIndex` (`clientID`);

--
-- Tablo için indeksler `grouplist`
--
ALTER TABLE `grouplist`
  ADD PRIMARY KEY (`accountID`,`userID`,`groupID`);

--
-- Tablo için indeksler `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `deviceid_duetime` (`deviceid`,`duetime`);

--
-- Tablo için indeksler `pendingpacket`
--
ALTER TABLE `pendingpacket`
  ADD PRIMARY KEY (`accountID`,`deviceID`,`queueTime`,`sequence`);

--
-- Tablo için indeksler `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`accountID`,`deviceID`,`propKey`);

--
-- Tablo için indeksler `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`accountID`,`resourceID`);

--
-- Tablo için indeksler `ring_stop_pivot`
--
ALTER TABLE `ring_stop_pivot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ring_type_id` (`ring_type_id`),
  ADD KEY `stop_id` (`stop_id`);

--
-- Tablo için indeksler `ring_types`
--
ALTER TABLE `ring_types`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`accountID`,`roleID`);

--
-- Tablo için indeksler `roleacl`
--
ALTER TABLE `roleacl`
  ADD PRIMARY KEY (`accountID`,`roleID`,`aclID`);

--
-- Tablo için indeksler `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ring_type_id` (`ring_type_id`);

--
-- Tablo için indeksler `route_stops`
--
ALTER TABLE `route_stops`
  ADD PRIMARY KEY (`route_id`,`stop_id`),
  ADD KEY `stop_id` (`stop_id`);

--
-- Tablo için indeksler `statuscode`
--
ALTER TABLE `statuscode`
  ADD PRIMARY KEY (`accountID`,`deviceID`,`statusCode`);

--
-- Tablo için indeksler `stops`
--
ALTER TABLE `stops`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `systemprops`
--
ALTER TABLE `systemprops`
  ADD PRIMARY KEY (`propertyID`);

--
-- Tablo için indeksler `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `template_jobs`
--
ALTER TABLE `template_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`accountID`,`transportID`),
  ADD KEY `device` (`assocAccountID`,`assocDeviceID`),
  ADD KEY `altIndex` (`uniqueID`);

--
-- Tablo için indeksler `uniquexid`
--
ALTER TABLE `uniquexid`
  ADD PRIMARY KEY (`uniqueID`);

--
-- Tablo için indeksler `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`accountID`,`userID`),
  ADD KEY `role` (`roleID`),
  ADD KEY `email` (`contactEmail`);

--
-- Tablo için indeksler `useracl`
--
ALTER TABLE `useracl`
  ADD PRIMARY KEY (`accountID`,`userID`,`aclID`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263145;

--
-- Tablo için AUTO_INCREMENT değeri `ring_stop_pivot`
--
ALTER TABLE `ring_stop_pivot`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `ring_types`
--
ALTER TABLE `ring_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `stops`
--
ALTER TABLE `stops`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Tablo için AUTO_INCREMENT değeri `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- Tablo için AUTO_INCREMENT değeri `template_jobs`
--
ALTER TABLE `template_jobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1548;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `ring_stop_pivot`
--
ALTER TABLE `ring_stop_pivot`
  ADD CONSTRAINT `ring_stop_pivot_ibfk_1` FOREIGN KEY (`ring_type_id`) REFERENCES `ring_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ring_stop_pivot_ibfk_2` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`ring_type_id`) REFERENCES `ring_types` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `route_stops`
--
ALTER TABLE `route_stops`
  ADD CONSTRAINT `route_stops_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `route_stops_ibfk_2` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
