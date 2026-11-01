# Portfolio update: review package (nothing published)

Drop-in replacement for the `portfolio_site` repo contents. Plain static HTML/CSS/JS, no build step.
Not pushed anywhere. Upload to a branch (or replace the files) only after you approve.

## Files
index.html, css/style.css, js/main.js, pages/{projects,ilicense,design,about,contact}.html, images/ (optimized, ~1.7 MB total)

## Content decisions applied (all from your messages and resume)
- Name Adrian Almacen everywhere; expected graduation June 2027; (c) 2026
- Email adrianalmacen1@gmail.com, LinkedIn linkedin.com/in/adrian-almacen, location Lucban, Quezon. No phone number, no contact form
- Skills follow the resume: Java, C, C# (no levels); Unity, Android Studio, Blender, Firebase, SQLite; Figma, Canva, MS Office, Google Workspace, Windows OS
- NOT listed: HTML, CSS, JavaScript, Photoshop (not on resume, not confirmed)
- iLicense: Lead Developer, team project, no teammate names, testing described generally (no respondent count), no award year, Blender credit worded so it does not claim every asset
- Firebase/SQLite described only as supporting admin monitoring of quiz activity and progress
- Hook: developed independently (Android Studio, Java, XML), Drive source link kept
- Design page: Party Vault (social media materials, publication graphics) kept separate from academic JAFI work (Canva only)
- About: all four roles kept, Catering Staff 2022-2026

## Removed
Bosi name, VA/freelance positioning, orbs, grain overlay, marquee, numbered cards, CTA glow banner, pulsing dots, scroll-progress bar, dead contact-form code, WhatsApp number, fake "@email.com" address, the three sample admin documents (labeled "Sample", invented names), placeholder text ("Paste your Drive link above", YOUR_ID), Photoshop / HTML-CSS-JS claims.

## Technical fixes
Theme set in <head> (no flash, storage in try/catch); content visible without JS; reduced-motion fully respected; fonts via preconnect + display=swap (8 weights down to 6); muted text contrast raised (lowest ratio now 5.3:1, was about 3.2:1); aria-current nav; Esc closes mobile menu; lightbox uses native <dialog> with arrow keys; width/height on all images; favicon, per-page titles/descriptions, Open Graph basics.

## Contact tweaks (round 2)
Contact links now use the text colour (accent on hover only); lining numerals so the "1" in the email reads clearly; Copy button next to the email (works on file:// and https).

## Still open
1. Resume PDF is not linked: it contains your phone number. Supply a public-safe copy to add a Download button.
2. Resume still says iLicense "2026 - Present" and lacks the award; Cisco Packet Tracer and basic networking (in your brief) are not on the resume, so not on the site. Add them?
3. Award year / awarding body; where iLicense is deployed.
4. Canonical URL, og:image and sitemap need the final live URL.
5. Delete admin-*.jpg and old copies from the repo; the phone number and sample documents remain in git history.
6. Fonts load from Google Fonts online; previews here used fallback fonts.
