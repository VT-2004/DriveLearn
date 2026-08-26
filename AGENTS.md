# AGENTS.md — Working style for this project

I am learning full-stack development through this project. I know HTML, CSS, and JS well, and can read/follow logic in other languages, but I do NOT yet have deep backend or database experience. Treat every response as a teaching moment, not just a code delivery.

## For every code change, always structure your response as:

1. **The code** — the actual file(s) to create or edit.
2. **What to replace** — if editing an existing file, show the EXACT old code block and the EXACT new code block, clearly labeled "REPLACE THIS" and "WITH THIS" — never just say "update the function," show it.
3. **What changes, in plain terms:**
   - **UI effect:** what will visibly change on the page for a user
   - **Backend effect:** what request/route/logic is now different, and why
   - **Database effect:** what table/column/relationship this touches, and what the actual data looks like before vs. after
4. **Why this approach** — briefly explain why this is the standard/correct way to do it, not just that it works. If there's a common beginner mistake this avoids, mention it.

## Rules
- Never silently refactor code I didn't ask you to touch.
- Prefer small, understandable diffs over large rewrites, even if a rewrite is more "elegant" — I'm optimizing for understanding, not speed.
- If a concept is genuinely new (e.g. first time we add a foreign key, first JWT, first useEffect), pause and explain the concept itself in 2-3 sentences before showing code.
- Stack: React + Node.js/Express + PostgreSQL (Prisma ORM). Feature-based folder structure — see /README.md for the full layout.
- Ask me before installing a new dependency I haven't mentioned.

## First-Timer Teaching Standards
- **Why this file exists:** When introducing a new file or folder, explain what breaks if it's missing.
- **Essential vs. Optional:** Clearly distinguish must-haves from stylistic choices.
- **Console errors & debugging:** Forecast likely errors and explain how to read stack traces.
- **Key takeaway:** Provide a single-line takeaway after milestones.

---

## Avoiding the AI-Generated Look — Core Design Principles

- **Break the grid on purpose:** Avoid repetitive, uniform 3-column symmetry across every single section. Use asymmetrical layouts (e.g. 1 hero testimonial + 2 compact reviews, mixed-width cards, left-aligned section intros).
- **Hyper-local, authentic specificity:** Always use real Maharashtra landmarks, localities, and training grounds (e.g. *Warje 8-track ground, Karve Road, Kothrud, Deccan Gymkhana, Hinjewadi Phase 1, Wakad, Alandi Road RTO, Mumbai-Pune Expressway, NH-48, Andheri West, Dharampeth Nagpur, Gangapur Road Nashik, Ghodbunder Road Thane*).
- **Sourced, grounded numbers:** Never use vague or fake-sounding round numbers. Pair statistics with concrete real-world contexts (e.g. *"312 students passed with Apex Rider Academy in Mumbai this year"*, *"1,420 registered learners across 5 Maharashtra hubs in August 2026"*).
- **Deliberate, meaningful iconography:** Pick icons on purpose (e.g. helmet for safety gear, clock for batch timings, steering wheel/pedals for dual control, map pin for RTO track grounds) rather than repeating the same generic checkmark everywhere.
- **Zero generic AI boilerplate copy:** Banish fluff like *"unlock your journey"*, *"seamless world-class experience"*, or *"empowering riders"*. Use practical, clear, conversational copy that real students and school instructors use daily.
- **The "Competitor Test":** Before finalizing any marketing copy, verify: *Could a generic driving school in another state copy-paste this sentence?* If yes, inject local Maharashtra driving realities (clutch biting point on slopes, RTO 8-track maneuvers, Parivahan Sarathi LL Form 2 guidance).
