-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 12:21 AM
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
(8, 'qq', 'aaa@gmail.com', '1111-11-11', '11:11:00', 1, '2024-07-13 15:53:49'),
(58, 'Kashi', 's@gmail.com', '2024-12-07', '11:11:00', 4, '2024-07-16 21:34:47'),
(60, 'Kashi', 's@gmail.com', '2024-12-07', '11:11:00', 4, '2024-07-16 21:39:59'),
(62, 'ss', 's@gmail.com', '2222-02-22', '14:22:00', 4, '2024-07-16 21:50:55'),
(64, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 21:58:52'),
(66, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 21:59:19'),
(68, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 21:59:56'),
(70, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 22:00:27'),
(72, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 22:01:00'),
(74, 'ss', 's@gmail.com', '0111-11-11', '11:11:00', 4, '2024-07-16 22:01:41'),
(76, 'ss', 's@gmail.com', '0111-11-11', '11:11:00', 4, '2024-07-16 22:02:09'),
(78, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 22:02:42'),
(80, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 22:04:25'),
(82, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 22:05:50'),
(84, 'ss', 's@gmail.com', '1111-11-11', '11:11:00', 4, '2024-07-16 22:09:17'),
(86, 'ss', 's@gmail.com', '0444-02-04', '16:44:00', 4, '2024-07-16 22:09:48'),
(88, 'ss', 's@gmail.com', '0022-02-22', '16:44:00', 4, '2024-07-16 22:10:36');

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
(1, 'lawyer', 'lawyer@gmail.com', '$2y$10$HD29ef51Y.J7FzCSf7kUlu3S4ske0SeSkk6vVefrrPMvWa6n9JFy6', 'pakistan', 'criminal', '2024-07-13 08:55:21', 'uploads/Screenshot_1705056485.png', 'lawyer'),
(2, 'Jane Smith', 'jane.smith@example.com', 'password123', 'lahore', 'civil', '2024-07-16 21:00:24', 'uploads/lawyer_1.webp', 'lawyer'),
(3, 'Ahmed Khan', 'ahmed.khan@example.com', 'password123', 'islamabad', 'family', '2024-07-16 21:00:24', 'uploads/lawyer_2.webp', 'lawyer'),
(4, 'Maria Garcia', 'maria.garcia@example.com', 'password123', 'rawalpindi', 'corporate', '2024-07-16 21:00:24', 'uploads/lawyer_3.webp', 'lawyer'),
(5, 'Wei Zhang', 'wei.zhang@example.com', 'password123', 'faisalabad', 'tax', '2024-07-16 21:00:24', 'uploads/lawyer_4.webp', 'lawyer'),
(6, 'Aisha Ali', 'aisha.ali@example.com', 'password123', 'multan', 'intellectual property', '2024-07-16 21:00:24', 'uploads/lawyer_5.webp', 'lawyer'),
(7, 'Carlos Diaz', 'carlos.diaz@example.com', 'password123', 'peshawar', 'labor', '2024-07-16 21:00:24', 'uploads/lawyer_7.webp', 'lawyer'),
(8, 'Sofia Rossi', 'sofia.rossi@example.com', 'password123', 'quetta', 'constitutional', '2024-07-16 21:00:24', 'uploads/lawyer_8.webp', 'lawyer'),
(9, 'Michael Brown', 'michael.brown@example.com', 'password123', 'sialkot', 'environmental law', '2024-07-16 21:00:24', 'uploads/lawyer_9.webp', 'lawyer'),
(10, 'Emily Davis', 'emily.davis@example.com', 'password123', 'gujranwala', 'immigration law', '2024-07-16 21:00:24', 'uploads/lawyer_10.webp', 'lawyer'),
(11, 'Fatima Yusuf', 'fatima.yusuf@example.com', 'password123', 'sukkur', 'banking law', '2024-07-16 21:00:24', 'uploads/lawyer_11.webp', 'lawyer'),
(12, 'Daniel Lee', 'daniel.lee@example.com', 'password123', 'hyderabad', 'consumer law', '2024-07-16 21:00:24', 'uploads/lawyer_12.webp', 'lawyer'),
(13, 'Hana Kim', 'hana.kim@example.com', 'password123', 'mardan', 'human rights law', '2024-07-16 21:00:24', 'uploads/lawyer_13.webp', 'lawyer'),
(14, 'Liam Johnson', 'liam.johnson@example.com', 'password123', 'bahawalpur', 'real estate law', '2024-07-16 21:00:24', 'uploads/lawyer_14.webp', 'lawyer'),
(15, 'Olivia Martin', 'olivia.martin@example.com', 'password123', 'sargodha', 'insurance law', '2024-07-16 21:00:24', 'uploads/lawyer_15.webp', 'lawyer'),
(16, 'John Doe', 'john.doe@example.com', 'password123', 'karachi', 'criminal', '2024-07-16 21:00:24', 'uploads/lawyer_16.webp', 'lawyer');

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
(6, 'Mohib', 'mohib@gmail.com', '$2y$10$TpGcr3nZu/3WAd6mnOIEp.36fqMKpaffKgnt7dtqstwmlAmGwFjPm', '2024-07-16 17:43:59', 'uploads/l.webp', 'customer');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `lawyers`
--
ALTER TABLE `lawyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
