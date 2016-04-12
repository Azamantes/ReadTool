-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2016 at 12:40 AM
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

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `shorthand`) VALUES
(1, 'Polski', 'PL'),
(2, 'English', 'EN'),
(3, 'Português', 'PT'),
(4, 'Ελληνικά', 'EL');

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

--
-- Dumping data for table `texts`
--

INSERT INTO `texts` (`id`, `title`, `content`, `language`, `words`, `words_unique`, `length`, `author`, `source`) VALUES
(15, 'Apple', 'Greek mythology\nHeracles with the apple of Hesperides\n\nApples appear in many religious traditions, often as a mystical or forbidden fruit. One of the problems identifying apples in religion, mythology and folktales is that the word "apple" was used as a generic term for all (foreign) fruit, other than berries, including nuts, as late as the 17th century.[27] For instance, in Greek mythology, the Greek hero Heracles, as a part of his Twelve Labours, was required to travel to the Garden of the Hesperides and pick the golden apples off the Tree of Life growing at its center.[28][29][30]\n\nThe Greek goddess of discord, Eris, became disgruntled after she was excluded from the wedding of Peleus and Thetis.[31] In retaliation, she tossed a golden apple inscribed Καλλίστη (Kalliste, sometimes transliterated Kallisti, ''For the most beautiful one''), into the wedding party. Three goddesses claimed the apple: Hera, Athena, and Aphrodite. Paris of Troy was appointed to select the recipient. After being bribed by both Hera and Athena, Aphrodite tempted him with the most beautiful woman in the world, Helen of Sparta. He awarded the apple to Aphrodite, thus indirectly causing the Trojan War.\n\nThe apple was thus considered, in ancient Greece, to be sacred to Aphrodite, and to throw an apple at someone was to symbolically declare one''s love; and similarly, to catch it was to symbolically show one''s acceptance of that love.[32] An epigram claiming authorship by Plato states:\n\n    I throw the apple at you, and if you are willing to love me, take it and share your girlhood with me; but if your thoughts are what I pray they are not, even then take it, and consider how short-lived is beauty.\n    — Plato, Epigram VII[33]\n\nAtalanta, also of Greek mythology, raced all her suitors in an attempt to avoid marriage. She outran all but Hippomenes (also known as Melanion, a name possibly derived from melon the Greek word for both "apple" and fruit in general),[29] who defeated her by cunning, not speed. Hippomenes knew that he could not win in a fair race, so he used three golden apples (gifts of Aphrodite, the goddess of love) to distract Atalanta. It took all three apples and all of his speed, but Hippomenes was finally successful, winning the race and Atalanta''s hand.[28]\nChristian art\nAdam and Eve by Albrecht Dürer (1507), showcasing the apple as a symbol of sin.\n\nThough the forbidden fruit of Eden in the Book of Genesis is not identified, popular Christian tradition has held that it was an apple that Eve coaxed Adam to share with her.[34] The origin of the popular identification with a fruit unknown in the Middle East in biblical times is found in confusion between the Latin words mālum (an apple) and mălum (an evil), each of which is normally written malum.[35] The tree of the forbidden fruit is called "the tree of the knowledge of good and evil" in Genesis 2:17, and the Latin for "good and evil" is bonum et malum.[36]\n\nRenaissance painters may also have been influenced by the story of the golden apples in the Garden of Hesperides. As a result, in the story of Adam and Eve, the apple became a symbol for knowledge, immortality, temptation, the fall of man into sin, and sin itself. The larynx in the human throat has been called Adam''s apple because of a notion that it was caused by the forbidden fruit remaining in the throat of Adam.[34] The apple as symbol of sexual seduction has been used to imply human sexuality, possibly in an ironic vein.[34]\nCultivars\nMain article: List of apple cultivars\nRed and green apples in India\n\nThere are more than 7,500 known cultivars of apples.[37] Cultivars vary in their yield and the ultimate size of the tree, even when grown on the same rootstock.[38] Different cultivars are available for temperate and subtropical climates. The UK''s National Fruit Collection, which is the responsibility of the Department of Environment Food and Rural Affairs, includes a collection of over 2,000 varieties of apple tree in Kent.[39] The University of Reading, which is responsible for developing the UK national collection database, provides access to search the national collection. The University of Reading''s work is part of the European Cooperative Programme for Plant Genetic Resources of which there are 38 countries participating in the Malus/Pyrus work group.[40]\n\nThe UK''s national fruit collection database contains a wealth of information on the characteristics and origin of many apples, including alternative names for what is essentially the same ''genetic'' apple variety. Most of these cultivars are bred for eating fresh (dessert apples), though some are cultivated specifically for cooking (cooking apples) or producing cider. Cider apples are typically too tart and astringent to eat fresh, but they give the beverage a rich flavor that dessert apples cannot.[41]\n\nCommercially popular apple cultivars are soft but crisp. Other desired qualities in modern commercial apple breeding are a colorful skin, absence of russeting, ease of shipping, lengthy storage ability, high yields, disease resistance, common apple shape, and developed flavor.[38] Modern apples are generally sweeter than older cultivars, as popular tastes in apples have varied over time. Most North Americans and Europeans favor sweet, subacid apples, but tart apples have a strong minority following.[42] Extremely sweet apples with barely any acid flavor are popular in Asia[42] and especially Indian Subcontinent .[41]\n\nOld cultivars are often oddly shaped, russeted, and have a variety of textures and colors. Some find them to have a better flavor than modern cultivars,[43] but they may have other problems which make them commercially unviable from low yield, disease susceptibility, poor tolerance for storage or transport, or just being the ''wrong'' size. A few old cultivars are still produced on a large scale, but many have been preserved by home gardeners and farmers that sell directly to local markets. Many unusual and locally important cultivars with their own unique taste and appearance exist; apple conservation campaigns have sprung up around the world to preserve such local cultivars from extinction. In the United Kingdom, old cultivars such as ''Cox''s Orange Pippin'' and ''Egremont Russet'' are still commercially important even though by modern standards they are low yielding and susceptible to disease.[5]\nCultivation\nBreeding\nSee also: Fruit tree propagation and Malling series\nAn apple tree in Germany\n\nIn the wild, apples grow readily from seeds. However, like most perennial fruits, apples are ordinarily propagated asexually by grafting. This is because seedling apples are an example of "extreme heterozygotes", in that rather than inheriting DNA from their parents to create a new apple with those characteristics, they are instead significantly different from their parents.[44] Triploid varieties have an additional reproductive barrier in that 3 sets of chromosomes cannot be divided evenly during meiosis, yielding unequal segregation of the chromosomes (aneuploids). Even in the case when a triploid plant can produce a seed (apples are an example), it occurs infrequently, and seedlings rarely survive.[45]\n\nBecause apples do not breed true when planted as seeds, grafting is generally used to produce new apple trees. The rootstock used for the bottom of the graft can be selected to produce trees of a large variety of sizes, as well as changing the winter hardiness, insect and disease resistance, and soil preference of the resulting tree. Dwarf rootstocks can be used to produce very small trees (less than 3.0 m (10 ft) high at maturity), which bear fruit earlier in their life cycle than full size trees.[46] Dwarf rootstocks for apple trees can be traced as far back as 300 BC, to the area of Persia and Asia Minor. Alexander the Great sent samples of dwarf apple trees to Aristotle''s Lyceum. Dwarf rootstocks became common by the 15th century, and later went through several cycles of popularity and decline throughout the world.[47] The majority of the rootstocks used today to control size in apples were developed in England in the early 1900s. The East Malling Research Station conducted extensive research into rootstocks, and today their rootstocks are given an "M" prefix to designate their origin. Rootstocks marked with an "MM" prefix are Malling-series varieties later crossed with trees of the Northern Spy variety in Merton, England.[48]\n\nMost new apple cultivars originate as seedlings, which either arise by chance or are bred by deliberately crossing cultivars with promising characteristics.[49] The words ''seedling'', ''pippin'', and ''kernel'' in the name of an apple cultivar suggest that it originated as a seedling. Apples can also form bud sports (mutations on a single branch). Some bud sports turn out to be improved strains of the parent cultivar. Some differ sufficiently from the parent tree to be considered new cultivars.[50]\n\nSince the 1930s, the Excelsior Experiment Station at the University of Minnesota has introduced a steady progression of important apples that are widely grown, both commercially and by local orchardists, throughout Minnesota and Wisconsin. Its most important contributions have included ''Haralson'' (which is the most widely cultivated apple in Minnesota), ''Wealthy'', ''Honeygold'', and ''Honeycrisp''.\n\nApples have been acclimatized in Ecuador at very high altitudes, where they provide crops twice per year because of constant temperate conditions year-round.[51]', 2, 1494, 646, 9076, 1, 'https://en.wikipedia.org/wiki/Apple');

