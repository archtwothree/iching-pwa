let currentQuestion = '';
let currentLines = [];
let currentResult = null;
let realCoinMode = false;

const $ = id => document.getElementById(id);
const screens = ['question-screen','casting-screen','result-screen','history-screen'];
function show(id) { screens.forEach(s => $(s).classList.toggle('active', s === id)); window.scrollTo({top:0, behavior:'smooth'}); }

$('question').addEventListener('input', e => $('char-count').textContent = e.target.value.length);
$('start-cast').addEventListener('click', () => beginCast(false));
$('real-coins').addEventListener('click', () => beginCast(true));
$('throw-btn').addEventListener('click', doThrow);
$('back-home').addEventListener('click', () => show('question-screen'));
$('new-reading').addEventListener('click', () => { $('question').value=''; $('char-count').textContent='0'; show('question-screen'); });
$('save-reading').addEventListener('click', () => {
  if (!currentResult) return;
  saveReading({ id: Date.now(), date: new Date().toISOString(), question: currentQuestion,
    lines: currentResult.lines, primaryNumber: currentResult.primaryNumber,
    relatingNumber: currentResult.relatingNumber, changing: currentResult.changing });
  $('save-reading').textContent = '✓ SAVED'; $('save-reading').disabled = true;
});
$('history-home').addEventListener('click', renderHistory);
$('history-back').addEventListener('click', () => show('question-screen'));

function beginCast(real) {
  currentQuestion = $('question').value.trim();
  if (!currentQuestion) { $('question').focus(); $('question').classList.add('shake'); setTimeout(() => $('question').classList.remove('shake'), 500); return; }
  realCoinMode = real; currentLines = []; currentResult = null;
  $('throw-btn').textContent = real ? 'ENTER THROW 1' : 'THROW COINS';
  $('coin-result').textContent = real ? 'Enter the three coin faces after your physical throw.' : '';
  renderBuilder(); show('casting-screen');
}

function doThrow() {
  const idx = currentLines.length;
  let result;
  if (realCoinMode) {
    const input = prompt('Enter the three coin values as H or T, e.g. HTH');
    if (!input) return;
    const s = input.trim().toUpperCase().replace(/[^HT]/g,'');
    if (s.length !== 3) { alert('Please enter exactly three H/T results.'); return; }
    const coins = [...s].map(x => x === 'H' ? 3 : 2);
    result = {coins, total: coins.reduce((a,b)=>a+b,0)};
  } else result = throwThreeCoins();

  currentLines.push(result.total);
  const coinFaces = result.coins.map(v => v === 3 ? 'HEAD' : 'TAIL').join(' • ');
  $('coin-result').textContent = `${coinFaces}   •   ${result.total}`;
  renderBuilder();
  if (currentLines.length === 6) {
    currentResult = getCastResult(currentLines);
    $('throw-btn').textContent = 'VIEW CAST';
    $('throw-btn').onclick = showResult;
  } else {
    $('throw-btn').textContent = realCoinMode ? `ENTER THROW ${currentLines.length + 1}` : `THROW ${currentLines.length + 1}`;
  }
}

function renderBuilder() {
  $('throw-count').textContent = currentLines.length < 6 ? `THROW ${currentLines.length + 1} OF 6` : 'CAST COMPLETE';
  const rows = [];
  for (let i=5;i>=0;i--) {
    const value = currentLines[i];
    rows.push(`<div class="line-row"><span class="line-number">${i+1}</span><div class="line ${value ? lineKind(value) : 'empty'}">${value && (value===8||value===6) ? '<i></i><i></i>' : ''}</div></div>`);
  }
  $('hexagram-builder').innerHTML = rows.join('');
}

function lineHTML(value, big=false) {
  const kind = lineKind(value);
  const cls = big ? `line ${kind} big` : `line ${kind}`;
  return `<div class="${cls}">${(value===8||value===6) ? '<i></i><i></i>' : ''}</div>`;
}

function showResult() {
  const p = HEXAGRAMS[currentResult.primaryNumber];
  const r = HEXAGRAMS[currentResult.relatingNumber];
  $('result-question').textContent = currentQuestion;
  $('primary-symbol').textContent = p.symbol;
  $('primary-number').textContent = `HEXAGRAM ${currentResult.primaryNumber}`;
  $('primary-name').textContent = p.name;
  $('primary-lines').innerHTML = currentResult.lines.slice().reverse().map(v=>lineHTML(v,true)).join('');
  $('changing-card').innerHTML = currentResult.changing.length
    ? `<strong>CHANGING LINES</strong><p>${currentResult.changing.map(n=>`Line ${n}`).join(' • ')}</p><small>Red lines are changing lines in this cast.</small>`
    : `<strong>NO CHANGING LINES</strong><p>This is a stable cast. The primary hexagram remains the focus.</p>`;
  $('relating-card').innerHTML = `<div class="hex-symbol">${r.symbol}</div><div class="hex-number">RELATING HEXAGRAM ${currentResult.relatingNumber}</div><h2>${r.name}</h2><div class="large-lines">${currentResult.relatingLines.slice().reverse().map(v=>lineHTML(v,true)).join('')}</div>`;
  $('save-reading').textContent = 'SAVE READING'; $('save-reading').disabled = false;
  show('result-screen');
}

function renderHistory() {
  const all = loadReadings();
  $('history-list').innerHTML = all.length ? all.map(x => {
    const d = new Date(x.date);
    const p = HEXAGRAMS[x.primaryNumber];
    const r = HEXAGRAMS[x.relatingNumber];
    return `<article class="history-item"><div class="history-date">${d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}</div><h3>${escapeHTML(x.question)}</h3><div class="history-cast">${p.symbol} ${x.primaryNumber} ${p.name} → ${r.number} ${r.name}</div><div class="history-changing">${x.changing.length ? 'Changing: ' + x.changing.join(', ') : 'No changing lines'}</div></article>`;
  }).join('') : '<div class="empty-history">No saved readings yet.</div>';
  show('history-screen');
}
function escapeHTML(s) { return s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(console.warn));
