-- RenameIndex
ALTER TABLE `Booking` RENAME INDEX `Booking_userId_visitDate_key` TO `unique_booking_per_user_per_date`;