-- --------------------------------------------------------

--
-- Table structure for table `texts_clean`
--

CREATE TABLE `texts_clean` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `texts_clean`
--

INSERT INTO `texts_clean` (`id`, `content`) VALUES
(15, 'greek mythology\nheracles with the apple of hesperides\n\napples appear in many religious traditions often as a mystical or forbidden fruit one of the problems identifying apples in religion mythology and folktales is that the word apple was used as a generic term for all foreign fruit other than berries including nuts as late as the th century for instance in greek mythology the greek hero heracles as a part of his twelve labours was required to travel to the garden of the hesperides and pick the golden apples off the tree of life growing at its center \n\nthe greek goddess of discord eris became disgruntled after she was excluded from the wedding of peleus and thetis in retaliation she tossed a golden apple inscribed καλλίστη kalliste sometimes transliterated kallisti for the most beautiful one into the wedding party three goddesses claimed the apple hera athena and aphrodite paris of troy was appointed to select the recipient after being bribed by both hera and athena aphrodite tempted him with the most beautiful woman in the world helen of sparta he awarded the apple to aphrodite thus indirectly causing the trojan war \n\nthe apple was thus considered in ancient greece to be sacred to aphrodite and to throw an apple at someone was to symbolically declare ones love and similarly to catch it was to symbolically show ones acceptance of that love an epigram claiming authorship by plato states\n\n i throw the apple at you and if you are willing to love me take it and share your girlhood with me but if your thoughts are what i pray they are not even then take it and consider how shortlived is beauty \n  plato epigram vii\n\natalanta also of greek mythology raced all her suitors in an attempt to avoid marriage she outran all but hippomenes also known as melanion a name possibly derived from melon the greek word for both apple and fruit in general who defeated her by cunning not speed hippomenes knew that he could not win in a fair race so he used three golden apples gifts of aphrodite the goddess of love to distract atalanta it took all three apples and all of his speed but hippomenes was finally successful winning the race and atalantas hand \nchristian art\nadam and eve by albrecht dürer showcasing the apple as a symbol of sin \n\nthough the forbidden fruit of eden in the book of genesis is not identified popular christian tradition has held that it was an apple that eve coaxed adam to share with her the origin of the popular identification with a fruit unknown in the middle east in biblical times is found in confusion between the latin words mālum an apple and mălum an evil each of which is normally written malum the tree of the forbidden fruit is called the tree of the knowledge of good and evil in genesis and the latin for good and evil is bonum et malum \n\nrenaissance painters may also have been influenced by the story of the golden apples in the garden of hesperides as a result in the story of adam and eve the apple became a symbol for knowledge immortality temptation the fall of man into sin and sin itself the larynx in the human throat has been called adams apple because of a notion that it was caused by the forbidden fruit remaining in the throat of adam the apple as symbol of sexual seduction has been used to imply human sexuality possibly in an ironic vein \ncultivars\nmain article list of apple cultivars\nred and green apples in india\n\nthere are more than known cultivars of apples cultivars vary in their yield and the ultimate size of the tree even when grown on the same rootstock different cultivars are available for temperate and subtropical climates the uks national fruit collection which is the responsibility of the department of environment food and rural affairs includes a collection of over varieties of apple tree in kent the university of reading which is responsible for developing the uk national collection database provides access to search the national collection the university of readings work is part of the european cooperative programme for plant genetic resources of which there are countries participating in the maluspyrus work group \n\nthe uks national fruit collection database contains a wealth of information on the characteristics and origin of many apples including alternative names for what is essentially the same genetic apple variety most of these cultivars are bred for eating fresh dessert apples though some are cultivated specifically for cooking cooking apples or producing cider cider apples are typically too tart and astringent to eat fresh but they give the beverage a rich flavor that dessert apples cannot \n\ncommercially popular apple cultivars are soft but crisp other desired qualities in modern commercial apple breeding are a colorful skin absence of russeting ease of shipping lengthy storage ability high yields disease resistance common apple shape and developed flavor modern apples are generally sweeter than older cultivars as popular tastes in apples have varied over time most north americans and europeans favor sweet subacid apples but tart apples have a strong minority following extremely sweet apples with barely any acid flavor are popular in asia and especially indian subcontinent \n\nold cultivars are often oddly shaped russeted and have a variety of textures and colors some find them to have a better flavor than modern cultivars but they may have other problems which make them commercially unviable from low yield disease susceptibility poor tolerance for storage or transport or just being the wrong size a few old cultivars are still produced on a large scale but many have been preserved by home gardeners and farmers that sell directly to local markets many unusual and locally important cultivars with their own unique taste and appearance exist apple conservation campaigns have sprung up around the world to preserve such local cultivars from extinction in the united kingdom old cultivars such as coxs orange pippin and egremont russet are still commercially important even though by modern standards they are low yielding and susceptible to disease \ncultivation\nbreeding\nsee also fruit tree propagation and malling series\nan apple tree in germany\n\nin the wild apples grow readily from seeds however like most perennial fruits apples are ordinarily propagated asexually by grafting this is because seedling apples are an example of extreme heterozygotes in that rather than inheriting dna from their parents to create a new apple with those characteristics they are instead significantly different from their parents triploid varieties have an additional reproductive barrier in that sets of chromosomes cannot be divided evenly during meiosis yielding unequal segregation of the chromosomes aneuploids even in the case when a triploid plant can produce a seed apples are an example it occurs infrequently and seedlings rarely survive \n\nbecause apples do not breed true when planted as seeds grafting is generally used to produce new apple trees the rootstock used for the bottom of the graft can be selected to produce trees of a large variety of sizes as well as changing the winter hardiness insect and disease resistance and soil preference of the resulting tree dwarf rootstocks can be used to produce very small trees less than m ft high at maturity which bear fruit earlier in their life cycle than full size trees dwarf rootstocks for apple trees can be traced as far back as bc to the area of persia and asia minor alexander the great sent samples of dwarf apple trees to aristotles lyceum dwarf rootstocks became common by the th century and later went through several cycles of popularity and decline throughout the world the majority of the rootstocks used today to control size in apples were developed in england in the early s the east malling research station conducted extensive research into rootstocks and today their rootstocks are given an m prefix to designate their origin rootstocks marked with an mm prefix are mallingseries varieties later crossed with trees of the northern spy variety in merton england \n\nmost new apple cultivars originate as seedlings which either arise by chance or are bred by deliberately crossing cultivars with promising characteristics the words seedling pippin and kernel in the name of an apple cultivar suggest that it originated as a seedling apples can also form bud sports mutations on a single branch some bud sports turn out to be improved strains of the parent cultivar some differ sufficiently from the parent tree to be considered new cultivars \n\nsince the s the excelsior experiment station at the university of minnesota has introduced a steady progression of important apples that are widely grown both commercially and by local orchardists throughout minnesota and wisconsin its most important contributions have included haralson which is the most widely cultivated apple in minnesota wealthy honeygold and honeycrisp \n\napples have been acclimatized in ecuador at very high altitudes where they provide crops twice per year because of constant temperate conditions yearround');

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
  `status` tinyint(1) NOT NULL,
  `language_from` int(11) NOT NULL,
  `language_to` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `status`, `language_from`, `language_to`) VALUES
