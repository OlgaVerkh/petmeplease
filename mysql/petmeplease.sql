-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 27 2018 г., 19:33
-- Версия сервера: 10.1.26-MariaDB
-- Версия PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `petmeplease`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ad`
--

CREATE TABLE `ad` (
  `ad_id` int(10) UNSIGNED NOT NULL,
  `ad_title` tinytext,
  `ad_createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ad_text` text,
  `ad_animal_age` varchar(10) DEFAULT NULL,
  `ad_animal_sex` varchar(10) DEFAULT NULL,
  `ad_animal_price` varchar(15) DEFAULT NULL,
  `ad_animal_kind_id` int(10) UNSIGNED DEFAULT NULL,
  `ad_animal_breed_id` int(10) UNSIGNED DEFAULT NULL,
  `ad_user_id` int(10) UNSIGNED DEFAULT NULL,
  `ad_section_id` int(10) UNSIGNED DEFAULT NULL,
  `ad_city_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ad`
--

INSERT INTO `ad` (`ad_id`, `ad_title`, `ad_createDate`, `ad_text`, `ad_animal_age`, `ad_animal_sex`, `ad_animal_price`, `ad_animal_kind_id`, `ad_animal_breed_id`, `ad_user_id`, `ad_section_id`, `ad_city_id`) VALUES
(33, 'Продам щенков', '2018-01-20 16:51:20', 'Продам ласкового красивого щенка лабрадора. Очень добрый и смышленый мальчик, отлично подойдет для хозяев с детьми.\r\nВсе прививки и документы в наличии.\r\nЩенок с родословной!', '3 месяца', '2', '15 000', 1, 9, 5, 2, 14),
(34, 'Отдам в добрые руки котенка', '2018-01-22 08:57:21', 'Отдаю в хорошие руки милого пушистого котенка. К лотку приучен, очень ласковый и добрый пушистик!', '2 мес', '2', '', 2, 31, 6, 3, 14),
(36, 'Продаю морскую свинку', '2018-01-22 09:24:42', 'Продам морскую свинку. Милый пушистый зверек.\r\nКлетка и прочие аксессуары в стоимость не входят.', '3 месяца', '1', '1000', 6, 60, 6, 2, 14),
(37, 'Отдам в хорошие руки черепаху', '2018-01-22 09:28:41', 'Отдаю свою черепашку &quot;Молнию&quot;. Чудесное создание! Только в ласковые и заботливые руки!', '5 лет', '2', '', 5, 58, 4, 3, 12),
(38, 'Продаю щенка немецкой овчарки', '2018-01-22 09:34:42', 'Продаю щенка немецкой овчарки. Игривая симпатичная девочка. Все документы в наличии, собака привита.', '3 месяца', '2', '3000', 1, 4, 4, 2, 7),
(40, 'Продам попугаев', '2018-01-27 17:55:34', 'Продаю двух попугаев с клеткой. Очень красивые и изящные птицы', '6 месяцев', '1', '3000', 3, 33, 7, 2, 3),
(41, 'Куплю сиамскую кошку!', '2018-01-22 11:23:59', 'Очень хочу купить сиамскую кошечку! Жду ваших предложений :)', 'до 3 лет', '2', '', 2, 19, 7, 1, 7);

-- --------------------------------------------------------

--
-- Структура таблицы `breed`
--

CREATE TABLE `breed` (
  `breed_id` int(10) UNSIGNED NOT NULL,
  `breed_name` varchar(70) DEFAULT NULL,
  `breed_kind_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `breed`
--

