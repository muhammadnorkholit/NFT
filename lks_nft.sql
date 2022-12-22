-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 21, 2022 at 04:45 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lks_nft`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` float NOT NULL,
  `created_at` datetime NOT NULL,
  `id_category` int NOT NULL,
  `id_seller` int NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `status` enum('active','noactive','block') NOT NULL DEFAULT 'noactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `title`, `description`, `price`, `created_at`, `id_category`, `id_seller`, `imageUrl`, `status`) VALUES
(9, 'MoB', 'action is', 20, '2022-12-21 04:18:08', 16, 7, 'https://gagadget.com/media/cache/5d/0b/5d0b07e69c43628bf7e7697bc2a71d69.jpg', 'active'),
(10, 'Stone Power', 'This is a stone power', 0.092, '2022-12-21 04:22:28', 16, 7, 'https://gagadget.com/media/cache/f6/79/f6796b13af4d2760f5f12cbb57f5d4c9.jpg', 'active'),
(11, 'Stone Power', 'This is a stone power', 0.092, '2022-12-21 04:22:28', 16, 7, 'https://gagadget.com/media/cache/82/8c/828c15a2c90b5eceeef900a7785e7fc1.jpg', 'noactive');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `description`, `imageUrl`) VALUES
(16, 'art', 'art', '1671595513screencapture-hackinbits-articles-js-push-pop-shift-and-unshift-array-methods-in-javascript-2022-12-16-18_01_45.png');

-- --------------------------------------------------------

--
-- Stand-in structure for view `collections`
-- (See below for the actual view)
--
CREATE TABLE `collections` (
`created_at` varchar(51)
,`created_at_tran` datetime
,`description` text
,`id` int
,`imageUrl` varchar(255)
,`name_category` varchar(30)
,`price` float
,`status` enum('active','noactive','block')
,`title` varchar(50)
,`username` varchar(30)
);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int NOT NULL,
  `amount` int NOT NULL,
  `price` float NOT NULL,
  `id_buyer` int NOT NULL,
  `id_asset` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `amount`, `price`, `id_buyer`, `id_asset`, `created_at`) VALUES
(9, 10, 20.2, 6, 9, '2022-12-21 11:39:14'),
(10, 9, 89, 7, 11, '2022-12-21 11:40:48'),
(11, 9, 89, 7, 11, '2022-12-21 11:40:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `about` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `role` enum('member','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'member',
  `status` enum('active','noactive','block') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `about`, `role`, `status`, `created_at`) VALUES
(6, 'das', 'dass@gmail.com', 'dsadsa', NULL, 'member', 'active', '2022-12-19 21:56:47'),
(7, 'mdsadsa', 'dsa@gmail.com', 'dask\'', NULL, 'member', 'active', '2022-12-20 06:03:09'),
(8, 'das', 'dasss@gmail.com', 'dsadsa', NULL, 'member', 'noactive', '2022-12-19 21:56:47'),
(9, 'mdsadsa', 'dsas@gmail.com', 'dask\'', NULL, 'member', 'noactive', '2022-12-20 06:03:09'),
(11, 'mdsadsa', 'dsassa@gmail.com', 'dask\'', NULL, 'member', 'block', '2022-12-20 06:03:09'),
(12, 'admin', 'admin@gmail.com', '$2y$10$TOwAhFOldzL07roVhb0W9unKddJvBLK.Vb.4oMynl6iaPtVkAOG6W', NULL, 'admin', 'active', '2022-12-21 06:28:59');

-- --------------------------------------------------------

--
-- Structure for view `collections`
--
DROP TABLE IF EXISTS `collections`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections`  AS SELECT `assets`.`title` AS `title`, `assets`.`id` AS `id`, `transaction`.`created_at` AS `created_at_tran`, `assets`.`description` AS `description`, `assets`.`price` AS `price`, `categories`.`title` AS `name_category`, `assets`.`status` AS `status`, `users`.`username` AS `username`, `assets`.`imageUrl` AS `imageUrl`, date_format(`assets`.`created_at`,'%d %b %Y %H:%i') AS `created_at` FROM (((`assets` join `users` on((`assets`.`id_seller` = `users`.`id`))) join `transaction` on((`assets`.`id` = `transaction`.`id_asset`))) join `categories` on((`assets`.`id_category` = `categories`.`id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_seller` (`id_seller`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_buyer` (`id_buyer`),
  ADD KEY `id_asset` (`id_asset`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`id_seller`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assets_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_buyer`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`id_asset`) REFERENCES `assets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
