# Hanami V21 — Anki & Kotoba Flashcard Studio

A new **Flashcards** entry sits directly below Kotoba Link in Hanami's main sidebar. It is designed for learning to **understand Japanese**, not mandatory speaking or writing.

## What it does
- Import standard Anki `.apkg` packages in the browser, including newer `collection.anki21` SQLite collections. Supports core front/back, common Japanese vocabulary, Kaishi word/reading/meaning/sentence/translation/notes, and media references. Some specialist Anki add-on card templates, cloze templates, embedded JavaScript or unsupported formats may not reproduce Anki exactly; imported cards use Hanami's simplified review layout.
- **Anki images, word audio and sentence audio** can be imported into local IndexedDB; import audio/media is optional because large decks need significant device space. No audio or files are sent to a server.
- Display **Kotoba mined cards** directly from Hanami's existing `state.kotoba.mines`. New extension syncs appear here after navigating to Flashcards, and Kotoba JSON can be imported via Kotoba Link or Flashcards → Import backup.
- Merge duplicates between Anki and Kotoba by their Japanese word rather than flooding mixed reviews. Preserve mined anime sentence context as part of the Anki card if it overlaps.
- Comprehension-first flashcard reviews: Japanese word and sentence → reveal English meaning → Again/Hard/Good/Easy. New items and due items combine; per-card reviews are saved locally and survive page reloads.
- Separate study decks (each Anki deck, Kotoba, All Japanese), searchable browse view, optional daily new-card limits, export of Anki records + reviews + Kotoba metadata as JSON.

## Installation / updating GitHub Pages
1. Export your existing Hanami progress using **Settings → Export progress** first. Do not change the website URL.
2. Extract the V21 ZIP and copy its *contents* into your cloned Hanami GitHub Desktop repository folder. `index.html`, `v21.css`, `vendor/`, `source/`, assets, and service worker must retain their relative paths.
3. Commit to `main` and Push origin. Refresh your GitHub Pages website after the deployment completes.
4. In Hanami, choose **Flashcards → Import Anki .apkg**, select your Anki deck file, and keep “Import audio and pictures” checked to copy media. For the 117 MB Kaishi 1.5k deck, prefer desktop and allow time/space for the media import. If media import cannot fit, uncheck that option and reimport the same deck: existing review dates are preserved.
5. Use Kotoba as you did in V20. Open **Flashcards → Kotoba Mined** to review the exact words you save while watching. If you're on an iPad, use Kotoba Link's JSON transfer workflow.

## Backups, devices and limits
- GitHub Pages **hosts the files**; flashcards, progress, and media reside only inside this browser's **IndexedDB**. They are not synced across devices and may be removed if site data is cleared. No account, cloud, or paid API is required.
- `Settings → Export progress` covers Hanami's main learning state, including Kotoba records, but **does not include the imported Anki database**. Use **Flashcards → Backup cards** to export the Anki cards and their review records as JSON; this backup **does not contain images/audio**. Keep original `.apkg` packages to restore media. On a different device, import `.apkg`, then restore the flashcard JSON to keep reviews.
- There is no automatic bidirectional Anki synchronization or export to Anki scheduling. Anki's original review scheduling is **not imported**; the cards start fresh in Hanami.
- Anki cards and media from third parties may have licensing restrictions; users should only import decks they are entitled to use. Large media import may exceed storage limits on iPad/Safari. No media from Kotoba's video source is copied automatically.
- Real browser import and persistence have **not** been end-to-end validated in this sandbox because sandbox Chromium blocks page navigation. The read-only SQLite importer was verified against the user's actual Kaishi .apkg: 1,501 notes inspected; 1,500 usable vocabulary cards identified and 4,354 referenced media files matched. Review/UI integration passes static syntax and schema checks; please test installation on your device.
