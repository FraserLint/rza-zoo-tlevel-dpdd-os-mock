/*
  Warnings:

  - A unique constraint covering the columns `[userId,visitDate]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Booking_email_visitDate_key` ON `Booking`;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_userId_visitDate_key` ON `Booking`(`userId`, `visitDate`);
