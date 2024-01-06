-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2022 at 12:51 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viewdeeproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `menu_name` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `menu_price` int(11) NOT NULL,
  `totalEach` int(11) GENERATED ALWAYS AS (`qty` * `menu_price`) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dining_table`
--

CREATE TABLE `dining_table` (
  `id_table` int(100) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dining_table`
--

INSERT INTO `dining_table` (`id_table`, `status`) VALUES
(1, 'out'),
(2, 'out'),
(3, 'out'),
(4, 'out'),
(5, 'out'),
(6, 'out'),
(7, 'out'),
(8, 'out'),
(9, 'out'),
(10, 'out'),
(11, 'out'),
(12, 'out'),
(13, 'out'),
(14, 'out'),
(15, 'out'),
(16, 'out'),
(17, 'out'),
(18, 'out'),
(19, 'out'),
(20, 'out'),
(21, 'out'),
(22, 'out'),
(23, 'out'),
(24, 'out'),
(25, 'out'),
(26, 'out'),
(27, 'out'),
(28, 'out'),
(29, 'out'),
(30, 'out'),
(31, 'out'),
(32, 'out'),
(33, 'out'),
(34, 'in'),
(35, 'out'),
(36, 'out'),
(37, 'out'),
(38, 'out'),
(39, 'out'),
(40, 'out'),
(41, 'out'),
(42, 'out'),
(43, 'out'),
(44, 'out'),
(45, 'out'),
(46, 'out'),
(47, 'out'),
(48, 'out'),
(49, 'out'),
(50, 'out'),
(51, 'out'),
(52, 'out'),
(53, 'out');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id_employee` int(20) NOT NULL,
  `status_employee` varchar(50) NOT NULL DEFAULT 'employee',
  `id_card` text NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `tel` varchar(10) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `img` text NOT NULL,
  `timecheck` datetime NOT NULL,
  `password_employee` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id_employee`, `status_employee`, `id_card`, `firstname`, `lastname`, `tel`, `gender`, `address`, `email`, `img`, `timecheck`, `password_employee`) VALUES
(1001, 'admin', '1659902061062', 'อริยะวัสส์', 'ไพรพงค์', '0992439788', 'ชาย', '426/9 m.1', 'ariyavas@gmail.com', 'image-1667569087749.png', '2022-10-21 00:00:00', '$2b$10$NbWU7tyfYXKh5qHA9H3uDe.22h.aG65DOZZ0W0DPZ3jCHcfyJAW3W'),
(1012, 'employee', '1111111111111', 'YoYo', 'JoJo', '1111111111', 'ชาย', '1252313431231', 'wadasdw@gmail.com', 'image-1667548381102.png', '2022-11-04 02:11:50', '$2b$10$QPwdSHgB8dqVBdeBA1GmFucxDCoeFf2WGM4If/YtwbJ5Ym4KW85de'),
(1013, 'employee', '1111111111111', 'อรรถกร', 'แนบเนียน', '1111111111', 'ชาย', 'ddd', 'thenoopgg@gmail.com', 'image-1667638860948.png', '2022-11-05 15:18:37', '');

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `id_income` int(100) NOT NULL,
  `income` int(11) NOT NULL,
  `timecheck` datetime NOT NULL,
  `table_id` int(11) NOT NULL,
  `income_item` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`id_income`, `income`, `timecheck`, `table_id`, `income_item`) VALUES
