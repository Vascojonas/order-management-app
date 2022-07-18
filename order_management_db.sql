-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: order_management_db
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrinho_produto`
--

DROP TABLE IF EXISTS `carrinho_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrinho_produto` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `carrinho_id` int(10) unsigned NOT NULL,
  `produto_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrinho_produto`
--

LOCK TABLES `carrinho_produto` WRITE;
/*!40000 ALTER TABLE `carrinho_produto` DISABLE KEYS */;
INSERT INTO `carrinho_produto` VALUES (1,1,11,NULL,NULL),(2,1,15,NULL,NULL),(3,1,14,NULL,NULL),(4,2,15,NULL,NULL),(5,1,17,NULL,NULL),(6,1,18,NULL,NULL),(7,1,16,NULL,NULL),(10,1,25,NULL,NULL),(20,3,27,NULL,NULL),(21,3,18,NULL,NULL),(22,3,19,NULL,NULL),(23,3,30,NULL,NULL),(25,1,19,NULL,NULL),(29,4,17,NULL,NULL),(30,4,24,NULL,NULL),(31,4,27,NULL,NULL),(32,4,18,NULL,NULL),(33,4,19,NULL,NULL);
/*!40000 ALTER TABLE `carrinho_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrinhos`
--

DROP TABLE IF EXISTS `carrinhos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrinhos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carrinhos_cliente_id_foreign` (`cliente_id`),
  CONSTRAINT `carrinhos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrinhos`
--

LOCK TABLES `carrinhos` WRITE;
/*!40000 ALTER TABLE `carrinhos` DISABLE KEYS */;
INSERT INTO `carrinhos` VALUES (1,1,'2022-07-11 00:33:52','2022-07-11 00:33:52'),(3,3,'2022-07-13 07:26:33','2022-07-13 07:26:33'),(4,4,'2022-07-18 08:01:38','2022-07-18 08:01:38');
/*!40000 ALTER TABLE `carrinhos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apelido` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clientes_user_id_foreign` (`user_id`),
  CONSTRAINT `clientes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Vanina','Come','4567876543','vania@gmail.com',2,'2022-07-10 09:24:00','2022-07-10 09:24:00'),(3,'Katarina','Mbunga','846087543','katarina@gmail.com',6,'2022-07-13 07:24:04','2022-07-13 07:24:04'),(4,'Gilberto','Mugabe','846078564','gilberto@gmail.com',7,'2022-07-18 08:00:48','2022-07-18 08:00:48');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encomenda_produto`
--

DROP TABLE IF EXISTS `encomenda_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encomenda_produto` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagem_ass` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `status` int(11) NOT NULL DEFAULT 0,
  `valor` double NOT NULL DEFAULT 0,
  `prazo` timestamp NOT NULL DEFAULT current_timestamp(),
  `quantidade` int(11) NOT NULL DEFAULT 1,
  `encomenda_id` int(10) unsigned NOT NULL,
  `produto_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encomenda_produto`
--

LOCK TABLES `encomenda_produto` WRITE;
/*!40000 ALTER TABLE `encomenda_produto` DISABLE KEYS */;
INSERT INTO `encomenda_produto` VALUES (1,'bjhkbbjkbjhj','/storage/uploads/1657511702_549a73d442.jpg',0,0,'2022-07-11 03:55:02',1,1,11,'2022-07-11 01:55:02','2022-07-11 01:55:02'),(2,'hgcghcchgchcgh','/storage/uploads/1657512137_chaveiro.jpg',0,0,'2022-07-11 04:02:17',1,2,14,'2022-07-11 02:02:17','2022-07-11 02:02:17');
/*!40000 ALTER TABLE `encomenda_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encomendas`
--

DROP TABLE IF EXISTS `encomendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encomendas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `encomendas_cliente_id_foreign` (`cliente_id`),
  CONSTRAINT `encomendas_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encomendas`
--

