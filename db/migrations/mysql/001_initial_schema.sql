-- Migración inicial: esquema base para AgroLink
-- Compatible con MySQL 8.0

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` CHAR(26) NOT NULL COMMENT 'ULID generado por la aplicación',
  `nombre` VARCHAR(120) NOT NULL,
  `correo` VARCHAR(180) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `rol` ENUM('productor','comprador') NOT NULL,
  `ubicacion` VARCHAR(200) NULL,
  `razon_social` VARCHAR(180) NULL,
  `verificado` BOOLEAN NOT NULL DEFAULT FALSE,
  `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuarios_correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `lotes` (
  `id` CHAR(26) NOT NULL,
  `productor_id` CHAR(26) NOT NULL,
  `producto` VARCHAR(80) NOT NULL,
  `cantidad_kg` DECIMAL(12,2) NOT NULL,
  `calidad` VARCHAR(80) NOT NULL,
  `ubicacion` VARCHAR(200) NOT NULL,
  `disponible_desde` DATE NOT NULL,
  `precio_minimo` DECIMAL(10,2) NOT NULL,
  `estado` ENUM('disponible','pactado','cerrado','cancelado') NOT NULL DEFAULT 'disponible',
  `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_lotes_productor` (`productor_id`),
  KEY `idx_lotes_estado` (`estado`),
  KEY `idx_lotes_producto` (`producto`),
  CONSTRAINT `fk_lotes_productor` FOREIGN KEY (`productor_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ofertas` (
  `id` CHAR(26) NOT NULL,
  `lote_id` CHAR(26) NOT NULL,
  `comprador_id` CHAR(26) NOT NULL,
  `precio_kg` DECIMAL(10,2) NOT NULL,
  `cantidad_kg` DECIMAL(12,2) NOT NULL,
  `estado` ENUM('pendiente','aceptada','rechazada','expirada') NOT NULL DEFAULT 'pendiente',
  `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_ofertas_lote` (`lote_id`),
  KEY `idx_ofertas_comprador` (`comprador_id`),
  KEY `idx_ofertas_estado` (`estado`),
  CONSTRAINT `fk_ofertas_lote` FOREIGN KEY (`lote_id`) REFERENCES `lotes`(`id`),
  CONSTRAINT `fk_ofertas_comprador` FOREIGN KEY (`comprador_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` CHAR(26) NOT NULL,
  `oferta_id` CHAR(26) NOT NULL,
  `lote_id` CHAR(26) NOT NULL,
  `productor_id` CHAR(26) NOT NULL,
  `comprador_id` CHAR(26) NOT NULL,
  `estado` ENUM('Pactado','PagoRetenido','Cargado','Pesado','Pagado','Calificado','EnDisputa','Cancelado') NOT NULL DEFAULT 'Pactado',
  `peso_productor_kg` DECIMAL(12,2) NULL,
  `peso_comprador_kg` DECIMAL(12,2) NULL,
  `umbral_disputa_pct` DECIMAL(5,2) NOT NULL DEFAULT 2.00,
  `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_pedidos_oferta` (`oferta_id`),
  KEY `idx_pedidos_lote` (`lote_id`),
  KEY `idx_pedidos_productor` (`productor_id`),
  KEY `idx_pedidos_comprador` (`comprador_id`),
  KEY `idx_pedidos_estado` (`estado`),
  CONSTRAINT `fk_pedidos_oferta` FOREIGN KEY (`oferta_id`) REFERENCES `ofertas`(`id`),
  CONSTRAINT `fk_pedidos_lote` FOREIGN KEY (`lote_id`) REFERENCES `lotes`(`id`),
  CONSTRAINT `fk_pedidos_productor` FOREIGN KEY (`productor_id`) REFERENCES `usuarios`(`id`),
  CONSTRAINT `fk_pedidos_comprador` FOREIGN KEY (`comprador_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `eventos_pedido` (
  `id` CHAR(26) NOT NULL,
  `pedido_id` CHAR(26) NOT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `actor_id` CHAR(26) NOT NULL,
  `datos_json` JSON NULL,
  `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_eventos_pedido` (`pedido_id`, `creado_en`),
  CONSTRAINT `fk_eventos_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `calificaciones` (
  `id` CHAR(26) NOT NULL,
  `pedido_id` CHAR(26) NOT NULL,
  `autor_id` CHAR(26) NOT NULL,
  `destinatario_id` CHAR(26) NOT NULL,
  `puntaje` TINYINT UNSIGNED NOT NULL CHECK (`puntaje` BETWEEN 1 AND 5),
  `comentario` TEXT NULL,
  `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_calificaciones_pedido_autor` (`pedido_id`, `autor_id`),
  KEY `idx_calificaciones_destinatario` (`destinatario_id`),
  CONSTRAINT `fk_calificaciones_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`),
  CONSTRAINT `fk_calificaciones_autor` FOREIGN KEY (`autor_id`) REFERENCES `usuarios`(`id`),
  CONSTRAINT `fk_calificaciones_destinatario` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `operaciones_procesadas` (
  `id_operacion` CHAR(26) NOT NULL COMMENT 'ID único de la operación (ulid)',
  `tipo` VARCHAR(50) NOT NULL,
  `procesado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id_operacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;