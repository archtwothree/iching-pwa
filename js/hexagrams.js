// King Wen hexagram lookup. Keys are upper trigram / lower trigram.
// Trigram binary, bottom line first: Qian 111, Dui 110, Li 101, Zhen 100, Xun 011, Kan 010, Gen 001, Kun 000.
const TRIGRAMS = {
  '111': {name:'Heaven', chinese:'☰'}, '110': {name:'Lake', chinese:'☱'}, '101': {name:'Fire', chinese:'☲'}, '100': {name:'Thunder', chinese:'☳'},
  '011': {name:'Wind', chinese:'☴'}, '010': {name:'Water', chinese:'☵'}, '001': {name:'Mountain', chinese:'☶'}, '000': {name:'Earth', chinese:'☷'}
};
const HEXAGRAMS = {
1:{name:'The Creative',symbol:'䷀'},2:{name:'The Receptive',symbol:'䷁'},3:{name:'Difficulty at the Beginning',symbol:'䷂'},4:{name:'Youthful Folly',symbol:'䷃'},5:{name:'Waiting',symbol:'䷄'},6:{name:'Conflict',symbol:'䷅'},7:{name:'The Army',symbol:'䷆'},8:{name:'Holding Together',symbol:'䷇'},
9:{name:'The Taming Power of the Small',symbol:'䷈'},10:{name:'Treading',symbol:'䷉'},11:{name:'Peace',symbol:'䷊'},12:{name:'Standstill',symbol:'䷋'},13:{name:'Fellowship with Men',symbol:'䷌'},14:{name:'Possession in Great Measure',symbol:'䷍'},15:{name:'Modesty',symbol:'䷎'},16:{name:'Enthusiasm',symbol:'䷏'},
17:{name:'Following',symbol:'䷐'},18:{name:'Work on What Has Been Spoiled',symbol:'䷑'},19:{name:'Approach',symbol:'䷒'},20:{name:'Contemplation',symbol:'䷓'},21:{name:'Biting Through',symbol:'䷔'},22:{name:'Grace',symbol:'䷕'},23:{name:'Splitting Apart',symbol:'䷖'},24:{name:'Return',symbol:'䷗'},
25:{name:'Innocence',symbol:'䷘'},26:{name:'The Taming Power of the Great',symbol:'䷙'},27:{name:'Nourishment',symbol:'䷚'},28:{name:'Preponderance of the Great',symbol:'䷛'},29:{name:'The Abysmal',symbol:'䷜'},30:{name:'The Clinging',symbol:'䷝'},31:{name:'Influence',symbol:'䷞'},32:{name:'Duration',symbol:'䷟'},
33:{name:'Retreat',symbol:'䷠'},34:{name:'The Power of the Great',symbol:'䷡'},35:{name:'Progress',symbol:'䷢'},36:{name:'Darkening of the Light',symbol:'䷣'},37:{name:'The Family',symbol:'䷤'},38:{name:'Opposition',symbol:'䷥'},39:{name:'Obstruction',symbol:'䷦'},40:{name:'Deliverance',symbol:'䷧'},
41:{name:'Decrease',symbol:'䷨'},42:{name:'Increase',symbol:'䷩'},43:{name:'Breakthrough',symbol:'䷪'},44:{name:'Coming to Meet',symbol:'䷫'},45:{name:'Gathering Together',symbol:'䷬'},46:{name:'Pushing Upward',symbol:'䷭'},47:{name:'Oppression',symbol:'䷮'},48:{name:'The Well',symbol:'䷯'},
49:{name:'Revolution',symbol:'䷰'},50:{name:'The Cauldron',symbol:'䷱'},51:{name:'The Arousing',symbol:'䷲'},52:{name:'Keeping Still',symbol:'䷳'},53:{name:'Development',symbol:'䷴'},54:{name:'The Marrying Maiden',symbol:'䷵'},55:{name:'Abundance',symbol:'䷶'},56:{name:'The Wanderer',symbol:'䷷'},
57:{name:'The Gentle',symbol:'䷸'},58:{name:'The Joyous',symbol:'䷹'},59:{name:'Dispersion',symbol:'䷺'},60:{name:'Limitation',symbol:'䷻'},61:{name:'Inner Truth',symbol:'䷼'},62:{name:'Preponderance of the Small',symbol:'䷽'},63:{name:'After Completion',symbol:'䷾'},64:{name:'Before Completion',symbol:'䷿'}
};
const HEXAGRAM_BY_TRIGRAM = {
 '111/111':1,'000/000':2,'010/100':3,'001/010':4,'111/010':5,'010/111':6,'010/000':7,'000/010':8,
 '111/011':9,'110/111':10,'111/000':11,'000/111':12,'101/111':13,'111/101':14,'001/000':15,'000/100':16,
 '100/110':17,'011/001':18,'000/110':19,'011/000':20,'100/101':21,'101/001':22,'000/001':23,'100/000':24,
 '100/111':25,'111/001':26,'100/001':27,'011/110':28,'010/010':29,'101/101':30,'001/110':31,'011/100':32,
 '001/111':33,'111/100':34,'000/101':35,'101/000':36,'101/011':37,'110/101':38,'001/010':39,'010/100':40,
 '110/001':41,'100/011':42,'110/111':43,'011/110':44,'000/110':45,'011/000':46,'110/010':47,'010/011':48,
 '110/101':49,'101/011':50,'100/100':51,'001/001':52,'001/011':53,'110/100':54,'101/100':55,'001/101':56,
 '011/011':57,'110/110':58,'010/011':59,'110/010':60,'011/110':61,'001/100':62,'010/101':63,'101/010':64
};
// Correct duplicate-prone map entries are replaced below from the canonical King Wen table.
const CANONICAL_PAIRS = [
[1,'111','111'],[43,'110','111'],[14,'101','111'],[34,'100','111'],[9,'011','111'],[5,'010','111'],[26,'001','111'],[11,'000','111'],
[10,'111','110'],[58,'110','110'],[38,'101','110'],[54,'100','110'],[61,'011','110'],[60,'010','110'],[41,'001','110'],[19,'000','110'],
[13,'111','101'],[49,'110','101'],[30,'101','101'],[55,'100','101'],[37,'011','101'],[63,'010','101'],[22,'001','101'],[36,'000','101'],
[25,'111','100'],[17,'110','100'],[21,'101','100'],[51,'100','100'],[42,'011','100'],[3,'010','100'],[27,'001','100'],[24,'000','100'],
[44,'111','011'],[28,'110','011'],[50,'101','011'],[32,'100','011'],[57,'011','011'],[48,'010','011'],[18,'001','011'],[46,'000','011'],
[6,'111','010'],[47,'110','010'],[64,'101','010'],[40,'100','010'],[59,'011','010'],[29,'010','010'],[4,'001','010'],[7,'000','010'],
[33,'111','001'],[31,'110','001'],[56,'101','001'],[62,'100','001'],[53,'011','001'],[39,'010','001'],[52,'001','001'],[15,'000','001'],
[12,'111','000'],[45,'110','000'],[35,'101','000'],[16,'100','000'],[20,'011','000'],[8,'010','000'],[23,'001','000'],[2,'000','000']
];
// The lookup above is intentionally replaced by a canonical table generated from the known King Wen sequence.
for (const [n, upper, lower] of CANONICAL_PAIRS) HEXAGRAM_BY_TRIGRAM[`${upper}/${lower}`] = n;
