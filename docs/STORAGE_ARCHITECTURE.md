# STORAGE_ARCHITECTURE

## 1. The decision

**No object storage at v1.** Every visual asset is a static file in the repository, optimized and served through `next/image` on Vercel's CDN. Rationale: all media is known at build time (brand, founders, project shots, article covers); repo storage makes assets versioned, reviewed, and atomic with the content that references them; Supabase Storage would add buckets, policies, and upload paths that nothing uses. The contact form has **no file attachment at v1** for the same reason (plus spam/malware surface) — the success email invites prospects to reply with documents instead.

## 2. Asset organization & conventions

```
public/
├── brand/        orbit-mark.svg · wordmark.svg · favicon.ico · icon-192/512.png ·
│                 apple-touch-icon.png · og-fallback.png
├── images/
│   ├── founders/<slug>.jpg          # 4:5, ≥1200px tall, consistent treatment
│   ├── projects/<slug>/cover.png    # 16:10, ≥1600px wide
│   │   └── shots/NN-description.png # gallery, ordered by prefix
│   └── sections/hero-still.png · ai-pillar-{1,2,3}.png · …   # 3D family stills
└── fonts/        (empty unless a licensed non-Google face arrives)
```

Naming: kebab-case, content-describing, no dates in names (git is the history). Source files (raw 3D renders, PSD/Fig exports) do **not** live in the repo — they live in the team's Google Drive `/Brand/Website Assets`, exported to spec here.

## 3. Optimization pipeline

- Everything renders through `next/image` (AVIF/WebP negotiation, responsive `sizes` mandatory on `fill` images, lazy by default, `priority` only on the per-page LCP image).
- Pre-commit budget check (`scripts/check-assets.mjs`): any `public/images` file >600KB fails; hero still ≤ 250KB; project covers ≤ 350KB. Oversized sources get resized/re-exported, not waived.
- SVGs (brand, glyphs) run through SVGO config in the same script.
- OG images are **generated, not stored** (`/api/og`, API_DOCUMENTATION §2); only `og-fallback.png` exists statically.
- Icons/logos in the StackStrip: local monochrome SVGs (single `currentColor`), never hotlinked.

## 4. When object storage enters (documented triggers)

| Trigger | Response |
|---|---|
| Form attachments approved (v2) | Supabase Storage bucket `lead-attachments`, private; signed upload URL minted in the action; AV-scan/size caps; repository extended; SECURITY_GUIDELINES amended — all in one PR. |
| CMS adoption | Media moves to the CMS's asset service; `next/image` `remotePatterns` opened to exactly that host. |
| Video case studies | Vercel-hosted static ≤ 5MB posters + externally hosted stream (Mux/YouTube-nocookie) — repo never stores video. |

## 5. Guardrails

`next.config.ts` ships with an **empty `images.remotePatterns`** — the build cannot render off-repo images, which enforces this whole document mechanically. Adding a pattern requires editing this file in the same PR.
