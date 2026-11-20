/* OffBy scoring, dates, and units. No DOM. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.OffByLogic = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var START = "2026-11-20";
  var MS_DAY = 86400000;

  var UNIT_CODES = {
    m: 1, km: 1, mm: 1, cm: 1, kg: 1, t: 1, g: 1, km2: 1, m2: 1, m3: 1, km3: 1,
    s: 1, min: 1, h: 1, d: 1, kmh: 1, ms: 1, kms: 1, C: 1, K: 1, L: 1, mL: 1, count: 1, deg: 1,
    gal: 1, Hz: 1, mps2: 1, kgm3: 1, times: 1, ha: 1, cm: 1
  };

  function parseIso(iso) {
    var p = String(iso).split("-");
    if (p.length !== 3) return NaN;
    return Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function utcToday(now) {
    var d = now || new Date();
    return d.toISOString().slice(0, 10);
  }

  function daysBetween(a, b) {
    return Math.round((parseIso(b) - parseIso(a)) / MS_DAY);
  }

  function puzzleForDate(iso, puzzles, startIso) {
    var start = parseIso(startIso || START);
    var dayIndex = Math.round((parseIso(iso) - start) / MS_DAY);
    var n = puzzles.length;
    var index = ((dayIndex % n) + n) % n;
    var cycle = Math.floor(dayIndex / n);
    return { dayIndex: dayIndex, index: index, cycle: cycle, puzzle: puzzles[index], iso: iso };
  }

  function factorOf(guess, actual) {
    if (!(guess > 0) || !(actual > 0) || !isFinite(guess) || !isFinite(actual)) return Infinity;
    return Math.max(guess, actual) / Math.min(guess, actual);
  }

  /* 20 at an exact hit, 14 at 2×, 0 at 10× or more. Rounded to a whole point. */
  function pointsFor(guess, actual) {
    var f = factorOf(guess, actual);
    if (!isFinite(f)) return 0;
    var raw = 20 * (1 - Math.log10(f));
    if (raw <= 0) return 0;
    if (raw >= 20) return 20;
    return Math.round(raw);
  }

  /* 5 = closest. Taller share-mark, closer guess. */
  function band(factor) {
    if (!(factor > 0) || !isFinite(factor)) return 1;
    if (factor <= 1.25) return 5;
    if (factor <= 2) return 4;
    if (factor <= 4) return 3;
    if (factor <= 10) return 2;
    return 1;
  }

  var MARKS = ["", "▁", "▂", "▄", "▆", "█"];

  function markChar(b) {
    return MARKS[b] || "▁";
  }

  function geometricMean(factors) {
    if (!factors.length) return Infinity;
    var sum = 0;
    for (var i = 0; i < factors.length; i++) {
      var f = factors[i];
      if (!(f > 0) || !isFinite(f)) return Infinity;
      sum += Math.log(f);
    }
    return Math.exp(sum / factors.length);
  }

  function formatFactor(f) {
    if (!(f > 0) || !isFinite(f)) return "—";
    if (f < 10) return (Math.round(f * 10) / 10).toFixed(1);
    if (f < 100) return String(Math.round(f));
    return String(Math.round(f));
  }

  function direction(guess, actual) {
    if (!(guess > 0) || !(actual > 0)) return "off";
    var f = factorOf(guess, actual);
    if (f < 1.02) return "on";
    return guess > actual ? "high" : "low";
  }

  function sigFigs(n, figs) {
    if (!(n > 0) || !isFinite(n)) return n;
    var exp = Math.floor(Math.log10(n));
    var scale = Math.pow(10, (figs || 3) - 1 - exp);
    return Math.round(n * scale) / scale;
  }

  function logToValue(t, min, max) {
    var clamped = Math.min(1, Math.max(0, t));
    return Math.exp(Math.log(min) + clamped * (Math.log(max) - Math.log(min)));
  }

  function valueToLog(value, min, max) {
    if (!(value > 0)) return 0;
    var t = (Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min));
    return Math.min(1, Math.max(0, t));
  }

  return {
    START: START,
    UNIT_CODES: UNIT_CODES,
    parseIso: parseIso,
    utcToday: utcToday,
    daysBetween: daysBetween,
    puzzleForDate: puzzleForDate,
    factorOf: factorOf,
    pointsFor: pointsFor,
    band: band,
    markChar: markChar,
    geometricMean: geometricMean,
    formatFactor: formatFactor,
    direction: direction,
    sigFigs: sigFigs,
    logToValue: logToValue,
    valueToLog: valueToLog
  };
});
