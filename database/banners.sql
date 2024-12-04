/*
 Navicat Premium Data Transfer

 Source Server         : MYSQL LOCAL
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : nutech

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 05/12/2024 00:14:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banners
-- ----------------------------
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `banner_image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banners
-- ----------------------------
INSERT INTO `banners` VALUES (1, 'banner 1', 'public/banner/1.jpg', 'ini adalah bener 1');
INSERT INTO `banners` VALUES (2, 'banner 2', 'public/banner/2.jpg', 'ini adalah bener 2');
INSERT INTO `banners` VALUES (3, 'banner 3', 'public/banner/3.jpg', 'ini adalah bener 3');
INSERT INTO `banners` VALUES (4, 'banner 4', 'public/banner/4.jpeg', 'ini adalah bener 4');
INSERT INTO `banners` VALUES (5, 'banner 5', 'public/banner/5.jpg', 'ini adalah bener 5');
INSERT INTO `banners` VALUES (6, 'banner 6', 'public/banner/6.jpg', 'ini adalah bener 6');

SET FOREIGN_KEY_CHECKS = 1;
