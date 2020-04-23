/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : english

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 23/04/2020 16:52:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for card
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card`  (
  `cardId` int(255) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img_src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userId` int(255) NULL DEFAULT NULL,
  `createTime` datetime(6) NULL DEFAULT NULL,
  `isPublic` int(255) NULL DEFAULT NULL,
  `likeUserIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cardId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of card
-- ----------------------------
INSERT INTO `card` VALUES (1, '第一名', 'http://192.168.43.136:8888/server/static/video/1587379472557.jpg', 24, '2020-04-20 18:44:15.000000', 1, '');
INSERT INTO `card` VALUES (2, '第二个', 'http://192.168.43.136:8888/server/static/video/1587381524689.jpg', 24, '2020-04-20 19:17:30.000000', 1, '');
INSERT INTO `card` VALUES (3, '睡觉睡觉还真不是计算机上是不是就睡觉觉', 'http://192.168.43.136:8888/server/static/video/1587381575719.jpg', 24, '2020-04-20 19:18:16.000000', 1, '');
INSERT INTO `card` VALUES (4, '第四个', 'http://192.168.43.136:8888/server/static/video/1587381563524.jpg', 24, '2020-04-20 19:18:45.000000', 1, '24;12;');
INSERT INTO `card` VALUES (5, '个人可见', 'http://192.168.43.136:8888/server/static/video/1587382596535.jpg', 24, '2020-04-20 19:35:56.000000', 0, '');
INSERT INTO `card` VALUES (6, '点击动不动就好的', 'http://192.168.43.136:8888/server/static/video/1587383035102.jpg', 24, '2020-04-20 19:43:37.000000', 1, '');
INSERT INTO `card` VALUES (7, '鲜花', 'http://192.168.43.136:8888/server/static/video/1587383113283.jpg', 24, '2020-04-20 19:44:48.000000', 1, '');
INSERT INTO `card` VALUES (8, '我来了', 'http://192.168.43.136:8888/server/static/video/1587385129597.jpg', 12, '2020-04-20 20:17:59.000000', 1, '');
INSERT INTO `card` VALUES (9, '我又来了', 'http://192.168.43.136:8888/server/static/video/1587385194924.jpg', 12, '2020-04-20 20:18:44.000000', 1, '');
INSERT INTO `card` VALUES (10, '我再来', 'http://192.168.43.136:8888/server/static/video/1587385228916.jpg', 12, '2020-04-20 20:19:27.000000', 1, '');
INSERT INTO `card` VALUES (11, '我还是要来', 'http://192.168.43.136:8888/server/static/video/1587385318504.jpg', 12, '2020-04-20 20:20:58.000000', 1, '');
INSERT INTO `card` VALUES (12, '最后一个', 'http://192.168.43.136:8888/server/static/video/1587385304374.jpg', 12, '2020-04-20 20:21:43.000000', 1, '12;');
INSERT INTO `card` VALUES (13, '再来一个', 'http://192.168.43.136:8888/server/static/video/1587385490985.jpg', 12, '2020-04-20 20:23:22.000000', 1, '12;');
INSERT INTO `card` VALUES (14, '今日打卡', 'http://192.168.43.136:8888/server/static/video/1587429626940.jpg', 12, '2020-04-21 08:39:27.000000', 1, '');
INSERT INTO `card` VALUES (15, '今天第二次打卡', 'http://192.168.43.136:8888/server/static/video/1587429716757.jpg', 12, '2020-04-21 08:41:13.000000', 1, '');
INSERT INTO `card` VALUES (16, '今天第三次打卡', 'http://192.168.43.136:8888/server/static/video/1587429914086.jpg', 12, '2020-04-21 08:45:06.000000', 1, '');
INSERT INTO `card` VALUES (17, '第四次打卡', 'http://192.168.43.136:8888/server/static/video/1587429993738.jpg', 12, '2020-04-21 08:46:03.000000', 1, '');
INSERT INTO `card` VALUES (18, '第五次打卡', 'http://192.168.43.136:8888/server/static/video/1587430295804.jpg', 12, '2020-04-21 08:51:33.000000', 1, '');
INSERT INTO `card` VALUES (19, '第六次打卡', 'http://192.168.43.136:8888/server/static/video/1587430482556.jpg', 12, '2020-04-21 08:53:15.000000', 1, '12;');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `courseId` int(255) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `subcourseIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `labels` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teacherIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `managerId` bigint(255) NULL DEFAULT NULL,
  `studentLeaderId` bigint(255) NULL DEFAULT NULL,
  `money` int(255) NULL DEFAULT NULL,
  `studentIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `businessId` bigint(255) NULL DEFAULT NULL,
  `creatorId` bigint(255) NULL DEFAULT NULL,
  `createTime` timestamp(6) NULL DEFAULT NULL,
  `image_src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `introduceInfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`courseId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (2, '速成四级班十天包过', '4;5;', '四级;英语;速成;', '2', 2, NULL, 998, '12;', 3, 1, '2020-03-16 16:05:07.000000', 'http://192.168.43.136:8888/server/static/img/1d772e74d586aade27e0dd7ef4fb3e07.jpg', '精品课程，精心打造，用十天拿到你的第一个证书');
