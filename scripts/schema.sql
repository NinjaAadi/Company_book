-- MySQL dump 10.13  Distrib 8.0.23, for osx10.16 (x86_64)
--
-- Host: localhost    Database: client
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `C_FIELDS`
--

CREATE DATABASE client;

USE client;

DROP TABLE IF EXISTS `C_FIELDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_FIELDS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL,
  `ISORIGINAL` int DEFAULT '1',
  PRIMARY KEY (`ID`)
);

INSERT INTO C_FIELDS VALUES (1,'C_NAME',1),(2,'C_COUNTRY',1),(3,'C_PHONE_1',1),(4,'C_PHONE_2',1),(5,'C_TAX_NUMBER',1),(6,'C_CREATED_AT',1),(7,'C_ACTIVE',1),(11,'C_NOTES',1);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `C_GROUP`
--

DROP TABLE IF EXISTS `C_GROUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_GROUP` (
  `G_ID` int NOT NULL AUTO_INCREMENT,
  `G_NAME` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`G_ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `C_MODULE`
--

DROP TABLE IF EXISTS `C_MODULE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_MODULE` (
  `M_ID` int NOT NULL AUTO_INCREMENT,
  `M_NAME` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`M_ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `C_PERSON`
--

DROP TABLE IF EXISTS `C_PERSON`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_PERSON` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `C_ID` int DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `DESIGNATION` varchar(255) DEFAULT NULL,
  `MOBILE` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_ID` (`C_ID`),
  CONSTRAINT `c_person_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `COMPANY` (`C_ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `COMPANY`
--

DROP TABLE IF EXISTS `COMPANY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMPANY` (
  `C_ID` int NOT NULL AUTO_INCREMENT,
  `C_NAME` varchar(300) DEFAULT NULL,
  `C_COUNTRY` varchar(300) DEFAULT NULL,
  `C_PHONE_1` varchar(20) DEFAULT NULL,
  `C_PHONE_2` varchar(20) DEFAULT NULL,
  `C_TAX_NUMBER` varchar(100) DEFAULT NULL,
  `C_CREATED_AT` varchar(100) DEFAULT NULL,
  `C_ACTIVE` int DEFAULT '1',
  `C_NOTES` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `G_LINK`
--

DROP TABLE IF EXISTS `G_LINK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `G_LINK` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `C_ID` int DEFAULT NULL,
  `G_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_ID` (`C_ID`),
  KEY `G_ID` (`G_ID`),
  CONSTRAINT `g_link_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `COMPANY` (`C_ID`),
  CONSTRAINT `g_link_ibfk_2` FOREIGN KEY (`G_ID`) REFERENCES `C_GROUP` (`G_ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `M_LINK`
--

DROP TABLE IF EXISTS `M_LINK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `M_LINK` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `C_ID` int DEFAULT NULL,
  `M_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_ID` (`C_ID`),
  KEY `M_ID` (`M_ID`),
  CONSTRAINT `m_link_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `COMPANY` (`C_ID`),
  CONSTRAINT `m_link_ibfk_2` FOREIGN KEY (`M_ID`) REFERENCES `C_MODULE` (`M_ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-08  1:54:11
