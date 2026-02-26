# IT Kamianets Website Bootstrap Theme

Official Angular theme template for public-facing projects inside the IT Kamianets GitHub organization.

This repository serves as a standardized foundation for landing pages, informational websites, and community platforms. It ensures consistent styling, domain configuration, structure, and contribution workflow across all projects.

---

# 🌐 Domain Configuration (CNAME)

This repository includes a `CNAME` file for GitHub Pages deployment.

When using this template:

1. Open the `CNAME` file
2. Replace the domain with the new project domain

Example:

```
voltlab.itkamianets.com
```

If not updated, GitHub Pages will continue pointing to the previous project domain.

Always verify:

- Repository → Settings → Pages
- Custom domain matches `CNAME`
- SSL is enabled

---

# 🎨 Styling & Theme Configuration

Global theme configuration is located in:

```
src/styles.scss
```

Before launching a new project, review and adjust:

### Brand Colors

- `--c-primary`
- `--c-primary-hover`
- `--c-secondary`
- `--c-secondary-hover`

### Background Colors

- `--c-bg-primary`
- `--c-bg-secondary`
- `--c-bg-tertiary`

### Text Colors

- `--c-text-primary`
- `--c-text-secondary`
- `--c-text-muted`
- `--c-placeholder`

### Borders & Elevation

- `--c-border`
- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`

All UI components must rely strictly on CSS variables. Hardcoded colors are not allowed.

---

# 📄 Core Pages (7 Standard Pages)

Every project built from this theme contains the following foundational pages.

---

## 1. Home Page

Purpose:

- Project introduction
- Value proposition
- CTA blocks
- Highlight key features

Used for:

- SEO entry point
- Social sharing
- Brand positioning

---

## 2. About Page

Purpose:

- Describe the organization or project mission
- Present background, values, vision
- Explain ecosystem integration (if applicable)

Used for:

- Credibility
- Transparency
- Partner introduction

---

## 3. Projects Page

Purpose:

- Showcase active initiatives
- List products, tools, or platforms
- Provide navigation to sub-projects

Used for:

- Ecosystem visibility
- Traffic distribution

---

## 4. Community Page

Purpose:

- Present community initiatives
- Events, collaboration, partnerships
- Call to action for joining

Used for:

- Developer onboarding
- Student engagement
- Local ecosystem growth

---

## 5. News / Articles Page

Purpose:

- Publish updates
- Share announcements
- Document progress

Used for:

- SEO growth
- Activity signals
- Public transparency

---

## 6. Contact Page

Purpose:

- Provide official communication channels
- Display email, social links, location
- Allow partnership inquiries

Used for:

- Lead generation
- Business communication

---

## 7. Legal / Policy Page

Purpose:

- Terms of service
- Privacy policy
- Data handling transparency

Used for:

- Compliance
- Trust building
- Public clarity

---

# 📁 Project Structure Overview

```
src/
  app/
    pages/
    components/
  styles.scss
CNAME
CONTRIBUTING.md
```

- `pages/` → main 7 pages
- `components/` → reusable UI elements
- `styles.scss` → global design tokens
- `CNAME` → production domain
- `CONTRIBUTING.md` → contribution workflow

---

# 🤝 Contribution Rules

All contributors must strictly follow `CONTRIBUTING.md`.

This applies to:

- Developers
- External contributors
- AI tools

Core principles:

- Use Conventional Commits
- One logical change per commit
- Proper branch naming
- No direct commits to `master`
- PR must reference an issue

Before starting work:

1. Create a branch
2. Follow naming convention
3. Link GitHub issue
4. Keep commits clean and focused

---

# 🤖 AI Usage Policy

When using AI tools:

- Always provide `CONTRIBUTING.md`
- Enforce commit format
- Enforce branch naming rules
- Review generated code manually
- Do not allow uncontrolled structural changes

AI assists development — it does not define architecture.

---

# 🚀 Deployment

Deployment is managed via:

- GitHub Pages
- `CNAME` domain configuration
- Optional GitHub Actions workflow

After pushing to `master`:

- Verify Pages build status
- Confirm correct domain resolution
- Check SSL certificate

---

# 📜 License

MIT License
