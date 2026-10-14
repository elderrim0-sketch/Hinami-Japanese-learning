# Hanami V20 — Kotoba Linked Edition

Updated from Hanami V19, preserving all existing courses, story adventure, immersion studio, pitch accent, theme garden, and offline-first study records.

## New companion
- **Kotoba Link** is a first-class primary sidebar page.
- Connects via an explicit opt-in Kotoba Miner v2.6 extension pairing with the exact Hanami website URL.
- Receives saved Kotoba/Anki mining notes (word, reading, meaning, original Japanese sentence, translation if available, source title/link/time). **No audio/video is transferred.**
- Carries Kotoba known/learning labels but does not falsely credit them as Hanami mastery.
- Deduplicates mines, searches words and source context, supports comprehension-only reviews (Again/Understood/Easy) with due scheduling.
- Automatic updates when the paired Hanami page is open and the extension changes stored mines/word statuses.
- Portable JSON import/export for devices or browsers without extension support.
- Fully local storage, with no new paid APIs or sync service.

## Installation
See **START_HERE.md**. Update both the Hanami V20 website and Kotoba v2.6 extension in your current installation directories, preserving URLs and the extension's installed identity to keep local data. Always export a backup first.

## Limitations and testing
- Automated app tests verified file import, deduplication, meaning reveal, scheduling and persistence across navigation; code/unit checks verified Kotoba's saved mines and status snapshots.
- The automated browser could not load a side-loaded extension, so **automatic browser handshake has not yet been end-to-end verified on the user's Opera/Chrome installation**. A file transfer fallback is provided.
- The extension's older releases did not retain full historic mining sentence cards; older known/learning labels transfer but old sentence context cannot be recreated.
- Chrome/Opera desktop extension pairing works only with the exact approved HTTP(S) Hanami site. The standalone HTML and iPad require manual JSON transfer.
- This helps you learn words seen in anime. It cannot independently measure 70% actual listening comprehension.
