# Svindleren fra Svendborg

A mobile-first social deduction party game played in-person using a single device passed around a circle. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build steps.

## How It Works

1. **Add players** and set the number of svindlere (imposters)
2. **Pass the phone around** — each player taps their name to secretly view their word
3. **Civilians** all see the same word. **Svindlere** see a slightly different word
4. **Nobody sees their role** — players must figure out during discussion if they belong to the majority or minority
5. **Discuss, deceive, and deduce** — then reveal the roles to see who fooled who

## Features

- Supports up to 50 players in a single session
- Custom word pairs (civilian vs. imposter)
- No repeat word pairs within a session until all have been used
- Safety screen to prevent accidental word reveals
- Dynamic font scaling for long words
- Beautiful, modern UI with playful pastel accents and organic blob shapes
- Fully responsive, mobile-first design with zoom disabled
- All interface text in Danish

## Tech Stack

- HTML5
- CSS3
- Vanilla ES6+ JavaScript
- Google Fonts (Fraunces + Nunito)

## Deployment

The app is static and requires no build step. It is deployed via GitHub Pages at:

**https://eliasreuss.github.io/svindleren-fra-svendborg/**

To deploy your own copy, fork the repo and enable GitHub Pages from the `main` branch in your repository settings.

## License

MIT
