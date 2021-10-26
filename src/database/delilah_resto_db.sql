-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2021 a las 05:58:49
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bills`
--

CREATE TABLE `bills` (
  `bill_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `total` float NOT NULL,
  `order_id` int(11) NOT NULL,
  `paymentMethod` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `total` float DEFAULT NULL,
  `statusOrder` enum('new','confirmed','in process','sending','delivered','canceled') COLLATE utf8mb4_bin DEFAULT 'new',
  `user_id` int(11) DEFAULT NULL,
  `bill_id` int(11) DEFAULT NULL,
  `paymentMethod` enum('cash','credit card','transfer','debit card') COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_details`
--

CREATE TABLE `order_details` (
  `orderDetail_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `subtotal` float DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `productName` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `price` float NOT NULL,
  `imgUrl` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `isDisable` enum('false','true') COLLATE utf8mb4_bin DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `productName`, `description`, `price`, `imgUrl`, `isDisable`) VALUES
(1, 'Bandeja Paisa', 'Plato típico de la región antioqueña colombiana. Dentro de sus ingredientes está un crocante chicharron acompañado de frijoles, arroz, huevo frito, carne molida, chorizo, maduro y un delicioso aguacate.', 25000, 'https://tierraquerida.com.co/wp-content/uploads/2019/08/bandeja-paisa-1080x694.jpg', 'false'),
(2, 'Arroz de Lisa', 'Plato típico de Barranquilla. Se hace a base de lisa, un pez de mar. Se sirve en hoja de bijao y viene acompañado con patacones, yuca, aguacate, suero costeño, huevo cocido y bollo de maíz', 20000, 'https://www.deliciosi.com/images/1000/1068/arroz-de-lisa.jpg', 'false'),
(3, 'Ajiaco', 'Delicioso plato típico de la capital colombiana. Cremosa sopa con pollo desmechado, crema de leche y maíz tierno. Acompañado con diferentes tipos de papas (criolla, pastusa y sabanera).', 22000, 'https://blog.redbus.co/wp-content/uploads/2018/02/ajiaco-santafere%C3%B1o.jpg', 'false'),
(4, 'Tamal tolimense', 'Plato tipico del departamento del Tolima. Envuelto en hoja de platano y preparado a base de maiz con porcion de carne de cerdo, pollo y huevo. Viene acompañado con delicioso chocolate caliente y pan.', 12000, 'https://http2.mlstatic.com/tamales-tolimenses-envios-D_NQ_NP_789396-MCO26715468005_012018-F.jpg', 'false');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `cellphone` varchar(14) COLLATE utf8mb4_bin NOT NULL,
  `deliveryAddress` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `isAdmin` enum('false','true') COLLATE utf8mb4_bin DEFAULT 'false',
  `adminCode` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `isDisable` enum('false','true') COLLATE utf8mb4_bin DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `username`, `fullname`, `email`, `cellphone`, `deliveryAddress`, `password`, `isAdmin`, `adminCode`, `isDisable`) VALUES
(1, 'JuandaTheBigBoss', 'Juan David Pelaez', 'juandapelaez@email.com', '3223334455', 'Mz C cs 36 Brr arcala', '12345', 'true', 'delilahLoMejor', 'false'),
(2, 'shakiraOfficial', 'Shakira Isabel Mebarak', 'shakiraofficial@email.com', '3204429191', 'Cjto Girasoles del Vergel Brr Vergel Barranquilla', 'secret', 'false', NULL, 'false');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `bill-order` (`order_id`),
  ADD KEY `bill-user` (`user_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `orders-user` (`user_id`),
  ADD KEY `orders-bill` (`bill_id`);

--
-- Indices de la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`orderDetail_id`),
  ADD KEY `orderDetail-product` (`product_id`),
  ADD KEY `orderDetail-orders` (`order_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order_details`
--
ALTER TABLE `order_details`
  MODIFY `orderDetail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bill-order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bill-user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders-bill` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders-user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `orderDetail-orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderDetail-product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
