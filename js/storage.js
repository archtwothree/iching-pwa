const HISTORY_KEY = 'iching-readings-v1';
function loadReadings() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}
function saveReading(reading) {
  const all = loadReadings();
  all.unshift(reading);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(all.slice(0, 200)));
}
