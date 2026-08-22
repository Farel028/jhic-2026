---
target: landing page
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-21T13-30-12Z
slug: src-app-page-tsx
---
Method: dual-agent (A: /root/critique_design_a · B: /root/critique_evidence_b)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Selected states exist in interactive sections, but the primary navigation does not communicate the current page. |
| 2 | Match System / Real World | 3 | The Indonesian school language is mostly natural; several acronyms and English labels are unexplained. |
| 3 | User Control and Freedom | 2 | Search and dialogs have exits, but the decorative tour video autoplays without a pause control or reduced-motion playback stop. |
| 4 | Consistency and Standards | 3 | The system is visually coherent, although repeated heading/card grammar becomes formulaic. |
| 5 | Error Prevention | 2 | Seven major links can return users to a section where the selected major is not available. |
| 6 | Recognition Rather Than Recall | 2 | Labels are generally clear, but global search disappears on phone-size viewports and the major menu exposes 11 ungrouped choices. |
| 7 | Flexibility and Efficiency | n/a | This is a Persuade surface; power-user accelerators are not a meaningful success criterion. |
| 8 | Aesthetic and Minimalist Design | 3 | The opening is strong, but too many similarly emphatic sections flatten the hierarchy and extend perceived page length. |
| 9 | Error Recognition and Recovery | 3 | Search has loading, empty, count, and reset states; the homepage has few transactional error flows. |
| 10 | Help and Documentation | n/a | This is a Persuade surface; task documentation is not a core requirement. |
| **Total** | | **21/32** | **Acceptable — strong visual foundation with important findability and trust gaps.** |

## Design Specificity Verdict

**7/10 — authored in its content and imagery, but partially interchangeable in its layout grammar.**

The landing page is unmistakably SMEKDA at its strongest moments: the authentic lineup of 11 students, verified school facts, real principal portrait, vocational programs, school activities, Panda chatbot, and campus virtual tour. Another school could not replace the logo and preserve the same meaning.

Below the hero, the page moves toward a familiar contemporary education-template grammar: eyebrow labels, oversized black headings, rounded cards, metric blocks, broad color bands, and another oversized heading in nearly every chapter. The content remains specific, but the composition does not consistently draw from SMEKDA's workshops, technical disciplines, uniforms, student artifacts, or documentary material.

The deterministic scan returned **0 findings** for `src/app/page.tsx`. That is not equivalent to a clean whole landing page: the target delegates much of the page to imported homepage components, and the required scan was intentionally run only once against the named source file. The detector therefore adds no confirmed anti-pattern to this run and exposes a coverage boundary rather than contradicting the design review.

No reliable visual overlay is available. Both fresh in-app browser attempts failed before tab creation with `codex/sandbox-state-meta: missing field sandboxPolicy`. The live route itself returned HTTP 200 with the expected title, hero identity, and program content, so the fallback evidence is responsive source inspection plus verified assets—not screenshots.

## Overall Impression

The first viewport is confident, credible, and more product-specific than a typical school landing page. The 11-student hero communicates vocational breadth without unnecessary copy. The biggest opportunity is to make the rest of the experience fulfill that opening promise: all programs must be discoverable, mobile users must retain search, and lower sections should use evidence forms that feel native to a vocational school instead of repeating generic marketing cards.

## What's Working

1. **The hero makes identity visible.** The authentic student lineup, concise slogan, school name, and `11 / A / 1912` proof strip establish school pride and vocational breadth immediately.
2. **Trust is handled responsibly.** School facts cite their source, BKK figures are qualified, and SPMB copy explicitly avoids presenting an expired cycle as current information.
3. **The interaction baseline is thoughtful.** The site includes a skip link, visible global focus styling, keyboard-aware tabs and dropdowns, native dialogs, Escape recovery, meaningful alt text, ticker pause behavior, and reduced-motion rules for CSS animation.

## Cognitive Load

**Moderate: 2 of 8 checklist items fail.**

- **Chunking fails:** the Jurusan dropdown exposes 11 sibling options at once instead of using the existing five program categories.
- **Minimal choices fails:** desktop navigation shows six top-level destinations, then expands Jurusan into 11 ungrouped decisions.
- Single-focus sections, grouping, visual hierarchy, sequential reading, working-memory support, and progressive disclosure otherwise pass.

The highest-load decision points are the six-item desktop navigation and the 11-item Jurusan submenu. Footer groups contain five links each, but they are lower risk because the footer behaves as a reference index rather than a primary decision point.

## Emotional Journey

- **Opening peak:** The real 11-student lineup is memorable, confident, and specific.
- **Trust build:** Sourced facts, principal portrait, authentic activities, and honest SPMB status reinforce credibility.
- **Mid-page valley:** Repeated giant headings and similar card groups make multiple sections compete to be a peak without adding equally strong evidence.
- **Second peak:** The immersive virtual-tour video is product-specific and memorable, but autoplay, motion, and bandwidth costs can weaken that moment.
- **Ending:** The admissions block is honest and reassuring, although users have already traveled through a long page before reaching the consequential action.

