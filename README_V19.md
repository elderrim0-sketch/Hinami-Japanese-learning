# Hanami V19 — Understanding First

## Who this release is for
People who want to understand **spoken Japanese in anime and everyday life**, and read Japanese subtitles or manga, **without making speaking, pronunciation, handwriting or written Japanese production mandatory**. V19 reuses the V18 source app rather than replacing its characters, garden, 100-level path, and JLPT libraries.

## What changed

- **Understanding-First Course** is the main curriculum view. Open it after downloading the app.
- **Listening-First Journey** is the main 1–100 route, with its original conversations, reading and listening stages. Level writing prompts now ask for an *English explanation of Japanese* rather than requiring a Japanese sentence.
- Vocabulary and grammar study now end with *English meaning recall and self-comparison*, instead of mandatory Japanese handwriting, kana recall or original Japanese sentence composition. Japanese production exercises are still offered in the optional complete-reference track and other study areas.
- Core-level unlocking requires practice of **priority vocabulary and grammar**, while standalone kanji drills and specialist vocabulary are optional. Kanji recognition and subtitle reading remain available.
- A **Full JLPT reference — Optional** switch keeps access to all 7,811 vocabulary entries, 526 grammar reference entries and 2,383 kanji entries when the complete reference library is synced. No item is deleted and existing progress records are not wiped.
- Navigation initially highlights the comprehension activities. **Explore optional tools** expands the full app menu.
- The next-level gate now checks the comprehension core even if you are browsing the optional full-reference list.
- Importing progress backups includes V18 curriculum records.

## Honest meaning of “high priority”

The recommended shortlist is **editorial, not a measured frequency list**. The programme combines five broad JLPT study bands with a human-curated set of everyday words, recurring genre terms, sentence-ending patterns, and English meaning cues, then retains a fixed number of entries per band. It isn't a corpus-ranked or independently validated definition of what all Japanese learners need. Priorities will vary by anime genre, location and personal needs.

Under the complete OpenJLPT reference counts, this *initial* shortcut assigns:

| Type | Understanding-first priority | Optional extension | Available total |
|---|---:|---:|---:|
| Vocabulary | 2,945 | 4,866 | 7,811 |
| Grammar | 481 | 45 | 526 |
| Kanji | 864 | 1,519 | 2,383 |

Kanji is **not required for the oral comprehension journey**, though it is recommended for Japanese subtitles and reading. Counts may change if OpenJLPT updates its data, and the shortlist won't be meaningful until the actual full dataset has been synced.

## Setup

1. Back up study progress from V18 using Settings → Export progress.
2. Replace your existing GitHub Pages repository contents with the files in the V19 ZIP. Keep the same domain/address.
3. Open **Understanding-First Course**. A smaller starter subset works immediately.
4. Select **Sync reference library** once while online, and wait until the 15 collections load. This is needed for the full prioritized shortlist, but not for starter lessons.
5. Study the recommended content, open **Listening-First Journey**, and regularly use **Listening Immersion Lab**, **Cinematic Listening** and **Anime Comprehension**.
6. If an unfamiliar genre uses terms outside the core, switch to **Full JLPT reference** temporarily. No records will be lost.

## Known educational limits

- V19 does **not** include a frequency list actually measured from a balanced spoken Japanese + anime corpus. The prioritisation is a reasonable heuristic that still needs content-quality auditing and user testing.
- Listening audio is still mainly browser Japanese text-to-speech and human clips the user may legally import. Level 100 does **not** guarantee subtitle-free comprehension of arbitrary native-speed anime.
- Self-marked English explanations are useful rehearsal, not automated grading of natural language.
- A person should also practise on unfamiliar real Japanese audio; subtitles and dictionary usage are normal while learning.
- The full vocabulary, grammar and kanji reference data still requires one online sync to populate its IndexedDB cache. This app does not bundle all third-party reference entries.

## Files

`index.html` includes `source/receptive-priority.js`, the updated `source/v18-course.js`, `source/true-path.js`, the original application, `v19.css`, and legacy styles/media. The ZIP contains all required local files; the standalone HTML embeds source, styles and artwork.