INSERT INTO `breed` (`breed_id`, `breed_name`, `breed_kind_id`) VALUES
(1, 'чау-чау', 1),
(2, 'шарпей', 1),
(3, 'французский бульдог', 1),
(4, 'немецкая овчарка', 1),
(5, 'пекинес', 1),
(6, 'тойтерьер', 1),
(7, 'джек-рассел-терьер', 1),
(8, 'хаски', 1),
(9, 'лабрадор', 1),
(10, 'золотистый ретривер', 1),
(11, 'йоркширский терьер', 1),
(12, 'ротвейлер', 1),
(13, 'доберман', 1),
(14, 'далматинец', 1),
(15, 'мастиф', 1),
(16, 'дог', 1),
(17, 'борзая', 1),
(18, 'чихуахуа', 1),
(19, 'сиамская', 2),
(20, 'бирманская', 2),
(21, 'абиссинская', 2),
(22, 'русская голубая', 2),
(23, 'британская', 2),
(24, 'шотландская', 2),
(25, 'ориентал', 2),
(26, 'сфинкс', 2),
(27, 'мейн-кун', 2),
(28, 'персидская', 2),
(29, 'бенгальская', 2),
(30, 'рэгдолл', 2),
(31, 'беспородная', 2),
(32, 'дворняжка', 1),
(33, 'попугай', 3),
(34, 'какаду', 3),
(35, 'канкрейка', 3),
(36, 'голубь', 3),
(37, 'горлица', 3),
(38, 'курица', 3),
(39, 'утка', 3),
(40, 'индейка', 3),
(41, 'гусь', 3),
(42, 'лебедь', 3),
(43, 'паук-птицеед', 4),
(44, 'паук-тарантул', 4),
(45, 'фенек', 4),
(46, 'крокодил', 4),
(47, 'капибара', 4),
(48, 'дегу', 4),
(49, 'белка', 4),
(50, 'обезьяна', 4),
(51, 'карликовый ослик', 4),
(52, 'аквариумные рыбки', 5),
(53, 'мелкая ящерица', 5),
(54, 'игуана', 5),
(55, 'удав', 5),
(56, 'уж', 5),
(57, 'крокодил', 5),
(58, 'черепаха', 5),
(59, 'хомяк', 6),
(60, 'морская свинка', 6),
(61, 'мышь', 6),
(62, 'крыса', 6),
(63, 'хорек', 6),
(64, 'еж', 4),
(65, 'песчанка', 6),
(66, 'шиншилла', 6);

-- --------------------------------------------------------

--
-- Структура таблицы `city`
--

