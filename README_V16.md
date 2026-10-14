# Hanami V16 — Listening Immersion & Pitch Studio

## What changed

**Listening Immersion Lab** is under the sidebar. It adds:
- 55 existing original practice conversations (25 everyday + 30 anime-style) in one listen-first dojo, across N5–N1.
- 40 **separate** new, original comprehension passages (eight per JLPT level), withheld from the regular practice list until first blind test. Two four-dialogue sets per tier, with first-exposure recording. To count as two passes, both first-time sets must score four of four **on distinct days**. Replays can be practised, but don't count as fresh evidence.
- Play with adjustable 0.7×–1.15× TTS speed; multiple-choice comprehension is disabled until speech **finishes**. This is still **synthetic speech**, not licensed anime audio or proof of natural listening comprehension.
- First-line dictation with a simple *exact spelling* check, not a general Japanese language scorer. Kanji/kana spelling variants may need manual review.
- Optional microphone-assisted shadowing recording; the recording is temporarily held in the browser tab only. No automatic pronunciation grade.
- A listening-readiness dashboard that requires: completion of Level 100, two separate first-time perfect banks per level on distinct dates, 15 exact dictations, and 20 shadowing practices. **This is an internal practice milestone, not certification and not a guarantee of subtitle-free anime fluency.**

**Pitch Accent Studio** provides:
- Four Tokyo-type pitch-accent categories (heiban, atamadaka, nakadaka, odaka), graphed with *mora* counts and a following particle. For example, **雨 [1]** vs **飴 [0]**, and **箸 [1]** vs **橋 [2]**. Several curated starter examples included.
- Lookup by Japanese spelling, kana or English meaning from the JLPT study library. A contour is shown **only if reference data for that spelling + reading exists**. Unknown pitch is not invented.
- Accent-variant selection when reference data includes multiple possibilities.
- **Download or import Kanjium format** (`accents.txt`): UTF-8 tab-delimited rows `word<TAB>kana-reading<TAB>accent-number[,variant]`. Import happens entirely in the browser, in IndexedDB, allowing a much larger dictionary without a paid API. It is not bundled automatically, to avoid embedding an unverified/oversized third-party data snapshot. Dictionary import is a separate backup from progress JSON; keep your source TSV.
- Live microphone F0 *pitch trace* using browser Web Audio. It estimates a relative contour over time, **not** mora-aligned clinical scoring or native pronunciation accuracy. Microphone requires HTTPS or localhost.

## Install/update

Export your existing Hanami backup before replacing files. Upload all files from this ZIP to the **root** of your GitHub Pages repository, replacing the old files. Reload after deployment. Local saved progress uses the same existing key on the same origin/browser. New V16 progress is added to ordinary progress backups. Large imported pitch dictionaries are in separate IndexedDB storage and aren't included in the small JSON progress backup.

The `Standalone.html` build includes the app's authored scripts, styles, source scene art, and starter pitch demo entries, so it can be opened as one file. Device TTS, recording and local storage depend on browser permissions/capabilities. The optional full OpenJLPT vocabulary/kanji library and optional Kanjium pitch dictionary may require a one-time download/import.

## Open data credits and licensing

- Kanjium pronunciation and pitch-accent additions: credited to **Uros O.**, Kanjium project by `mifunetoshiro`, **CC BY-SA 4.0**. Source: <https://github.com/mifunetoshiro/kanjium>. Refer to the original dataset's license for redistribution obligations. This V16 release does *not* bundle its full third-party accent list; users can import it when acquired from the source.
- This release's new immersion dialogue texts were written for Hanami; no commercial anime scripts were copied.
- The official JLPT cannot certify any app's curriculum or exam scores through a learning milestone. Levels N5–N1 are approximate learning tiers; Hanami Level 100 is not an official N1 diploma or a proof of unassisted comprehension.

## What still needs external validation

A guarantee of comprehending *all* anime without subtitles is not attainable just by building a fixed quiz bank. Actual readiness needs varied, unseen, **native-recorded** audio and performance testing on different genre conventions, background music/noise, accents and unfamiliar vocabulary. Natural-speaker audio licensing is not supplied by this build. Speaking and writing require human or sufficiently capable evaluator feedback; browser TTS and self-recording aren't equivalent.

Automated smoke tests: run `node scripts/audit-v16.cjs` (course/content/data state checks) and see `scripts/smoke-short.py` for browser test examples. First browser visuals tested successfully for the new Immersion and Pitch sections; some attempts at full end-to-end browser navigation in the current sandbox were blocked or timed out by the test environment. We do not claim those checks passed when they did not.
