CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) NOT NULL COLLATE 'armscii8_bin',
	`email` VARCHAR(50) NOT NULL COLLATE 'armscii8_bin',
	`password` VARCHAR(100) NOT NULL COLLATE 'armscii8_bin',
	`role_id` VARCHAR(50) NOT NULL COLLATE 'armscii8_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=5
;


CREATE TABLE `personal` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NULL DEFAULT NULL COLLATE 'armscii8_bin',
	`cargo` VARCHAR(50) NULL DEFAULT NULL COLLATE 'armscii8_bin',
	`correo` VARCHAR(50) NULL DEFAULT NULL COLLATE 'armscii8_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=2
;