INSERT INTO `class` VALUES (3, '六级冲刺班', '5;', '六级', '2', 2, NULL, 199, '13;', 3, 1, '2020-03-13 09:07:29.000000', 'http://192.168.43.136:8888/server/static/img/7caaf81b95daadcf8369f8f3f57b099b.jpg', NULL);
INSERT INTO `class` VALUES (4, '中考必会2000单词速记班', '6;', '中考;英语速成', '2', 2, NULL, 299, NULL, 3, 1, '2020-03-13 09:07:33.000000', 'http://192.168.43.136:8888/server/static/img/16712d4ed1556f99d32ba2b669c3dbbc.jpg', NULL);
INSERT INTO `class` VALUES (5, '小学起飞班', '1;2;', '小学;基础；', '2', 2, NULL, 0, '12;12;19;22;13;23;', 3, 1, '2020-03-13 09:07:41.000000', 'http://192.168.43.136:8888/server/static/img/ba1e68c4d92f10ade695d810416cd5c1.jpg', '相信我们，包教包会');
INSERT INTO `class` VALUES (6, '初三必会20种作文题型', '7;', '初中；中考；作文', '2', 2, NULL, 99, '12;', 3, 1, '2020-03-13 09:07:07.000000', 'http://192.168.43.136:8888/server/static/img/3ea1c700761902440a542c97148ca83e.jpg', '中考满分作文系列');
INSERT INTO `class` VALUES (7, '初中英语综合培训班', '8;', '初中；综合', '2', 2, NULL, 888, NULL, 3, 1, '2020-03-13 09:17:10.000000', 'http://192.168.43.136:8888/server/static/img/c8d6572f29f4b88af9be3830a41a130d.jpg', '初一到初三全包');
INSERT INTO `class` VALUES (8, '高考复习冲刺班', '9;', '高考；复习；', '2', 2, NULL, 999, '12;', 3, 1, '2020-03-13 09:18:18.000000', 'http://192.168.43.136:8888/server/static/img/941685b0f0275d9c23e014a08e890d2e.jpg', '搏一搏单车变摩托');
INSERT INTO `class` VALUES (9, '高考作文班', '10;', '高考；作文', '2', 2, NULL, 999, NULL, 3, 1, '2020-03-13 09:19:31.000000', 'http://192.168.43.136:8888/server/static/img/1d772e74d586aade27e0dd7ef4fb3e07.jpg', '搏一搏单车变摩托');
INSERT INTO `class` VALUES (10, '高考专项讲解', NULL, '高考；复习；', '2', 2, NULL, 888, '12;', 3, 1, '2020-03-13 09:20:28.000000', 'http://192.168.43.136:8888/server/static/img/6dda2a65257d7e01b2748c6ff2bdf3e1.jpg', '逐个击破');
INSERT INTO `class` VALUES (11, '四级保过班', NULL, '四级；包过', '2', 2, NULL, 998, '12;', 3, 1, '2020-03-13 09:22:01.000000', 'http://192.168.43.136:8888/server/static/img/eedd591a4753a1aba9c6c7ccfe9f2dfd.jpeg', '你的四级交给我');
INSERT INTO `class` VALUES (12, '四级作文精讲', NULL, '四级；作文', '2', 2, NULL, 99, '12;', 3, 1, '2020-03-13 09:23:37.000000', 'http://192.168.43.136:8888/server/static/img/7e352fe9cce412a20405b2edca51c842.jpg', '作文');
INSERT INTO `class` VALUES (13, '高中试听班', NULL, '高中；高考', '2', 2, NULL, 0, '12;12;12;23;', 3, 1, '2020-03-14 19:27:36.000000', 'http://192.168.43.136:8888/server/static/img/3019cc717ed9f7478e50a33792247853.jpg', '免费试听');
INSERT INTO `class` VALUES (14, '大学英语1期末冲刺', NULL, '大学;期末；冲刺', '2', 2, NULL, 0, '12;', 3, 1, '2020-03-14 19:43:48.000000', 'http://192.168.43.136:8888/server/static/img/7e352fe9cce412a20405b2edca51c842.jpg', '补考福利');
INSERT INTO `class` VALUES (15, '大学英语2期末冲刺', NULL, '大学；期末', '2', 2, NULL, 0, '12;12;', 3, 1, '2020-03-30 14:37:45.000000', 'http://192.168.43.136:8888/server/static/img/e28f86dea6655b8f3a4be57f264ec9b6.jpg', '补考福利撒飞洒发范德萨范德萨发达范德萨范德萨范德萨发斯蒂芬大范德萨范德萨广东省嘎多撒规定撒个的撒个的撒个大补考福利撒飞洒发范德萨范德萨发达范德萨范德萨范德萨发斯蒂芬大范德萨范德萨广东省嘎多撒规定撒个的撒个的撒个大三范德萨范德萨广东省各方大大反倒是违法补考福利撒飞洒发范德萨范德萨发达范德萨范德萨范德萨发斯蒂芬大范德萨范德萨广东省嘎多撒规定撒个的撒个的撒个大三范德萨范德萨广东省各方大大反倒是违法三范德萨范德萨广东省各方大大反倒是违法');
INSERT INTO `class` VALUES (16, '四级词汇试听班', NULL, '四级;词汇', '2', 2, NULL, 0, NULL, 3, 1, '2020-03-16 19:06:57.000000', 'http://192.168.43.136:8888/server/static/img/eedd591a4753a1aba9c6c7ccfe9f2dfd.jpeg', '四级试听');
INSERT INTO `class` VALUES (17, '六级试听班', NULL, '六级；专项', '2', 2, NULL, 0, '12;12;12;12;', 3, 1, '2020-03-16 19:06:52.000000', 'http://192.168.43.136:8888/server/static/img/6991237112e61ad57961b8663d96a48e.jpg', '六级试听');
INSERT INTO `class` VALUES (18, '疫情假期专题课-高中英语强化班助力开学考试', NULL, '高中', '6', 6, NULL, 166, '12;', 3, 1, '2020-04-01 10:10:47.000000', 'http://192.168.43.136:8888/server/static/img/65c4362417062224049b85c33f159583.jpg', '从学生角度出发量身打造适合假期学习的学习模式，制定健康高效的学习方法。');
INSERT INTO `class` VALUES (19, '【省特级教师亲自授课】疫情假期专题课-小学起步助跑班', NULL, '小学', '6', 6, NULL, 999, NULL, 3, 1, '2020-04-01 10:14:10.000000', 'http://192.168.43.136:8888/server/static/img/5ee63bfe6a2c2757ce317794c25a3c3c.png', '省特级教师-李桥老师亲临指导，深度解析小学英语入门难题，制定高效学习计划，为孩子助力英语学习。');

