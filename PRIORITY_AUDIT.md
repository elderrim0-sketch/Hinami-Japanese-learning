# V19 engineering coverage checks

The V19 prioritiser is deterministic, based on the installed reference arrays, and **never deletes an entry**. The per-level core and extension lists are disjoint. Their union is the complete installed reference collection.

Tested against simulated reference sets matching the five published OpenJLPT N5–N1 counts:

| Set | Priority core | Optional | Union | Duplicate assignments |
|---|---:|---:|---:|---:|
| Vocabulary | 2,945 | 4,866 | 7,811 | None |
| Grammar | 481 | 45 | 526 | None |
| Kanji | 864 | 1,519 | 2,383 | None |

- Tested the 100-stage assignment, lexical uniqueness, selection-mode switching, English comprehension recall, stage gate, chapter navigation, and 390-pixel layout in Chromium.
- The tests used simulated dictionary entries to cover large-array behaviour, **not a validation of the live dataset's semantics**.
- A fresh starter-library test passed without online syncing. A new library sync changes assignments and may require new core content to be practised in previously cleared levels. This is shown in the interface.
- Dictation, speaking, grammar composition, and handwriting remain optional study methods elsewhere in the app. Comprehension progress from the 100-stage route is tracked separately from externally demonstrated real-life fluency.

## Future quality improvements

A properly licensed, versioned frequency table based on authentic **spoken conversation and anime subtitles**, with a transparent sampling methodology, would strengthen the ranking considerably. Learners should be able to promote important niche words and hide familiar words individually. Neither feature is claimed to be present in V19.
