-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2024 at 06:09 PM
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
(100, 'Ali', 'ali@gmail.com', '1111-11-11', '11:11:00', 17, '2024-07-17 11:26:52'),
(102, 'Anas', 'anas@gmail.com', '1111-11-11', '11:11:00', 17, '2024-07-17 11:32:58'),
(104, 'kamran', 'kamran@gmail.com', '1111-11-11', '11:11:00', 17, '2024-07-17 11:34:49'),
(106, 'ss', 's@gmail.com', '0000-00-00', '18:06:00', 17, '2024-07-20 21:00:28');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'kashif', 'k@gmail.com', 'hello', '2024-07-19 19:01:48'),
(2, 'kashif', 'k@gmail.com', 'hello1', '2024-07-19 19:07:00'),
(3, 'ff', 'k@gmail.com', 'gjhgjh', '2024-07-19 19:09:30'),
(4, 'ff', 'k@gmail.com', 'gfhgfh', '2024-07-19 19:10:49'),
(5, 'kashif', 'dfdfd@gmail.com', 'dsfsdf', '2024-07-19 19:20:09'),
(6, 'ff', 'k@gmail.com', 'hghj', '2024-07-19 19:23:44'),
(7, 'ff', 'k@gmail.com', 'hgfhgfh', '2024-07-19 19:29:17'),
(8, 'kashif', 'k@gmail.com', 'hghghj', '2024-07-19 19:32:02');

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
(17, 'Kashif Hussain  ', 'kashif@gmail.com', '$2y$10$6YRWvBisBgTVjMGYWG/6EOhYESLKWU1BqzLaI5nmpqF/mcGoKdiqK', 'karachi', 'immigration law', '2024-07-17 08:13:22', 'uploads/lawyer_1.webp', 'lawyer'),
(19, 'Ahmed', 'ahmed@gmail.com', '$2y$10$y7mtFreKx.EOfaAiG6FnDuRW7Tf.WnjoovhTnAPsbwTLlL6Rbhuja', 'sargodha', 'consumer law', '2024-07-17 17:16:34', 'uploads/lawyer_7.webp', 'lawyer'),
(21, 'Ramsha', 'ramsha@gmail.com', '$2y$10$oJnFvQzjc/1cnsfow21wf.75h5dnyQbVjV7/w5jXOnBlrFvrUpyS.', 'sargodha', 'criminal law', '2024-07-18 15:49:49', 'uploads/lawyer_12.webp', 'lawyer'),
(24, 'Mesam', 'mesam@gmail.com', '$2y$10$LzHbImuC3p6BJCh83WG3U.YKCU9vNWskXh7dDOFakqG0oEqGOsOcm', 'mardan', 'consumer law', '2024-07-21 11:26:41', 'uploads/lawyer_14.webp', 'lawyer');

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
(6, 'Mohib Khan', 'mohib@gmail.com', '$2y$10$TpGcr3nZu/3WAd6mnOIEp.36fqMKpaffKgnt7dtqstwmlAmGwFjPm', '2024-07-16 17:43:59', 'uploads/l.webp', 'customer'),
(7, 'Admin', 'admin@gmail.com', '$2y$10$GFPdSJE8vtzEQNgE2AMLqu4c/698OorwKmuvq3VNIx4mdIvS/ENNK', '2024-07-17 16:30:59', 'uploads/lawyer_1.webp', NULL);

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
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `lawyers`
--
ALTER TABLE `lawyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
