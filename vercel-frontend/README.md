# Umut Uygur Portfolio Frontend

This folder is the Vercel frontend project. Deploy only this directory to Vercel so the Spring Boot backend and AWS CI/CD pipeline can stay in the repository.

Recommended Vercel settings:

- Production URL: `https://umut-uygur.vercel.app/`
- Framework preset: Other
- Root directory: `vercel-frontend`
- Build command: leave empty
- Output directory: `.`

If Vercel gives a different production URL, update the URL in `index.html`, `robots.txt`, and `sitemap.xml`.
