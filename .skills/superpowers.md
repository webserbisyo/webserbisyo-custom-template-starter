# SUPERPOWERS — ENGINEERING & WORKFLOW DISCIPLINE

This document establishes operational workflows, git hygiene, and verification gates for engineering in WebSerbisyo template repositories.

---

## 1. MANDATORY 100% READ-ONLY DIAGNOSTIC AUDIT BEFORE EDITING

Before modifying code, creating branches, or proposing patches:

1. **Inspect Working Tree:** Confirm `git status` is clean with 0 uncommitted changes.
2. **Review Remote Sync:** Verify branch parity with `origin/<branch>`.
3. **Run Existing Test Gates:** Ensure all pre-existing tests (`npm run check:template && npm run typecheck`) pass.
4. **Identify Affected Contracts:** Map changes against `src/platform/contract.ts` and `scripts/check-template-contract.ts`.

---

## 2. CONTRACT-DRIVEN VERIFICATION GATES

Every modification must pass the 4-tier verification suite before being committed:

```bash
npm run format && npm run check:template && npm run typecheck && npm run build
```

The verification chain executes:

1. `npm run check:template` — Validates 11 contract suites, 17 section sentinels, zero residue, and single footer placement.
2. `npm run typecheck` — Strict TypeScript compilation (`tsc --noEmit`) with 0 errors.
3. `npm run format:check` — Prettier formatting compliance across the codebase.
4. `npm run build` — Next.js Turbopack production build verification.

---

## 3. ZERO CLIENT RESIDUE & DATA LEAKAGE POLICY

- Never include hardcoded client names, venues, dates, or personal contact info in template source files.
- Prohibited residue terms enforced by sentinel scan:
  - `"Princess Anne"`, `"Rafael"`, `"Isabella"`, `"Dianne"`, `"Blue Hour"`, `"Template Starter V2"`.
- Prohibited legacy field patterns:
  - `groomParents`, `brideParents`, `accountName`, `accountNumber`.
- All visual section content MUST derive exclusively from normalized props (`event: EventTemplateData` or `wedding: WeddingTemplateData`).

---

## 4. GIT HYGIENE & ATOMIC COMMITS

1. **Commit Message Format:** Strict Conventional Commits:
   - `feat(template): add falling petals effect`
   - `fix(design): harden contrast on micro-typography`
   - `docs(skills): integrate UI/UX Pro Max, Superpowers, and template contract guidelines`
2. **Branch Isolation:**
   - Always verify current active branch before touching code.
   - Never mix birthday starter features into wedding branches, and vice versa.
