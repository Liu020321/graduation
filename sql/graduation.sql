-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: graduation
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

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
-- Table structure for table `UserMessage`
--

DROP TABLE IF EXISTS `UserMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserMessage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `userHead` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `age` int NOT NULL,
  `sex` int NOT NULL,
  `asset` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `idCard` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idCard` (`idCard`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `UserMessage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserMessage`
--

LOCK TABLES `UserMessage` WRITE;
/*!40000 ALTER TABLE `UserMessage` DISABLE KEYS */;
INSERT INTO `UserMessage` VALUES (1,1,'assets/images/user/user_lht.png','刘海涛',22,1,'长安区胜利北街17号石家庄铁道大学','18731136590',150403200203215133),(2,2,'assets/images/dashboard/profile.png','张长弓',25,1,'元宝山区平庄镇阳光花园','19831130589',150403199736892565),(3,3,'assets/images/user/user.png','王子李',32,0,'长安区胜利北街17号石家庄铁道大学','13789592217',14526199825783698);
/*!40000 ALTER TABLE `UserMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('c05f93bc45db');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_picture`
--

DROP TABLE IF EXISTS `medical_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageType` varchar(20) NOT NULL,
  `uploadTime` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `isDoing` tinyint(1) DEFAULT NULL,
  `user_id` int NOT NULL,
  `submitImage` varchar(255) NOT NULL,
  `outputImage` varchar(255) DEFAULT NULL,
  `pdf_path` varchar(255) DEFAULT NULL,
  `docx_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `medical_picture_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_picture`
--

LOCK TABLES `medical_picture` WRITE;
/*!40000 ALTER TABLE `medical_picture` DISABLE KEYS */;
INSERT INTO `medical_picture` VALUES (1,'心脏','2024-03-18 11:07:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,1,'/static/medical/刘海涛_21_2024-03-18_11_07/submit/刘海涛_21_2024-03-18_11_07_0000.nii.gz','/static/medical/刘海涛_21_2024-03-18_11_07/output/刘海涛_21_2024-03-18_11_07.nii.gz','',''),(2,'肺肿瘤','2024-03-18 11:22:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,2,'/static/medical/张长弓_25_2024-03-18_11_22/submit/张长弓_25_2024-03-18_11_22_0000.nii.gz','/static/medical/张长弓_25_2024-03-18_11_22/output/张长弓_25_2024-03-18_11_22.nii.gz','',''),(3,'多器官','2024-03-18 13:08:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,3,'/static/medical/王子李_32_2024-03-18_13_08/submit/王子李_32_2024-03-18_13_08_0000.nii.gz','/static/medical/王子李_32_2024-03-18_13_08/output/王子李_32_2024-03-18_13_08.nii.gz',NULL,NULL),(4,'椎骨','2024-03-18 14:17:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,1,'/static/medical/刘海涛_21_2024-03-18_14_17/submit/刘海涛_21_2024-03-18_14_17_0000.nii.gz','/static/medical/刘海涛_21_2024-03-18_14_17/output/刘海涛_21_2024-03-18_14_17.nii.gz','',''),(5,'肺部','2024-03-18 23:18:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,1,'/static/medical/刘海涛_21_2024-03-18_23_18/submit/刘海涛_21_2024-03-18_23_18_0000.nii.gz','/static/medical/刘海涛_21_2024-03-18_23_18/output/刘海涛_21_2024-03-18_23_18.nii.gz','/static/word/5_刘海涛_肺部/out/5_刘海涛_肺部.pdf','/static/word/5_刘海涛_肺部/5_刘海涛_肺部.docx'),(6,'肺部','2024-03-18 23:31:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,2,'/static/medical/张长弓_25_2024-03-18_23_31/submit/张长弓_25_2024-03-18_23_31_0000.nii.gz','/static/medical/张长弓_25_2024-03-18_23_31/output/张长弓_25_2024-03-18_23_31.nii.gz',NULL,NULL),(7,'肺部','2024-03-18 23:41:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,3,'/static/medical/王子李_32_2024-03-18_23_41/submit/王子李_32_2024-03-18_23_41_0000.nii.gz','/static/medical/王子李_32_2024-03-18_23_41/output/王子李_32_2024-03-18_23_41.nii.gz',NULL,NULL),(8,'肺肿瘤','2024-03-18 23:50:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,1,'/static/medical/刘海涛_21_2024-03-18_23_50/submit/刘海涛_21_2024-03-18_23_50_0000.nii.gz','/static/medical/刘海涛_21_2024-03-18_23_50/output/刘海涛_21_2024-03-18_23_50.nii.gz',NULL,NULL),(9,'心脏','2024-03-18 23:55:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,3,'/static/medical/王子李_32_2024-03-18_23_55/submit/王子李_32_2024-03-18_23_55_0000.nii.gz','/static/medical/王子李_32_2024-03-18_23_55/output/王子李_32_2024-03-18_23_55.nii.gz',NULL,NULL),(10,'肺部','2024-03-19 00:12:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,1,'/static/medical/刘海涛_21_2024-03-19_00_12/submit/刘海涛_21_2024-03-19_00_12_0000.nii.gz','/static/medical/刘海涛_21_2024-03-19_00_12/output/刘海涛_21_2024-03-19_00_12.nii.gz',NULL,NULL),(11,'心脏','2024-03-19 12:35:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,2,'/static/medical/张长弓_25_2024-03-19_12_35/submit/张长弓_25_2024-03-19_12_35_0000.nii.gz','/static/medical/张长弓_25_2024-03-19_12_35/output/张长弓_25_2024-03-19_12_35.nii.gz',NULL,NULL),(12,'肺肿瘤','2024-03-19 15:39:00','你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。',0,1,'/static/medical/刘海涛_21_2024-03-19_15_39/submit/刘海涛_21_2024-03-19_15_39_0000.nii.gz','/static/medical/刘海涛_21_2024-03-19_15_39/output/刘海涛_21_2024-03-19_15_39.nii.gz',NULL,NULL);
/*!40000 ALTER TABLE `medical_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modal_list`
--

DROP TABLE IF EXISTS `modal_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modal_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `image_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `modal_list_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `medical_picture` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modal_list`
--

LOCK TABLES `modal_list` WRITE;
/*!40000 ALTER TABLE `modal_list` DISABLE KEYS */;
INSERT INTO `modal_list` VALUES (8,1,'有一点小问题，影响不大。','/static/assets/images/Pictures/1/2024-03-26_20_06_image.png','2024-03-26 20:06:00'),(9,1,'测试代码','/static/assets/images/Pictures/1/2024-03-29_18_39_image.png','2024-03-29 18:39:00'),(10,1,'234566骄傲的沙克','/static/assets/images/Pictures/1/2024-03-29_20_19_image.png','2024-03-29 20:19:00'),(12,4,'模拟数据','/static/assets/images/Pictures/4/2024-03-30_18_22_image.png','2024-03-30 18:22:00'),(13,2,'这个世界就是一个巨大的笑话，我们都是bug。','/static/assets/images/Pictures/2/2024-03-31_14_55_image.png','2024-03-31 14:55:00'),(14,4,'测试八零','/static/assets/images/Pictures/4/2024-03-31_15_00_image.png','2024-03-31 15:00:00'),(15,5,'134564597841132156da56aa561d3','/static/assets/images/Pictures/5/2024-03-31_18_29_image.png','2024-03-31 18:29:00'),(16,5,'中华省市','/static/assets/images/Pictures/5/2024-03-31_18_29_image.png','2024-03-31 18:29:00');
/*!40000 ALTER TABLE `modal_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  `timeStamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(600) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Lht2002321','164755927@qq.com','sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e',1),(2,'Zcg13','1@qq.com','sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e',0),(3,'Lvb','2@qq.com','sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 16:10:16
