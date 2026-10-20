# Md Riad — Animated Developer Portfolio

A responsive dark portfolio website with animated interactions and a live public GitHub repository feed.

## Features

- Responsive layout for desktop, tablet and mobile
- Animated typing headline
- Scroll reveal transitions
- Animated code-window hero illustration
- Hover states and interactive navigation
- Featured CampusOne Web, CampusOne Android and Blood Donation Management projects
- Live repository cards loaded from the GitHub public API
- Reduced-motion support for accessibility
- No build step or package installation required

## Run locally

1. Download and extract this project.
2. Open the `riad-animated-portfolio` folder in VS Code.
3. Open `index.html` in your browser, or use the VS Code Live Server extension.

The live GitHub repository section needs an internet connection.

## Personalize

- Update your bio and featured project descriptions in `index.html`.
- Update featured project URLs if repository locations change.
- Change colors and layout in `style.css` using the CSS variables at the top.
- Edit the animated headline phrases in `script.js`.
- The live repository feed currently uses the GitHub username `mdriad-dev`.

## Deploy with GitHub Pages

1. Create a repository on GitHub, for example `riad-portfolio`.
2. Upload `index.html`, `style.css`, `script.js` and `README.md` to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for the Pages deployment to finish. Your website URL will be shown in the Pages settings.

## Notes

This is a static website. It does not require API keys or expose secrets. Repository loading uses the unauthenticated public GitHub API, which may be rate-limited occasionally.
