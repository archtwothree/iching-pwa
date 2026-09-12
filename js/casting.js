// Traditional three-coin method: heads = 3, tails = 2.
// 6 = old yin (changing yin), 7 = young yang, 8 = young yin, 9 = old yang (changing yang).
function throwThreeCoins() {
  const coins = [0, 0, 0].map(() => Math.random() < 0.5 ? 2 : 3);
  return { coins, total: coins.reduce((a, b) => a + b, 0) };
}

function lineKind(value) {
  return value === 6 ? 'changing-yin' : value === 9 ? 'changing-yang' : value === 8 ? 'yin' : 'yang';
}

function lineBinary(value) {
  // Yin = 0, Yang = 1. The six lines are stored bottom -> top.
  return (value === 7 || value === 9) ? 1 : 0;
}

function relatingValue(value) {
  if (value === 6) return 7;
  if (value === 9) return 8;
  return value;
}

function getTrigramKey(linesBottomToTop) {
  return linesBottomToTop.map(lineBinary).join('');
}

function getHexagramNumber(linesBottomToTop) {
  const lower = getTrigramKey(linesBottomToTop.slice(0, 3));
  const upper = getTrigramKey(linesBottomToTop.slice(3, 6));
  const key = `${upper}/${lower}`;
  return HEXAGRAM_BY_TRIGRAM[key];
}

function getCastResult(lines) {
  const primaryNumber = getHexagramNumber(lines);
  const relatingLines = lines.map(relatingValue);
  const relatingNumber = getHexagramNumber(relatingLines);
  const changing = lines.map((v, i) => (v === 6 || v === 9) ? i + 1 : null).filter(Boolean);
  return { lines: [...lines], primaryNumber, relatingLines, relatingNumber, changing };
}