LOCK TABLES `encomendas` WRITE;
/*!40000 ALTER TABLE `encomendas` DISABLE KEYS */;
INSERT INTO `encomendas` VALUES (1,1,'2022-07-11 01:20:48','2022-07-11 01:20:48');
/*!40000 ALTER TABLE `encomendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encomendas_itens`
--

DROP TABLE IF EXISTS `encomendas_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encomendas_itens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagem_ass` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `status` int(11) NOT NULL DEFAULT 0,
  `valor` double NOT NULL DEFAULT 0,
  `prazo` timestamp NOT NULL DEFAULT current_timestamp(),
  `quantidade` int(11) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encomendas_itens`
--

LOCK TABLES `encomendas_itens` WRITE;
/*!40000 ALTER TABLE `encomendas_itens` DISABLE KEYS */;
INSERT INTO `encomendas_itens` VALUES (1,'kklklnkln','/storage/uploads/1657538595_chaveiro.jpg',0,0,'2022-07-11 11:23:15',1,2,11,'2022-07-11 09:23:15','2022-07-11 09:23:15'),(2,'dfgchchcgghgch','/storage/uploads/1657540709_chaveiro.jpg',0,0,'2022-07-11 11:58:29',1,2,15,'2022-07-11 09:58:29','2022-07-11 09:58:29'),(3,'Chaveiro rectangular personalizado com essa foto','...',2,450,'2022-07-14 22:00:00',1,6,24,'2022-07-13 07:30:36','2022-07-16 16:36:05'),(4,'Chaveiro rectangular personalizado com essa foto','/storage/uploads/1657707574_kit-3-quadros-decorativos-leao-colorido-kit-quadros-decorativos.jpg',0,0,'2022-07-13 10:19:34',1,6,24,'2022-07-13 08:19:34','2022-07-13 08:19:34'),(5,'Uma chaavina mágica com essa foto numa das faces','/storage/uploads/1657712297_kit-3-quadros-decorativos-leao-colorido-kit-quadros-decorativos.jpg',3,230,'2022-07-13 22:00:00',7,2,17,'2022-07-13 09:38:17','2022-07-14 20:50:21'),(6,'Chávena simples branca com a escrita: \"Aquele que me guarda  não dormita\"','...',2,800,'2022-07-13 22:00:00',1,2,18,'2022-07-13 10:24:09','2022-07-14 20:50:41'),(7,'Um compo pintado a preto com escriva \"God is Love\" a cor branca','...',1,1700,'2022-07-15 22:00:00',89,6,19,'2022-07-14 21:07:15','2022-07-14 21:08:19'),(8,'Uma chávena simples com anexando a foto a baixo com a seguinte legenda \"Cante sempre como um passarinho\"','/storage/uploads/1657841803_logo.jpg',1,800,'2022-07-15 22:00:00',1,6,18,'2022-07-14 21:31:16','2022-07-14 21:37:37'),(9,'Bebedouro preto com inicial V','...',0,0,'2022-07-16 18:48:11',1,6,27,'2022-07-16 16:48:11','2022-07-16 16:48:11'),(10,'Uma chávena identica  com a letra F!','...',1,800,'2022-07-17 22:00:00',1,2,16,'2022-07-16 19:40:53','2022-07-16 19:41:37'),(11,'Uma chávena mágica com a seguinte...','/storage/uploads/1658138831_kit-3-quadros-decorativos-leao-colorido-kit-quadros-decorativos.jpg',3,230,'2022-07-19 22:00:00',3,7,17,'2022-07-18 08:07:11','2022-07-18 08:34:25'),(12,'Uma chávena simples com o seguinte texto: \"Deus é amor\"','...',1,800,'2022-07-19 22:00:00',1,7,18,'2022-07-18 08:08:15','2022-07-18 08:28:41'),(13,'Uma chávena simples','...',0,0,'2022-07-20 11:12:36',1,7,18,'2022-07-20 09:12:36','2022-07-20 09:12:36'),(14,'Combo de chavena e bebedouro','...',0,0,'2022-07-20 11:13:20',1,7,19,'2022-07-20 09:13:20','2022-07-20 09:13:20'),(15,'Chávena mágica com um coração na imagem','...',0,0,'2022-07-20 13:38:42',1,7,17,'2022-07-20 11:38:42','2022-07-20 11:38:42');
/*!40000 ALTER TABLE `encomendas_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcionarios` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apelido` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bairro` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quarteirao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `casa` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataNascimento` date NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `funcionarios_user_id_foreign` (`user_id`),
  CONSTRAINT `funcionarios_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Vasco jonas','Mabui','34567876543','Maputo','Laulane','76','56','M','846078485','846078485','vascojonas.j@gmail.com','2000-02-29',1,'2022-07-08 09:27:09','2022-07-08 09:27:09'),(2,'Neide','Hambucane','1234567','maputo','Maputo','1','37','F','861184222','861184222','neidehambucane@gmail.com','1996-12-07',4,'2022-07-11 10:59:36','2022-07-11 10:59:36'),(3,'Jussara','Mucai','787868868888','Matola','Matola','27','33','F','841184829','841184829','jussaramucai@gmail.com','1991-02-08',5,'2022-07-11 11:03:50','2022-07-11 11:03:50');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guests` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2022_06_17_143935_create_produtos_table',1),(6,'2022_06_19_145838_create_funcionarios_table',1),(7,'2022_06_19_215421_create_roles_table',1),(8,'2022_07_03_121511_create_clientes_table',1),(9,'2022_07_07_131453_create_publicidades_table',1),(24,'2022_07_10_100215_create_carrinhos_table',2),(25,'2022_07_10_100314_create_wishes_table',2),(26,'2022_07_10_100626_create_guests_table',2),(27,'2022_07_10_100741_create_encomendas_table',2),(28,'2022_07_10_115258_create_carrinho_produto_table',2),(30,'2022_07_10_115514_create_encomenda_produto_table',2),(32,'2022_07_11_074309_create_encomendas_itens_table',3),(34,'2022_07_16_204020_create_produto_wish_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_wish`
--

DROP TABLE IF EXISTS `produto_wish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto_wish` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `wish_id` int(10) unsigned NOT NULL,
  `produto_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_wish`
--

LOCK TABLES `produto_wish` WRITE;
/*!40000 ALTER TABLE `produto_wish` DISABLE KEYS */;
INSERT INTO `produto_wish` VALUES (2,1,18,NULL,NULL),(3,1,16,NULL,NULL),(4,1,19,NULL,NULL),(6,2,17,NULL,NULL),(7,2,18,NULL,NULL),(9,2,19,NULL,NULL);
/*!40000 ALTER TABLE `produto_wish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produtos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `categoria` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantidade` int(11) NOT NULL DEFAULT 1,
  `preco` double NOT NULL,
  `imagem` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (16,'chavena','Chávena','Uma chávena simples com a inicial de um nome',1,800,'/storage/uploads/1657545013_WhatsApp Image 2022-07-07 at 11.58.14 AM.jpeg','2022-07-11 11:10:13','2022-07-12 22:01:05'),(17,'chavena','Chávena mágica','Chávena mágica preta que ao colocar  água quente fica branca',1,230,'/storage/uploads/1657545094_WhatsApp Image 2022-07-08 at 7.57.48 AM.jpeg','2022-07-11 11:11:34','2022-07-12 22:05:17'),(18,'chavena','Chávena normal','Chavena branca com uma escrita simples',1,800,'/storage/uploads/1657545252_WhatsApp Image 2022-07-08 at 7.58.05 AM.jpeg','2022-07-11 11:14:12','2022-07-12 21:35:15'),(19,'chavena','Combo','Uma chávena e um bebedouro',56,1700,'/storage/uploads/1657547196_WhatsApp Image 2022-07-08 at 8.04.19 AM.jpeg','2022-07-11 11:46:36','2022-07-12 21:51:29'),(20,'quadros','Almofada','Almofada personalizada ao seu estilo',10,1500,'/storage/uploads/1657547386_WhatsApp Image 2022-07-08 at 8.08.31 AM.jpeg','2022-07-11 11:49:46','2022-07-12 21:57:26'),(22,'quadro','Pedra','Pedra 20X20 cm',1,1500,'/storage/uploads/1657547891_WhatsApp Image 2022-07-08 at 8.08.10 AM.jpeg','2022-07-11 11:58:11','2022-07-12 21:56:22'),(23,'chaveiro','Chaveiro','Chaveiro incluindo fotos',1,230,'/storage/uploads/1657548061_WhatsApp Image 2022-07-08 at 8.10.15 AM(1).jpeg','2022-07-11 12:01:01','2022-07-12 22:46:58'),(24,'chaveiro','Chaveiro','chaveiro com  formato oval, retangular e redondo',1,450,'/storage/uploads/1657548192_WhatsApp Image 2022-07-08 at 8.10.15 AM.jpeg','2022-07-11 12:03:12','2022-07-12 21:58:27'),(26,'popsocket','Popsocket','Popsocket preto e branco',1,300,'/storage/uploads/1657669535_WhatsApp Image 2022-07-08 at 8.00.51 AM.jpeg','2022-07-12 21:45:35','2022-07-12 21:45:35'),(27,'bebedouro','Bebedouro','Bebedouro  branco com capacidade de 350ml',1,1200,'/storage/uploads/1657669655_WhatsApp Image 2022-07-08 at 8.01.24 AM.jpeg','2022-07-12 21:47:35','2022-07-12 21:47:35'),(29,'chavena','Combo','Chávena e bebedouro com detalhes rosados',1,1650,'/storage/uploads/1657669969_WhatsApp Image 2022-07-08 at 8.04.20 AM.jpeg','2022-07-12 21:52:50','2022-07-12 21:52:50'),(31,'quadro','Pedra','Quadro com 20X20 cm',1,1500,'/storage/uploads/1657670139_WhatsApp Image 2022-07-08 at 8.07.45 AM.jpeg','2022-07-12 21:55:40','2022-07-12 21:55:40'),(32,'quadro','Pedra','Um quadro 15X20cm',1,1200,'/storage/uploads/1658137778_WhatsApp Image 2022-07-18 at 11.46.47 AM.jpeg','2022-07-18 07:49:38','2022-07-18 07:49:38');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicidades`
--

DROP TABLE IF EXISTS `publicidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicidades` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `descricao` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `imagem` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicidades`
--

LOCK TABLES `publicidades` WRITE;
/*!40000 ALTER TABLE `publicidades` DISABLE KEYS */;
INSERT INTO `publicidades` VALUES (8,'Banner','Banner','/storage/uploads/1658314644_WhatsApp Image 2022-07-18 at 5.55.10 PM(1).jpeg','2022-07-20 08:57:24','2022-07-20 08:57:24');
/*!40000 ALTER TABLE `publicidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roles_user_id_foreign` (`user_id`),
  CONSTRAINT `roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',1,'2022-07-08 09:27:09','2022-07-08 09:27:09'),(2,'user',2,'2022-07-10 09:24:00','2022-07-10 09:24:00'),(4,'admin',4,'2022-07-11 10:59:36','2022-07-11 10:59:36'),(5,'editor',5,'2022-07-11 11:03:50','2022-07-11 11:03:50'),(6,'user',6,'2022-07-13 07:24:04','2022-07-13 07:24:04'),(7,'user',7,'2022-07-18 08:00:48','2022-07-18 08:00:48');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vascojonas','vascojonas.j@gmail.com',NULL,'$2y$10$J91zH2DkzUspIZxjHIMG7uT0mTLE2Yn8EXDdrhhq0OiEQwqBDd7ae',NULL,'2022-07-08 09:27:09','2022-07-08 09:27:09'),(2,'vania','vania@gmail.com',NULL,'$2y$10$EA.1WIuhSr5AaMoCOZc6vOZAKp5Hd6BJIVZN4GpgtFN6j0e4ZYuG2',NULL,'2022-07-10 09:24:00','2022-07-10 09:24:00'),(4,'Neide','neidehambucane@gmail.com',NULL,'$2y$10$Qvz7HlJwIsR5Rm90SLvxTuo20RwuECbKGmQhLfpcUqr.rvhfckL/y',NULL,'2022-07-11 10:59:36','2022-07-11 10:59:36'),(5,'Juu','jussaramucai@gmail.com',NULL,'$2y$10$89.CKeJZRlW4wabASjZqXuaH4e0KT3M76Yf.fve.yLzXyUghJqBli',NULL,'2022-07-11 11:03:50','2022-07-11 11:03:50'),(6,'katarina','katarina@gmail.com',NULL,'$2y$10$o7LkFzUYW0J1gZ4v3bYAx.nhnV1V2u7jwdf8KTab/WPvh1ontJuqm',NULL,'2022-07-13 07:24:04','2022-07-13 07:24:04'),(7,'gilbertomugabe','gilberto@gmail.com',NULL,'$2y$10$wu04pS.wmuMKK5jYqVBMluVX0J/gKbucoXsaUk2QM1E4eU7Dna8Rm',NULL,'2022-07-18 08:00:48','2022-07-18 08:00:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishes`
--

DROP TABLE IF EXISTS `wishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishes_cliente_id_foreign` (`cliente_id`),
  CONSTRAINT `wishes_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishes`
--

LOCK TABLES `wishes` WRITE;
/*!40000 ALTER TABLE `wishes` DISABLE KEYS */;
INSERT INTO `wishes` VALUES (1,1,'2022-07-16 18:24:44','2022-07-16 18:24:44'),(2,4,'2022-07-18 08:01:29','2022-07-18 08:01:29');
/*!40000 ALTER TABLE `wishes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-19  1:55:44
