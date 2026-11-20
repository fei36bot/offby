/* OffBy interface. One official scored run per browser per UTC day. */
(function () {
  var L = window.OffByLogic;
  var PACK = window.OFFBY_PACK;
  if (!L || !PACK) {
    document.getElementById("app").textContent = "OffBy failed to load.";
    return;
  }

  var STORE = "offby.v1";
  var UNITS = {
    m: ["m", "米"],
    km: ["km", "公里"],
    mm: ["mm", "毫米"],
    cm: ["cm", "厘米"],
    kg: ["kg", "千克"],
    t: ["t", "吨"],
    g: ["g", "克"],
    km2: ["km²", "平方公里"],
    m2: ["m²", "平方米"],
    m3: ["m³", "立方米"],
    km3: ["km³", "立方公里"],
    s: ["s", "秒"],
    min: ["min", "分钟"],
    h: ["h", "小时"],
    d: ["days", "天"],
    kmh: ["km/h", "公里/小时"],
    ms: ["m/s", "米/秒"],
    kms: ["km/s", "公里/秒"],
    C: ["°C", "°C"],
    K: ["K", "开"],
    L: ["L", "升"],
    mL: ["mL", "毫升"],
    ha: ["ha", "公顷"],
    count: ["", ""],
    deg: ["°", "°"],
    gal: ["US gal", "美制加仑"],
    Hz: ["Hz", "赫兹"],
    mps2: ["m/s²", "米/秒²"],
    kgm3: ["kg/m³", "千克/立方米"],
    times: ["×", "倍"]
  };

  var COPY = {
    en: {
      html: "en",
      title: "OffBy · 差多少",
      brand: "OffBy",
      other: "差多少",
      play: "Play today's five",
      resume: "Continue today's five",
      see: "See today's result",
      lock: "Lock in this estimate",
      show: "Show the true value",
      next: "Next question",
      result: "See today's result",
      copy: "Copy result",
      copied: "Copied",
      save: "Save image",
      notes: "Scoring and notes",
      back: "Back",
      streak: "Streak",
      streakNone: "No streak yet",
      streakN: function (n) { return n === 1 ? "1 day" : n + " days"; },
      oneRun: "One scored round on this browser for each UTC day.",
      same: "Five estimates. The same five everywhere.",
      reset: "A new set at 00:00 UTC, which is 08:00 in Asia/Shanghai.",
      of: function (i) { return (i + 1) + " of 5"; },
      placeholder: "Type a number",
      scaleHint: "The scale speeds up as you go right. The number in the box is the one that counts.",
      badNumber: "Enter a number greater than zero.",
      locked: "Locked",
      yourFig: "Your figure",
      retry: "Retry this question",
      retrySoon: "Rewarded retry · not available yet",
      retryNote: "One retry is reserved for a real rewarded ad, before the answer is shown. This page does not play an ad, and it does not give the retry.",
      retryUsed: "Retry already used on this question.",
      retryPass: "An ad-free pass would not add a retry.",
      trueValue: "True value",
      youSaid: "You said",
      high: function (f) { return f + "× the true value, high"; },
      low: function (f) { return f + "× off, low"; },
      onit: "Essentially on it",
      pts: function (n) { return n + " / 20"; },
      source: "Source",
      today: "Today",
      avg: function (f) { return f + "× off, on average"; },
      legend: "Taller mark, closer guess. The block above is the share card. It leaves the answers out.",
      yourFive: "The five answers, for you",
      tomorrow: "Tomorrow's five arrive at 00:00 UTC (08:00 in Shanghai).",
      played: "You already finished today's official round.",
      preview: function (iso) { return "Previewing " + iso + ". This round is not saved."; },
      freeze: "Streak freeze · not available yet",
      freezeNote: "You missed a day. A rewarded ad may one day cover that single miss. Nothing here grants it, so finishing today starts the streak at one.",
      setLabel: function (info) {
        var n = info.index + 1;
        if (info.cycle <= 0) return "Set " + n;
        return "Cycle " + (info.cycle + 1) + " · set " + n;
      },
      aboutTitle: "How OffBy scores",
      aboutBody: [
        "Everyone, everywhere, gets the same five questions for a UTC date. The set changes at 00:00 UTC, which is 08:00 in Asia/Shanghai. Prepared sets start on 20 November 2026 and then repeat in order.",
        "Each question is worth 20 points. The round is out of 100. Points follow how many times off you were: exact is 20, twice as high or low is 14, ten times off or more is 0.",
        "The first finish of the UTC day is the official round and the only one that counts for the streak. The streak lives in this browser. There is no account.",
        "The share card shows the date, the score, the average miss, and five marks. Taller means closer. It does not include the answers.",
        "A retry before the reveal, and a one-day streak freeze, are wired for a future rewarded ad. They stay off until a real ad callback says the reward was earned. This version does not pretend an ad played.",
        "An ad-free pass is not for sale. Nothing on this page takes payment. A future pass would turn ads off. It would not add extra guesses."
      ]
    },
    zh: {
      html: "zh-CN",
      title: "差多少 · OffBy",
      brand: "差多少",
      other: "OffBy",
      play: "开始今天的五题",
      resume: "继续今天的五题",
      see: "查看今天的成绩",
      lock: "锁定这个估计",
      show: "看真实数字",
      next: "下一题",
      result: "看今天的成绩",
      copy: "复制成绩",
      copied: "已复制",
      save: "保存图片",
      notes: "计分和说明",
      back: "返回",
      streak: "连续",
      streakNone: "还没有连续天数",
      streakN: function (n) { return n + " 天"; },
      oneRun: "每个浏览器、每个 UTC 日，只有一轮计分。",
      same: "五道估算。全世界同一天是同样的五题。",
      reset: "每天 00:00 UTC 换题，也就是北京时间早上 8 点。",
      of: function (i) { return "第 " + (i + 1) + " 题，共 5 题"; },
      placeholder: "输入一个数字",
      scaleHint: "越往右，数字涨得越快。以框里的数字为准。",
      badNumber: "请输入一个大于 0 的数字。",
      locked: "已锁定",
      yourFig: "你的数字",
      retry: "重估这一题",
      retrySoon: "看广告后重估 · 还没开放",
      retryNote: "答案出来之前，可以留一次重估，留给以后真正的激励广告。这一版不播放广告，也不会把重估送你。",
      retryUsed: "这一题已经用过重估。",
      retryPass: "免广告通行证不附带重估。",
      trueValue: "真实数字",
      youSaid: "你写的是",
      high: function (f) { return "偏高，是真实值的 " + f + " 倍"; },
      low: function (f) { return "偏低，差了 " + f + " 倍"; },
      onit: "基本正好",
      pts: function (n) { return n + " / 20"; },
      source: "来源",
      today: "今天",
      avg: function (f) { return "平均差 " + f + " 倍"; },
      legend: "条越高，那一题越接近。上面那一块是成绩卡，里面没有答案。",
      yourFive: "这五题的答案，只给你自己看",
      tomorrow: "明天的五题在 00:00 UTC 换上，也就是北京时间早上 8 点。",
      played: "今天的正式一轮已经完成。",
      preview: function (iso) { return "正在预览 " + iso + "。这一轮不会保存。"; },
      freeze: "连续天数保护 · 还没开放",
      freezeNote: "你隔了一天。以后也许能用一次激励广告补上这一天。现在不会补，所以完成今天会从 1 天重新计。",
      setLabel: function (info) {
        var n = info.index + 1;
        if (info.cycle <= 0) return "第 " + n + " 套";
        return "第 " + (info.cycle + 1) + " 轮 · 第 " + n + " 套";
      },
      aboutTitle: "差多少怎么计分",
      aboutBody: [
        "同一个 UTC 日期，全世界是同样的五题。换题时间是 00:00 UTC，也就是北京时间早上 8 点。题组从 2026 年 11 月 20 日起，按顺序循环。",
        "每题 20 分，一轮 100 分。差的倍数越大，分越低。正好是 20 分；差 2 倍是 14 分；差 10 倍或更多是 0 分。",
        "每个 UTC 日，这个浏览器只有第一次完成的那一轮算正式成绩，也只有这一轮计入连续天数。连续天数存在这台浏览器里。不用注册。",
        "成绩卡上有日期、总分、平均差了几倍，以及五道高低条。条越高越接近。成绩卡不含答案。",
        "揭晓前重估一次，以及补上错过的一天，都留给以后的激励广告。在广告回调确认看完之前，这两项一直关着。这一版不会假装播过广告。",
        "免广告通行证现在不卖。这个页面不收款。以后的通行证只会关掉广告，不会多给猜测次数。"
      ]
    }
  };

  function defaultLang() {
    var n = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return n.indexOf("zh") === 0 ? "zh" : "en";
  }

  function emptyState() {
    return { lang: null, lastCompleted: null, streak: 0, adFreePass: false, days: {}, progress: null };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return emptyState();
      var s = JSON.parse(raw);
      if (!s || typeof s !== "object") return emptyState();
      s.days = s.days || {};
      s.streak = s.streak || 0;
      s.adFreePass = s.adFreePass === true;
      return s;
    } catch (e) {
      return emptyState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORE, JSON.stringify(state));
      state._memoryOnly = false;
    } catch (e) {
      state._memoryOnly = true;
    }
  }

  var state = loadState();
  var lang = state.lang || defaultLang();
  var screen = "landing";
  var copiedUntil = 0;
  var fieldError = "";
  var preview = null;

  (function readPreview() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { return; }
    var iso = q.get("preview");
    if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso) && !isNaN(L.parseIso(iso))) preview = iso;
  })();

  function t() { return COPY[lang]; }

  function todayIso() { return preview || L.utcToday(); }

  function info() { return L.puzzleForDate(todayIso(), PACK.puzzles); }

  function dayRecord() {
    if (preview) return null;
    return state.days[todayIso()] || null;
  }

  function shownStreak() {
    if (preview || !state.lastCompleted || !state.streak) return 0;
    var gap = L.daysBetween(state.lastCompleted, L.utcToday());
    if (gap === 0 || gap === 1) return state.streak;
    return 0;
  }

  function missedExactlyOne() {
    if (preview || !state.lastCompleted || !state.streak) return false;
    return L.daysBetween(state.lastCompleted, L.utcToday()) === 2;
  }

  function unitLabel(code) {
    var pair = UNITS[code] || ["", ""];
    return lang === "zh" ? pair[1] : pair[0];
  }

  function formatNum(n, dp) {
    var loc = lang === "zh" ? "zh-CN" : "en-GB";
    return new Intl.NumberFormat(loc, {
      minimumFractionDigits: dp || 0,
      maximumFractionDigits: dp || 0
    }).format(n);
  }

  function formatFlex(n) {
    if (!isFinite(n)) return "—";
    var rounded = Math.round(n * 10000) / 10000;
    var dp = 0;
    var x = Math.abs(rounded);
    while (dp < 4 && Math.abs(x - Math.round(x)) > 1e-6) {
      x *= 10;
      dp += 1;
    }
    return formatNum(rounded, dp);
  }

  function formatBound(n) {
    if (n >= 100) return formatNum(Math.round(n), 0);
    var shown = L.sigFigs(n, 2);
    return formatFlex(shown);
  }

  function formatDate(iso) {
    var ms = L.parseIso(iso);
    return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
    }).format(new Date(ms));
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function sourceOf(q) {
    return PACK.sources[q.src] || { name: "", url: "" };
  }

  function ensureProgress() {
    var iso = todayIso();
    var p = preview ? state._previewProgress : state.progress;
    if (!p || p.date !== iso) {
      p = {
        date: iso,
        index: 0,
        phase: "estimate",
        revealed: [],
        lockedGuess: null,
        draft: "",
        retriesUsed: [false, false, false, false, false]
      };
      if (preview) state._previewProgress = p;
      else {
        state.progress = p;
        saveState();
      }
    }
    return p;
  }

  function writeProgress(p) {
    if (preview) state._previewProgress = p;
    else {
      state.progress = p;
      saveState();
    }
  }

  function currentQ(p) {
    return info().puzzle[p.index];
  }

  function scoreGuess(q, guess) {
    var factor = L.factorOf(guess, q.a);
    return {
      guess: guess,
      factor: factor,
      points: L.pointsFor(guess, q.a),
      band: L.band(factor),
      dir: L.direction(guess, q.a)
    };
  }

  function summarize(revealed) {
    var score = 0;
    var factors = [];
    var marks = [];
    for (var i = 0; i < revealed.length; i++) {
      score += revealed[i].points;
      factors.push(revealed[i].factor);
      marks.push(revealed[i].band);
    }
    return { score: score, avg: L.geometricMean(factors), marks: marks };
  }

  function shareText(iso, summary) {
    var marks = summary.marks.map(L.markChar).join("");
    var f = L.formatFactor(summary.avg);
    if (lang === "zh") {
      return "差多少 · " + iso + "\n" + summary.score + "/100 · 平均差 " + f + " 倍\n" + marks + "\n条越高越接近。不含答案。";
    }
    return "OffBy · " + iso + "\n" + summary.score + "/100 · " + f + "× off\n" + marks + "\nTaller mark, closer. No answers.";
  }

  function recordFromProgress(p) {
    var summary = summarize(p.revealed);
    return {
      score: summary.score,
      avg: summary.avg,
      marks: summary.marks,
      guesses: p.revealed.map(function (r) { return r.guess; }),
      points: p.revealed.map(function (r) { return r.points; }),
      factors: p.revealed.map(function (r) { return r.factor; })
    };
  }

  function finish(p) {
    var rec = recordFromProgress(p);
    if (!preview) {
      var iso = L.utcToday();
      var gap = state.lastCompleted ? L.daysBetween(state.lastCompleted, iso) : null;
      var next = 1;
      if (gap === 1) next = (state.streak || 0) + 1;
      else if (gap === 0) next = state.streak || 1;
      state.days[iso] = rec;
      state.lastCompleted = iso;
      state.streak = next;
      state.progress = null;
      saveState();
    }
    screen = "result";
    paint();
  }

  function activeRecord() {
    if (!preview && state.days[todayIso()]) return state.days[todayIso()];
    var p = preview ? state._previewProgress : state.progress;
    if (p && p.revealed && p.revealed.length === 5 && p.phase === "done") return recordFromProgress(p);
    return null;
  }

  function parseDraft(raw) {
    if (raw == null) return null;
    var s = String(raw).trim().replace(/\s/g, "").replace(/，/g, "").replace(/,/g, "");
    if (!s) return null;
    if (!/^(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?$/i.test(s)) return null;
    var n = Number(s);
    if (!isFinite(n) || n <= 0 || n > 1e18) return null;
    return n;
  }

  var app = document.getElementById("app");

  function paint() {
    document.documentElement.lang = t().html;
    document.title = t().title;
    var html = "";
    if (screen === "about") html = renderAbout();
    else if (screen === "play") html = renderPlay();
    else if (screen === "result") html = renderResult();
    else html = renderLanding();
    app.innerHTML = html;
    var head = app.querySelector("h1, h2");
    if (head) {
      if (!head.hasAttribute("tabindex")) head.tabIndex = -1;
    }
  }

  function topbar() {
    var c = t();
    return (
      '<header class="top">' +
        '<button class="brand" data-act="home" type="button">' +
          logo() +
          '<span class="brand-name">' + esc(c.brand) + '</span>' +
        '</button>' +
        '<div class="langs">' +
          '<button class="lang" type="button" data-act="lang" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
          '<button class="lang" type="button" data-act="lang" data-lang="zh" aria-pressed="' + (lang === "zh") + '">中文</button>' +
        '</div>' +
      '</header>'
    );
  }

  function logo() {
    return '<svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M4 23h10M18 9h10" stroke="#1b1714" stroke-width="2.4" fill="none"/>' +
      '<path d="M16 5v22" stroke="#8c2e22" stroke-width="1.7"/>' +
      '</svg>';
  }

  function renderLanding() {
    var c = t();
    var inf = info();
    var rec = dayRecord();
    var p = (!preview && state.progress && state.progress.date === todayIso()) ? state.progress : null;
    var primary, act;
    if (rec) { primary = c.see; act = "result"; }
    else if (p && (p.index > 0 || p.phase !== "estimate" || p.draft)) { primary = c.resume; act = "play"; }
    else { primary = c.play; act = "play"; }
    var streak = shownStreak();
    var streakLine = streak ? (c.streak + " " + c.streakN(streak)) : c.streakNone;
    var extra = "";
    if (preview) extra += '<p class="banner">' + esc(c.preview(preview)) + '</p>';
    if (rec) extra += '<p class="note">' + esc(c.played) + '</p>';
    var freeze = "";
    if (missedExactlyOne() && !rec) {
      var rewards = window.OffByRewards;
      var freezeOn = !!(rewards && rewards.canRequestStreakFreeze && typeof rewards.showRewardedAd === "function");
      freeze =
        '<div class="quiet-block">' +
          '<button class="btn" type="button" data-act="freeze"' + (freezeOn ? "" : " disabled") + '>' + esc(c.freeze) + '</button>' +
          '<p class="note">' + esc(c.freezeNote) + '</p>' +
        '</div>';
    }
    return (
      '<div class="view">' + topbar() +
        '<p class="kicker">' + esc(c.setLabel(inf)) + '</p>' +
        '<h1 class="mast">' + esc(c.brand) + '</h1>' +
        '<p class="subname">' + esc(c.other) + '</p>' +
        '<hr class="rule">' +
        '<p class="dateline">' + esc(formatDate(todayIso())) + '</p>' +
        '<p class="lede">' + esc(c.same) + '</p>' +
        '<p class="note">' + esc(c.reset) + '</p>' +
        extra +
        '<div class="stack">' +
          '<button class="btn primary" id="primary-action" type="button" data-act="' + act + '">' + esc(primary) + '</button>' +
          freeze +
        '</div>' +
        '<p class="note">' + esc(streakLine) + '. ' + esc(c.oneRun) + '</p>' +
        '<button class="btn textish" type="button" data-act="about">' + esc(c.notes) + '</button>' +
      '</div>'
    );
  }

  function renderPlay() {
    var c = t();
    var p = ensureProgress();
    if (p.phase === "reveal") return renderReveal(p);
    if (p.phase === "locked") return renderLocked(p);
    var q = currentQ(p);
    var u = unitLabel(q.u);
    var draftN = parseDraft(p.draft);
    var scaleVal = 500;
    var unset = " is-unset";
    if (draftN) {
      scaleVal = Math.round(L.valueToLog(draftN, q.min, q.max) * 1000);
      unset = "";
    }
    return (
      '<div class="view">' + topbar() +
        '<div class="meta"><span>' + esc(c.of(p.index)) + '</span><span>' + esc(t().setLabel(info())) + '</span></div>' +
        '<h1 class="q">' + esc(lang === "zh" ? q.zh : q.en) + '</h1>' +
        '<div class="guess-row">' +
          '<input class="guess" id="guess" inputmode="decimal" autocomplete="off" enterkeyhint="done" placeholder="' + esc(c.placeholder) + '" aria-label="' + esc(c.placeholder) + '" value="' + esc(p.draft || "") + '">' +
          (u ? '<span class="unit">' + esc(u) + '</span>' : '') +
        '</div>' +
        '<p class="field-error" id="field-error">' + esc(fieldError) + '</p>' +
        '<div class="scale-wrap">' +
          '<input class="scale' + unset + '" id="scale" type="range" min="0" max="1000" step="1" value="' + scaleVal + '" aria-valuetext="' + esc(draftN ? p.draft : c.placeholder) + '">' +
          '<div class="ends"><span>' + esc(formatBound(q.min)) + '</span><span>' + esc(formatBound(q.max)) + '</span></div>' +
        '</div>' +
        '<p class="hint">' + esc(c.scaleHint) + '</p>' +
        '<div class="stack">' +
          '<button class="btn primary" id="primary-action" type="button" data-act="lock" disabled>' + esc(c.lock) + '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function retryBlock(p) {
    var c = t();
    if (p.retriesUsed[p.index]) {
      return '<p class="note">' + esc(c.retryUsed) + '</p>';
    }
    var rewards = window.OffByRewards;
    var pass = rewards && rewards.adFreePassActive && rewards.adFreePassActive();
    var enabled = !!(rewards && rewards.canRequestRetry && typeof rewards.showRewardedAd === "function" && !pass);
    return (
      '<button class="btn" type="button" data-act="retry" ' + (enabled ? "" : "disabled") + '>' + esc(pass ? c.retryPass : (enabled ? c.retry : c.retrySoon)) + '</button>' +
      '<p class="note">' + esc(pass ? c.retryPass : c.retryNote) + '</p>'
    );
  }

  function renderLocked(p) {
    var c = t();
    var q = currentQ(p);
    var u = unitLabel(q.u);
    return (
      '<div class="view">' + topbar() +
        '<div class="meta"><span>' + esc(c.of(p.index)) + '</span><span>' + esc(c.locked) + '</span></div>' +
        '<p class="true-label">' + esc(c.yourFig) + '</p>' +
        '<p class="locked-num">' + esc(formatFlex(p.lockedGuess)) + (u ? " " + esc(u) : "") + '</p>' +
        '<div class="stack">' +
          '<button class="btn primary" id="primary-action" type="button" data-act="reveal">' + esc(c.show) + '</button>' +
          retryBlock(p) +
        '</div>' +
      '</div>'
    );
  }

  function renderReveal(p) {
    var c = t();
    var q = currentQ(p);
    var row = p.revealed[p.index];
    var u = unitLabel(q.u);
    var src = sourceOf(q);
    var f = L.formatFactor(row.factor);
    var how = row.dir === "high" ? c.high(f) : row.dir === "low" ? c.low(f) : c.onit;
    var note = lang === "zh" ? q.nz : q.ne;
    var last = p.index === 4;
    return (
      '<div class="view">' + topbar() +
        '<div class="meta"><span>' + esc(c.of(p.index)) + '</span><span>' + esc(c.pts(row.points)) + '</span></div>' +
        '<h1 class="q">' + esc(lang === "zh" ? q.zh : q.en) + '</h1>' +
        '<p class="true-label">' + esc(c.trueValue) + '</p>' +
        '<p class="locked-num">' + esc(formatNum(q.a, q.dp)) + (u ? " " + esc(u) : "") + '</p>' +
        '<p class="note">' + esc(c.youSaid) + " " + esc(formatFlex(row.guess)) + (u ? " " + esc(u) : "") + ". " + esc(how) + ".</p>" +
        '<div class="score-row"><p class="pts">' + row.points + ' <span>/ 20</span></p></div>' +
        '<p class="source">' + esc(note) + ' <a href="' + esc(src.url) + '" target="_blank" rel="noopener">' + esc(c.source) + '</a></p>' +
        '<div class="stack">' +
          '<button class="btn primary" id="primary-action" type="button" data-act="next">' + esc(last ? c.result : c.next) + '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function renderResult() {
    var c = t();
    var iso = todayIso();
    var rec = dayRecord();
    var p = preview ? state._previewProgress : state.progress;
    if (!rec && p && p.revealed && p.revealed.length === 5) rec = recordFromProgress(p);
    if (!rec) {
      screen = "landing";
      return renderLanding();
    }
    var summary = { score: rec.score, avg: rec.avg, marks: rec.marks };
    var text = shareText(iso, summary);
    var bars = rec.marks.map(function (b) {
      var h = 14 + b * 11;
      return '<i style="height:' + h + 'px"></i>';
    }).join("");
    var copyLabel = Date.now() < copiedUntil ? c.copied : c.copy;
    var streak = shownStreak();
    var breakdown = "";
    var puzzle = info().puzzle;
    for (var i = 0; i < 5; i++) {
      var q = puzzle[i];
      var guess = rec.guesses[i];
      var u = unitLabel(q.u);
      var factor = rec.factors[i];
      var dir = L.direction(guess, q.a);
      var f = L.formatFactor(factor);
      var how = dir === "high" ? c.high(f) : dir === "low" ? c.low(f) : c.onit;
      breakdown +=
        '<div class="item">' +
          '<p class="who">' + esc(lang === "zh" ? q.zh : q.en) + '</p>' +
          '<p>' + esc(formatFlex(guess)) + (u ? " " + esc(u) : "") + " · " + esc(formatNum(q.a, q.dp)) + (u ? " " + esc(u) : "") + '</p>' +
          '<p>' + esc(how) + " · " + esc(c.pts(rec.points[i])) + '</p>' +
        '</div>';
    }
    var previewNote = preview ? '<p class="banner">' + esc(c.preview(preview)) + '</p>' : "";
    return (
      '<div class="view">' + topbar() +
        previewNote +
        '<p class="kicker">' + esc(formatDate(iso)) + '</p>' +
        '<h1 class="big-score">' + rec.score + '<small> / 100</small></h1>' +
        '<p class="lede">' + esc(c.avg(L.formatFactor(rec.avg))) + '</p>' +
        '<div class="bars" aria-hidden="true">' + bars + '</div>' +
        '<p class="hint">' + esc(c.legend) + '</p>' +
        '<pre class="sharebox" id="share-text">' + esc(text) + '</pre>' +
        '<div class="stack">' +
          '<button class="btn primary" id="primary-action" type="button" data-act="copy">' + esc(copyLabel) + '</button>' +
          '<button class="btn" type="button" data-act="save">' + esc(c.save) + '</button>' +
        '</div>' +
        '<p class="note">' + esc(streak ? (c.streak + " " + c.streakN(streak)) : c.streakNone) + '</p>' +
        '<p class="note">' + esc(c.tomorrow) + '</p>' +
        '<h2>' + esc(c.yourFive) + '</h2>' +
        '<div class="breakdown">' + breakdown + '</div>' +
        '<button class="btn textish" type="button" data-act="about">' + esc(c.notes) + '</button>' +
      '</div>'
    );
  }

  function renderAbout() {
    var c = t();
    var paras = c.aboutBody.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    return (
      '<div class="view">' + topbar() +
        '<h1 class="q">' + esc(c.aboutTitle) + '</h1>' +
        paras +
        '<ul class="plain">' +
          '<li>1× → 20</li>' +
          '<li>2× → 14</li>' +
          '<li>5× → 6</li>' +
          '<li>10× → 0</li>' +
        '</ul>' +
        '<p class="note">points = round(20 × (1 − log10(times off))), never below 0.</p>' +
        '<div class="stack"><button class="btn primary" id="primary-action" type="button" data-act="home">' + esc(c.back) + '</button></div>' +
      '</div>'
    );
  }

  function syncLockButton() {
    var btn = document.getElementById("primary-action");
    var input = document.getElementById("guess");
    if (!btn || !input || btn.getAttribute("data-act") !== "lock") return;
    btn.disabled = !parseDraft(input.value);
  }

  app.addEventListener("input", function (e) {
    if (e.target.id === "guess") {
      var p = ensureProgress();
      p.draft = e.target.value;
      fieldError = "";
      var err = document.getElementById("field-error");
      if (err) err.textContent = "";
      var scale = document.getElementById("scale");
      var n = parseDraft(e.target.value);
      if (scale && n) {
        var q = currentQ(p);
        scale.classList.remove("is-unset");
        scale.value = String(Math.round(L.valueToLog(n, q.min, q.max) * 1000));
        scale.setAttribute("aria-valuetext", e.target.value);
      }
      writeProgress(p);
      syncLockButton();
    }
    if (e.target.id === "scale") {
      var p2 = ensureProgress();
      var q2 = currentQ(p2);
      e.target.classList.remove("is-unset");
      var raw = L.logToValue(Number(e.target.value) / 1000, q2.min, q2.max);
      var shown = L.sigFigs(raw, 3);
      if (shown < q2.min) shown = q2.min;
      if (shown > q2.max) shown = q2.max;
      var input = document.getElementById("guess");
      var text = String(shown);
      if (input) input.value = text;
      p2.draft = text;
      e.target.setAttribute("aria-valuetext", text);
      fieldError = "";
      writeProgress(p2);
      syncLockButton();
    }
  });

  app.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var primary = document.getElementById("primary-action");
    if (!primary || primary.disabled) return;
    if (e.target && (e.target.id === "guess" || e.target.id === "scale" || e.target === primary)) {
      e.preventDefault();
      primary.click();
    }
  });

  app.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn || btn.disabled) return;
    var act = btn.getAttribute("data-act");
    if (act === "lang") {
      lang = btn.getAttribute("data-lang");
      state.lang = lang;
      if (!preview) saveState();
      paint();
      return;
    }
    if (act === "home") {
      screen = (dayRecord() ? "result" : "landing");
      if (!dayRecord()) screen = "landing";
      paint();
      return;
    }
    if (act === "about") { screen = "about"; paint(); return; }
    if (act === "play") {
      if (dayRecord()) { screen = "result"; paint(); return; }
      ensureProgress();
      screen = "play";
      fieldError = "";
      paint();
      return;
    }
    if (act === "result") { screen = "result"; paint(); return; }
    if (act === "lock") return onLock();
    if (act === "reveal") return onReveal();
    if (act === "next") return onNext();
    if (act === "retry") return onRetry();
    if (act === "copy") return onCopy();
    if (act === "save") return onSave();
    if (act === "freeze") return onFreeze();
  });

  function onLock() {
    var p = ensureProgress();
    var input = document.getElementById("guess");
    var raw = input ? input.value : p.draft;
    var n = parseDraft(raw);
    if (!n) {
      fieldError = t().badNumber;
      var err = document.getElementById("field-error");
      if (err) err.textContent = fieldError;
      return;
    }
    p.draft = String(raw).trim();
    p.lockedGuess = n;
    p.phase = "locked";
    writeProgress(p);
    fieldError = "";
    paint();
  }

  function onReveal() {
    var p = ensureProgress();
    if (p.phase !== "locked") return;
    var q = currentQ(p);
    var row = scoreGuess(q, p.lockedGuess);
    p.revealed[p.index] = row;
    p.phase = "reveal";
    writeProgress(p);
    paint();
  }

  function onNext() {
    var p = ensureProgress();
    if (p.phase !== "reveal") return;
    if (p.index >= 4) {
      p.phase = "done";
      writeProgress(p);
      finish(p);
      return;
    }
    p.index += 1;
    p.phase = "estimate";
    p.draft = "";
    p.lockedGuess = null;
    writeProgress(p);
    fieldError = "";
    paint();
  }

  function onRetry() {
    var rewards = window.OffByRewards;
    var p = ensureProgress();
    if (!rewards || p.phase !== "locked" || p.retriesUsed[p.index]) return;
    rewards.requestRetry({ date: todayIso(), question: p.index }).then(function (res) {
      if (!res || res.granted !== true) return;
      if (p.retriesUsed[p.index] || p.phase !== "locked") return;
      p.retriesUsed[p.index] = true;
      p.phase = "estimate";
      p.lockedGuess = null;
      p.draft = "";
      writeProgress(p);
      paint();
    });
  }

  function onFreeze() {
    var rewards = window.OffByRewards;
    if (!rewards) return;
    rewards.requestStreakFreeze({ date: L.utcToday() }).then(function (res) {
      if (!res || res.granted !== true) return;
      if (!missedExactlyOne()) return;
      var y = new Date(L.parseIso(L.utcToday()) - 86400000);
      state.lastCompleted = y.toISOString().slice(0, 10);
      saveState();
      paint();
    });
  }

  function onCopy() {
    var rec = dayRecord();
    var p = preview ? state._previewProgress : state.progress;
    if (!rec && p && p.revealed && p.revealed.length === 5) rec = recordFromProgress(p);
    if (!rec) return;
    var text = shareText(todayIso(), { score: rec.score, avg: rec.avg, marks: rec.marks });
    var done = function () {
      copiedUntil = Date.now() + 1600;
      paint();
      setTimeout(function () { if (Date.now() >= copiedUntil) paint(); }, 1700);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text);
        done();
      });
    } else {
      fallbackCopy(text);
      done();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }

  function onSave() {
    var rec = dayRecord();
    var p = preview ? state._previewProgress : state.progress;
    if (!rec && p && p.revealed && p.revealed.length === 5) rec = recordFromProgress(p);
    if (!rec) return;
    var canvas = drawCard(todayIso(), rec);
    canvas.toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (lang === "zh" ? "chaduoshao-" : "offby-") + todayIso() + ".png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
    }, "image/png");
  }

  function drawCard(iso, rec) {
    var c = document.createElement("canvas");
    var w = 360;
    var h = 480;
    var s = 2;
    c.width = w * s;
    c.height = h * s;
    var g = c.getContext("2d");
    g.scale(s, s);
    g.fillStyle = "#f3eee4";
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "#1b1714";
    g.lineWidth = 1;
    g.strokeRect(14, 14, w - 28, h - 28);
    g.strokeRect(18, 18, w - 36, h - 36);
    g.fillStyle = "#1b1714";
    g.font = "600 40px Georgia, 'Songti SC', 'WenQuanYi Micro Hei', serif";
    g.fillText(lang === "zh" ? "差多少" : "OffBy", 36, 78);
    g.font = "15px Georgia, 'WenQuanYi Micro Hei', serif";
    g.fillStyle = "#4a453c";
    g.fillText(lang === "zh" ? "OffBy" : "差多少", 36, 102);
    g.fillStyle = "#1b1714";
    g.font = "16px -apple-system, 'PingFang SC', 'WenQuanYi Micro Hei', sans-serif";
    g.fillText(iso, 36, 138);
    g.font = "600 78px Georgia, 'Songti SC', 'WenQuanYi Micro Hei', serif";
    var scoreText = String(rec.score);
    var scoreW = g.measureText(scoreText).width;
    g.fillText(scoreText, 36, 230);
    g.font = "22px Georgia, 'WenQuanYi Micro Hei', serif";
    g.fillStyle = "#4a453c";
    g.fillText("/ 100", 36 + scoreW + 12, 230);
    g.fillStyle = "#1b1714";
    var f = L.formatFactor(rec.avg);
    g.font = "20px Georgia, 'PingFang SC', 'WenQuanYi Micro Hei', serif";
    g.fillText(lang === "zh" ? ("平均差 " + f + " 倍") : (f + "× off, on average"), 36, 268);
    for (var i = 0; i < 5; i++) {
      var bh = 16 + rec.marks[i] * 22;
      var x = 36 + i * 58;
      var y = 400 - bh;
      g.fillStyle = "#1b1714";
      g.fillRect(x, y, 40, bh);
    }
    g.fillStyle = "#4a453c";
    g.font = "14px -apple-system, 'PingFang SC', 'WenQuanYi Micro Hei', sans-serif";
    var foot = lang === "zh" ? "条越高越接近 · 不含答案 · 00:00 UTC" : "Taller mark, closer · no answers · 00:00 UTC";
    g.fillText(foot, 36, 440);
    return c;
  }

  var OffByRewards = {
    version: 1,
    canRequestRetry: false,
    canRequestStreakFreeze: false,
    showRewardedAd: null,
    adFreePassActive: function () {
      return state.adFreePass === true;
    },
    requestRetry: function (ctx) {
      if (this.adFreePassActive()) return Promise.resolve({ granted: false, reason: "ad-free-pass" });
      if (!this.canRequestRetry || typeof this.showRewardedAd !== "function") {
        return Promise.resolve({ granted: false, reason: "unavailable" });
      }
      var self = this;
      return Promise.resolve()
        .then(function () { return self.showRewardedAd({ placement: "question-retry", date: ctx.date, question: ctx.question }); })
        .then(function (ok) {
          return ok === true ? { granted: true, reason: "rewarded" } : { granted: false, reason: "not-completed" };
        })
        .catch(function () { return { granted: false, reason: "error" }; });
    },
    requestStreakFreeze: function (ctx) {
      if (!this.canRequestStreakFreeze || typeof this.showRewardedAd !== "function") {
        return Promise.resolve({ granted: false, reason: "unavailable" });
      }
      var self = this;
      return Promise.resolve()
        .then(function () { return self.showRewardedAd({ placement: "streak-freeze", date: ctx.date }); })
        .then(function (ok) {
          return ok === true ? { granted: true, reason: "rewarded" } : { granted: false, reason: "not-completed" };
        })
        .catch(function () { return { granted: false, reason: "error" }; });
    }
  };

  window.OffByRewards = OffByRewards;
  window.OffBy = {
    refresh: paint,
    rewards: OffByRewards,
    shareText: shareText,
    logic: L
  };

  var rec0 = dayRecord();
  if (rec0) screen = "result";
  paint();
})();
