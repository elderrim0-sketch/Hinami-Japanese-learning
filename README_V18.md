# Hanami V18 — Complete Curriculum and Level 1–100 Vocabulary Progression

Hanami V18 extends V17; it does not remove the existing reading, story, listening, pitch, focus-garden, or authored classroom content.

## What is actually new

- **Complete Curriculum V18** in the sidebar and from the Level 1–100 Journey. This is a study route rather than a dictionary view.
- **All reference entries mapped:** after the OpenJLPT library is installed, every one of its vocabulary, grammar and kanji records is assigned to one of the 20 levels in its JLPT tier. The assignment uses stable source IDs or characters, with no arbitrary 4-word/1-kanji cap.
- **Full reference coverage audit:** the dashboard shows totals *for each level*, including whether all three full reference collections are loaded. Reference grammar points are individually explained through meaning, formation, notes, two source examples, recognition and Japanese output practice; the original authored classroom lessons remain.
- **Nine hand-authored bridge patterns:** 〜ましょうか, 〜たがる, 〜がる, 〜なんか, 〜なんて, 〜あげく, 〜がてら, 〜すら, and 〜ずくめ are available even without the full reference sync; there is no double-counting of patterns already covered by an existing authored label.
- **Progression controls:** completing one older Journey quiz no longer automatically makes a newly installed reference course “complete.” A level needs all three full reference collections and a practiced record for every assigned item before it can qualify as full-curriculum complete. Existing old quiz records and backup data are preserved, but old clears alone don't satisfy the new gate.
- **Real practice actions:** each word asks for a meaning recognition and kana reading; each kanji for meaning and an acceptable common reading; each grammar point for meaning and a Japanese sentence, with explicit self-assessment instead of untruthful automatic scoring of free writing.
- **Spaced review:** one correct day is marked *introduced*, not *retained*. Retention requires correct recall on three different days spanning at least six days, with clear due-date visibility.
- **Manageable packs:** each 20-stage tier contains 20 numbered levels. A stage can have many items (especially N1), so the UI paginates into 12-item packs with a next-unseen and due-review action.

## Must-do setup: download the source library once

The large OpenJLPT dataset **is not included in this ZIP or the standalone HTML**. It is downloaded when the web app first runs with an internet connection, saved in the device's IndexedDB, then available offline on that same browser and site address. The three datasets for each level are `vocab`, `grammar`, and `kanji`, giving 15 collections in total. The new curriculum refuses to mislabel starter previews as full coverage when those collections are unavailable.

| Level | Vocabulary | Grammar reference patterns | Kanji |
|---|---:|---:|---:|
| N5 | 674 | 81 | 84 |
| N4 | 630 | 98 | 169 |
| N3 | 1,659 | 101 | 387 |
| N2 | 1,778 | 123 | 398 |
| N1 | 3,070 | 123 | 1,345 |
| **Total** | **7,811** | **526** | **2,383** |

Those are **OpenJLPT reference counts**, not official post-2010 JLPT prescribed lists. Actual counts can change if the upstream reference is updated. The Japanese Language Proficiency Test does not publish an exhaustive current word/grammar/kanji syllabus.

## Quality limits

- **Coverage means every entry in the installed reference gets a teach-and-practise route.** It does not mean every entry has an individually handcrafted new story, expert-reviewed user response, or professionally recorded voice.
- The OpenJLPT grammar library gives reviewed explanations and formation rules; vocabulary examples derive from Tatoeba where available. The app does not invent an example where the source has none.
- Browser TTS is a fallback; native-speaker audio quality depends on the separately imported recordings.
- Writing free Japanese is checked by the learner against examples. This is *not* validated speaking/writing proficiency and cannot guarantee understanding of all anime.
- A full data sync is required before a 100-level Journey stage can now claim full curricular coverage. **If you are offline without cached data, you can still study the old authored curriculum and the starter set, but cannot earn a new full-coverage completion.**

## Source and licensing

OpenJLPT data (not bundled here): https://github.com/evanclan/OpenJLPT — CC BY-SA 4.0, with per-source notices under [NOTICE.md](https://github.com/evanclan/OpenJLPT/blob/main/NOTICE.md). Respect the corresponding attribution and ShareAlike duties when redistributing or modifying the dataset. Existing Hanami content licensing is documented in LICENSE.txt.

## Tests performed

- Checked both `app.js` and the V18 curriculum module for JavaScript syntax.
- Tested full **synthetic** reference fixture with all five levels, all three collections, and the actual published count sizes (7,811 vocabulary / 526 grammar / 2,383 kanji). Every fixture entry was assigned to exactly one level, with no missing or duplicate assignments.
- Exercised a vocabulary lesson through recognition and typed kana recall, grammar lesson through explanation, two examples, meaning recognition and explicit writing self-review.
- Tested journey gate behaviour, mobile viewport at 390 px, and in-memory saved-progress capture; no page errors or horizontal overflow in that run.
- **Not tested against a real live full OpenJLPT network sync inside this sandbox**, because network access to the CDN is blocked here; the app's existing fetch/cache workflow has not been replaced.

## Installation

1. Export a progress backup from V17 before updating.
2. Extract `Hanami_Japanese_v18_Complete_App.zip` and upload **all** contents to the root of the existing GitHub Pages repository.
3. Refresh your existing site, select **Complete Curriculum V18**, and run **Download complete library** while connected.
4. Confirm `15/15` collections in Settings and see counts per level. Learn each level's complete set, and return for spaced review.
5. Use the existing Level 1–100 Journey reading and listening checks as a second, separate layer. The course and the checks now work together.

The standalone HTML is useful for testing; it contains the same interface and source code, but the external OpenJLPT dataset is still a one-time download and the browser's local storage is tied to its specific origin.
