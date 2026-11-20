# OffBy（差多少）

A daily estimation game. Five questions, one UTC date, the same set for everyone. No account and no payment.

## Play

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 47321
```

Then open http://127.0.0.1:47321

One tap starts today's first question. Type an estimate, or drag the scale, then lock it in. The true value comes next, with how many times off you were. After five questions you get a score out of 100. Copy the text card or save the image. Neither one includes the answers.

The page is English or 中文. It starts from the browser language. The control is in the header.

## The daily set

The day is UTC. A new set starts at 00:00 UTC, which is 08:00 in Asia/Shanghai.

Sixty sets are prepared, starting 2026-11-20. After the last one, they repeat in the same order. The index is the number of UTC days since 2026-11-20, wrapped around the length of the list. A date before the start still lands on a set, so the page always has a puzzle.

Everyone who opens the site on the same UTC date gets the same five questions. The browser picks them from `puzzles.js`. There is no server and no account.

To look at another date without saving a score, open `?preview=2026-11-21`.

## Scoring

Each question is worth 20 points. The round is out of 100.

The miss is the larger of your guess and the true value, divided by the smaller one. That is how many times off you were.

`points = round(20 × (1 − log10(times off)))`, and never below 0.

- exact: 20
- 2× off: 14
- 5× off: 6
- 10× off or more: 0

The result also shows the geometric mean of the five misses, as one “times off” figure. The five marks on the card are taller when the guess was closer.

## One round and the streak

The first completed round on a UTC date is the official one. It is stored in this browser under `localStorage` key `offby.v1`. Leaving halfway through continues the same round. A second scored round is not offered.

The streak goes up when you finish on the UTC day after your last finish. Miss a day and the next finish starts again at one. The streak stays in this browser.

## Rewarded retry, streak freeze, and a future pass

After a question is locked, and before the answer is shown, there is a retry control. It is disabled and labeled as not available yet. Nothing on the page plays an ad or grants the retry.

A later ad SDK can turn it on:

```js
OffByRewards.canRequestRetry = true;
OffByRewards.showRewardedAd = async function ({ placement, date, question }) {
  // Return true only after a real rewarded ad finishes.
  return false;
};
OffBy.refresh();
```

`requestRetry` grants the extra guess only when that function returns exactly `true`.

A streak freeze uses the same callback with `placement: "streak-freeze"` and `OffByRewards.canRequestStreakFreeze = true`. The button appears only when exactly one UTC day was missed. It does nothing until the callback returns true.

`offby.v1` reserves `adFreePass`. This version never sets it, and there is no checkout. A future pass would turn ads off. It would not add guesses. `OffByRewards.adFreePassActive()` reads the flag.

## Facts

Every number is a published figure. `sources.md` lists each question, the answer, a rounding note, and a URL. `data/facts.tsv` is the editable copy. Rebuild the site data with:

```
python3 scripts/build_puzzles.py
```

`scripts/check.mjs` checks the score formula, the date wrap, that every answer sits inside its scale, and the contrast of the ink colors.

## Deploy for nothing

The site is static files. Put the folder on any host that serves files:

- GitHub Pages: push the repo and set Pages to the branch root.
- Cloudflare Pages: connect the repo, leave the build command empty, and use the repo root as the output.
- Netlify: deploy the folder as a static site, with no build step.

A free subdomain from the host is enough. No domain purchase, no environment variables, no database, and no paid API.

Opening `index.html` directly works too. The scripts are ordinary script tags, not modules.

## Phone layout

The column is aimed at a 375px-wide screen and stays a narrow column on a desktop. Primary buttons are at least 48px tall. The language controls are at least 44px. Type is a system font stack, so the first load is about 150KB uncompressed and includes no images.

Shots at 375px wide are in `screenshots/`.

## Not in this version

No accounts, no analytics, no video, no payments, and no live ads.
