# Coastline Foundation accessibility improvement plan

_Date:_ 2026-03-18  
_Repo:_ `/Users/swayman/.openclaw/workspace/tmp/Foundationsite`  
_Deploy reality:_ **Render = production**, **GitHub Pages = staging**

## Situation

### Current state
- Live production Lighthouse accessibility score on `https://www.coastlinecollegefoundation.com/`: **78**.
- Top failing audits from the live scan:
  1. `button-name`
  2. `color-contrast`
  3. `link-name`
  4. `meta-viewport`
- At least **three failures are confirmed directly in source**, not just inferred from the scan:
  - **Zoom is restricted on mobile** via `client/index.html`:
    - `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">`
  - **Mobile menu button has no accessible name** in `client/src/components/Layout.tsx:106`.
  - **Footer small text/link contrast is too low** in `client/src/components/Layout.tsx:272, 276, 280`.
- There is also a **repeated navigation composition pattern** that is very likely producing the `link-name` failures:
  - `Link` wrapping `Button` appears in **15 locations** across the app.
  - Example flagged by Lighthouse: `client/src/pages/Home.tsx:416` (`<Link href="/programs"><Button ... /></Link>`).

### Evidence collected
- Live Lighthouse run succeeded locally and wrote results to:
  - `tmp/foundation-live-a11y.json`
- Existing local audit helper exists:
  - `tools/accessibility-compare.mjs`
- But that helper is **not runnable in the current local environment** because `playwright` is missing.

## Likely root causes

### 1) Accessibility was handled as a styling pass, not a release gate
The codebase already has some good baseline intent:
- skip link exists
- focus-visible styles exist
- reduced-motion media query exists
- many images have alt text

But the issues that remain are classic symptoms of no enforced a11y gate:
- accessible names missing on interactive controls
- zoom disabled by viewport setting
- repeated low-contrast text on a dark footer
- inconsistent link/button semantics from component composition

### 2) Design system usage drifted from semantic HTML
The biggest code smell is the repeated pattern of nesting a styled `Button` inside `Link`. The project’s `Button` component already supports `asChild`, which means the codebase had a correct semantic escape hatch but did not standardize on it.

Consequence:
- hidden/empty anchor text states become possible
- nested interactive semantics are more likely
- keyboard/screen reader behavior becomes less predictable

### 3) Visual polish outran contrast discipline
The palette is visually strong, but several small-text combinations use `text-slate-500` on very dark backgrounds (`#06263a` footer). Lighthouse explicitly reported a **3.27:1** contrast ratio where **4.5:1** is required.

### 4) No dependable local accessibility toolchain
There is a local script for Playwright + axe comparison, but it currently fails because required packages are absent. That means the repo has **intent** for regression testing but not a dependable, runnable workflow.

## Prioritized remediation plan

### P0 — fix immediately
These should move the score materially and remove the most avoidable failures.

1. **Restore user zoom on mobile**
   - File: `client/index.html`
   - Change viewport to remove `maximum-scale=1`
   - Recommended:
     - `content="width=device-width, initial-scale=1.0"`

2. **Name the mobile menu toggle**
   - File: `client/src/components/Layout.tsx`
   - Add an accessible label and state:
     - `aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}`
     - `aria-expanded={isMobileMenuOpen}`
     - `aria-controls="mobile-navigation"`
   - Give the mobile nav container an `id="mobile-navigation"`

3. **Fix footer contrast failures**
   - File: `client/src/components/Layout.tsx`
   - Replace low-contrast small text/link colors in the footer bottom bar.
   - Practical direction:
     - avoid `text-slate-500` on `bg-[#06263a]`
     - move to a lighter token such as `text-slate-300` / `text-slate-200`
     - keep hover state lighter, not darker

4. **Stop using `Link` + nested `Button` for navigation**
   - Convert navigational controls to one semantic interactive element.
   - Preferred pattern with current design system:
     - `<Button asChild> <Link href="...">…</Link> </Button>`
     - or style the link directly if it is navigation, not an action
   - Start with routes most likely affecting Lighthouse on the home page and high-traffic paths.

### P1 — stabilize across the site
5. **Systematically replace remaining risky nav compositions**
   - Current count found: **15** `Link`-wrapping-`Button` usages.
   - Sweep pages first:
     - `Home.tsx`
     - `NewsImpact.tsx`
     - `NewsPost.tsx`
     - `Events.tsx`
     - `Programs.tsx`
     - `EventPost.tsx`
     - `About.tsx`

