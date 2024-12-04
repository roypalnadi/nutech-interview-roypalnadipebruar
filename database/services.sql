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

 Date: 05/12/2024 00:14:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for services
-- ----------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_code` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `service_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `service_icon` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `service_tariff` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of services
-- ----------------------------
INSERT INTO `services` VALUES (1, 'PAJAK', 'Pajak PBB', 'dummy.jpg', 40000);
INSERT INTO `services` VALUES (2, 'PLN', 'Listrik', 'dummy.jpg', 10000);
INSERT INTO `services` VALUES (3, 'PDAM', 'PDAM Berlangganan', 'dummy.jpg', 40000);
INSERT INTO `services` VALUES (4, 'PULSA', 'Pulsa', 'dummy.jpg', 40000);
INSERT INTO `services` VALUES (5, 'PGN', 'PGN Berlangganan', 'dummy.jpg', 50000);
INSERT INTO `services` VALUES (6, 'MUSIK', 'Musik Berlangganan', 'dummy.jpg', 50000);
INSERT INTO `services` VALUES (7, 'TV', 'TV Berlangganan', 'dummy.jpg', 50000);
INSERT INTO `services` VALUES (8, 'PAKET_DATA', 'Paket data', 'dummy.jpg', 50000);
INSERT INTO `services` VALUES (9, 'VOUCHER_GAME', 'Voucher Game', 'dummy.jpg', 100000);
INSERT INTO `services` VALUES (10, 'VOUCHER_MAKANAN', 'Voucher Makanan', 'dummy.jpg', 100000);
INSERT INTO `services` VALUES (11, 'QURBAN', 'Qurban', 'dummy.jpg', 200000);
INSERT INTO `services` VALUES (12, 'ZAKAT', 'Zakat', 'dummy.jpg', 300000);

SET FOREIGN_KEY_CHECKS = 1;
