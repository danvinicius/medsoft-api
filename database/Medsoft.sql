CREATE DATABASE medsoft;
USE medsoft;

CREATE TABLE `Projeto` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`descricao` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Proposito` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`descricao` TEXT,
	`id_projeto` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Diretriz` (
	`id` int NOT NULL,
	`codigo` varchar(255) NOT NULL UNIQUE,
	`nome` varchar(255) NOT NULL,
	`descricao` TEXT,
	`id_proposito` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Objetivo` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`descricao` TEXT,
	`id_diretriz` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Indicador` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`tipo` varchar(255),
	`demonstra` varchar(255),
	`como_calcular` varchar(255),
	`como_analisar` varchar(255),
	`termo_lexico` varchar(255),
	`nocao_lexico` varchar(255),
	`impacto_lexico` varchar(255),
	`sinonimo_lexico` varchar(255),
	`fonte_lexico` varchar(255),
	`tipo_lexico` varchar(255),
	`formato_lexico` varchar(255),
	`restricao_lexico` varchar(255),
	`id_objetivo` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Resultado` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`descricao` varchar(255) NOT NULL,
	`id_indicador` int NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Proposito` ADD CONSTRAINT `Proposito_fk0` FOREIGN KEY (`id_projeto`) REFERENCES `Projeto`(`id`);

ALTER TABLE `Diretriz` ADD CONSTRAINT `Diretriz_fk0` FOREIGN KEY (`id_proposito`) REFERENCES `Proposito`(`id`);

ALTER TABLE `Objetivo` ADD CONSTRAINT `Objetivo_fk0` FOREIGN KEY (`id_diretriz`) REFERENCES `Diretriz`(`id`);

ALTER TABLE `Indicador` ADD CONSTRAINT `Indicador_fk0` FOREIGN KEY (`id_objetivo`) REFERENCES `Objetivo`(`id`);

ALTER TABLE `Resultado` ADD CONSTRAINT `Resultado_fk0` FOREIGN KEY (`id_indicador`) REFERENCES `Indicador`(`id`);