## Priority Issues

### [P1] The promise of 11 programs resolves to only four explorable programs

**Why it matters:** The hero promises 11 programs, navigation and search expose 11 names, but the homepage explorer presents four details. Seven links return to `/#jurusan`, where the selected program is not available. This is a trust and task-completion failure, especially for prospective students and parents.

**Fix:** Either turn the section into a complete, categorized 11-program catalog with honest incomplete-detail states, or explicitly label it as a four-program editorial preview and provide a complete destination that preserves the selected program context.

**Suggested command:** `$impeccable shape`

### [P1] Global search disappears on phone-size viewports

**Why it matters:** Search is a core capability for a broad audience. Below the `sm` breakpoint, users must understand the full navigation taxonomy instead of searching directly for terms such as jurusan, biaya, alamat, prestasi, or SPMB.

**Fix:** Keep a 44px search trigger beside the mobile-menu button or place a clearly labeled `Cari di website` action at the beginning of the mobile dialog. Preserve the existing ranked results, live count, empty state, Escape handling, and focus return.

**Suggested command:** `$impeccable adapt`

### [P1] The hero proof strip is too small and too weak in contrast on mobile

**Why it matters:** Its labels use roughly 9.3px text and translucent white on light blue. Calculated contrast is about 2.05:1 for the labels, while full-white numbers on that blue are about 2.54:1. These are the hero's trust signals, yet they become hardest to read in mobile and outdoor conditions.

**Fix:** Darken the strip for white text or use dark ink on the current light blue, raise labels to at least 12px, and allow a less compressed mobile arrangement if three columns cannot breathe.

**Suggested command:** `$impeccable colorize` and `$impeccable adapt`

### [P2] Off-screen autoplay media creates avoidable motion and bandwidth cost

**Why it matters:** The virtual-tour section mounts a roughly 25 MB looping MP4 below the fold. CSS reduced-motion rules do not stop HTML video playback, and the video has no user-facing pause control. This can hurt mobile data users, motion-sensitive visitors, and the intended emotional impact of the tour.

**Fix:** Add a poster, activate playback only near the viewport, pause it when off-screen, disable autoplay under reduced motion or Save-Data, and expose pause/play when continuous motion remains visible.

**Suggested command:** `$impeccable optimize` and `$impeccable harden`

### [P2] Below-fold sections repeat a generic oversized-heading and card cadence

**Why it matters:** Consistency turns into sameness when nearly every chapter uses the same oversized black heading, eyebrow, broad color band, and rounded cards. Emotional emphasis becomes flat, and authentic vocational evidence receives less visual authority than generic section furniture.

**Fix:** Reserve maximum typographic scale for two peaks. Give other chapters distinct evidence forms: a categorized program matrix, workshop or project imagery where sources permit, technical labeling motifs, documentary thumbnails, and quieter supporting typography.

**Suggested command:** `$impeccable layout`

## Persona Red Flags

### Jordan — First-time visitor

- Acronyms such as BKK, MOU, RPL, DPIB, and TITL are not consistently expanded at first use.
- The page promises 11 programs but visually explains four without saying whether they are featured, complete, or simply the only available details.
- Primary navigation lacks a current-page indicator, reducing location confidence.
- The explicit closed-SPMB message is a strong reassurance pattern worth preserving.

### Riley — Deliberate stress tester

- Selecting or searching for one of seven majors without a detail slug returns to a section where that major cannot be selected.
- Search repeats the unresolved destination, so it cannot recover the catalog gap.
- The difference between 11 official programs, four detailed programs, and 11 navigation entries has no explicit content-status model.

### Casey — Distracted mobile visitor

- Global search is absent below 640px, making the menu the only discovery path.
- The roughly 9.3px hero fact labels and low-contrast blue strip are difficult to scan one-handed or outdoors.
- A large off-screen looping video is risky on mobile data and provides no pause mechanism.
- The concise CTA-free hero is a strength: once the proof strip is readable, its identity and student image are immediately understandable.

## Minor Observations

- Add `aria-current="page"` to the active primary navigation item.
- Replace `Alumni journey` with consistent Indonesian terminology unless the English phrase is institutionally required.
- Expand `Bursa Kerja Khusus (BKK)` and `memorandum of understanding (MoU)` on first use.
- Translate `Project-based learning` and `Workshop` where an official English term is not required.
- Latest-story cards feel visually anonymous despite traceable school media being available.
- External links should consistently state whether they lead to the legacy school site, BKK, or the official Jatim portal.
- Preserve the ticker's pause behavior, reduced-motion fallback, and the mobile menu's explicit labels and closed-SPMB notice.

## Questions to Consider

1. Should the program section become an authoritative all-11 catalog, or remain a clearly labeled four-program editorial preview?
2. Should mobile search become a first-class header action, or the first action inside the mobile menu?
3. Which two moments deserve maximum visual volume: hero plus program decision, or hero plus virtual tour?
4. Should the lower page draw more directly from workshop labels, technical drawings, uniforms, student artifacts, and documentary school media?