(34, 80, '2022-11-02 00:00:00', 4, '1 ไก่ '),
(35, 160, '2022-11-03 00:00:00', 4, '2 ไก่ '),
(37, 488, '2022-09-03 00:00:00', 4, '2 ไก่ 2 แดงมะนาวโซดา 1 ไก่ย่าง '),
(38, 80, '2022-10-03 00:00:00', 2, '1 ไก่ '),
(39, 800, '2022-11-03 00:00:00', 4, '3 ไก่  2 ไก่  1 ไก่  4 ไก่ '),
(40, 240, '2022-11-03 00:00:00', 4, '1 ไก่  2 ไก่  '),
(42, 600, '2022-11-04 02:27:20', 4, '3 กวาง '),
(109, 0, '2022-11-04 16:10:54', 26, ''),
(110, 0, '2022-11-04 16:10:54', 27, ''),
(111, 0, '2022-11-04 16:10:54', 28, ''),
(112, 0, '2022-11-04 16:10:54', 29, ''),
(113, 0, '2022-11-04 16:10:54', 30, ''),
(114, 0, '2022-11-04 16:15:34', 32, NULL),
(115, 0, '2022-11-04 16:15:34', 33, NULL),
(116, 0, '2022-11-04 16:15:34', 34, NULL),
(117, 0, '2022-11-04 16:15:34', 35, NULL),
(118, 0, '2022-11-04 16:15:34', 36, NULL),
(119, 0, '2022-11-04 16:15:34', 37, NULL),
(120, 0, '2022-11-04 16:15:34', 38, NULL),
(121, 0, '2022-11-04 16:15:34', 39, NULL),
(122, 0, '2022-11-04 16:15:34', 40, NULL),
(123, 0, '2022-11-04 16:15:34', 41, NULL),
(124, 0, '2022-11-04 16:15:34', 42, NULL),
(125, 0, '2022-11-04 16:15:34', 43, NULL),
(126, 0, '2022-11-04 16:15:34', 44, NULL),
(127, 0, '2022-11-04 16:15:34', 45, NULL),
(128, 0, '2022-11-04 16:15:34', 46, NULL),
(129, 0, '2022-11-04 16:15:34', 47, NULL),
(135, 0, '2022-11-04 16:15:34', 53, NULL),
(136, 200, '2022-11-04 16:22:16', 4, ' 1 กวาง '),
(137, 800, '2022-11-04 16:25:25', 4, ' 1 กวาง  3 กวาง '),
(138, 0, '2022-11-04 16:25:25', 4, ''),
(139, 600, '2022-11-04 16:25:25', 4, '1 กวาง  2 กวาง '),
(140, 200, '2022-11-04 19:56:24', 4, '1 กวาง '),
(141, 0, '2022-11-04 19:56:24', 1, ''),
(142, 0, '2022-11-04 20:06:08', 4, ' '),
(143, 920, '2022-11-04 20:32:07', 4, '  3 กวาง           '),
(144, 230, '2022-11-04 20:34:13', 4, '  1 กวาง '),
(145, 0, '2022-11-04 20:34:13', 1, ''),
(146, 0, '2022-11-04 20:34:13', 1, ''),
(147, 0, '2022-11-04 20:34:13', 1, ''),
(148, 0, '2022-11-04 20:34:13', 1, ''),
(149, 0, '2022-11-04 20:34:13', 1, ''),
(150, 230, '2022-11-04 20:34:13', 4, '1 กวาง '),
(151, 0, '2022-11-04 21:25:58', 4, ' '),
(152, 0, '2022-11-04 21:25:58', 4, ''),
(153, 0, '2022-11-04 21:25:58', 1, '   '),
(154, 0, '2022-11-04 21:25:58', 52, ''),
(155, 0, '2022-11-04 21:25:58', 53, ''),
(156, 0, '2022-11-04 21:25:58', 1, ''),
(157, 0, '2022-11-04 21:25:58', 53, ''),
(158, 700, '2022-11-05 07:48:51', 12, '2 หมึกย่าง   '),
(159, 630, '2022-11-05 08:41:53', 14, '1 ต้มยำกุ้ง 1 หมึกย่าง '),
(160, 630, '2022-11-05 08:52:29', 1, ' 1 หมึกย่าง  1 ต้มยำกุ้ง '),
(161, 630, '2022-11-05 08:59:47', 1, '1 ต้มยำกุ้ง 1 หมึกย่าง '),
(162, 0, '2022-11-05 08:59:47', 1, ''),
(163, 710, '2022-11-05 08:59:47', 2, '1 หมึกย่าง 1 ต้มยำกุ้ง 1 นํ้าเปล่า '),
(164, 430, '2022-11-05 09:53:03', 2, ' 1 เหล้า(jack) 1 นํ้าเปล่า '),
(165, 350, '2022-11-05 09:53:03', 2, ' 1 หมึกย่าง '),
(166, 240, '2022-11-05 09:53:03', 1, '1 กวาง '),
(167, 0, '2022-11-05 09:53:03', 1, ' '),
(168, 560, '2022-11-05 12:04:36', 1, ' 2 ต้มยำกุ้ง '),
(169, 0, '2022-11-05 12:04:36', 2, ''),
(170, 790, '2022-11-05 14:36:11', 2, '1 ต้มยำกุ้ง 1 ข้าวสวย(โถ) 1 หมึกย่าง 1 นํ้าเปล่า ');

