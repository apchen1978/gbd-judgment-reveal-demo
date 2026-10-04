# GBD optional handoff — Owner review

Base: `f78eecc`. Changed source: `index.html`, `index-zh.html`, `styles.css` only.

Adds two optional links in the existing closing context: back to the portfolio GBD section, and the explicitly synthetic buyer-reply walkthrough. Existing demonstration, judgments, boundaries and order remain unchanged.

Validation: `node --check app.js` and `git diff --check` PASS. Chrome checks in ZH/EN at 390, 768 and 1440 found no horizontal overflow or JavaScript page errors. Both links support keyboard focus. Both language versions were clicked to the matching Conversion preview and back, then to the corresponding portfolio GBD anchor.

Cross-repository destinations were routed to local previews for these checks; this is not evidence of deployment. Safari, Firefox, physical phones and screen readers were not tested.

| Language | Mobile 390 | Desktop 1440 |
| --- | --- | --- |
| ZH | [image](gbd-handoff-zh-390.png) | [image](gbd-handoff-zh-1440.png) |
| EN | [image](gbd-handoff-en-390.png) | [image](gbd-handoff-en-1440.png) |

PR only; no merge or deploy. The portfolio language-continuity companion must be released first if Owner approves publication, otherwise the English Conversion destination still uses its old default language.
