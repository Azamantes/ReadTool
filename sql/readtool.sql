-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2016 at 02:11 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `readtool`
--

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(3) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `shorthand` char(2) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Stand-in structure for view `my_sentences`
--
CREATE TABLE `my_sentences` (
`userID` int(11)
,`textID` int(11)
,`textTITLE` varchar(256)
,`textLANGUAGE` int(11)
,`sentenceID` int(11)
,`sentenceCONTENT` varchar(1000)
,`sentenceLANGUAGE` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `my_sentences_words`
--
CREATE TABLE `my_sentences_words` (
`userID` int(11)
,`textID` int(11)
,`textLANGUAGE` int(11)
,`sentenceID` int(11)
,`sentenceLANGUAGE` int(11)
,`wordID` int(11)
,`wordCONTENT` varchar(100)
,`wordLANGUAGE` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `my_texts`
--
CREATE TABLE `my_texts` (
`userID` int(11)
,`textID` int(11)
,`textTITLE` varchar(256)
,`textCONTENT` text
,`textLANGUAGE` int(11)
,`textWORDS` int(11)
,`textWORDS_UNIQUE` int(11)
,`textLENGTH` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `my_words`
--
CREATE TABLE `my_words` (
`userID` int(11)
,`wordID` int(11)
,`wordCONTENT` varchar(100)
,`wordLANGUAGE` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `phrases`
--

CREATE TABLE `phrases` (
  `id` int(11) NOT NULL,
  `content` varchar(50) COLLATE utf8_bin NOT NULL,
  `language` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `sentences`
--

CREATE TABLE `sentences` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) COLLATE utf8_bin NOT NULL,
  `language` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `sentences_phrases`
--

CREATE TABLE `sentences_phrases` (
  `sentence` int(11) NOT NULL,
  `phrase` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `sentences_words`
--

CREATE TABLE `sentences_words` (
  `sentence` int(11) NOT NULL,
  `word` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `texts`
--

CREATE TABLE `texts` (
  `id` int(11) NOT NULL,
  `title` varchar(256) COLLATE utf8_bin NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  `language` int(11) NOT NULL,
  `words` int(11) NOT NULL,
  `words_unique` int(11) NOT NULL,
  `length` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `source` varchar(999) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `texts_clean`
--

CREATE TABLE `texts_clean` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `texts_sentences`
--

CREATE TABLE `texts_sentences` (
  `text` int(11) NOT NULL,
  `sentence` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(20) COLLATE utf8_bin NOT NULL,
  `password` varchar(20) COLLATE utf8_bin NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `language_from` int(11) NOT NULL DEFAULT '2',
  `language_to` int(11) NOT NULL DEFAULT '1',
  `color1` char(6) COLLATE utf8_bin NOT NULL DEFAULT 'FFFFFF',
  `color2` char(6) COLLATE utf8_bin NOT NULL DEFAULT 'FFFFFF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users_phrases`
--

CREATE TABLE `users_phrases` (
  `user` int(11) NOT NULL,
  `phrase` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users_texts`
--

CREATE TABLE `users_texts` (
  `user` int(11) NOT NULL,
  `text` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users_words`
--

CREATE TABLE `users_words` (
  `user` int(11) NOT NULL,
  `word` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `id` int(11) NOT NULL,
  `content` varchar(100) COLLATE utf8_bin NOT NULL,
  `language` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `words_dictionary`
--

CREATE TABLE `words_dictionary` (
  `word_from` int(11) NOT NULL,
  `word_to` int(11) NOT NULL,
  `author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure for view `my_sentences`
--
DROP TABLE IF EXISTS `my_sentences`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `my_sentences`  AS  select `ut`.`user` AS `userID`,`t`.`id` AS `textID`,`t`.`title` AS `textTITLE`,`t`.`language` AS `textLANGUAGE`,`s`.`id` AS `sentenceID`,`s`.`content` AS `sentenceCONTENT`,`s`.`language` AS `sentenceLANGUAGE` from (((`sentences` `s` join `texts` `t`) join `texts_sentences` `ts`) join `users_texts` `ut`) where ((`ut`.`text` = `t`.`id`) and (`ts`.`text` = `t`.`id`) and (`ts`.`sentence` = `s`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `my_sentences_words`
--
DROP TABLE IF EXISTS `my_sentences_words`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `my_sentences_words`  AS  select `ut`.`user` AS `userID`,`t`.`id` AS `textID`,`t`.`language` AS `textLANGUAGE`,`s`.`id` AS `sentenceID`,`s`.`language` AS `sentenceLANGUAGE`,`w`.`id` AS `wordID`,`w`.`content` AS `wordCONTENT`,`w`.`language` AS `wordLANGUAGE` from (((((`sentences` `s` join `texts` `t`) join `texts_sentences` `ts`) join `users_texts` `ut`) join `sentences_words` `sw`) join `words` `w`) where ((`ut`.`text` = `t`.`id`) and (`ts`.`text` = `t`.`id`) and (`ts`.`sentence` = `s`.`id`) and (`sw`.`sentence` = `s`.`id`) and (`sw`.`word` = `w`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `my_texts`
--
DROP TABLE IF EXISTS `my_texts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `my_texts`  AS  select `ut`.`user` AS `userID`,`t`.`id` AS `textID`,`t`.`title` AS `textTITLE`,`t`.`content` AS `textCONTENT`,`t`.`language` AS `textLANGUAGE`,`t`.`words` AS `textWORDS`,`t`.`words_unique` AS `textWORDS_UNIQUE`,`t`.`length` AS `textLENGTH` from (`texts` `t` join `users_texts` `ut`) where (`t`.`id` = `ut`.`text`) ;

-- --------------------------------------------------------

--
-- Structure for view `my_words`
--
DROP TABLE IF EXISTS `my_words`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `my_words`  AS  select `uw`.`user` AS `userID`,`w`.`id` AS `wordID`,`w`.`content` AS `wordCONTENT`,`w`.`language` AS `wordLANGUAGE` from (`words` `w` join `users_words` `uw`) where (`uw`.`word` = `w`.`id`) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `shorthand_UNIQUE` (`shorthand`);

--
-- Indexes for table `phrases`
--
ALTER TABLE `phrases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `p_l_fk_idx` (`language`);

--
-- Indexes for table `sentences`
--
ALTER TABLE `sentences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `s_l_fk_idx` (`language`);

--
-- Indexes for table `sentences_phrases`
--
ALTER TABLE `sentences_phrases`
  ADD PRIMARY KEY (`sentence`,`phrase`),
  ADD KEY `sp_s_fk_idx` (`sentence`),
  ADD KEY `sp_p_fk_idx` (`phrase`);

--
-- Indexes for table `sentences_words`
--
ALTER TABLE `sentences_words`
  ADD PRIMARY KEY (`sentence`,`word`),
  ADD KEY `sw_s_fk_idx` (`sentence`),
  ADD KEY `sw_w_fk_idx` (`word`);

--
-- Indexes for table `texts`
--
ALTER TABLE `texts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_l_fk_idx` (`language`),
  ADD KEY `t_author_fk` (`author`);

--
-- Indexes for table `texts_clean`
--
ALTER TABLE `texts_clean`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `texts_sentences`
--
ALTER TABLE `texts_sentences`
  ADD PRIMARY KEY (`text`,`sentence`),
  ADD KEY `ts_t_fk_idx` (`text`),
  ADD KEY `ts_s_fk_idx` (`sentence`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login_UNIQUE` (`login`),
  ADD KEY `u_lf_fk` (`language_from`),
  ADD KEY `u_lt_fk` (`language_to`);

--
-- Indexes for table `users_phrases`
--
ALTER TABLE `users_phrases`
  ADD PRIMARY KEY (`user`,`phrase`),
  ADD KEY `up_u_fk_idx` (`user`),
  ADD KEY `up_p_fk_idx` (`phrase`);

--
-- Indexes for table `users_texts`
--
ALTER TABLE `users_texts`
  ADD PRIMARY KEY (`user`,`text`),
  ADD KEY `ut_u_fk_idx` (`user`),
  ADD KEY `ut_t_fk_idx` (`text`);

--
-- Indexes for table `users_words`
--
ALTER TABLE `users_words`
  ADD PRIMARY KEY (`user`,`word`),
  ADD KEY `uw_u_fk_idx` (`user`),
  ADD KEY `uw_w_fk_idx` (`word`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`content`,`language`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `w_l_fk_idx` (`language`);

--
-- Indexes for table `words_dictionary`
--
ALTER TABLE `words_dictionary`
  ADD PRIMARY KEY (`word_from`,`word_to`),
  ADD KEY `wd_wt_fk` (`word_to`),
  ADD KEY `wd_a_fk` (`author`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `phrases`
--
ALTER TABLE `phrases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sentences`
--
ALTER TABLE `sentences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `texts`
--
ALTER TABLE `texts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14834;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `phrases`
--
ALTER TABLE `phrases`
  ADD CONSTRAINT `p_l_fk` FOREIGN KEY (`language`) REFERENCES `languages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sentences`
--
ALTER TABLE `sentences`
  ADD CONSTRAINT `s_l_fk` FOREIGN KEY (`language`) REFERENCES `languages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sentences_phrases`
--
ALTER TABLE `sentences_phrases`
  ADD CONSTRAINT `sp_p_fk` FOREIGN KEY (`phrase`) REFERENCES `phrases` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sp_s_fk` FOREIGN KEY (`sentence`) REFERENCES `sentences` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sentences_words`
--
ALTER TABLE `sentences_words`
  ADD CONSTRAINT `sw_s_fk` FOREIGN KEY (`sentence`) REFERENCES `sentences` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sw_w_fk` FOREIGN KEY (`word`) REFERENCES `words` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `texts`
--
ALTER TABLE `texts`
  ADD CONSTRAINT `t_author_fk` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `t_l_fk` FOREIGN KEY (`language`) REFERENCES `languages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `texts_clean`
--
ALTER TABLE `texts_clean`
  ADD CONSTRAINT `texts_clean_ibfk_1` FOREIGN KEY (`id`) REFERENCES `texts` (`id`);

--
-- Constraints for table `texts_sentences`
--
ALTER TABLE `texts_sentences`
  ADD CONSTRAINT `ts_s_fk` FOREIGN KEY (`sentence`) REFERENCES `sentences` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ts_t_fk` FOREIGN KEY (`text`) REFERENCES `texts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `u_lf_fk` FOREIGN KEY (`language_from`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `u_lt_fk` FOREIGN KEY (`language_to`) REFERENCES `languages` (`id`);

--
-- Constraints for table `users_phrases`
--
ALTER TABLE `users_phrases`
  ADD CONSTRAINT `up_p_fk` FOREIGN KEY (`phrase`) REFERENCES `phrases` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `up_u_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users_texts`
--
ALTER TABLE `users_texts`
  ADD CONSTRAINT `ut_t_fk` FOREIGN KEY (`text`) REFERENCES `texts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ut_u_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users_words`
--
ALTER TABLE `users_words`
  ADD CONSTRAINT `uw_u_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `uw_w_fk` FOREIGN KEY (`word`) REFERENCES `words` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `words`
--
ALTER TABLE `words`
  ADD CONSTRAINT `w_l_fk` FOREIGN KEY (`language`) REFERENCES `languages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `words_dictionary`
--
ALTER TABLE `words_dictionary`
  ADD CONSTRAINT `wd_a_fk` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wd_wf_fk` FOREIGN KEY (`word_from`) REFERENCES `words` (`id`),
  ADD CONSTRAINT `wd_wt_fk` FOREIGN KEY (`word_to`) REFERENCES `words` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
