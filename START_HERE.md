# Hanami V20 — Kotoba connected

## First-time setup
1. Install or update Kotoba Miner to **v2.6** (the companion ZIP). Use `chrome://extensions` > Developer mode > Load unpacked, selecting the extension folder that contains `manifest.json`. Replace the older v2.5.4 extension if necessary. **Export a Kotoba backup first.**
2. Upload the Hanami V20 ZIP contents to your **existing** GitHub Pages repository; keep the same URL to preserve browser study progress. Export a Hanami backup before updating.
3. Open Kotoba extension popup > **Connect to Hanami**. Paste the **exact URL** of your Hanami GitHub Pages app, e.g. `https://USER.github.io/hanami/`, then press **Pair and activate sync** and approve the browser permission.
4. Reload your Hanami page. Open **Kotoba Link** in the sidebar, press **Sync with Kotoba**.
5. Watch anime with Kotoba. Choose a word and click **Save to Hanami (no Anki needed)** in its card editor. Newly saved Anki notes are captured for Hanami as well. The paired Hanami page receives updates while open.
6. In Hanami, open **Kotoba Link**, select a mined word, play its Japanese sentence, reveal its meaning, and rate your comprehension.

## Alternate mode (iPad / standalone HTML / browser without extension)
Open the Kotoba pairing page, click **Export Kotoba → Hanami JSON**, then import the JSON in Hanami > Kotoba Link. The extension does not run on iPad Safari. This is file transfer, not live sync.

## Privacy and accurate progress
- Everything lives in the browser/extension on your device. No login or third-party sync server.
- Pairing only authorizes the explicit Hanami website you enter. You may disconnect from Kotoba's pairing page.
- Vocabulary already marked known in Kotoba is shown as a label; Hanami does **not** automatically credit it as memorized.
- **Previously mined sentence text was not retained in old Kotoba releases**. New saves include sentence, reading, meaning, source title and timestamp; old vocabulary flags and up to 80 recent saved word labels can be imported without inventing missing context.
- Audio/video from Kotoba are **not** copied into Hanami. Play a sentence using Hanami's configured voice or open the original source link.
- This is a comprehension review tool, not an estimate of actual anime listening percentage.

## V21: Flashcard Studio
Hanami now has a dedicated **Flashcards** sidebar section: import an Anki `.apkg` deck, study the word meaning with optional images/audio, and review Kotoba mined words in the same queue. No extension update beyond Kotoba v2.6 is needed. See `README_V21.md`. The separate Flashcards → Backup cards export does not include imported media; keep the original `.apkg` as a media backup.
