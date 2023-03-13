/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 100427 (10.4.27-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : api_dans_final_test

 Target Server Type    : MySQL
 Target Server Version : 100427 (10.4.27-MariaDB)
 File Encoding         : 65001

 Date: 13/03/2023 15:43:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for absensi
-- ----------------------------
DROP TABLE IF EXISTS `absensi`;
CREATE TABLE `absensi`  (
  `id_absensi` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `waktu_absen_masuk` time NULL DEFAULT NULL,
  `waktu_absen_keluar` time NULL DEFAULT NULL,
  `tanggal` date NULL DEFAULT NULL,
  PRIMARY KEY (`id_absensi`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of absensi
-- ----------------------------
INSERT INTO `absensi` VALUES (2, 2, '04:35:30', '04:39:32', '2023-03-09');
INSERT INTO `absensi` VALUES (6, 6, '10:02:35', NULL, '2023-03-11');
INSERT INTO `absensi` VALUES (7, 5, '12:49:13', NULL, '2023-03-12');

-- ----------------------------
-- Table structure for pengumuman
-- ----------------------------
DROP TABLE IF EXISTS `pengumuman`;
CREATE TABLE `pengumuman`  (
  `id_pengumuman` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `user_id` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_pengumuman`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pengumuman
-- ----------------------------
INSERT INTO `pengumuman` VALUES (6, 'qrqew', 'TESS', 6, '2023-03-12 12:13:32', '2023-03-12 12:30:07');
INSERT INTO `pengumuman` VALUES (8, 'qreqer', 'Harum voluptatibus e', 6, '2023-03-12 12:29:20', '2023-03-12 12:29:56');
INSERT INTO `pengumuman` VALUES (9, 'sfdgwe', 'ssss', 6, '2023-03-12 12:30:14', '2023-03-12 12:30:01');
INSERT INTO `pengumuman` VALUES (10, 'weqwe', 'test', 6, '2023-03-12 12:42:37', '2023-03-12 12:29:53');
INSERT INTO `pengumuman` VALUES (11, 'qtqetqe', 'asasd', 6, '2023-03-12 12:43:14', '2023-03-12 12:29:50');
INSERT INTO `pengumuman` VALUES (12, 'qrs', 'ini pengumuman', 6, '2023-03-12 16:52:10', '2023-03-12 12:29:46');
INSERT INTO `pengumuman` VALUES (13, 'Judulsss', 'Ubah pengumumanssss', 6, '2023-03-12 17:04:51', '2023-03-13 12:28:49');
INSERT INTO `pengumuman` VALUES (35, 'test title', 'pengumuman 1', 6, '2023-03-13 07:30:21', '2023-03-13 07:30:21');
INSERT INTO `pengumuman` VALUES (36, 'title 2', 'pengung 2', 6, '2023-03-13 07:30:21', '2023-03-13 07:30:21');
INSERT INTO `pengumuman` VALUES (37, 'title 3 ', 'pengung 3', 6, '2023-03-13 07:30:21', '2023-03-13 07:30:21');

-- ----------------------------
-- Table structure for permission_role
-- ----------------------------
DROP TABLE IF EXISTS `permission_role`;
CREATE TABLE `permission_role`  (
  `permission_id` int NOT NULL,
  `role_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`permission_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission_role
-- ----------------------------

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id_permission` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_permission`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------

-- ----------------------------
-- Table structure for request_overtime
-- ----------------------------
DROP TABLE IF EXISTS `request_overtime`;
CREATE TABLE `request_overtime`  (
  `id_req_overtime` int NOT NULL AUTO_INCREMENT,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `user_id` int NULL DEFAULT NULL,
  `request_status_id` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_req_overtime`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of request_overtime
-- ----------------------------
INSERT INTO `request_overtime` VALUES (1, 'Keterangan overtime', 2, 2, '2023-03-10 10:40:22', '2023-03-10 16:07:29');
INSERT INTO `request_overtime` VALUES (2, 'Keterangan overtime 2', 2, 2, '2023-03-10 14:09:05', '2023-03-12 06:57:44');
INSERT INTO `request_overtime` VALUES (3, 'Keterangan overtime 2', 5, 2, '2023-03-10 14:09:50', '2023-03-12 11:05:29');
INSERT INTO `request_overtime` VALUES (4, 'Keterangan overtime 2', 2, 2, '2023-03-10 14:17:17', '2023-03-12 11:04:22');
INSERT INTO `request_overtime` VALUES (5, 'Keterangan overtime baru', 2, 1, '2023-03-10 14:20:41', '2023-03-12 11:06:03');
INSERT INTO `request_overtime` VALUES (6, 'Test keterangan', 6, 2, '2023-03-12 01:40:55', '2023-03-12 11:22:41');
INSERT INTO `request_overtime` VALUES (7, 'Overtime baru lagii hehehe', 6, 3, '2023-03-12 01:45:46', '2023-03-13 04:16:18');
INSERT INTO `request_overtime` VALUES (8, 'Helloooo', 6, 3, '2023-03-12 01:50:00', '2023-03-12 11:23:54');
INSERT INTO `request_overtime` VALUES (9, 'Helloooo againnnn', 6, 3, '2023-03-12 01:50:42', '2023-03-12 11:23:33');

-- ----------------------------
-- Table structure for request_reimbursment
-- ----------------------------
DROP TABLE IF EXISTS `request_reimbursment`;
CREATE TABLE `request_reimbursment`  (
  `id_req_reimbursment` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `bukti` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `request_status_id` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_req_reimbursment`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of request_reimbursment
-- ----------------------------
INSERT INTO `request_reimbursment` VALUES (1, 2, 'keterangan', NULL, 2, '2023-03-10 13:31:13', '2023-03-10 15:17:21');
INSERT INTO `request_reimbursment` VALUES (2, 5, 'keterangannnn', NULL, 3, '2023-03-10 21:28:23', '2023-03-10 15:18:12');
INSERT INTO `request_reimbursment` VALUES (3, 2, 'keterangan lagii', NULL, 2, '2023-03-10 22:16:10', '2023-03-10 15:17:52');
INSERT INTO `request_reimbursment` VALUES (4, 2, 'test keterangan', 'http://localhost:5000/uploads/astronaut_spacesuit_reflection_144426_1920x1080-1678673601048.jpg', 1, '2023-03-13 02:13:21', NULL);
INSERT INTO `request_reimbursment` VALUES (5, 2, 'test keterangan', 'http://localhost:5000/uploads/Screenshot 2023-02-07 111128-1678673866282.png', 1, '2023-03-13 02:17:46', NULL);
INSERT INTO `request_reimbursment` VALUES (6, 2, 'test keterangan', 'http://localhost:5000/uploads/1678674750022.png', 1, '2023-03-13 02:32:30', NULL);
INSERT INTO `request_reimbursment` VALUES (7, 6, 'Eum autem praesentiu', NULL, 1, '2023-03-13 03:04:53', NULL);
INSERT INTO `request_reimbursment` VALUES (8, 6, 'Culpa irure facilis', NULL, 1, '2023-03-13 04:08:40', NULL);
INSERT INTO `request_reimbursment` VALUES (9, 6, 'asdads', NULL, 1, '2023-03-13 04:15:51', NULL);

-- ----------------------------
-- Table structure for role_user
-- ----------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user`  (
  `role_id` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_user
-- ----------------------------
INSERT INTO `role_user` VALUES (1, 2);
INSERT INTO `role_user` VALUES (1, 3);
INSERT INTO `role_user` VALUES (1, 5);
INSERT INTO `role_user` VALUES (2, 6);
INSERT INTO `role_user` VALUES (1, 7);
INSERT INTO `role_user` VALUES (1, 8);
INSERT INTO `role_user` VALUES (1, 9);
INSERT INTO `role_user` VALUES (1, 10);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id_role` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_role`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'employee');
INSERT INTO `roles` VALUES (2, 'hr');

-- ----------------------------
-- Table structure for status_request
-- ----------------------------
DROP TABLE IF EXISTS `status_request`;
CREATE TABLE `status_request`  (
  `id_request_status` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_request_status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of status_request
-- ----------------------------
INSERT INTO `status_request` VALUES (1, 'Pending');
INSERT INTO `status_request` VALUES (2, 'Approved');
INSERT INTO `status_request` VALUES (3, 'Rejected');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email_verified_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, 'Name', 'email@email.com', '$2b$10$GokR.wE1cfSPj3kNPK7PIO6ErAU.LmU5rA6cvxZMDznMFYqF2DY0G', NULL);
INSERT INTO `users` VALUES (3, 'Nama Dua', 'emaildua@email.com', '$2b$10$A9jFwzoa4vy/DHxjSccAB.k9ESvatNb.VNpZYUcN85ZEts3LOxdsO', NULL);
INSERT INTO `users` VALUES (5, 'Nama Tiga', 'emailtiga@email.com', '$2b$10$Fd89Cq0iQ5C20njAZhAzFe47LebbMCpikl1Zlto.DOWA7/m/VsLmW', '2023-03-10 13:50:24');
INSERT INTO `users` VALUES (6, 'HR', 'emailhr@email.com', '$2b$10$Fd89Cq0iQ5C20njAZhAzFe47LebbMCpikl1Zlto.DOWA7/m/VsLmW', '2023-03-10 20:51:11');
INSERT INTO `users` VALUES (7, 'Nama Empat', 'emailempat@email.com', '$2b$10$4HtbB4I6e0uUtOOpD0K/Ou5Lc33vksfN7XhvZAfLXH17v.x5OooCa', NULL);
INSERT INTO `users` VALUES (8, 'Nama Lima', 'emaillima@email.com', '$2b$10$RZAjApyyzh3Kt8aInx9QDeeG/eXhdLeShMEPGoKd7j5y.nhQ.2ZaK', '2023-03-10 14:00:04');
INSERT INTO `users` VALUES (9, 'Lainyaaaa', 'lainyayeah@email.com', '$2b$10$rv0hPgJ8XwYV3oHht6rfVu.Sw5Yhx/c5Ec4gwxiIau/PMx5/3HXNi', NULL);
INSERT INTO `users` VALUES (10, 'Nora Edwards', 'wymenanigy@mailinator.com', '$2b$10$MXDJlFuV8.AwFnQuWYRfqO6qJbosQjx5PG8LitA3Bo7fzcnmpUA3W', NULL);

SET FOREIGN_KEY_CHECKS = 1;
