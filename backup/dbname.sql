-- MySQL dump 10.13  Distrib 5.7.27, for Win64 (x86_64)
--
-- Host: localhost    Database: client
-- ------------------------------------------------------
-- Server version	5.7.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `c_fields`
--

DROP TABLE IF EXISTS `c_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_fields` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL,
  `ISORIGINAL` int(11) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_fields`
--

LOCK TABLES `c_fields` WRITE;
/*!40000 ALTER TABLE `c_fields` DISABLE KEYS */;
INSERT INTO `c_fields` VALUES (1,'C_NAME',1),(2,'C_COUNTRY',1),(3,'C_PHONE_1',1),(4,'C_PHONE_2',1),(5,'C_TAX_NUMBER',1),(6,'C_CREATED_AT',1),(7,'C_ACTIVE',1),(11,'C_NOTES',1),(12,'newfield5',0);
/*!40000 ALTER TABLE `c_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_group`
--

DROP TABLE IF EXISTS `c_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_group` (
  `G_ID` int(11) NOT NULL AUTO_INCREMENT,
  `G_NAME` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`G_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_group`
--

LOCK TABLES `c_group` WRITE;
/*!40000 ALTER TABLE `c_group` DISABLE KEYS */;
INSERT INTO `c_group` VALUES (1,'newgroup'),(2,'newgrp2');
/*!40000 ALTER TABLE `c_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_module`
--

DROP TABLE IF EXISTS `c_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_module` (
  `M_ID` int(11) NOT NULL AUTO_INCREMENT,
  `M_NAME` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`M_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_module`
--

LOCK TABLES `c_module` WRITE;
/*!40000 ALTER TABLE `c_module` DISABLE KEYS */;
INSERT INTO `c_module` VALUES (1,'newmod');
/*!40000 ALTER TABLE `c_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_person`
--

DROP TABLE IF EXISTS `c_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_person` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `C_ID` int(11) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `DESIGNATION` varchar(255) DEFAULT NULL,
  `MOBILE` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_ID` (`C_ID`),
  CONSTRAINT `c_person_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `company` (`C_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_person`
--

LOCK TABLES `c_person` WRITE;
/*!40000 ALTER TABLE `c_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `C_ID` int(11) NOT NULL AUTO_INCREMENT,
  `C_NAME` varchar(300) DEFAULT NULL,
  `C_COUNTRY` varchar(300) DEFAULT NULL,
  `C_PHONE_1` varchar(20) DEFAULT NULL,
  `C_PHONE_2` varchar(20) DEFAULT NULL,
  `C_TAX_NUMBER` varchar(100) DEFAULT NULL,
  `C_CREATED_AT` varchar(100) DEFAULT NULL,
  `C_ACTIVE` int(11) DEFAULT '1',
  `C_NOTES` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `g_link`
--

DROP TABLE IF EXISTS `g_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `g_link` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `C_ID` int(11) DEFAULT NULL,
  `G_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_ID` (`C_ID`),
  KEY `G_ID` (`G_ID`),
  CONSTRAINT `g_link_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `company` (`C_ID`),
  CONSTRAINT `g_link_ibfk_2` FOREIGN KEY (`G_ID`) REFERENCES `c_group` (`G_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `g_link`
--

LOCK TABLES `g_link` WRITE;
/*!40000 ALTER TABLE `g_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `g_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_link`
--

DROP TABLE IF EXISTS `m_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_link` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `C_ID` int(11) DEFAULT NULL,
  `M_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `C_ID` (`C_ID`),
  KEY `M_ID` (`M_ID`),
  CONSTRAINT `m_link_ibfk_1` FOREIGN KEY (`C_ID`) REFERENCES `company` (`C_ID`),
  CONSTRAINT `m_link_ibfk_2` FOREIGN KEY (`M_ID`) REFERENCES `c_module` (`M_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_link`
--

LOCK TABLES `m_link` WRITE;
/*!40000 ALTER TABLE `m_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_link` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-08 11:24:14
