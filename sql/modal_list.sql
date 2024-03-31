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

 Date: 31/03/2024 15:08:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for modal_list
-- ----------------------------
DROP TABLE IF EXISTS `modal_list`;
CREATE TABLE `modal_list`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_id` int NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `image_id`(`image_id` ASC) USING BTREE,
  CONSTRAINT `modal_list_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `medical_picture` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of modal_list
-- ----------------------------
INSERT INTO `modal_list` VALUES (8, 1, '有一点小问题，影响不大。', '/static/assets/images/Pictures/1/2024-03-26_20_06_image.png', '2024-03-26 20:06:00');
INSERT INTO `modal_list` VALUES (9, 1, '测试代码', '/static/assets/images/Pictures/1/2024-03-29_18_39_image.png', '2024-03-29 18:39:00');
INSERT INTO `modal_list` VALUES (10, 1, '234566骄傲的沙克', '/static/assets/images/Pictures/1/2024-03-29_20_19_image.png', '2024-03-29 20:19:00');
INSERT INTO `modal_list` VALUES (12, 4, '模拟数据', '/static/assets/images/Pictures/4/2024-03-30_18_22_image.png', '2024-03-30 18:22:00');
INSERT INTO `modal_list` VALUES (13, 2, '这个世界就是一个巨大的笑话，我们都是bug。', '/static/assets/images/Pictures/2/2024-03-31_14_55_image.png', '2024-03-31 14:55:00');
INSERT INTO `modal_list` VALUES (14, 4, '测试八零', '/static/assets/images/Pictures/4/2024-03-31_15_00_image.png', '2024-03-31 15:00:00');

SET FOREIGN_KEY_CHECKS = 1;
