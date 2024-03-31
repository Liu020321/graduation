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

 Date: 31/03/2024 15:08:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for medical_picture
-- ----------------------------
DROP TABLE IF EXISTS `medical_picture`;
CREATE TABLE `medical_picture`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uploadTime` datetime NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isDoing` tinyint(1) NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  `submitImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `outputImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pdf_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `docx_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `medical_picture_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medical_picture
-- ----------------------------
INSERT INTO `medical_picture` VALUES (1, '心脏', '2024-03-18 11:07:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 1, '/static/medical/刘海涛_21_2024-03-18_11_07/submit/刘海涛_21_2024-03-18_11_07_0000.nii.gz', '/static/medical/刘海涛_21_2024-03-18_11_07/output/刘海涛_21_2024-03-18_11_07.nii.gz', '/static/word/1_刘海涛_心脏/1_刘海涛_心脏.pdf', '/static/word/1_刘海涛_心脏/1_刘海涛_心脏.docx');
INSERT INTO `medical_picture` VALUES (2, '肺肿瘤', '2024-03-18 11:22:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 2, '/static/medical/张长弓_25_2024-03-18_11_22/submit/张长弓_25_2024-03-18_11_22_0000.nii.gz', '/static/medical/张长弓_25_2024-03-18_11_22/output/张长弓_25_2024-03-18_11_22.nii.gz', '/static/word/2_张长弓_肺肿瘤/2_张长弓_肺肿瘤.pdf', '/static/word/2_张长弓_肺肿瘤/2_张长弓_肺肿瘤.docx');
INSERT INTO `medical_picture` VALUES (3, '多器官', '2024-03-18 13:08:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 3, '/static/medical/王子李_32_2024-03-18_13_08/submit/王子李_32_2024-03-18_13_08_0000.nii.gz', '/static/medical/王子李_32_2024-03-18_13_08/output/王子李_32_2024-03-18_13_08.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (4, '椎骨', '2024-03-18 14:17:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 1, '/static/medical/刘海涛_21_2024-03-18_14_17/submit/刘海涛_21_2024-03-18_14_17_0000.nii.gz', '/static/medical/刘海涛_21_2024-03-18_14_17/output/刘海涛_21_2024-03-18_14_17.nii.gz', '/static/word/4_刘海涛_椎骨/4_刘海涛_椎骨.pdf', '/static/word/4_刘海涛_椎骨/4_刘海涛_椎骨.docx');
INSERT INTO `medical_picture` VALUES (5, '肺部', '2024-03-18 23:18:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 1, '/static/medical/刘海涛_21_2024-03-18_23_18/submit/刘海涛_21_2024-03-18_23_18_0000.nii.gz', '/static/medical/刘海涛_21_2024-03-18_23_18/output/刘海涛_21_2024-03-18_23_18.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (6, '肺部', '2024-03-18 23:31:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 2, '/static/medical/张长弓_25_2024-03-18_23_31/submit/张长弓_25_2024-03-18_23_31_0000.nii.gz', '/static/medical/张长弓_25_2024-03-18_23_31/output/张长弓_25_2024-03-18_23_31.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (7, '肺部', '2024-03-18 23:41:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 3, '/static/medical/王子李_32_2024-03-18_23_41/submit/王子李_32_2024-03-18_23_41_0000.nii.gz', '/static/medical/王子李_32_2024-03-18_23_41/output/王子李_32_2024-03-18_23_41.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (8, '肺肿瘤', '2024-03-18 23:50:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 1, '/static/medical/刘海涛_21_2024-03-18_23_50/submit/刘海涛_21_2024-03-18_23_50_0000.nii.gz', '/static/medical/刘海涛_21_2024-03-18_23_50/output/刘海涛_21_2024-03-18_23_50.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (9, '心脏', '2024-03-18 23:55:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 3, '/static/medical/王子李_32_2024-03-18_23_55/submit/王子李_32_2024-03-18_23_55_0000.nii.gz', '/static/medical/王子李_32_2024-03-18_23_55/output/王子李_32_2024-03-18_23_55.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (10, '肺部', '2024-03-19 00:12:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 1, '/static/medical/刘海涛_21_2024-03-19_00_12/submit/刘海涛_21_2024-03-19_00_12_0000.nii.gz', '/static/medical/刘海涛_21_2024-03-19_00_12/output/刘海涛_21_2024-03-19_00_12.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (11, '心脏', '2024-03-19 12:35:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 2, '/static/medical/张长弓_25_2024-03-19_12_35/submit/张长弓_25_2024-03-19_12_35_0000.nii.gz', '/static/medical/张长弓_25_2024-03-19_12_35/output/张长弓_25_2024-03-19_12_35.nii.gz', NULL, NULL);
INSERT INTO `medical_picture` VALUES (12, '肺肿瘤', '2024-03-19 15:39:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 0, 1, '/static/medical/刘海涛_21_2024-03-19_15_39/submit/刘海涛_21_2024-03-19_15_39_0000.nii.gz', '/static/medical/刘海涛_21_2024-03-19_15_39/output/刘海涛_21_2024-03-19_15_39.nii.gz', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
