-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileImage` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `profileId` VARCHAR(191) NOT NULL,

    INDEX `ProfileImage_profileId_idx`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `hasAPool` BOOLEAN NOT NULL DEFAULT false,
    `hasAGarage` BOOLEAN NOT NULL DEFAULT true,
    `hasAParkingSpot` BOOLEAN NOT NULL DEFAULT false,
    `numberOfBeds` INTEGER NOT NULL DEFAULT 3,
    `numberOfBaths` INTEGER NOT NULL DEFAULT 1,
    `numberOfGarages` INTEGER NOT NULL DEFAULT 1,
    `numberOfUnitis` INTEGER NOT NULL DEFAULT 1,
    `bultYear` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `propertyType` ENUM('SINGLE_FAMILY_HOME', 'MULTI_FAMILY_HOME', 'CONDO', 'TOWN_HOUSE') NOT NULL DEFAULT 'SINGLE_FAMILY_HOME',
    `location` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `area` INTEGER NOT NULL,
    `listingType` ENUM('SELL', 'RENT') NOT NULL DEFAULT 'SELL',
    `profileId` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL,

    INDEX `Property_profileId_idx`(`profileId`),
    INDEX `Property_bultYear_idx`(`bultYear`),
    INDEX `Property_city_idx`(`city`),
    INDEX `Property_location_idx`(`location`),
    INDEX `Property_zipCode_idx`(`zipCode`),
    INDEX `Property_area_idx`(`area`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyImage` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `imageType` ENUM('KITCHEN', 'BEDROOMS', 'BATHROOMS', 'LIVING_ROOM', 'POOLS', 'EXTERIOR', 'OTHER') NOT NULL DEFAULT 'OTHER',
    `propertyId` VARCHAR(191) NOT NULL,

    INDEX `PropertyImage_propertyId_idx`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Token_userId_idx` ON `Token`(`userId`);
