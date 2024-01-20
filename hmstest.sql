-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2024 at 08:00 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hmstest`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(220) NOT NULL,
  `email` varchar(220) NOT NULL,
  `password` varchar(220) NOT NULL,
  `phoneNo` varchar(11) DEFAULT NULL,
  `status` enum('pending','approved') NOT NULL DEFAULT 'pending',
  `otp` int(4) DEFAULT NULL,
  `role` enum('users','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phoneNo`, `status`, `otp`, `role`) VALUES
(1, 'Asad', 'muhammadasaad561@gmail.com', '$2a$10$G/XkAmqghV1F6SgXOHMAaOSVPToOcvR0VWCJ7cD805pceHFhYerK.', '03231234567', 'approved', 5761, 'users'),
(2, 'Asad', 'muhammadasaad58@gmail.com', '$2a$10$TpfJ.WkEF6A3pL3.ZkFBKuv.fQCSftDYZnBrJdipk.nZp5aqjuMRK', NULL, 'approved', 7635, 'users'),
(3, 'Asad', 'muhammadasaad57@gmail.com', '$2a$10$yQ3L9boqv3AaCZW8ImJuZuOy9z/EXdqI0DRAWlGGp6AiCsn1M1yAW', NULL, 'pending', 6952, 'users'),
(4, 'Asad', 'muhammadasaad56@gmail.com', '$2a$10$0/QVqxjllL/YxF.8LyENFul1E1lT24zpSStquMGoyHFIYQMyeCvZm', NULL, 'pending', 8599, 'users'),
(5, 'Asad', 'muhammadasaad55@gmail.com', '$2a$10$q43Rx5jr7awfR6cYopc6SOLbzkBZ/1/TNI8oNfYIRGUPMiWWzCHkS', NULL, 'pending', 5353, 'users'),
(6, 'Asad', 'muhammadasaad54@gmail.com', '$2a$10$nyfoO9dn552qXf4j9O7ooO1wDjVM8fBNeM0QGX4VKTyAgosjdDPry', NULL, 'pending', 8693, 'users');

-- --------------------------------------------------------

--
-- Table structure for table `user_token`
--

CREATE TABLE `user_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(220) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_token`
--

INSERT INTO `user_token` (`id`, `user_id`, `token`) VALUES
(6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibXVoYW1tYWRhc2FhZDU2MUBnbWFpbC5jb20iLCJpYXQiOjE3MDU2NTIzNjF9.-kw2d6LCzs1d6jipd_P8-ZMC52uNWVTEvWrX-pJjGqI');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_token`
--
ALTER TABLE `user_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_token_ibfk_1` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_token`
--
ALTER TABLE `user_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_token`
--
ALTER TABLE `user_token`
  ADD CONSTRAINT `user_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