(1, 'Azamantes', 'aaa', 1, 2, 1);

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

--
-- Dumping data for table `users_words`
--

INSERT INTO `users_words` (`user`, `word`) VALUES
(1, 2428),
(1, 2432),
(1, 2442),
(1, 2449),
(1, 2451),
(1, 2454),
(1, 2473),
(1, 2520),
(1, 2566);

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `id` int(11) NOT NULL,
  `content` varchar(100) COLLATE utf8_bin NOT NULL,
  `language` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`id`, `content`, `language`) VALUES
(2424, 'greek', 2),
(2425, 'mythology\nheracles', 2),
(2426, 'with', 2),
(2427, 'the', 2),
(2428, 'apple', 2),
(2429, 'of', 2),
(2430, 'hesperides\n\napples', 2),
(2431, 'appear', 2),
(2432, 'in', 2),
(2433, 'many', 2),
(2434, 'religious', 2),
(2435, 'traditions', 2),
(2436, 'often', 2),
(2437, 'as', 2),
(2438, 'a', 2),
(2439, 'mystical', 2),
(2440, 'or', 2),
(2441, 'forbidden', 2),
(2442, 'fruit', 2),
(2443, 'one', 2),
(2444, 'problems', 2),
(2445, 'identifying', 2),
(2446, 'apples', 2),
(2447, 'religion', 2),
(2448, 'mythology', 2),
(2449, 'and', 2),
(2450, 'folktales', 2),
(2451, 'is', 2),
(2452, 'that', 2),
(2453, 'word', 2),
(2454, 'was', 2),
(2455, 'used', 2),
(2456, 'generic', 2),
(2457, 'term', 2),
(2458, 'for', 2),
(2459, 'all', 2),
(2460, 'foreign', 2),
(2461, 'other', 2),
(2462, 'than', 2),
(2463, 'berries', 2),
(2464, 'including', 2),
(2465, 'nuts', 2),
(2466, 'late', 2),
(2467, 'th', 2),
(2468, 'century', 2),
(2469, 'instance', 2),
(2470, 'hero', 2),
(2471, 'heracles', 2),
(2472, 'part', 2),
(2473, 'his', 2),
(2474, 'twelve', 2),
(2475, 'labours', 2),
(2476, 'required', 2),
(2477, 'to', 2),
(2478, 'travel', 2),
(2479, 'garden', 2),
(2480, 'hesperides', 2),
(2481, 'pick', 2),
(2482, 'golden', 2),
(2483, 'off', 2),
(2484, 'tree', 2),
(2485, 'life', 2),
(2486, 'growing', 2),
(2487, 'at', 2),
(2488, 'its', 2),
(2489, 'center', 2),
(2490, '\n\nthe', 2),
(2491, 'goddess', 2),
(2492, 'discord', 2),
(2493, 'eris', 2),
(2494, 'became', 2),
(2495, 'disgruntled', 2),
(2496, 'after', 2),
(2497, 'she', 2),
(2498, 'excluded', 2),
(2499, 'from', 2),
(2500, 'wedding', 2),
(2501, 'peleus', 2),
(2502, 'thetis', 2),
(2503, 'retaliation', 2),
(2504, 'tossed', 2),
(2505, 'inscribed', 2),
(2506, 'καλλίστη', 2),
(2507, 'kalliste', 2),
(2508, 'sometimes', 2),
(2509, 'transliterated', 2),
(2510, 'kallisti', 2),
(2511, 'most', 2),
(2512, 'beautiful', 2),
(2513, 'into', 2),
(2514, 'party', 2),
(2515, 'three', 2),
(2516, 'goddesses', 2),
(2517, 'claimed', 2),
(2518, 'hera', 2),
(2519, 'athena', 2),
(2520, 'aphrodite', 2),
(2521, 'paris', 2),
(2522, 'troy', 2),
(2523, 'appointed', 2),
(2524, 'select', 2),
(2525, 'recipient', 2),
(2526, 'being', 2),
(2527, 'bribed', 2),
(2528, 'by', 2),
(2529, 'both', 2),
(2530, 'tempted', 2),
(2531, 'him', 2),
(2532, 'woman', 2),
(2533, 'world', 2),
(2534, 'helen', 2),
(2535, 'sparta', 2),
(2536, 'he', 2),
(2537, 'awarded', 2),
(2538, 'thus', 2),
(2539, 'indirectly', 2),
(2540, 'causing', 2),
(2541, 'trojan', 2),
(2542, 'war', 2),
(2543, 'considered', 2),
(2544, 'ancient', 2),
(2545, 'greece', 2),
(2546, 'be', 2),
(2547, 'sacred', 2),
(2548, 'throw', 2),
(2549, 'an', 2),
(2550, 'someone', 2),
(2551, 'symbolically', 2),
(2552, 'declare', 2),
(2553, 'ones', 2),
(2554, 'love', 2),
(2555, 'similarly', 2),
(2556, 'catch', 2),
(2557, 'it', 2),
(2558, 'show', 2),
(2559, 'acceptance', 2),
(2560, 'epigram', 2),
(2561, 'claiming', 2),
(2562, 'authorship', 2),
(2563, 'plato', 2),
(2564, 'states\n\n', 2),
(2565, 'i', 2),
(2566, 'you', 2),
(2567, 'if', 2),
(2568, 'are', 2),
(2569, 'willing', 2),
(2570, 'me', 2),
(2571, 'take', 2),
(2572, 'share', 2),
(2573, 'your', 2),
(2574, 'girlhood', 2),
(2575, 'but', 2),
(2576, 'thoughts', 2),
(2577, 'what', 2),
(2578, 'pray', 2),
(2579, 'they', 2),
(2580, 'not', 2),
(2581, 'even', 2),
(2582, 'then', 2),
(2583, 'consider', 2),
(2584, 'how', 2),
(2585, 'shortlived', 2),
(2586, 'beauty', 2),
(2587, '\n', 2),
(2588, ' plato', 2),
(2589, 'vii\n\natalanta', 2),
(2590, 'also', 2),
(2591, 'raced', 2),
(2592, 'her', 2),
(2593, 'suitors', 2),
(2594, 'attempt', 2),
(2595, 'avoid', 2),
(2596, 'marriage', 2),
(2597, 'outran', 2),
(2598, 'hippomenes', 2),
(2599, 'known', 2),
(2600, 'melanion', 2),
(2601, 'name', 2),
(2602, 'possibly', 2),
(2603, 'derived', 2),
(2604, 'melon', 2),
(2605, 'general', 2),
(2606, 'who', 2),
(2607, 'defeated', 2),
(2608, 'cunning', 2),
(2609, 'speed', 2),
(2610, 'knew', 2),
(2611, 'could', 2),
(2612, 'win', 2),
(2613, 'fair', 2),
(2614, 'race', 2),
(2615, 'so', 2),
(2616, 'gifts', 2),
(2617, 'distract', 2),
(2618, 'atalanta', 2),
(2619, 'took', 2),
(2620, 'finally', 2),
(2621, 'successful', 2),
(2622, 'winning', 2),
(2623, 'atalantas', 2),
(2624, 'hand', 2),
(2625, '\nchristian', 2),
(2626, 'art\nadam', 2),
(2627, 'eve', 2),
(2628, 'albrecht', 2),
(2629, 'dürer', 2),
(2630, 'showcasing', 2),
(2631, 'symbol', 2),
(2632, 'sin', 2),
(2633, '\n\nthough', 2),
(2634, 'eden', 2),
(2635, 'book', 2),
(2636, 'genesis', 2),
(2637, 'identified', 2),
(2638, 'popular', 2),
(2639, 'christian', 2),
(2640, 'tradition', 2),
(2641, 'has', 2),
(2642, 'held', 2),
(2643, 'coaxed', 2),
(2644, 'adam', 2),
(2645, 'origin', 2),
(2646, 'identification', 2),
(2647, 'unknown', 2),
(2648, 'middle', 2),
(2649, 'east', 2),
(2650, 'biblical', 2),
(2651, 'times', 2),
(2652, 'found', 2),
(2653, 'confusion', 2),
(2654, 'between', 2),
(2655, 'latin', 2),
(2656, 'words', 2),
(2657, 'mālum', 2),
(2658, 'mălum', 2),
(2659, 'evil', 2),
(2660, 'each', 2),
(2661, 'which', 2),
(2662, 'normally', 2),
(2663, 'written', 2),
(2664, 'malum', 2),
(2665, 'called', 2),
(2666, 'knowledge', 2),
(2667, 'good', 2),
(2668, 'bonum', 2),
(2669, 'et', 2),
(2670, '\n\nrenaissance', 2),
(2671, 'painters', 2),
(2672, 'may', 2),
(2673, 'have', 2),
(2674, 'been', 2),
(2675, 'influenced', 2),
(2676, 'story', 2),
(2677, 'result', 2),
(2678, 'immortality', 2),
(2679, 'temptation', 2),
(2680, 'fall', 2),
(2681, 'man', 2),
(2682, 'itself', 2),
(2683, 'larynx', 2),
(2684, 'human', 2),
(2685, 'throat', 2),
(2686, 'adams', 2),
(2687, 'because', 2),
(2688, 'notion', 2),
(2689, 'caused', 2),
(2690, 'remaining', 2),
(2691, 'sexual', 2),
(2692, 'seduction', 2),
(2693, 'imply', 2),
(2694, 'sexuality', 2),
(2695, 'ironic', 2),
(2696, 'vein', 2),
(2697, '\ncultivars\nmain', 2),
(2698, 'article', 2),
(2699, 'list', 2),
(2700, 'cultivars\nred', 2),
(2701, 'green', 2),
(2702, 'india\n\nthere', 2),
(2703, 'more', 2),
(2704, 'cultivars', 2),
(2705, 'vary', 2),
(2706, 'their', 2),
(2707, 'yield', 2),
(2708, 'ultimate', 2),
(2709, 'size', 2),
(2710, 'when', 2),
(2711, 'grown', 2),
(2712, 'on', 2),
(2713, 'same', 2),
(2714, 'rootstock', 2),
(2715, 'different', 2),
(2716, 'available', 2),
(2717, 'temperate', 2),
(2718, 'subtropical', 2),
(2719, 'climates', 2),
(2720, 'uks', 2),
(2721, 'national', 2),
(2722, 'collection', 2),
(2723, 'responsibility', 2),
(2724, 'department', 2),
(2725, 'environment', 2),
(2726, 'food', 2),
(2727, 'rural', 2),
(2728, 'affairs', 2),
(2729, 'includes', 2),
(2730, 'over', 2),
(2731, 'varieties', 2),
(2732, 'kent', 2),
(2733, 'university', 2),
(2734, 'reading', 2),
(2735, 'responsible', 2),
(2736, 'developing', 2),
(2737, 'uk', 2),
(2738, 'database', 2),
(2739, 'provides', 2),
(2740, 'access', 2),
(2741, 'search', 2),
(2742, 'readings', 2),
(2743, 'work', 2),
(2744, 'european', 2),
(2745, 'cooperative', 2),
(2746, 'programme', 2),
(2747, 'plant', 2),
(2748, 'genetic', 2),
(2749, 'resources', 2),
(2750, 'there', 2),
(2751, 'countries', 2),
(2752, 'participating', 2),
(2753, 'maluspyrus', 2),
(2754, 'group', 2),
(2755, 'contains', 2),
(2756, 'wealth', 2),
(2757, 'information', 2),
(2758, 'characteristics', 2),
(2759, 'alternative', 2),
(2760, 'names', 2),
(2761, 'essentially', 2),
(2762, 'variety', 2),
(2763, 'these', 2),
(2764, 'bred', 2),
(2765, 'eating', 2),
(2766, 'fresh', 2),
(2767, 'dessert', 2),
(2768, 'though', 2),
(2769, 'some', 2),
(2770, 'cultivated', 2),
(2771, 'specifically', 2),
(2772, 'cooking', 2),
(2773, 'producing', 2),
(2774, 'cider', 2),
(2775, 'typically', 2),
(2776, 'too', 2),
(2777, 'tart', 2),
(2778, 'astringent', 2),
(2779, 'eat', 2),
(2780, 'give', 2),
(2781, 'beverage', 2),
(2782, 'rich', 2),
(2783, 'flavor', 2),
(2784, 'cannot', 2),
(2785, '\n\ncommercially', 2),
(2786, 'soft', 2),
(2787, 'crisp', 2),
(2788, 'desired', 2),
(2789, 'qualities', 2),
(2790, 'modern', 2),
(2791, 'commercial', 2),
(2792, 'breeding', 2),
(2793, 'colorful', 2),
(2794, 'skin', 2),
(2795, 'absence', 2),
(2796, 'russeting', 2),
(2797, 'ease', 2),
(2798, 'shipping', 2),
(2799, 'lengthy', 2),
(2800, 'storage', 2),
(2801, 'ability', 2),
(2802, 'high', 2),
(2803, 'yields', 2),
(2804, 'disease', 2),
(2805, 'resistance', 2),
(2806, 'common', 2),
(2807, 'shape', 2),
(2808, 'developed', 2),
(2809, 'generally', 2),
(2810, 'sweeter', 2),
(2811, 'older', 2),
(2812, 'tastes', 2),
(2813, 'varied', 2),
(2814, 'time', 2),
(2815, 'north', 2),
(2816, 'americans', 2),
(2817, 'europeans', 2),
(2818, 'favor', 2),
(2819, 'sweet', 2),
(2820, 'subacid', 2),
(2821, 'strong', 2),
(2822, 'minority', 2),
(2823, 'following', 2),
(2824, 'extremely', 2),
(2825, 'barely', 2),
(2826, 'any', 2),
(2827, 'acid', 2),
(2828, 'asia', 2),
(2829, 'especially', 2),
(2830, 'indian', 2),
(2831, 'subcontinent', 2),
(2832, '\n\nold', 2),
(2833, 'oddly', 2),
(2834, 'shaped', 2),
(2835, 'russeted', 2),
(2836, 'textures', 2),
(2837, 'colors', 2),
(2838, 'find', 2),
(2839, 'them', 2),
(2840, 'better', 2),
(2841, 'make', 2),
(2842, 'commercially', 2),
(2843, 'unviable', 2),
(2844, 'low', 2),
(2845, 'susceptibility', 2),
(2846, 'poor', 2),
(2847, 'tolerance', 2),
(2848, 'transport', 2),
(2849, 'just', 2),
(2850, 'wrong', 2),
(2851, 'few', 2),
(2852, 'old', 2),
(2853, 'still', 2),
(2854, 'produced', 2),
(2855, 'large', 2),
(2856, 'scale', 2),
(2857, 'preserved', 2),
(2858, 'home', 2),
(2859, 'gardeners', 2),
(2860, 'farmers', 2),
(2861, 'sell', 2),
(2862, 'directly', 2),
(2863, 'local', 2),
(2864, 'markets', 2),
(2865, 'unusual', 2),
(2866, 'locally', 2),
(2867, 'important', 2),
(2868, 'own', 2),
(2869, 'unique', 2),
(2870, 'taste', 2),
(2871, 'appearance', 2),
(2872, 'exist', 2),
(2873, 'conservation', 2),
(2874, 'campaigns', 2),
(2875, 'sprung', 2),
(2876, 'up', 2),
(2877, 'around', 2),
(2878, 'preserve', 2),
(2879, 'such', 2),
(2880, 'extinction', 2),
(2881, 'united', 2),
(2882, 'kingdom', 2),
(2883, 'coxs', 2),
(2884, 'orange', 2),
(2885, 'pippin', 2),
(2886, 'egremont', 2),
(2887, 'russet', 2),
(2888, 'standards', 2),
(2889, 'yielding', 2),
(2890, 'susceptible', 2),
(2891, '\ncultivation\nbreeding\nsee', 2),
(2892, 'propagation', 2),
(2893, 'malling', 2),
(2894, 'series\nan', 2),
(2895, 'germany\n\nin', 2),
(2896, 'wild', 2),
(2897, 'grow', 2),
(2898, 'readily', 2),
(2899, 'seeds', 2),
(2900, 'however', 2),
(2901, 'like', 2),
(2902, 'perennial', 2),
(2903, 'fruits', 2),
(2904, 'ordinarily', 2),
(2905, 'propagated', 2),
(2906, 'asexually', 2),
(2907, 'grafting', 2),
(2908, 'this', 2),
(2909, 'seedling', 2),
(2910, 'example', 2),
(2911, 'extreme', 2),
(2912, 'heterozygotes', 2),
(2913, 'rather', 2),
(2914, 'inheriting', 2),
(2915, 'dna', 2),
(2916, 'parents', 2),
(2917, 'create', 2),
(2918, 'new', 2),
(2919, 'those', 2),
(2920, 'instead', 2),
(2921, 'significantly', 2),
(2922, 'triploid', 2),
(2923, 'additional', 2),
(2924, 'reproductive', 2),
(2925, 'barrier', 2),
(2926, 'sets', 2),
(2927, 'chromosomes', 2),
(2928, 'divided', 2),
(2929, 'evenly', 2),
(2930, 'during', 2),
(2931, 'meiosis', 2),
(2932, 'unequal', 2),
(2933, 'segregation', 2),
(2934, 'aneuploids', 2),
(2935, 'case', 2),
(2936, 'can', 2),
(2937, 'produce', 2),
(2938, 'seed', 2),
(2939, 'occurs', 2),
(2940, 'infrequently', 2),
(2941, 'seedlings', 2),
(2942, 'rarely', 2),
(2943, 'survive', 2),
(2944, '\n\nbecause', 2),
(2945, 'do', 2),
(2946, 'breed', 2),
(2947, 'true', 2),
(2948, 'planted', 2),
(2949, 'trees', 2),
(2950, 'bottom', 2),
(2951, 'graft', 2),
(2952, 'selected', 2),
(2953, 'sizes', 2),
(2954, 'well', 2),
(2955, 'changing', 2),
(2956, 'winter', 2),
(2957, 'hardiness', 2),
(2958, 'insect', 2),
(2959, 'soil', 2),
(2960, 'preference', 2),
(2961, 'resulting', 2),
(2962, 'dwarf', 2),
(2963, 'rootstocks', 2),
(2964, 'very', 2),
(2965, 'small', 2),
(2966, 'less', 2),
(2967, 'm', 2),
(2968, 'ft', 2),
(2969, 'maturity', 2),
(2970, 'bear', 2),
(2971, 'earlier', 2),
(2972, 'cycle', 2),
(2973, 'full', 2),
(2974, 'traced', 2),
(2975, 'far', 2),
(2976, 'back', 2),
(2977, 'bc', 2),
(2978, 'area', 2),
(2979, 'persia', 2),
(2980, 'minor', 2),
(2981, 'alexander', 2),
(2982, 'great', 2),
(2983, 'sent', 2),
(2984, 'samples', 2),
(2985, 'aristotles', 2),
(2986, 'lyceum', 2),
(2987, 'later', 2),
(2988, 'went', 2),
(2989, 'through', 2),
(2990, 'several', 2),
(2991, 'cycles', 2),
(2992, 'popularity', 2),
(2993, 'decline', 2),
(2994, 'throughout', 2),
(2995, 'majority', 2),
(2996, 'today', 2),
(2997, 'control', 2),
(2998, 'were', 2),
(2999, 'england', 2),
(3000, 'early', 2),
(3001, 's', 2),
(3002, 'research', 2),
(3003, 'station', 2),
(3004, 'conducted', 2),
(3005, 'extensive', 2),
(3006, 'given', 2),
(3007, 'prefix', 2),
(3008, 'designate', 2),
(3009, 'marked', 2),
(3010, 'mm', 2),
(3011, 'mallingseries', 2),
(3012, 'crossed', 2),
(3013, 'northern', 2),
(3014, 'spy', 2),
(3015, 'merton', 2),
(3016, '\n\nmost', 2),
(3017, 'originate', 2),
(3018, 'either', 2),
(3019, 'arise', 2),
(3020, 'chance', 2),
(3021, 'deliberately', 2),
(3022, 'crossing', 2),
(3023, 'promising', 2),
(3024, 'kernel', 2),
(3025, 'cultivar', 2),
(3026, 'suggest', 2),
(3027, 'originated', 2),
(3028, 'form', 2),
(3029, 'bud', 2),
(3030, 'sports', 2),
(3031, 'mutations', 2),
(3032, 'single', 2),
(3033, 'branch', 2),
(3034, 'turn', 2),
(3035, 'out', 2),
(3036, 'improved', 2),
(3037, 'strains', 2),
(3038, 'parent', 2),
(3039, 'differ', 2),
(3040, 'sufficiently', 2),
(3041, '\n\nsince', 2),
(3042, 'excelsior', 2),
(3043, 'experiment', 2),
(3044, 'minnesota', 2),
(3045, 'introduced', 2),
(3046, 'steady', 2),
(3047, 'progression', 2),
(3048, 'widely', 2),
(3049, 'orchardists', 2),
(3050, 'wisconsin', 2),
(3051, 'contributions', 2),
(3052, 'included', 2),
(3053, 'haralson', 2),
(3054, 'wealthy', 2),
(3055, 'honeygold', 2),
(3056, 'honeycrisp', 2),
(3057, '\n\napples', 2),
(3058, 'acclimatized', 2),
(3059, 'ecuador', 2),
(3060, 'altitudes', 2),
(3061, 'where', 2),
(3062, 'provide', 2),
(3063, 'crops', 2),
(3064, 'twice', 2),
(3065, 'per', 2),
(3066, 'year', 2),
(3067, 'constant', 2),
(3068, 'conditions', 2),
(3069, 'yearround', 2),
(3078, 'i', 1),
(3079, 'oraz', 1),
(3080, 'jest', 1),
(3081, 'był', 1),
(3082, 'owoc', 1),
(3083, 'jego', 1),
(3084, 'w', 1),
(3085, 'jabłko', 1),
(3086, 'była', 1),
(3087, 'było', 1);

-- --------------------------------------------------------

--
-- Table structure for table `words_dictionary`
--

CREATE TABLE `words_dictionary` (
  `word_from` int(11) NOT NULL,
  `word_to` int(11) NOT NULL,
  `author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `words_dictionary`
--

INSERT INTO `words_dictionary` (`word_from`, `word_to`, `author`) VALUES
(2428, 3085, 1),
(2432, 3084, 1),
(2442, 3082, 1),
(2449, 3078, 1),
(2449, 3079, 1),
(2451, 3080, 1),
(2454, 3081, 1),
(2454, 3086, 1),
(2454, 3087, 1),
(2473, 3083, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3088;
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
