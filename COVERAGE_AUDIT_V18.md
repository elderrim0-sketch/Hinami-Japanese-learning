# V18 coverage audit — engineering acceptance

**Reference:** OpenJLPT's per-level vocabulary, kanji and grammar JSON, as documented at <https://github.com/evanclan/OpenJLPT>. This is a community reference, **not** an exhaustive official JLPT prescription. V18's full coverage is conditional on those data collections being synced successfully.

| Tier | Words | Reference grammar | Kanji | Route |
|---|---:|---:|---:|---|
| N5 | 674 | 81 | 84 | Levels 1–20 |
| N4 | 630 | 98 | 169 | Levels 21–40 |
| N3 | 1659 | 101 | 387 | Levels 41–60 |
| N2 | 1778 | 123 | 398 | Levels 61–80 |
| N1 | 3070 | 123 | 1345 | Levels 81–100 |
| Total | 7811 | 526 | 2383 | 100 stages |

## Tests

A Playwright run using **synthetic entries with these same counts** assigned 7,811 vocabulary items, 526 grammar items and 2,383 kanji items to exactly one stage each, with identical unique-ID totals, and no JavaScript page exceptions. The test passed vocabulary reading recall, grammar explanation/examples/meaning recall/writing self-rating, stage gating and the 390px mobile layout.

This is a distribution and interface test **not an audit of every real dictionary entry**. The real dataset's licensing, error reporting, upstream corrections, and community level assignments remain OpenJLPT responsibilities. The actual network download was not verified in the offline test environment.

## User-visible definition of 'complete'

- **Reference installed:** the three datasets for this tier are cached.
- **Introduced:** the learner completed the exercise for the particular item.
- **Stage complete:** all items in the tier's assigned stage were introduced and the reference is installed. The existing main Journey checkpoint also remains required for progression.
- **Retained:** recall logged successfully on at least 3 dates spanning at least 6 days; a stronger but still limited measurement of memory, not a JLPT pass.

The old V17's 375 authored grammar lessons remain distinct from the reference 526-point course. There are 9 additional original bridge lessons as an offline fallback for patterns known to be omitted from authored lesson titles.