CREATE TABLE `city` (
  `city_id` int(10) UNSIGNED NOT NULL,
  `city_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `city`
--

INSERT INTO `city` (`city_id`, `city_name`) VALUES
(1, 'Волгоград'),
(2, 'Воронеж'),
(3, 'Пермь'),
(4, 'Красноярск'),
(5, 'Уфа'),
(6, 'Ростов-на-Дону'),
(7, 'Самара'),
(8, 'Омск'),
(9, 'Челябинск'),
(10, 'Казань'),
(11, 'Нижний Новгород'),
(12, 'Екатеринбург'),
(13, 'Новосибирск'),
(14, 'Санкт-Петербург'),
(15, 'Москва');

-- --------------------------------------------------------

--
-- Структура таблицы `connect`
--

CREATE TABLE `connect` (
  `session` varchar(100) NOT NULL,
  `token` char(32) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `expire` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `connect`
--

INSERT INTO `connect` (`session`, `token`, `user_id`, `expire`) VALUES
('at95scroa4g5l6qisf5h8j0jgi', '4u9r2ub9lsnsqvsyle7c3t5g9p1t9goc', 1, '0000-00-00 00:00:00'),
('ocauotqsu75pm5l2vmq7vqqrjr', 'd8b48uyzj3ea2p85sisor2rhqvi5uu3a', 0, '0000-00-00 00:00:00'),
('ocauotqsu75pm5l2vmq7vqqrjr', 'f5yytwb0x1x7s4u05us0d8b9e02f4c0p', 2, '0000-00-00 00:00:00'),
('ocauotqsu75pm5l2vmq7vqqrjr', '7441m174fskr6kkks5to8wre0gcm3i04', 3, '0000-00-00 00:00:00'),
('ocauotqsu75pm5l2vmq7vqqrjr', 'xzllime3h828l53bi4trkcnz4e2vwr9d', 3, '0000-00-00 00:00:00'),
('ocauotqsu75pm5l2vmq7vqqrjr', '9gap8gh3blm99u6vq79aiqvgxyxpjmed', 3, '0000-00-00 00:00:00'),
('ocauotqsu75pm5l2vmq7vqqrjr', 'cj8kqe2h6ji9xcwq3orw4r8bthnntd4t', 3, '0000-00-00 00:00:00'),
('ocauotqsu75pm5l2vmq7vqqrjr', 'mwgm0r5fe7rs8ls4usay859qlub6mq66', 3, '0000-00-00 00:00:00'),
('ggjap00cl9amciejeo0t80ff9g', 'p1jbbidljur6s3yme563hi97tz0zqn86', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', 'oe514o1nzz3afvktbmp7wbndr3bsv5wk', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', 'uu08f3eknhvmhjd57zp3xkpd8ajq65la', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', '2kjrpbikuog9mfvzhn742eeawqj64ju3', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', '60807uao6tjvyom6acw6pa1yzu5xkfdp', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', 'igg5rbg44vuw5cv901zrp9bbsoqjjvxu', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', 'z6ktz36qgoq1h3ujnpit9ad20sb0201y', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', 'ogch7j654nrw1fv7kckj3pvxgc7g3wdz', 3, '0000-00-00 00:00:00'),
('5vqqhlsv81s5dh5gpvv147924q', 'ed8j0k7kpgjbewk0fw5m20mni3y5lsy1', 3, '0000-00-00 00:00:00'),
('depp6t30su40omj9ehpgaodfpb', '0cerlmn2r6o0ggefhdgekinotltwf4a2', 3, '0000-00-00 00:00:00'),
('depp6t30su40omj9ehpgaodfpb', '3k4bujjaqsnnjz1l4bb3j1fpf13qme4u', 3, '0000-00-00 00:00:00'),
('7c7k1ve1g1vnjfv24pdem5nd2l', 'wnvw1j4gnht0fi9jqin10tnj0kgxzz00', 3, '0000-00-00 00:00:00'),
('mo07r7e8sjs57io8oteeqda9cl', 'cpwgficlsifeafozkqav8bp8i0ayop9j', 3, '0000-00-00 00:00:00'),
('ai21f1sd3knmt6rfe16kvrgsig', '1w6bgszn9107n60kkoly3jh1addxusss', 4, '0000-00-00 00:00:00'),
('n927pefrdurc568gbhgt9g090t', 'xf2nd428ab18d53khgr1e3blmnw5low8', 4, '0000-00-00 00:00:00'),
('5ide075fkvlbbeq3esppv1j2kl', '0se5aubs0q4io60cppik0rc64xcr1oir', 5, '0000-00-00 00:00:00'),
('u1pf3vik7k6q1267me6ufnpnsr', 'fuwsv5xjzj8c6l9jw9gviecwlqk1lm7j', 4, '0000-00-00 00:00:00'),
('4gtcigumleicu0u5igg17c18ug', '2qkhimjd4izo69rogq0smi9fk6s7777o', 5, '0000-00-00 00:00:00'),
('0tf0ol14lq1rppdlfkvfce0q7c', 'cm7xtg23xg3y8dgwco7wqjehq96i3i0e', 6, '0000-00-00 00:00:00'),
('vm57rtkjjgufqdq1h0ic4866dk', 'ts0wc2f2nnydgydjeen4hk87cf6j8wzj', 6, '0000-00-00 00:00:00'),
('q1cnv6mdp0eh34uifi2aakupc8', 'cen4txtb3sd5wpoct93gkospv5cvy5y3', 7, '0000-00-00 00:00:00'),
('t58bghqum5lj3kngn1r9056fik', 'pe1syvdlcjjt6gxwt094ujb9sd5m9hqc', 6, '0000-00-00 00:00:00'),
('4slaekn49tqan0350haeiqu31i', 'cyk922mzr7ba6wr5rl1928zyp4yo3885', 6, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `kind`
--

CREATE TABLE `kind` (
  `kind_id` int(10) UNSIGNED NOT NULL,
  `kind_name` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `kind`
--

INSERT INTO `kind` (`kind_id`, `kind_name`) VALUES
(1, 'собака'),
(2, 'кошка'),
(3, 'птица'),
(4, 'экзотическое животное'),
(5, 'рыбка/рептилия'),
(6, 'грызун');

-- --------------------------------------------------------

--
-- Структура таблицы `message`
--

CREATE TABLE `message` (
  `message_id` int(10) UNSIGNED NOT NULL,
  `message_createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `message_text` mediumtext,
  `message_idUser` int(10) UNSIGNED DEFAULT NULL,
  `message_idAd` int(10) UNSIGNED DEFAULT NULL,
  `message_status` tinyint(4) DEFAULT NULL,
  `message_receiver_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `message`
--

INSERT INTO `message` (`message_id`, `message_createDate`, `message_text`, `message_idUser`, `message_idAd`, `message_status`, `message_receiver_id`) VALUES
(6, '2018-01-21 17:31:46', 'hi!', 4, NULL, 1, 5),
(7, '2018-01-21 17:31:48', 'Привет! Какие замечательные щеночки))) Очень хочу купить одного. Когда и куда подъехать, чтобы познакомиться?)', 4, 33, 1, 5),
(8, '2018-01-21 18:02:39', 'Привет, ты как?', 5, NULL, 1, 4),
(9, '2018-01-21 18:05:42', 'Привет!\nХочу такого котенка! Куда приехать?)', 5, 31, 1, 4),
(10, '2018-01-21 18:06:58', 'ляляляля', 4, 33, 1, 5),
(11, '2018-01-22 09:26:38', 'Привет! Как дела?)', 5, 31, 1, 4),
(12, '2018-01-22 09:26:39', 'Hi! How are you?', 5, 31, 1, 4),
(13, '2018-01-22 09:26:40', 'gtrgrefe', 5, 31, 1, 4),
(14, '2018-01-22 09:26:41', 'bgvbsxcz', 5, 31, 1, 4),
(15, '2018-01-22 09:26:42', 'екцмпысфау', 5, 31, 1, 4),
(16, '2018-01-22 09:26:43', 'Привет!', 5, NULL, 1, 4),
(17, '2018-01-22 09:26:44', 'gjognjsfnjes', 5, NULL, 1, 4),
(18, '2018-01-22 09:26:46', 'kflanalfhjw;aef', 5, NULL, 1, 4),
(19, '2018-01-22 09:26:46', 'bgsvsrgreg', 5, NULL, 1, 4),
(20, '2018-01-21 18:45:09', 'Hello', 4, 33, 1, 5),
(21, '2018-01-22 09:26:47', 'Hello you to! :D', 5, NULL, 1, 4),
(41, '2018-01-27 13:11:34', 'Привет! Хочу такого щеночка :)', 7, 38, 1, 4),
(43, '2018-01-22 12:51:45', 'Привет! Хотела бы купить у тебя эту замечательную зверушку :)', 7, 36, 1, 6),
(45, '2018-01-24 11:43:50', 'Привет! Это круто) когда и где встретимся?', 6, NULL, 1, 7),
(49, '2018-01-27 16:05:49', 'Привет! У меня есть знакомые, у которых как раз родились замечательные сиамские котята, 4 штуки. Интересует?) ', 4, 41, 1, 7);

-- --------------------------------------------------------

--
-- Структура таблицы `photo`
--

CREATE TABLE `photo` (
  `photo_id` int(10) UNSIGNED NOT NULL,
  `photo_link` varchar(100) DEFAULT NULL,
  `photo_ad_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `photo`
--

INSERT INTO `photo` (`photo_id`, `photo_link`, `photo_ad_id`) VALUES
(11, 'upload/5/33/labrador.jpg', 33),
(15, 'upload/5/33/labrador2.jpg', 33),
(16, 'upload/5/33/labrador3.jpg', 33),
(17, 'upload/6/34/kitten.jpg', 34),
(20, 'upload/4/37/turtle.jpg', 37),
(21, 'upload/4/37/turtle2.jpg', 37),
(22, 'upload/4/38/shephard.jpg', 38),
(23, 'upload/4/38/shephard2.jpg', 38),
(24, 'upload/4/38/shephard3.jpg', 38),
(28, 'upload/7/40/parrot2.jpg', 40),
(29, 'upload/7/41/Siamskaya-koshka.jpg', 41),
(30, 'upload/7/40/parrot.jpg', 40),
(37, 'upload/6/36/guinea_pig.jpg', 36);

-- --------------------------------------------------------

--
-- Структура таблицы `section`
--

CREATE TABLE `section` (
  `section_id` int(10) UNSIGNED NOT NULL,
  `section_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `section`
--

INSERT INTO `section` (`section_id`, `section_name`) VALUES
(1, 'купить'),
(2, 'продать'),
(3, 'отдать'),
(4, 'принять в дар'),
(5, 'потеряно'),
(6, 'найдено');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_pass` varchar(60) DEFAULT NULL,
  `user_name` varchar(30) DEFAULT NULL,
  `user_lastname` varchar(80) DEFAULT NULL,
  `user_tel` varchar(30) DEFAULT NULL,
  `user_avatar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_pass`, `user_name`, `user_lastname`, `user_tel`, `user_avatar`) VALUES
(4, 'olga.verkholantceva@mail.ru', '$2y$10$GL1Zb9CYfWpUzPB5rcnTAO0Q/VE7KTz402bKQsi0L72cUQZGMs8si', 'Ольга', 'Верхоланцева', '+7 911 748 74 21', 'upload/4/_DSC1007.jpg'),
(5, 'olafre@mail.ru', '$2y$10$yvL2jI903OepDlliQXoqHur8hDi9ONCO7tmV4CMsHJEqj0ZBjqNVm', 'Роман', 'Петров', '+7 924 456 87 54', 'upload/5/DSC_0035.JPG'),
(6, 'ivanov@mail.ru', '$2y$10$AYh41u7dnrKrHfexN9FTle.vWyOw5nzTxD3f3BcrRN/eBEAKn/sa.', 'Михаил', 'Иванов', '89345673215', 'upload/6/ivanov.jpg'),
(7, 'masha@mail.ru', '$2y$10$HSlcEx5RIGMqeOVLMYW4/uFK2JJAPD50bdn7RvQzMZKjNHbr6PydC', 'Мария', 'Сидорова', '+7 911 123 65 78', 'upload/7/girl.jpg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `ad`
--
ALTER TABLE `ad`
  ADD PRIMARY KEY (`ad_id`),
  ADD KEY `ad_animal_kind_id` (`ad_animal_kind_id`),
  ADD KEY `ad_animal_breed_id` (`ad_animal_breed_id`),
  ADD KEY `ad_user_id` (`ad_user_id`),
  ADD KEY `ad_section_id` (`ad_section_id`),
  ADD KEY `ad_city_id` (`ad_city_id`);

--
-- Индексы таблицы `breed`
--
ALTER TABLE `breed`
  ADD PRIMARY KEY (`breed_id`),
  ADD KEY `breed_kind_id` (`breed_kind_id`);

--
-- Индексы таблицы `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`);

--
-- Индексы таблицы `kind`
--
ALTER TABLE `kind`
  ADD PRIMARY KEY (`kind_id`);

--
-- Индексы таблицы `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `message_idUser` (`message_idUser`),
  ADD KEY `message_idAd` (`message_idAd`),
  ADD KEY `message_ibfk_3` (`message_receiver_id`);

--
-- Индексы таблицы `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`photo_id`),
  ADD KEY `photo_ad_id` (`photo_ad_id`);

