-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2024 at 11:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lawyers_services`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_email` varchar(100) NOT NULL,
  `meeting_date` date NOT NULL,
  `meeting_time` time NOT NULL,
  `lawyer_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `client_name`, `client_email`, `meeting_date`, `meeting_time`, `lawyer_id`, `created_at`) VALUES
(6, 'Ali', 'aaa@gmail.com', '2222-02-22', '14:22:00', 1, '2024-07-13 15:51:56'),
(8, 'qq', 'aaa@gmail.com', '1111-11-11', '11:11:00', 1, '2024-07-13 15:53:49'),
(10, 'qq', 'q@gmail.com', '1111-11-11', '11:11:00', 2, '2024-07-13 15:54:59'),
(12, '11', 'q@gmail.com', '1111-11-11', '11:11:00', 1, '2024-07-13 16:21:01'),
(14, 'sds', 'aaa@gmail.com', '1111-11-11', '11:11:00', 3, '2024-07-13 16:21:55'),
(20, 'Ali', 'aaa@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-13 20:17:39'),
(22, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:24'),
(24, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:25'),
(26, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:26'),
(28, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:27'),
(30, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:28'),
(32, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:28'),
(34, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:29'),
(36, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:29'),
(38, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:29'),
(40, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:29'),
(42, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:29'),
(44, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:30'),
(46, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:30'),
(48, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:30'),
(50, 'Ali', 'aaa@gmail.com', '2021-11-11', '11:11:00', 5, '2024-07-14 16:05:30'),
(52, 'Ali', 'aaa@gmail.com', '1111-11-11', '11:11:00', 5, '2024-07-14 16:06:20'),
(54, 'Ali', 'aaa@gmail.com', '1111-11-11', '11:11:00', 5, '2024-07-14 16:06:50'),
(56, 'Ali', 'aaa@gmail.com', '1111-11-11', '11:11:00', 5, '2024-07-14 16:07:08');

-- --------------------------------------------------------

--
-- Table structure for table `lawyers`
--

CREATE TABLE `lawyers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `img` varchar(255) DEFAULT NULL,
  `role` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lawyers`
--

INSERT INTO `lawyers` (`id`, `name`, `email`, `password`, `location`, `service`, `created_at`, `img`, `role`) VALUES
(1, 'lawyer', 'lawyer@gmail.com', '$2y$10$HD29ef51Y.J7FzCSf7kUlu3S4ske0SeSkk6vVefrrPMvWa6n9JFy6', 'pakistan', 'criminal', '2024-07-13 08:55:21', 'uploads/Screenshot_1705056485.png', NULL),
(2, 'Kashif', 'kashif@gmail.com', '$2y$10$KWt86JwDqjiKI0.HVvn68.jhjyjujnBd7weMRv2NRr2mEsM89TRYO', 'india', 'divorce', '2024-07-13 09:14:19', 'uploads/-qjl2xq.jpg', NULL),
(3, 'Mohib', 'mohib@gmail.com', '$2y$10$gWnzdFU1Ff9vgFFXcTccW.SjHs9n87e6M3IJPhUkbS8tggnpCxU2m', 'pakistan', 'divorce', '2024-07-13 11:19:48', 'uploads/IMG_3402.jpg', 'lawyer'),
(4, 'kashif', 'kashif1@gmail.com', '$2y$10$bs.Nf.wvJBLuCqpf5HL4oOCPZjeMoIV/1sH9vGnRP9Pb.O1txK9eu', 'pakistan', 'criminal', '2024-07-13 17:04:19', 'uploads/IMG_3782.jpg', 'lawyer'),
(5, 'Abdullah', 'a@gmail.com', '$2y$10$CtOudV3Bub1WLV5lmSROoeBLw8Qarbvc8Z22ve7AaVbd10M3SkYzK', 'pakistan', 'criminal', '2024-07-13 18:20:02', 'uploads/IMG_3402.jpg', 'lawyer'),
(6, 'Ali', 'ali1@gmail.com', '$2y$10$WzNCUz7YZbFqKch7JxAa8eav5P.L1avljmKVMBEgOoD2/4ob0Jqim', 'india', 'criminal', '2024-07-14 17:46:33', '../uploads/IMG_3402.jpg', 'lawyer'),
(7, 'qq', 'cstmr11@gmail.com', '$2y$10$1eLL9IGy2vWWLIYViRh99e7q7B2HllheRmm4jpvJBRXoNi2nOhDsa', 'india', 'criminal', '2024-07-14 17:50:17', '../uploads/IMG_3879.jpg', 'lawyer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `img` varchar(255) DEFAULT NULL,
  `role` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `img`, `role`) VALUES
(1, 'Mesam', 'customer@gmail.com', '$2y$10$lrLEpySVwCx8SF.e5aXgiOeEjznRUHbwoxU3MpNz1P5pOlSqBh0R.', '2024-07-13 09:18:50', 'uploads/IMG_3402.jpg', NULL),
(2, 'Ahmed', 'ahmed@gmail.com', '$2y$10$v80mG6yG/FUu6nbrCfYr8eg6yQ9mMaOB/UmiYv3h8qhheXvGdr7he', '2024-07-13 11:11:55', 'uploads/IMG_3402.jpg', NULL),
(3, 'Anas', 'anas@gmail.com', '$2y$10$pGKV/KlGxCDQ9Ljulv6Jqeq81.8yzW4RZL.6XDMSJjNxZAhQxAqJe', '2024-07-13 11:17:40', 'uploads/IMG_3402.jpg', 'customer'),
(4, 'Ali', 'ali@gmail.com', '$2y$10$27fYwG71jOJAhxMvCM7D6.2k5WT8dXiQJOTZbYJq8B8AIDSidfLqG', '2024-07-13 18:17:32', ' IMG_3402.jpg', 'customer'),
(5, 'Kashif', 'cstmr12@gmail.com', '$2y$10$nFefbABMegXfYrq1el5SC.J.2yRNlrO8ofLDdpi8.J6pN6/4V41Wy', '2024-07-14 17:48:25', '../uploads/IMG_3396.jpg', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lawyer_id` (`lawyer_id`);

--
-- Indexes for table `lawyers`
--
ALTER TABLE `lawyers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `lawyers`
--
ALTER TABLE `lawyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