-- ----------------------------
-- Table structure for errortestbook
-- ----------------------------
DROP TABLE IF EXISTS `errortestbook`;
CREATE TABLE `errortestbook`  (
  `errorTestBookId` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(255) NULL DEFAULT NULL,
  `onlyChoiceIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `multifyChoiceIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `listenIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`errorTestBookId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of errortestbook
-- ----------------------------
INSERT INTO `errortestbook` VALUES (5, 12, '8;10;9;', '6;12;11;13;', '5;');
INSERT INTO `errortestbook` VALUES (6, 13, '8;4;', '6;', '');
INSERT INTO `errortestbook` VALUES (7, 14, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (8, 15, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (9, 16, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (10, 17, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (11, 18, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (12, 19, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (13, 20, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (14, 21, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (15, 22, NULL, NULL, NULL);
INSERT INTO `errortestbook` VALUES (16, 23, '', '', '');
INSERT INTO `errortestbook` VALUES (17, 24, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for missions
-- ----------------------------
DROP TABLE IF EXISTS `missions`;
CREATE TABLE `missions`  (
  `missionId` bigint(255) NOT NULL AUTO_INCREMENT,
  `testpaperId` int(255) NULL DEFAULT NULL,
  `startTime` datetime(6) NULL DEFAULT NULL,
  `creatorId` int(255) NULL DEFAULT NULL,
  `message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `courseId` int(255) NULL DEFAULT NULL,
  `endTime` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`missionId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of missions
-- ----------------------------
INSERT INTO `missions` VALUES (2, 18, '2020-04-03 09:34:19.000000', 1, '小学班作业', 5, '2020-04-30 09:34:19.000000');
INSERT INTO `missions` VALUES (3, NULL, '2020-04-03 09:34:44.000000', 1, '今天放假', 5, '2020-04-10 09:34:44.000000');
INSERT INTO `missions` VALUES (4, NULL, '2020-04-17 17:13:49.000000', 1, '123', 5, '2020-04-30 17:13:49.000000');

-- ----------------------------
-- Table structure for problems
-- ----------------------------
DROP TABLE IF EXISTS `problems`;
CREATE TABLE `problems`  (
  `problemId` bigint(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(255) NULL DEFAULT NULL COMMENT '1:单项选择题  2：多选题 3：作文题',
  `music_src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `options` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `achivementRate` int(255) NULL DEFAULT NULL,
  `usedNum` int(255) NULL DEFAULT NULL,
  `diffculty` int(255) NULL DEFAULT NULL COMMENT '分五级',
  `analysis` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goal` int(255) NULL DEFAULT NULL,
  `creatorId` bigint(255) NULL DEFAULT NULL,
  `createTime` timestamp(6) NULL DEFAULT NULL,
  `answerNum` int(255) NULL DEFAULT NULL,
  `labels` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `linkProblemIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `linkListenId` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`problemId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of problems
-- ----------------------------
INSERT INTO `problems` VALUES (4, 'are you ok', 1, NULL, '[\"yes\",\"no\\n\"]', 'A', 45, 12, 3, 'because A so A。', 1, 1, '2020-03-10 10:23:10.000000', 1, '六级', NULL, NULL);
INSERT INTO `problems` VALUES (5, 'please listen', 4, 'http://192.168.43.136:8888/server/static/video/1.mp3', '[\"is good\",\"is bad\",\"is normal\"]', 'B', 100, 0, 3, '不好好学习是不好的', 2, 1, '2020-04-01 15:53:04.000000', 1, '高中;高考', '19;20', NULL);
INSERT INTO `problems` VALUES (6, 'if(__1__) else (__2__)', 2, NULL, '[\"true\",\"flase\",\"tuer\",\"false\"]', 'A;D', 27, 8, 4, '正确的拼写true false', 3, 1, '2020-04-01 15:51:48.000000', 2, '小学', NULL, NULL);
INSERT INTO `problems` VALUES (7, 'please write your feel', 3, NULL, '[]', 'i am so good my code is the best!!', 0, 6, 5, '随意发挥', 1, 1, '2020-03-10 09:58:07.000000', 1, '六级；写作；练习；评测', NULL, NULL);
INSERT INTO `problems` VALUES (8, 'test-radio1', 1, NULL, '[\"fsafdsa\",\"sdgads\",\"dsasdag\",\"fsa\"]', 'D', 0, 9, 5, 'safa', 1, 1, '2020-03-10 15:50:49.000000', 1, '六级', NULL, NULL);
INSERT INTO `problems` VALUES (9, 'dajflkdsja', 1, NULL, '[\"2341324\",\"fdsafd\",\"dsagg\",\"fasfas\"]', 'A', 35, 44, 4, 'afdsafdsaf', 10, 1, '2020-03-10 18:31:17.000000', 1, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (10, '的股份的手感', 1, NULL, '[\"afdsafda\",\"afdsafdsaf\",\"fdsafdsafds\",\"afdsafdsafsd\",\"afdsafdsa\"]', 'E', 0, 10, 5, 'afdsfdsafdsaf', 2, 1, '2020-03-10 18:31:53.000000', 1, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (11, 'twtwrewq', 2, NULL, '[\"afdsafdsa\",\"sdafdsafds\",\"fdsafdsafd\",\"sdafdsafds\",\"fdsafdsaf\",\"afdsafdsa\"]', 'A;B;C', 11, 10, 5, 'ewtewrt', 20, 1, '2020-03-10 18:32:45.000000', 3, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (12, 'askjlsdjaf', 2, NULL, '[\"agdsafdasfaf\",\"fsafdsaw\",\"afdsafds\",\"fdsafdsafds\",\"dsafdsafdsaf\",\"sdafdsafdsaf\"]', 'B;C;D;E', 41, 5, 3, 'dsafdsafdsaf', 22, 1, '2020-03-10 18:33:30.000000', 1, '六级', NULL, NULL);
INSERT INTO `problems` VALUES (13, 'jfkdsajflkdsaj', 2, NULL, '[\"fdsafdsaf\",\"gdsagdsag\",\"dsafdsafdsa\",\"gdsagdsa\",\"asdfdsaf\"]', 'B:C:D', 0, 9, 5, 'sfadfdsaf', -3, 1, '2020-03-10 18:34:30.000000', 3, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (14, 'dfdskaljfdlsaj', 2, NULL, '[\"fdsafkjdslkajfioewf\",\"dsgadsagdsfa\",\"gadsagdsagds\",\"gdsagdsagdsa\"]', 'B;C', 100, 0, 1, 'dsafdsafdsa', 33, 1, '2020-04-01 15:51:28.000000', 2, '高中;高考', NULL, NULL);
INSERT INTO `problems` VALUES (15, 'dsafdsafdsafds', 3, NULL, '[]', 'dkjasflkdsjafldsjalfjdslakf', 0, 9, 5, 'afdsafds', 22, 1, '2020-03-10 18:35:22.000000', 1, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (16, 'afdsafdsafdsa', 3, NULL, '[]', 'fdsafdsafdsafd', 0, 9, 5, 'dsafdsafdsafd', 20, 1, '2020-03-10 18:35:44.000000', 1, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (17, 'gdsagdsafdsafdsa', 4, 'http://192.168.43.136:8888/server/static/video/1585721736113.mp3', '[\"sdafdsafdsa\",\"sdafdsfdsafds\",\"fdsafdsafdsa\",\"afdsfadsafds\"]', 'B', 100, 0, 3, 'dsfdasfdsaf', 5, 1, '2020-04-01 14:13:58.000000', 1, '六级', '21', NULL);
INSERT INTO `problems` VALUES (18, 'afdsafdsafsdaf', 4, 'http://192.168.43.136:8888/server/static/video/1585721661963.mp3', '[\"dsafdsafsd\",\"fdsafdsafds\",\"fsdfdsafds\",\"dsafdsafdsa\"]', 'C', 100, 0, 3, 'fafdsafds', 5, 1, '2020-04-01 14:14:08.000000', 1, '四级', '22', NULL);
INSERT INTO `problems` VALUES (19, '听力附属题1', 5, NULL, '[\"sdfdsaf\",\"fewqrew\",\"gdqeqewq\"]', 'B', 99, 16, 1, 'fdsafdsa', 1, 1, '2020-03-19 10:11:51.000000', 1, '六级', NULL, 5);
INSERT INTO `problems` VALUES (20, '听力附属题2', 5, NULL, '[\"dsafdsafd\",\"sadfdsafdsaf\",\"dsafdsafdsa\"]', 'B', 54, 16, 3, 'ewqrewqrew', 1, 1, '2020-03-19 10:12:31.000000', 1, '六级', NULL, 5);
INSERT INTO `problems` VALUES (21, 'At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.', 5, NULL, '[\"maps every module your project needs and generates one or more bundles.\",\"maps every module your proj\",\"oject needs and generat\",\"ns. When webpack pro\"]', 'A', 51, 4, 3, 'At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally', 5, 1, '2020-04-01 13:07:56.000000', 1, '六级', NULL, 17);
INSERT INTO `problems` VALUES (22, 'This document is intended to give a high-level overview of these concepts, while providing links to detailed concept-specific use cases.', 5, NULL, '[\"Manually Bundling an Application\",\"Live Coding a Simple Module Bundler\",\"Detailed Explanation of a Simple Module Bundler\"]', 'B', 0, 1, 5, 'For a better understanding of the ideas behind module bundlers and how they work under the hood, consult these resources:', 5, 1, '2020-04-01 13:09:13.000000', 1, '六级', NULL, 18);
INSERT INTO `problems` VALUES (23, 'An entry point _________ which module webpack should use to begin building out its internal _________graph. webpack will _______ out which other _______and libraries that entry point depends on (directly and indirectly).', 2, NULL, '[\"modules \",\"indicates \",\"dependency \",\"figure \",\"figur\",\"dependen\",\"ndicat\"]', 'B;C;D;A', 40, 5, 3, 'An entry point indicates which module webpack should use to begin building out its internal dependency graph. webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).', 20, 1, '2020-04-01 13:12:43.000000', 4, '六级', NULL, NULL);
INSERT INTO `problems` VALUES (24, 'The output _________tells webpack where to emit the bundles it creates and how to name these ________. It defaults to ./dist/main.js for the main output file and to the ./dist folder for any other _________ file.', 2, NULL, '[\"property \",\"webpack \",\"emit \",\"main \",\"files\",\"name \",\"generated \"]', 'A;E;G', 100, 0, 1, 'The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to ./dist/main.js for the main output file and to the ./dist folder for any other generated file.', 18, 1, '2020-04-01 15:22:33.000000', 3, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (25, '小学听力1', 4, 'http://192.168.43.136:8888/server/static/video/1585728007794.mp3', '[]', 'B', 100, 0, 3, 'asdfsdafa', 10, 1, '2020-04-01 16:02:42.000000', 1, '小学', '26', NULL);
INSERT INTO `problems` VALUES (26, 'You can configure this part of the process by specifying an output field in your configuration:', 5, NULL, '[\"You can configure this \",\"the process by specifying \",\"process by specifying an output field in\",\"You can configure this part of the process by specifying an output field in your configuration:\"]', 'D', 100, 0, 3, 'You can configure this part of the process by specifying an output field in your configuration:', 5, 1, '2020-04-01 16:02:30.000000', 1, '小学', NULL, 25);
INSERT INTO `problems` VALUES (27, '初中听力1', 4, 'http://192.168.43.136:8888/server/static/video/1585728255673.mp3', '[]', 'B', 100, 0, 1, 'dsafdfsaf', 5, 1, '2020-04-01 16:03:55.000000', 1, '初中;中考', '28', NULL);
INSERT INTO `problems` VALUES (28, 'In the example above, we use the output.filename and the output.path properties to tell webpack the name of our bundle and where we want it to be emitted to. In case you\'re wondering about the path module being imported at the top', 5, NULL, '[\"Node.js module that gets used to manipulate file paths\",\"it is a core Node.js module that gets used to manipu\",\"bpack the name of our bundle and where we want it to be emitted to. In \",\" above, we use the output.filename and the o\"]', 'C', 100, 0, 1, 'In the example above, we use the output.filename and the output.path properties to tell webpack the name of our bundle and where we want it to be emitted to. In case you\'re wondering about the path module being imported at the top, ', 5, 1, '2020-04-01 16:05:44.000000', 1, '初中;中考', NULL, 27);
INSERT INTO `problems` VALUES (29, 'The investigation _______ evidence of a large-scale illegal trade in wild birds.', 1, NULL, '[\"uncovered\",\"outweighed\",\"overwhelmed\"]', 'A', 100, 0, 1, 'The investigation uncovered evidence of a large-scale illegal trade in wild birds.', 2, 1, '2020-04-21 16:15:19.000000', 1, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (30, 'Ability to get along with people is an ____ in business.', 1, NULL, '[\"capital \",\"property \",\"goods \",\"asset\"]', 'D', 100, 0, 1, '【译文】在商业界友善跟别人相处是可贵的优点。\n\n　　【试题分析】词语辨析题，要求考生掌握几个“资产”的细微差别。\n\n　　【详细解答】capital指资本，资产;property指财产，所有物;goods指货物;asset指资产，优点。', 2, 1, '2020-04-21 16:20:16.000000', 1, '四级', NULL, NULL);
INSERT INTO `problems` VALUES (31, 'The ____ scene of the waterfall is a perfect delight to the eye.', 1, NULL, '[\"significant \",\"magnificent \",\"superstitious \",\"substantial\"]', 'B', 100, 0, 1, '【译文】瀑布的宏伟景象真是好看极了。\n【试题分析】词义辨析题，要求考生掌握几个形容词的意思。\n\n【详细解答】significant指有意义的，重大的;magnificent指华丽的，雄伟的;superstitious指迷信的;substantial指实质的，坚固的。', 2, 1, '2020-04-21 16:22:14.000000', 1, '高中', NULL, NULL);
INSERT INTO `problems` VALUES (32, ' A lot of traffic accidents____ from carelessness.', 1, NULL, '[\"arouse\",\"arise\",\"raise \",\"rise\"]', 'B', 100, 0, 1, '【译文】许多的交通事故是由疏忽大意引起的。\n【试题分析】词语辨析题，要求考试掌握几个形似，意似的词语的差别。\n\n【详细解答】arouse指唤起，引起;arise(from)指发生，起因于;raise是及物动词指提', 2, 1, '2020-04-21 16:24:08.000000', 1, '初中', NULL, NULL);
INSERT INTO `problems` VALUES (33, '四级听力', 4, 'http://192.168.43.136:8888/server/static/video/1587458424293.mp3', '[]', 'B', 100, 0, 1, '11', 2, 1, '2020-04-21 17:02:19.000000', 1, '四级', '34', NULL);
INSERT INTO `problems` VALUES (34, 'Who does the woman think invented the light bulb?', 5, NULL, '[\"Edison\",\"Einstein\",\"Elia\"]', 'A', 100, 0, 1, 'W: The light bulb invented by Einstein has changed our lives a lot. \nM: You are wrong. The light bulb was invented by Edison. ', 2, 1, '2020-04-21 17:01:57.000000', 1, '四级', NULL, 33);
INSERT INTO `problems` VALUES (35, 'My Hobbies and Interests', 3, NULL, '[]', 'A', 100, 0, 1, 'From Monday until Friday most people are busyworking or studying, but in the evenings and off weekends they are free to relax and enjoy themselves. Some watch television or go to the movies;others participate ', 2, 1, '2020-04-21 17:06:11.000000', 1, '四级', NULL, NULL);

-- ----------------------------
-- Table structure for subcourses
-- ----------------------------
DROP TABLE IF EXISTS `subcourses`;
CREATE TABLE `subcourses`  (
  `subcourseId` bigint(255) NOT NULL AUTO_INCREMENT,
  `subcourseName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `video_src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `courseId` bigint(255) NULL DEFAULT NULL,
  `creatorId` bigint(255) NULL DEFAULT NULL,
  `createTime` timestamp(6) NULL DEFAULT NULL,
  `index` int(255) NULL DEFAULT NULL,
  `teacherId` bigint(255) NULL DEFAULT NULL,
  PRIMARY KEY (`subcourseId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subcourses
-- ----------------------------
INSERT INTO `subcourses` VALUES (1, '词汇', 'http://192.168.43.136:8888/server/static/video/nodeProject1.mp4', 5, 1, '2020-03-16 10:40:27.000000', 1, 2);
INSERT INTO `subcourses` VALUES (2, '词组', 'http://192.168.43.136:8888/server/static/video/nodeProject2.mp4', 5, 1, '2020-03-16 10:40:38.000000', 2, 2);
INSERT INTO `subcourses` VALUES (4, '听力复习', 'http://192.168.43.136:8888/server/static/video/vue-2.mp4', 2, 1, '2020-03-16 16:05:22.000000', 1, 2);
INSERT INTO `subcourses` VALUES (5, '阅读复习', 'http://192.168.43.136:8888/server/static/video/vue-1.mp4', 3, 1, '2020-04-01 14:26:12.000000', 2, 2);
INSERT INTO `subcourses` VALUES (6, '简介', 'http://192.168.43.136:8888/server/static/video/1585715647929.mp4', 4, 1, '2020-04-01 12:33:58.000000', 1, 2);
INSERT INTO `subcourses` VALUES (7, '词汇', 'http://192.168.43.136:8888/server/static/video/1585715670956.mp4', 6, 1, '2020-04-01 12:34:04.000000', 1, 2);
INSERT INTO `subcourses` VALUES (8, '词汇', 'http://192.168.43.136:8888/server/static/video/1585715717468.mp4', 7, 1, '2020-04-01 12:34:11.000000', 1, 2);
INSERT INTO `subcourses` VALUES (9, '词汇', 'http://192.168.43.136:8888/server/static/video/1585715714816.mp4', 8, 1, '2020-04-01 12:34:18.000000', 1, 2);
INSERT INTO `subcourses` VALUES (10, '词汇', 'http://192.168.43.136:8888/server/static/video/1585717301630.mp4', 9, 1, '2020-04-01 13:00:14.000000', 1, 2);

-- ----------------------------
-- Table structure for testpapers
-- ----------------------------
DROP TABLE IF EXISTS `testpapers`;
CREATE TABLE `testpapers`  (
  `testpaperId` bigint(255) NOT NULL AUTO_INCREMENT,
  `testpaperName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `diffculty` int(255) NULL DEFAULT NULL COMMENT '分五级',
  `labels` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `usedCount` int(255) NULL DEFAULT NULL,
  `totalGoal` int(255) NULL DEFAULT NULL,
  `creatorId` bigint(255) NULL DEFAULT NULL,
  `createTime` timestamp(6) NULL DEFAULT NULL,
  `onlyChoiceIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `multifyChoiceIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `listenIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `writeIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isTest` int(255) NULL DEFAULT NULL,
  `normalGoal` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`testpaperId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of testpapers
-- ----------------------------
INSERT INTO `testpapers` VALUES (15, '四级模拟考试', 1, '四级', 0, 68, 1, '2020-03-10 18:39:13.000000', '10;8;9;', '14;11;12', '18;', '7;', 0, NULL);
INSERT INTO `testpapers` VALUES (16, '单选专项练习', 4, '四级', 29, 10, NULL, NULL, '9;', NULL, NULL, NULL, 0, 2);
INSERT INTO `testpapers` VALUES (17, '多选专项练习', 3, '', 5, 22, NULL, NULL, NULL, '12;', NULL, NULL, NULL, 13);
INSERT INTO `testpapers` VALUES (18, '四级水平测评', 5, '四级', 9, 76, 1, '2020-03-24 10:31:10.000000', '10;9;', '11;13;', '5', '15;16;', 1, 4);
INSERT INTO `testpapers` VALUES (19, '听力专项练习', 5, '六级', 1, 5, NULL, NULL, NULL, NULL, '17;', NULL, NULL, 0);
INSERT INTO `testpapers` VALUES (20, '听力专项练习', 2, '六级', 2, 5, NULL, NULL, NULL, NULL, '17;', NULL, NULL, 3);
INSERT INTO `testpapers` VALUES (21, '多选专项练习', 2, '六级', 4, 20, NULL, NULL, NULL, '23;', NULL, NULL, NULL, 12);
INSERT INTO `testpapers` VALUES (22, '作文专项练习', 0, '六级', 0, 0, NULL, NULL, NULL, NULL, NULL, '7;', NULL, NULL);
INSERT INTO `testpapers` VALUES (23, '听力专项练习', 0, '六级', 0, 5, NULL, NULL, NULL, NULL, '17;', NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (24, '多选专项练习', 0, '六级', 0, 22, NULL, NULL, NULL, '12;', NULL, NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (25, '单选专项练习', 0, '六级', 0, 1, NULL, NULL, '8;', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (26, '听力专项练习', 5, '四级', 1, 5, NULL, NULL, NULL, NULL, '18;', NULL, NULL, 0);
INSERT INTO `testpapers` VALUES (27, '作文专项练习', 0, '四级', 0, 20, NULL, NULL, NULL, NULL, NULL, '16;', NULL, NULL);
INSERT INTO `testpapers` VALUES (28, '单选专项练习', 0, '四级', 0, 10, NULL, NULL, '9;', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (29, '多选专项练习', 4, '四级', 1, 20, NULL, NULL, NULL, '11;', NULL, NULL, NULL, 7);
INSERT INTO `testpapers` VALUES (30, '多选专项练习', 0, '', 0, 3, NULL, NULL, NULL, '6;', NULL, NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (31, '多选专项练习', 1, '四级', 0, 18, NULL, NULL, NULL, '24;', NULL, NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (32, '多选专项练习', 1, '高中', 0, 0, NULL, NULL, NULL, '14;', NULL, NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (33, '听力专项练习', 1, '四级', 0, 2, NULL, NULL, NULL, NULL, '33;', NULL, NULL, NULL);
INSERT INTO `testpapers` VALUES (34, '作文专项练习', 1, '四级', 0, 2, NULL, NULL, NULL, NULL, NULL, '35;', NULL, NULL);
INSERT INTO `testpapers` VALUES (35, '单选专项练习', 1, '四级', 0, 2, NULL, NULL, '29;', NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `userId` int(255) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` int(255) NULL DEFAULT NULL,
  `phone` bigint(255) NULL DEFAULT NULL,
  `courseIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `selfset` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(25) NULL DEFAULT NULL COMMENT ' 1：学生 2：教师 3：商家 4： 管理员',
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `restMoney` int(255) NULL DEFAULT NULL,
  `achievementRate` int(255) NULL DEFAULT NULL,
  `recentStudy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `praticeNum` int(255) NULL DEFAULT NULL,
  `errorTestId` int(255) NULL DEFAULT NULL,
  `createTime` datetime(6) NULL DEFAULT NULL,
  `studyTime` int(255) NULL DEFAULT NULL,
  `introduce` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `level` int(255) NULL DEFAULT NULL,
  `customMoney` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (1, '李桥', '123456', 0, 15628919868, '', '高中;', 4, '15628919868', 1245, NULL, '5;2;2;undefined;17;11;5;2;', NULL, NULL, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/Abyssrium_2019-09-30_15-57-40.png.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (2, '李老师', '123456', 0, 14578958795, NULL, '高中;包过;', 2, '14578958795', 1458, NULL, '17;13;13;14;2;13;5;15;13;13;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;5;', NULL, NULL, NULL, NULL, '国家特级教师，哈佛大学教授，曾担任清华大学外语系主任；现任北京来必会英语教学有限公司CEO;', 'http://192.168.43.136:8888/server/static/video/image-55747594-cbd1-40f7-a3c6-01cc734991b7.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (3, '李老板', '123456', 0, 18888888888, NULL, NULL, 3, '18888888888', 8888, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `userinfo` VALUES (12, '小魏宝', '123456', 1, 15650570109, '14;5;15;17;17;17;13;13;2;6;8;11;10;18;12;', '四级;', 1, '156505701091584323461663', 9751, 25, '12;3;18;10;2;11;17;15;5;16;13;7;6;4;8;19;', 179, 5, NULL, 2, NULL, 'http://192.168.43.136:8888/server/static/video/wx_camera_1578653431888.jpg', 1, 2153);
INSERT INTO `userinfo` VALUES (13, '街头小子', '998621', 0, 18766014033, '3;5;', '六级;', 1, '187660140331585557867788', 801, 45, '5;3;17;2;16;15;', 29, 6, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/IMG_20190725_174912.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (14, '小王子', '123456', 0, 18576554315, NULL, '0;1;2;3;', 2, '185765543151585558492496', NULL, NULL, '15;', NULL, 7, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/mmexport1574413348218.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (15, 'pdd', '123456', 0, 15625431265, NULL, '小学;', 1, '156254312651585558807097', NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/1585880700960.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (16, NULL, '123456', NULL, 14523589645, NULL, '', 1, '145235896451585559086376', NULL, NULL, NULL, NULL, 9, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/img/user.jpeg', NULL, NULL);
INSERT INTO `userinfo` VALUES (17, '战士', '998621', 0, 15862534521, NULL, '0;1;2;', 2, '158625345211585559577445', NULL, NULL, NULL, NULL, 10, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/IMG_20190913_143024.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (18, '保时捷', '123456', 0, 17854632155, NULL, '高中;', 1, '178546321551585559825955', 0, NULL, NULL, NULL, 11, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/IMG_20190913_150300.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (19, '救救我吧', '123456', 0, 15625352563, '5;', '高中;', 1, '156253525631585559949140', 0, NULL, '5;15;5;5;13;15;15;5;', NULL, 12, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/IMG_20190913_140854.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (21, NULL, '123456', NULL, 18565243256, NULL, NULL, 1, '185652432561585560719316', 0, NULL, NULL, NULL, 14, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/img/user.jpeg', NULL, NULL);
INSERT INTO `userinfo` VALUES (22, '再就是', '123456', 0, 15876452536, '5;', '高中;;', 1, '158764525361585560867230', 0, NULL, '5;', NULL, 15, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/Screenshot_20190618_211016_com.tencent.qqlive.jpg', NULL, NULL);
INSERT INTO `userinfo` VALUES (23, '冲冲冲', '998621', 0, 17777777777, '13;5;', '高中;', 1, '177777777771586671714955', 0, 100, '5;18;13;15;14;17;16;2;', 1, 16, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/1586671837504.jpg', 0, 0);
INSERT INTO `userinfo` VALUES (24, '小狗', '123456', 0, 17852759632, NULL, '小学;', 1, '178527596321587351488152', 0, NULL, NULL, NULL, 17, NULL, NULL, NULL, 'http://192.168.43.136:8888/server/static/video/1587351580856.jpg', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