--
-- Индексы таблицы `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`section_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `ad`
--
ALTER TABLE `ad`
  MODIFY `ad_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT для таблицы `breed`
--
ALTER TABLE `breed`
  MODIFY `breed_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT для таблицы `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `kind`
--
ALTER TABLE `kind`
  MODIFY `kind_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT для таблицы `photo`
--
ALTER TABLE `photo`
  MODIFY `photo_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `section`
--
ALTER TABLE `section`
  MODIFY `section_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `ad`
--
ALTER TABLE `ad`
  ADD CONSTRAINT `ad_ibfk_1` FOREIGN KEY (`ad_animal_kind_id`) REFERENCES `kind` (`kind_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ad_ibfk_2` FOREIGN KEY (`ad_animal_breed_id`) REFERENCES `breed` (`breed_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ad_ibfk_3` FOREIGN KEY (`ad_user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ad_ibfk_4` FOREIGN KEY (`ad_section_id`) REFERENCES `section` (`section_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ad_ibfk_5` FOREIGN KEY (`ad_city_id`) REFERENCES `city` (`city_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `breed`
--
ALTER TABLE `breed`
  ADD CONSTRAINT `breed_ibfk_1` FOREIGN KEY (`breed_kind_id`) REFERENCES `kind` (`kind_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`message_idUser`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`message_idUser`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `message_ibfk_3` FOREIGN KEY (`message_receiver_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`photo_ad_id`) REFERENCES `ad` (`ad_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
