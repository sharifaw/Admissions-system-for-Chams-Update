-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: chams
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'shrs','shreefaw@gmail.com','$2b$10$epYen7PM8Zk8qusoZXaIO./y20B2Pp31oRcA2g1KUgMcuEa6tL7Im'),(2,'chams','chams@gmail.com','$2b$10$epYen7PM8Zk8qusoZXaIO./y20B2Pp31oRcA2g1KUgMcuEa6tL7Im'),(3,'chams','chams@gmail.com','$2b$10$epYen7PM8Zk8qusoZXaIO./y20B2Pp31oRcA2g1KUgMcuEa6tL7Im');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_comments`
--

DROP TABLE IF EXISTS `admin_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `student_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_comments_FK` (`student_id`),
  CONSTRAINT `admin_comments_FK` FOREIGN KEY (`student_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_comments`
--

LOCK TABLES `admin_comments` WRITE;
/*!40000 ALTER TABLE `admin_comments` DISABLE KEYS */;
INSERT INTO `admin_comments` VALUES (2,'sasd',4),(19,'asd',4),(27,'mas',1),(28,'sad',3),(29,'sad',4),(30,'mad',4),(32,'hello',57);
/*!40000 ALTER TABLE `admin_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_setting`
--

DROP TABLE IF EXISTS `admin_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_setting` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `application_deadline` date NOT NULL,
  `bootcamp_name` varchar(100) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_setting`
--

LOCK TABLES `admin_setting` WRITE;
/*!40000 ALTER TABLE `admin_setting` DISABLE KEYS */;
INSERT INTO `admin_setting` VALUES (1,'2022-11-25','2021-12-21','2022-02-22','Chams123','shrs_123@gmx.com','Ghesshrs1@');
/*!40000 ALTER TABLE `admin_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nationality` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `unchr_number` decimal(10,0) DEFAULT NULL,
  `marital_status` enum('single','married','engaged','widow','divorced') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone_number` int NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `field_of_study` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `employment_status` enum('employed','unemployed') NOT NULL,
  `hearing_about_chams` varchar(20) NOT NULL,
  `candidate_background` text NOT NULL,
  `programming_available` enum('yes','no') NOT NULL,
  `coding_experience` text NOT NULL,
  `student_id` int unsigned NOT NULL,
  `future_plans` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nationality_number` int DEFAULT NULL,
  `assignment` text,
  `application_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `application_FK` (`student_id`),
  CONSTRAINT `application_FK` FOREIGN KEY (`student_id`) REFERENCES `register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES (1,'jordan','1998-02-08','male',NULL,'single',962780,'irbid','none','employed','no','null','yes','2',4,'ga',NULL,'upload/68b774b3-cdef-4f4f-a34d-be7afdce7272-123123.png',NULL),(2,'jordan','1998-02-08','male',151,'single',78,'irbid','none','employed','facebook','none','yes','JS',1,'gamer',105,'upload/ad9c7db9-5578-4afd-874d-ca874309d9ed-123123.png',NULL),(4,'jordan','1998-02-08','male',151,'single',78,'irbid','none','employed','facebook','none','yes','JS',42,'gamer',105,'',NULL),(5,'jo','1998-05-06','male',99999,'single',96278,'irbid','none','employed','Social Media','dsa','yes','dadda',2,'sad',99999,'upload/68b774b3-cdef-4f4f-a34d-be7afdce7272-123123.png',NULL),(6,'jo','1998-08-08','male',99999,'single',962,'sad','Engineering','employed','Social Media','dasad','yes','dasdasd',41,'dad',99999,'',NULL),(7,'jo','1998-03-01','male',NULL,'married',987,'amman','none','unemployed','facebook','nooo','yes','Query',3,'gamers',NULL,'upload/57fd6e55-a8e5-4e46-a508-1e1bc8ae1d0a-sad.png',NULL),(51,'jordan','1998-08-02','female',151,'single',78,'irbid','none','unemployed','Social Media','none','yes','JS',43,'gamer',105,'upload/84a7e527-10e1-4740-9beb-4404a4a68be4-Annotation 2019-08-03 132648.png','2021-09-27'),(54,'d','1997-05-04','male',99999,'single',987,'a','none','employed','Social Media','s','yes','js',50,'a',99999,'','2021-10-04'),(59,'dada','1995-03-02','male',99999,'single',78034,'amman','none','unemployed','Google','dad','yes','js',55,'de',99999,'upload/4dbc3fc6-320f-46b7-b229-0220ab71dfcd-123123.png','2021-10-04'),(60,'jordan','1997-03-04','male',99999,'single',962,'amman','none','employed','Social Media','none','yes','JS',57,'none',99999,'upload/91e5b152-23a5-4294-b67b-c434dad132d1-123123.png','2021-10-06');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_of_email`
--

DROP TABLE IF EXISTS `content_of_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_of_email` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(30) NOT NULL,
  `text_email` text NOT NULL,
  `status_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `content_of_email_FK` (`status_id`),
  CONSTRAINT `content_of_email_FK` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_of_email`
--

LOCK TABLES `content_of_email` WRITE;
/*!40000 ALTER TABLE `content_of_email` DISABLE KEYS */;
INSERT INTO `content_of_email` VALUES (1,'testing_stage','you are in test stage ',2),(2,'intreview_stage','hello',3),(3,'accepted','congrats you have been selected accepted',5),(4,'rejected','sorry you have not selected, good luck for next time no no',4);
/*!40000 ALTER TABLE `content_of_email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_templates`
--

DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_templates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(50) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_templates`
--

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;
INSERT INTO `email_templates` VALUES (1,'now','no'),(2,'new','yes no yes');
/*!40000 ALTER TABLE `email_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `status_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `register_FK` (`status_id`),
  CONSTRAINT `register_FK` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (1,'sad','samy','1sa@asd.com','$2b$10$VcMfwKQcjYa0x0KPzvI17uAyiMJt5MiMXi2FV2RhQDNvPyN3AIk7q',2),(2,'sad','as','sa@asd.com','$2b$10$VcMfwKQcjYa0x0KPzvI17uAyiMJt5MiMXi2FV2RhQDNvPyN3AIk7q',6),(3,'sad','as','asd@asd.com','$2b$10$9reh4cz2ysgdg7LO7sz/h.i6v6XBpvwBOac2OQLi6oCzOQtOqd0O6',5),(4,'shrs','aw','shreefaw1@gmail.com','$2b$10$epYen7PM8Zk8qusoZXaIO./y20B2Pp31oRcA2g1KUgMcuEa6tL7Im',6),(10,'sad','sad','10@gm3.com','21',6),(27,'shrs12313','aw','shreefaw2@gmail.com','$2b$10$9reh4cz2ysgdg7LO7sz/h.i6v6XBpvwBOac2OQLi6oCzOQtOqd0O6',3),(32,'sam','samy','samsamy@gm.com','$2b$10$m.MiB46iZUa9tLMzWpJtFu4WuD.4B6kaw13pO4nji3FTrGv.8apzi',6),(33,'laith','laith1','laithnot1@g.com','$2b$10$8m7/ChhuuQGbnRlZ/Up8p.lHREfrdg2sjwQwjZVldj8qnlQJiEM8y',6),(34,'farah','laith','fa2@G.COM','$2b$10$rphHaJIGC1v5Zv8VnPAA7urra5xvmOHP3UqPJC.ktFRcUEvf2QCxe',6),(35,'sad','as','sa@g.com','$2b$10$3dXYXzJ6R4aeMijW3Wpx9OtE2xTqgrQEvY5IHadLwbl3LLqbgaFn.',6),(36,'sad','as','sa@g1.com','$2b$10$/SKAtzDDFEDkRKi16lNr6.tUKNvIIUw5431E/N.Z4bLnTw2yDjW2W',6),(37,'sam','samy','as@g.com','$2b$10$MvfRf.ZXYW0OpJlk1Ca/feSGWBJM2fAs.yQ8CFmf6Hn3E.BgNx35K',6),(38,'la','asd','a2s@g.com','$2b$10$IG43I22fPUeKs4bfsG5l/.rE6Gt2jVZYYIcNMO00M5muCKdsN2zay',6),(39,'la','asd','a2s3@g.com','$2b$10$OmD8tkrkvYKb6U/uA/4Z6eAVk7G1EjLVMkRwKbXvx.GJJDfC2/rrK',6),(40,'sa','ali','ali@mg.ocm','$2b$10$olglhpGtSn7zVTJi5X3wg.XtddTCTiSlcni2BX29KYjn2BXM1feAW',2),(41,'sa','ad','shrs@g.com','$2b$10$OAEtg3Y6jtJKO1fUaXWWn.aNuJpErLW0HSEtcNebAenJKwwE06ypu',2),(42,'mohammad','ali','ali1234@yahoo.com','$2b$10$AQTp2IQi2gaXHqG9OsZL3.X9nNUAgjPRQ.GAy7uEQaeTHI5G1rtE.',2),(43,'samy','ahmad','ahmsam@gm.com','$2b$10$KOPCRdw1ffNhNM.4F9WQtet3HgXO9Q9SQ5oWpbuE1o.V.AN2Kb3jG',6),(46,'shreef','aw','shreefaw123@gmail.com','$2b$10$SxoyUYSxW7CLRGGvKtwEyuakId0oQjLyjgIWPUKs2JTCZqDVWJND2',6),(50,'shrs','asd','shrs@gm.com','$2b$10$eKzQCOuyjK3XvU0RSbdFceWyPdm.gQQWO/Uz30aPvBSk6JSKHFqx6',2),(55,'mohammad','ahmad','asd@das.com','$2b$10$FZyrGnAfxQZlaYMPTtkqzOSJkq/G.r1nZpBGnNKcXYQG0KE1wskuW',4),(57,'mohammad','ahmad','shreefaw@gmail.com','$2b$10$Czgp4tWIArhjJjNtotKCDOyXuOh/R9r2S4mCKulgiR5S4YwgIfpfK',6);
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `status` enum('app_pending','test_req','intreview_req','rejected','accepted','no_application') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `statuses_un` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (1,'app_pending'),(2,'test_req'),(3,'intreview_req'),(4,'rejected'),(5,'accepted'),(6,'no_application');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'chams'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-10 17:51:20
