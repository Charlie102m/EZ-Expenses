DROP DATABASE the_expenses_app;

CREATE DATABASE the_expenses_app;

USE the_expenses_app;


CREATE TABLE `savedLocations`
(
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `locationName` VARCHAR(255) NOT NULL,
  `locationAddress` VARCHAR(255) NOT NULL,
  `createdBy` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE `users`
(
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `firstName` VARCHAR(255),
  `lastName` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `permission` VARCHAR(255),
  `profileImageUrl` VARCHAR(255),
  `milageValueDefualt` DECIMAL(4,2) DEFAULT 0.45,
  `homeAddressId` INT,
  `workAddressId` INT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`homeAddressId`) REFERENCES `savedLocations`(`id`),
  FOREIGN KEY (`workAddressId`) REFERENCES `savedLocations`(`id`)
);

ALTER TABLE `savedLocations` ADD FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`);

CREATE TABLE `trips`
(
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `tripDate` DATE NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'unclaimed',
  `originName` VARCHAR(255) NOT NULL,
  `originAddress` VARCHAR(255) NOT NULL,
  `destinationName` VARCHAR(255) NOT NULL,
  `destinationAddress` VARCHAR(255) NOT NULL,
  `reason` VARCHAR(255) NOT NULL,
  `distance` DECIMAL(6,1) NOT NULL,
  `duration` INT NOT NULL,
  `milageRate` DECIMAL(4,2) NOT NULL,
  `value` DECIMAL(10,2) NOT NULL,
  `createdBy` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `expenses`
(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `expenseDate` DATE NOT NULL,
  `expenseType` VARCHAR(255) NOT NULL,
  `comment` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'unclaimed',
  `net` DECIMAL(10,2) NOT NULL,
  `vat` DECIMAL(10,2),
  `total` DECIMAL(10,2) NOT NULL,
  `createdBy` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),

  FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `reciepts`
(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `imageUrl` VARCHAR(1000) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `expenseId` INT NOT NULL,
  `createdBy` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`expenseId`) REFERENCES `expenses`(`id`) ON DELETE CASCADE
);

CREATE TABLE `tripClaims`
(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'created',
  `totalMiles` DECIMAL(11,1) NOT NULL,
  `countTrips` INT NOT NULL,
  `totalValue` DECIMAL(10,2) NOT NULL,
  `createdBy` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `tripClaimsJoin`
(
  `tripId` INT,
  `claimId` INT,
  FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`claimId`) REFERENCES `tripClaims`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`tripId`,`claimId`)
);

CREATE TABLE `expenseClaims`
(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'created',
  `countExpenses` INT NOT NULL,
  `netValue` DECIMAL(10,2) NOT NULL,
  `vatValue` DECIMAL(10,2),
  `totalValue` DECIMAL(10,2) NOT NULL,
  `createdBy` INT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

ALTER TABLE expenseClaims AUTO_INCREMENT=10000;

CREATE TABLE `expenseClaimsJoin`
(
  `expenseId` INT,
  `claimId` INT,
  FOREIGN KEY (`expenseId`) REFERENCES `expenses`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`claimId`) REFERENCES `expenseClaims`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`expenseId`,`claimId`)
);

CREATE TABLE `comments`
(
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `comment` VARCHAR(5000) NOT NULL,
  `createdBy` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `tripCommentsJoin`
(
  `commentId` INT,
  `tripClaimsId` INT,
  FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tripClaimsId`) REFERENCES `tripClaims`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`commentId`,`tripClaimsId`)
);

CREATE TABLE `expenseCommentsJoin`
(
  `commentId` INT,
  `expenseClaimsId` INT,
  FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`expenseClaimsId`) REFERENCES `expenseClaims`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`commentId`,`expenseClaimsId`)
);
