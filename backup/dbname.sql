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

DROP TABLE IF EXISTS `C_FIELDS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_FIELDS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL,
  `ISORIGINAL` int DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_FIELDS`
--

LOCK TABLES `C_FIELDS` WRITE;
/*!40000 ALTER TABLE `C_FIELDS` DISABLE KEYS */;
INSERT INTO `C_FIELDS` VALUES (1,'C_NAME',1),(2,'C_COUNTRY',1),(3,'C_PHONE_1',1),(4,'C_PHONE_2',1),(5,'C_TAX_NUMBER',1),(6,'C_CREATED_AT',1),(7,'C_ACTIVE',1),(11,'C_NOTES',1),(62,'Temp11',0),(63,'Temp3',0),(64,'Temp7',0),(69,'Temp16',0);
/*!40000 ALTER TABLE `C_FIELDS` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_GROUP`
--

LOCK TABLES `C_GROUP` WRITE;
/*!40000 ALTER TABLE `C_GROUP` DISABLE KEYS */;
INSERT INTO `C_GROUP` VALUES (5,'ACM'),(6,'temp_grp'),(17,'Temp_10'),(18,'temp_grp_2'),(19,'temp4'),(20,'temp5'),(21,'temp6');
/*!40000 ALTER TABLE `C_GROUP` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_MODULE`
--

LOCK TABLES `C_MODULE` WRITE;
/*!40000 ALTER TABLE `C_MODULE` DISABLE KEYS */;
INSERT INTO `C_MODULE` VALUES (4,'module_4'),(7,'module_5'),(8,'module_6'),(9,'temp');
/*!40000 ALTER TABLE `C_MODULE` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_PERSON`
--

LOCK TABLES `C_PERSON` WRITE;
/*!40000 ALTER TABLE `C_PERSON` DISABLE KEYS */;
INSERT INTO `C_PERSON` VALUES (6,44,'Myaadityapal','Software Developer','7903966014','abhijeet@gmail.com'),(7,44,'Aaditya Pal','Software Enginner','9854623589','aaditya@gmail.com'),(10,44,'Tanya Rajpal','Software Developer','+917903966014','aaditya7739008423@gmail.com');
/*!40000 ALTER TABLE `C_PERSON` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Temp11` varchar(255) DEFAULT NULL,
  `Temp3` varchar(255) DEFAULT NULL,
  `Temp7` varchar(255) DEFAULT NULL,
  `Temp16` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPANY`
--

LOCK TABLES `COMPANY` WRITE;
/*!40000 ALTER TABLE `COMPANY` DISABLE KEYS */;
INSERT INTO `COMPANY` VALUES (44,'FINALTEST11','{\"value\":\"AU\",\"label\":\"Australia\"}','9856452135','9563256523','1111111111','1618425000000',1,'This is so awesome!','asdaasdfasdsadfasdfa','null','null',NULL),(46,'FINALTESTCOMP','{\"value\":\"PF\",\"label\":\"French Polynesia\"}','3344343233','3332233444343','33343344434344','Sat Apr 10 2021 20:46:04 GMT+0530 (India Standard Time)',1,'','','','',''),(47,'FINALTEST20','{\"value\":\"ET\",\"label\":\"Ethiopia\"}','','','','Fri Apr 08 2022 20:47:13 GMT+0530 (India Standard Time)',1,'','','','','');
/*!40000 ALTER TABLE `COMPANY` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `G_LINK`
--

LOCK TABLES `G_LINK` WRITE;
/*!40000 ALTER TABLE `G_LINK` DISABLE KEYS */;
INSERT INTO `G_LINK` VALUES (234,44,5),(235,44,6),(236,44,17),(237,44,18),(238,44,19),(239,44,20),(240,44,21),(241,46,5),(242,46,21),(243,47,18);
/*!40000 ALTER TABLE `G_LINK` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `M_LINK`
--

LOCK TABLES `M_LINK` WRITE;
/*!40000 ALTER TABLE `M_LINK` DISABLE KEYS */;
INSERT INTO `M_LINK` VALUES (149,44,4),(150,44,7),(151,44,8),(152,44,9),(153,46,9),(154,46,4),(155,47,8);
/*!40000 ALTER TABLE `M_LINK` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-24 15:59:23