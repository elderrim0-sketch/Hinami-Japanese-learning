# Hanami V17 — Cinematic Listening & Native Audio

This release extends V16. Existing N5–N1 classrooms, 100-level route, games, focus garden, animation themes, original 95 V16 immersion scenes, and pitch-accent studio remain.

## New listening studio

1. **10 additional original scripted audio dramas**, totaling **160 Japanese dialogue lines**, each with human-authored translation and two comprehension questions. These are stylized interactive 2.5D scenes, played using the device's Japanese speech engine (not a new voice-acted anime). The **ten-episode marathon** steps through the complete anthology. Single scenes are short, not 5–20-minute video episodes; playback length varies greatly by voice and speed.
2. **Automatic subtitle fading** based on repeated perfect episode scores: Japanese + English → Japanese only → no subtitles. The learner can also choose a manual subtitle mode; a scene completed with hints is not awarded a no-subtitle-perfect marker.
3. **16 natural-speech clinics**, including contractions (している→してる, しておく→しとく), quoted って, casual sentence endings, gender/stylized character voice, omissions and slang. A Japanese typed-recall check is required for credit. Simple exact-text comparison cannot judge acceptable variants.
4. **Adaptive weak-point queue:** incorrect comprehension and practice answers add evidence to a per-topic review queue. Successful reviews reduce topic priority. This is rule-based adaptation, not AI diagnosis of Japanese fluency.
5. **An offline native-audio importer** using the user's own downloaded Japanese Common Voice `validated.tsv` and matching audio files. Select a folder on desktop or individual clips on iPad. Files are stored in IndexedDB and then replay locally. It does not redistribute Common Voice recordings, and there are storage limits (up to 1,200 small clips per import; 3 MB maximum each). The original Japanese language dataset is over 14 GB; download from its publisher and extract a manageable selection. Imported blobs are **not** part of the small JSON progress backup. Preserve your files for reimport on a new device.
6. **Native dictation:** answer only after full recorded playback, with the original transcription hidden. Exact normalized Japanese transcription matches on first exposure are tracked separately. Matching written text is not proof of deep comprehension, and readings with different orthography may require manual study.
7. **15 brand-new exclusive blind exam dialogues** split into three five-question sets (N3/N2/N1). Each counts as first-exposure evidence only once, and three passing results (at least 90% per set) must be on three separate dates. **These are still synthesized voices**, not independent native-speaker assessments.
8. **Level 100 Evidence Ledger** requires: completed 100-stage route, three 90% first-attempt blind test banks on distinct dates, at least 30 first-hear native dictations with ≥85% exact transcription across at least three dates, and 12 natural-speech recall patterns. It awards an in-app practice milestone, **not certification or a guarantee** of understanding every anime.

## Install

1. From V16, Settings → Export progress backup.
2. Extract the ZIP and upload every file inside to the GitHub Pages repository root, replacing the previous version.
3. Wait for GitHub Pages deployment and refresh the same website address. Keep the same browser origin to retain local progress. The V17 progress state stays inside the same saved object and is included in the existing JSON export/import flow.
4. Find **Cinematic Listening V17** in the sidebar. The old Listening Immersion Lab and Pitch Accent Studio are unchanged.
5. For human recordings, obtain Common Voice Japanese from the publisher: <https://mozilladatacollective.com/datasets/cmu5xbhnf00fmnq07z9p3aa70>. Download `validated.tsv` and its matching `clips` audio files, then import them locally on each device.

The standalone HTML includes authored scripts, styles, icons, and original game-scene illustrations. Native audio recordings are not bundled. The browser requires local storage and Japanese speech synthesis for some features; microphone capture requires HTTPS or localhost. Audio import files remain browser-local.

## Content rights and evidence

- All new Hanami episode and final-trial transcripts were authored specifically for this release and do not copy anime scripts or subtitles.
- Mozilla Common Voice Japanese is released under CC0, **but the publisher's dataset terms prohibit rehosting or resharing dataset packs** and prohibit speaker reidentification. V17 follows a **user-side import** workflow and does not distribute the corpus. Respect the conditions of any other user-imported content.
- JLPT official sample listening recordings carry copyright restrictions and have **not** been repackaged. See <https://www.jlpt.jp/e/samples/sampleindex.html>.
- Hanami does **not** supply thousands of bundled native voice-acted conversations, nor five-to-twenty-minute produced animated episodes. Those require properly licensed media production and external validation. The original multi-scene player and optional corpus import lay the groundwork without making false claims.
- The in-app milestone is not comparable to an external listening exam, native-speaking tutor evaluation, or actual comprehension of unstudied commercial anime.

## Automated checks

Run `node scripts/audit-v17.cjs` to validate new authored data and script inclusion. See `scripts/smoke-v17.py` for the rendered browser checks on the full single-file app. Automated tests are limited: they do not independently assess Japanese naturalness, evaluate live voices across all platforms, or validate JLPT scoring. Test desktop and iPad audio permissions on the target device.