6. **Run page-by-page a11y audit on key templates**
   - Priority routes:
     - `/`
     - `/about`
     - `/programs`
     - `/get-involved`
     - `/news`
     - `/events`
     - one news detail page
     - one event detail page

7. **Review icon-only and motion-heavy controls**
   - Especially header controls, carousel controls, modal close buttons, and any decorative icon wrappers.

### P2 — harden the process
8. **Make accessibility checks reproducible in repo**
   - Add missing dev dependencies so local scripts actually run:
     - `playwright`
     - `@axe-core/playwright`
   - Add npm scripts such as:
     - `a11y:lighthouse:prod`
     - `a11y:lighthouse:staging`
     - `a11y:axe:local`

9. **Gate release promotion on staging accessibility**
   - Since GitHub Pages is staging and Render is production:
     - validate on GitHub Pages first
     - only promote after staging passes agreed thresholds

10. **Add lightweight PR checklist / CI guardrail**
   - “No zoom lock”
   - “All icon-only controls have accessible names”
   - “No Link/Button nesting for navigation”
   - “No Lighthouse accessibility regressions on key templates”

## Process improvements to prevent recurrence

### Recommended operating model
1. **Treat accessibility as a release requirement, not a cleanup task**
   - New baseline target should be part of definition of done.

2. **Standardize semantic component composition**
   - Rule: if it navigates, it should render as a link.
   - Rule: if it triggers in-place UI behavior, it should render as a button.
   - Use `Button asChild` instead of wrapping `Button` inside `Link`.

3. **Create a tiny “critical route” audit set**
   - Home, Programs, Get Involved, News landing, Events landing, one detail page each.
   - That catches most regressions without making checks too heavy.

4. **Audit staging before Render production deploys**
   - GitHub Pages should be the proving ground.
   - Production on Render should not be the first place Lighthouse is checked.

5. **Persist evidence artifacts in `tmp/`**
   - Keep current practice of writing JSON artifacts locally for diffs and morning reports.

## Acceptance criteria

### Minimum acceptable next release
- Lighthouse accessibility score on production-equivalent/staging home page: **90+**
- No failures for:
  - `meta-viewport`
  - `button-name`
  - `link-name`
- No known footer text contrast failures on the shared layout
- Mobile nav toggle announces correct name and state to assistive tech
- Keyboard users can reach and understand all primary navigation controls

### Stronger target
- Accessibility score **95+** on home page and no severe/critical axe violations on key templates.

## First implementation tranche

### Tranche 1A — highest ROI, lowest risk
1. `client/index.html`
   - Remove `maximum-scale=1` from viewport meta.

2. `client/src/components/Layout.tsx`
   - Add accessible name/state to mobile menu button.
   - Add `id` to mobile nav region for `aria-controls`.
   - Update footer bottom-bar text/link colors to accessible values.

3. `client/src/pages/Home.tsx`
   - Replace `Link` + nested `Button` composition on the home page first, especially the instance Lighthouse flagged at line ~416.
   - Use `Button asChild` or direct styled links.

### Tranche 1B — pattern sweep
4. Sweep the other 14 similar `Link`/`Button` compositions across route pages.
5. Re-run Lighthouse on staging, then production after staging passes.

## Gaps / blockers found locally

### Missing local tool dependency
- `tools/accessibility-compare.mjs` currently fails with:
  - `ERR_MODULE_NOT_FOUND: Cannot find package 'playwright'`
- Best fallback used tonight:
  - direct live Lighthouse run via `npx lighthouse`
- Best next action:
  - install the missing Playwright + axe packages and make the script part of the normal audit workflow

### Workspace note
- Repo already has unrelated local modifications present in working tree (`Layout.tsx`, `index.css`, `tools/`, etc.).
- Any implementation work should be careful not to trample those in-progress changes.

## Recommendation

Tomorrow morning, do **one focused accessibility PR** with this order:
1. viewport fix
2. mobile menu accessible name/state
3. footer contrast fix
4. home-page `Link`/`Button` semantic cleanup
5. remaining `Link`/`Button` sweep
6. rerun Lighthouse on GitHub Pages staging before promoting to Render

That is the shortest path to turning the current **78** into a defensible **90+** without a broad redesign.