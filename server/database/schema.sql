DROP DATABASE the_expenses_app;

CREATE DATABASE the_expenses_app;

USE the_expenses_app;

CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tripDate DATE NOT NULL,
    originName VARCHAR(255) NOT NULL,
    originAddress VARCHAR(255) NOT NULL,
    destinationName VARCHAR(255) NOT NULL,
    destinationAddress VARCHAR(255) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    distance DECIMAL(6,2) NOT NULL,
    duration INT NOT NULL,
    userId INT,
    createdAt TIMESTAMP DEFAULT NOW()
)