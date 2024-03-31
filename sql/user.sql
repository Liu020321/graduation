/*
 Navicat Premium Data Transfer

 Source Server         : MySQL8.0
 Source Server Type    : MySQL
 Source Server Version : 80035
 Source Host           : localhost:3306
 Source Schema         : graduation

 Target Server Type    : MySQL
 Target Server Version : 80035
 File Encoding         : 65001

 Date: 31/03/2024 15:08:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(600) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isAdmin` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Lht2002321', '164755927@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', 1);
INSERT INTO `user` VALUES (2, 'Zcg13', '1@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', 0);
INSERT INTO `user` VALUES (3, 'Lvb', '2@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', 0);

SET FOREIGN_KEY_CHECKS = 1;