-- --------------------------------------------------------

--
-- Table structure for table `list_order`
--

CREATE TABLE `list_order` (
  `id_order` int(100) NOT NULL,
  `table_id` int(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `amount` int(100) NOT NULL,
  `price` int(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'W',
  `raw_material` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `list_order`
--

INSERT INTO `list_order` (`id_order`, `table_id`, `name`, `amount`, `price`, `status`, `raw_material`) VALUES
(153, 4, 'กวาง', 1, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(154, 4, 'กวาง', 2, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(155, 4, 'กวาง', 2, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(156, 4, 'กวาง', 1, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(157, 4, 'กวาง', 1, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(158, 4, 'กวาง', 3, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(159, 4, 'กวาง', 1, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(160, 4, 'กวาง', 2, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(161, 4, 'กวาง', 1, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(162, 4, 'กวาง', 1, 200, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(163, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(164, 4, 'กวาง', 3, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(165, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(166, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(167, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(168, 4, 'กวาง', 1, 230, 'COMPLETE', 'ธัน ปลาทอง ไกรทอง                 '),
(169, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(170, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(171, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(172, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(173, 4, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(174, 1, 'กวาง', 2, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(175, 1, 'กวาง', 1, 230, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(176, 12, 'หมึกย่าง', 2, 350, 'COMPLETE', 'ปลาทอง ไกรทอง                  '),
(177, 12, 'กวาง', 1, 240, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(180, 1, 'ต้มยำกุ้ง', 1, 280, 'RETURNED', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ด'),
(181, 1, 'หมึกย่าง', 1, 350, 'COMPLETE', 'ปลาทอง ไกรทอง                  '),
(182, 1, 'ต้มยำกุ้ง', 1, 280, 'COMPLETE', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        '),
(183, 1, 'ต้มยำกุ้ง', 1, 280, 'COMPLETE', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        '),
(184, 1, 'หมึกย่าง', 1, 350, 'COMPLETE', 'ปลาทอง ไกรทอง                  '),
(185, 2, 'หมึกย่าง', 1, 350, 'COMPLETE', 'ปลาทอง ไกรทอง                  '),
(186, 2, 'ต้มยำกุ้ง', 1, 280, 'COMPLETE', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        '),
(187, 2, 'นํ้าเปล่า', 1, 80, 'COMPLETE', 'นํ้าเปล่าขวดใหญ่                   '),
(188, 2, 'หมึกย่าง', 2, 350, 'RETURNED', 'ปลาทอง ไกรทอง                  '),
(189, 2, 'เหล้า(jack)', 1, 350, 'COMPLETE', 'เหล้าjack                   '),
(190, 2, 'นํ้าเปล่า', 1, 80, 'COMPLETE', 'นํ้าเปล่าขวดใหญ่                   '),
(191, 2, 'ต้มยำกุ้ง', 1, 280, 'RETURNED', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        '),
(192, 2, 'หมึกย่าง', 1, 350, 'COMPLETE', 'ปลาทอง ไกรทอง                  '),
(193, 1, 'กวาง', 1, 240, 'COMPLETE', 'ธัน ปลาทอง ไกรทอง                 '),
(194, 1, 'กวาง', 1, 240, 'RETURNED', 'ธัน ปลาทอง ไกรทอง                 '),
(195, 1, 'หมึกย่าง', 2, 340, 'RETURNED', 'หมึกกล้วย น้ำปลา ขมิ้น                 '),
(196, 1, 'ต้มยำกุ้ง', 2, 280, 'COMPLETE', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        '),
(197, 2, 'ต้มยำกุ้ง', 1, 280, 'COMPLETE', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        '),
(198, 2, 'ข้าวสวย(โถ)', 1, 90, 'COMPLETE', 'ข้าวหอมมะลิ                   '),
(199, 2, 'หมึกย่าง', 1, 340, 'COMPLETE', 'หมึกกล้วย น้ำปลา ขมิ้น                 '),
(200, 2, 'นํ้าเปล่า', 1, 80, 'COMPLETE', 'นํ้าเปล่าขวดใหญ่                   '),
(201, 34, 'ต้มยำกุ้ง', 1, 280, 'RETURNED', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        '),
(202, 34, 'หมึกย่าง', 1, 340, 'COMPLETE', 'หมึกกล้วย น้ำปลา ขมิ้น                 '),
(203, 34, 'นํ้าเปล่า', 2, 80, 'COMPLETE', 'นํ้าเปล่าขวดใหญ่                   '),
(204, 34, 'ไอศครีมวนิลา', 1, 49, 'COMPLETE', 'ไอศครีมวนิลา                   '),
(205, 34, 'ต้มยำกุ้ง', 1, 280, 'COMPLETE', 'กุ้งขาว ข่า ตะไคร้ ใบมะกรูด คนอต้มยำ เห็ดฟาง นํ้าพริกเผา นมข้นจืด พริกขี้หนู ผักชีฝรั่ง พริกแห้งเม็ดใหญ่ หอมแดงเจียว        ');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(5) NOT NULL,
  `menu_name` varchar(50) NOT NULL,
  `menu_type_id` int(11) NOT NULL,
  `menu_price` int(11) NOT NULL,
  `menu_image` text NOT NULL,
  `menu_status` int(11) NOT NULL,
  `ingre_1` varchar(100) DEFAULT NULL,
  `v_ingre1` int(11) DEFAULT NULL,
  `ingre_2` varchar(100) DEFAULT NULL,
  `v_ingre2` int(11) DEFAULT NULL,
  `ingre_3` varchar(100) DEFAULT NULL,
  `v_ingre3` int(11) DEFAULT NULL,
  `ingre_4` varchar(100) DEFAULT NULL,
  `v_ingre4` int(11) DEFAULT NULL,
  `ingre_5` varchar(100) DEFAULT NULL,
  `v_ingre5` int(11) DEFAULT NULL,
  `ingre_6` varchar(100) DEFAULT NULL,
  `v_ingre6` int(11) DEFAULT NULL,
  `ingre_7` varchar(100) DEFAULT NULL,
  `v_ingre7` int(11) DEFAULT NULL,
  `ingre_8` varchar(100) DEFAULT NULL,
  `v_ingre8` int(11) DEFAULT NULL,
  `ingre_9` varchar(100) DEFAULT NULL,
  `v_ingre9` int(11) DEFAULT NULL,
  `ingre_10` varchar(100) DEFAULT NULL,
  `v_ingre10` int(11) DEFAULT NULL,
  `ingre_11` varchar(100) DEFAULT NULL,
  `v_ingre11` int(11) DEFAULT NULL,
  `ingre_12` varchar(100) DEFAULT NULL,
  `v_ingre12` int(11) DEFAULT NULL,
  `ingre_13` varchar(100) DEFAULT NULL,
  `v_ingre13` int(11) DEFAULT NULL,
  `ingre_14` varchar(100) DEFAULT NULL,
  `v_ingre14` int(11) DEFAULT NULL,
  `ingre_15` varchar(100) DEFAULT NULL,
  `v_ingre15` int(11) DEFAULT NULL,
  `ingre_16` varchar(100) DEFAULT NULL,
  `v_ingre16` int(11) DEFAULT NULL,
  `ingre_17` varchar(100) DEFAULT NULL,
  `v_ingre17` int(11) DEFAULT NULL,
  `ingre_18` varchar(100) DEFAULT NULL,
  `v_ingre18` int(11) DEFAULT NULL,
  `ingre_19` varchar(100) DEFAULT NULL,
  `v_ingre19` int(11) DEFAULT NULL,
  `ingre_20` varchar(100) DEFAULT NULL,
  `v_ingre20` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `menu_name`, `menu_type_id`, `menu_price`, `menu_image`, `menu_status`, `ingre_1`, `v_ingre1`, `ingre_2`, `v_ingre2`, `ingre_3`, `v_ingre3`, `ingre_4`, `v_ingre4`, `ingre_5`, `v_ingre5`, `ingre_6`, `v_ingre6`, `ingre_7`, `v_ingre7`, `ingre_8`, `v_ingre8`, `ingre_9`, `v_ingre9`, `ingre_10`, `v_ingre10`, `ingre_11`, `v_ingre11`, `ingre_12`, `v_ingre12`, `ingre_13`, `v_ingre13`, `ingre_14`, `v_ingre14`, `ingre_15`, `v_ingre15`, `ingre_16`, `v_ingre16`, `ingre_17`, `v_ingre17`, `ingre_18`, `v_ingre18`, `ingre_19`, `v_ingre19`, `ingre_20`, `v_ingre20`) VALUES
(1, 'กวาง', 1, 240, 'image-1667503677304.png', 0, 'ธัน', 100, 'ปลาทอง', 300, 'ไกรทอง', 200, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0),
(3, 'ต้มยำกุ้ง', 1, 280, 'image-1667612223388.jpg', 0, 'กุ้งขาว', 200, 'ข่า', 50, 'ตะไคร้', 20, 'ใบมะกรูด', 15, 'คนอต้มยำ', 20, 'เห็ดฟาง', 100, 'นํ้าพริกเผา', 20, 'นมข้นจืด', 150, 'พริกขี้หนู', 20, 'ผักชีฝรั่ง', 10, 'พริกแห้งเม็ดใหญ่', 5, 'หอมแดงเจียว', 5, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0),
(4, 'เหล้า(jack)', 4, 350, 'image-1667614521042.jpeg', 0, 'เหล้าjack', 1, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0),
(5, 'นํ้าเปล่า', 4, 80, 'image-1667614850051.jpeg', 0, 'นํ้าเปล่าขวดใหญ่', 1, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0),
(6, 'ไอศครีมวนิลา', 3, 49, 'image-1667615202073.jpg', 0, 'ไอศครีมวนิลา', 80, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0),
(7, 'หมึกย่าง', 2, 340, 'image-1667626763195.jpg', 0, 'หมึกกล้วย', 750, 'น้ำปลา', 20, 'ขมิ้น', 20, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0),
(8, 'ข้าวสวย(โถ)', 1, 90, 'image-1667630836238.jpg', 0, 'ข้าวหอมมะลิ', 500, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `order_item` text NOT NULL,
  `order_sum_price` int(11) NOT NULL,
  `order_in_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE `queue` (
  `queue_id` int(11) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `cus_tel` varchar(10) NOT NULL,
  `cus_sum_people` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `id_item` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `quantity` int(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `id_employee` int(10) NOT NULL,
  `timecheck` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`id_item`, `name`, `quantity`, `type`, `id_employee`, `timecheck`) VALUES
(28, 'ไก่', 2000, 'เนื้อสัตว์', 1001, '2022-11-05 15:18:37'),
(29, 'ปลาทอง', 4400, 'ปลาแม่น้ำ', 1001, '2022-11-04 15:06:20'),
(30, 'ไกรทอง', 27680, 'วัตถุดิบ', 1001, '2022-10-04 02:11:50'),
(31, 'ธัน', 0, 'เนื้อสัตว์', 1001, '2022-11-05 07:48:50'),
(32, 'กุ้งขาว', 18200, 'กุ้งแม่น้ำ', 1001, '2022-11-05 07:48:50'),
(33, 'ข่า', 19650, 'วัตถุดิบ', 1001, '2022-11-05 07:48:50'),
(34, 'ตะไคร้', 19860, 'วัตถุดิบ', 1001, '2022-11-05 07:48:50'),
(35, 'ใบมะกรูด', 19895, 'วัตถุดิบ', 1001, '2022-11-05 07:48:50'),
(36, 'คนอต้มยำ', 19860, 'วัตถุดิบ', 1001, '2022-11-04 07:48:50'),
(37, 'เห็ดฟาง', 19300, 'วัตถุดิบ', 1001, '2022-11-04 11:09:57'),
(38, 'นํ้าพริกเผา', 19860, 'วัตถุดิบ', 1001, '2022-11-05 07:48:50'),
(39, 'นมข้นจืด', 18950, 'วัตถุดิบ', 1001, '2022-11-04 07:48:50'),
(40, 'พริกขี้หนู', 19860, 'วัตถุดิบ', 1001, '2022-11-04 07:48:50'),
(41, 'ผักชีฝรั่ง', 19930, 'วัตถุดิบ', 1001, '2022-11-05 07:48:50'),
(42, 'พริกแห้งเม็ดใหญ่', 19965, 'วัตถุดิบ', 1001, '2022-11-05 07:48:50'),
(43, 'หอมแดงเจียว', 19965, 'วัตถุดิบ', 1001, '2022-11-05 07:48:50'),
(44, 'ข้าวหอมมะลิ', 19500, 'วัตถุดิบ', 1001, '2022-11-05 08:59:47'),
(45, 'เนื้อหมู', 20000, 'เนื้อสัตว์', 1001, '2022-11-05 08:59:47'),
(46, 'ใบกะเพรา', 20000, 'วัตถุดิบ', 1001, '2022-11-05 08:59:47'),
(47, 'ไอศครีมวนิลา', 19920, 'วัตถุดิบ', 1001, '2022-11-05 08:59:47'),
(48, 'นํ้าเปล่าขวดใหญ่', 95, 'เครื่องดื่ม', 1001, '2022-11-05 08:59:47'),
(49, 'เหล้าjack', 29, 'เครื่องดื่ม', 1001, '2022-11-05 08:59:47'),
(50, 'เปปซี่', 100, 'เครื่องดื่ม', 1001, '2022-11-05 09:53:02'),
(54, 'มะนาว', 10000, 'วัตถุดิบ', 1001, '2022-11-05 12:04:36'),
(55, 'หมึกกล้วย', 13500, 'หมึกทะเล', 1001, '2022-11-05 12:04:36'),
(56, 'น้ำปลา', 19960, 'วัตถุดิบ', 1001, '2022-11-05 12:04:36'),
(57, 'ขมิ้น', 19960, 'วัตถุดิบ', 1001, '2022-11-05 12:04:36');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `table_id` int(11) NOT NULL,
  `table_item` varchar(500) DEFAULT NULL,
  `table_total_price` int(11) DEFAULT 0,
  `table_status` varchar(100) NOT NULL DEFAULT 'out',
  `table_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`table_id`, `table_item`, `table_total_price`, `table_status`, `table_time`) VALUES
(1, '', 0, 'out', '0000-00-00 00:00:00'),
(2, '', 0, 'out', '0000-00-00 00:00:00'),
(3, '', 0, 'out', '0000-00-00 00:00:00'),
(4, '', 0, 'out', '0000-00-00 00:00:00'),
(5, '', 0, 'out', '0000-00-00 00:00:00'),
(6, '', 0, 'out', '0000-00-00 00:00:00'),
(7, '', 0, 'out', '0000-00-00 00:00:00'),
(8, '', 0, 'out', '0000-00-00 00:00:00'),
(9, '', 0, 'out', '0000-00-00 00:00:00'),
(10, '', 0, 'out', '0000-00-00 00:00:00'),
(11, '', 0, 'out', '0000-00-00 00:00:00'),
(12, '', 0, 'out', '0000-00-00 00:00:00'),
(13, '', 0, 'out', '0000-00-00 00:00:00'),
(14, '', 0, 'out', '0000-00-00 00:00:00'),
(15, '', 0, 'out', '0000-00-00 00:00:00'),
(16, '', 0, 'out', '0000-00-00 00:00:00'),
(17, '', 0, 'out', '0000-00-00 00:00:00'),
(18, '', 0, 'out', '0000-00-00 00:00:00'),
(19, '', 0, 'out', '0000-00-00 00:00:00'),
(20, '', 0, 'out', '0000-00-00 00:00:00'),
(21, '', 0, 'out', '0000-00-00 00:00:00'),
(22, '', 0, 'out', '0000-00-00 00:00:00'),
(23, '', 0, 'out', '0000-00-00 00:00:00'),
(24, '', 0, 'out', '0000-00-00 00:00:00'),
(25, '', 0, 'out', '0000-00-00 00:00:00'),
(26, '', 0, 'out', '0000-00-00 00:00:00'),
(27, '', 0, 'out', '0000-00-00 00:00:00'),
(28, '', 0, 'out', '0000-00-00 00:00:00'),
(29, '', 0, 'out', '0000-00-00 00:00:00'),
(30, '', 0, 'out', '0000-00-00 00:00:00'),
(31, '', 0, 'out', '0000-00-00 00:00:00'),
(32, '', 0, 'out', '0000-00-00 00:00:00'),
(33, '', 0, 'out', '0000-00-00 00:00:00'),
(34, ' 1 หมึกย่าง 2 นํ้าเปล่า  1 ไอศครีมวนิลา  1 ต้มยำกุ้ง ', 829, 'in', '2022-11-05 15:18:38'),
(35, '', 0, 'out', '0000-00-00 00:00:00'),
(36, '', 0, 'out', '0000-00-00 00:00:00'),
(37, '', 0, 'out', '0000-00-00 00:00:00'),
(38, '', 0, 'out', '0000-00-00 00:00:00'),
(39, '', 0, 'out', '0000-00-00 00:00:00'),
(40, '', 0, 'out', '0000-00-00 00:00:00'),
(41, '', 0, 'out', '0000-00-00 00:00:00'),
(42, '', 0, 'out', '0000-00-00 00:00:00'),
(43, '', 0, 'out', '0000-00-00 00:00:00'),
(44, '', 0, 'out', '0000-00-00 00:00:00'),
(45, '', 0, 'out', '0000-00-00 00:00:00'),
(46, '', 0, 'out', '0000-00-00 00:00:00'),
(47, '', 0, 'out', '0000-00-00 00:00:00'),
(48, '', 0, 'out', '0000-00-00 00:00:00'),
(49, '', 0, 'out', '0000-00-00 00:00:00'),
(50, '', 0, 'out', '0000-00-00 00:00:00'),
(51, '', 0, 'out', '0000-00-00 00:00:00'),
(52, '', 0, 'out', '0000-00-00 00:00:00'),
(53, '', 0, 'out', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tmenu_type`
--

CREATE TABLE `tmenu_type` (
  `menu_type_id` int(11) NOT NULL,
  `type_name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tmenu_type`
--

INSERT INTO `tmenu_type` (`menu_type_id`, `type_name`, `description`) VALUES
(1, 'เมนูทั่วไป', 'อาหารจำพวกต้ม ผัด แกง ทอด'),
(2, 'อาหารทะเล', 'อาหารที่มีส่วนประกอบที่เป็นวัตถุดิบจากทะเล'),
(3, 'ของหวาน', 'ของหวาน'),
(4, 'เครื่องดื่ม', 'เครื่องดื่มนํ้า นม ผลไม้ แอลกอฮอล');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `dining_table`
--
ALTER TABLE `dining_table`
  ADD PRIMARY KEY (`id_table`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id_employee`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`id_income`);

--
-- Indexes for table `list_order`
--
ALTER TABLE `list_order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`),
  ADD UNIQUE KEY `menu_name` (`menu_name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `queue`
--
ALTER TABLE `queue`
  ADD PRIMARY KEY (`queue_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id_item`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`table_id`);

--
-- Indexes for table `tmenu_type`
--
ALTER TABLE `tmenu_type`
  ADD PRIMARY KEY (`menu_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id_employee` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1014;

--
-- AUTO_INCREMENT for table `income`
--
ALTER TABLE `income`
  MODIFY `id_income` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `list_order`
--
ALTER TABLE `list_order`
  MODIFY `id_order` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `queue`
--
ALTER TABLE `queue`
  MODIFY `queue_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id_item` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `tmenu_type`
--
ALTER TABLE `tmenu_type`
  MODIFY `menu_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
