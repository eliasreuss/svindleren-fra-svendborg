# Svindleren fra Svendborg

A mobile-first social deduction party game played in-person using a single device passed around a circle. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build steps.

## How It Works

1. **Add players** and set the number of svindlere (imposters)
2. **Pass the phone around** — each player taps their name to secretly view their screen
3. **Civilians** see a secret word. **Svindlere** are told they are the imposter and must bluff
4. A **lucky wheel** randomly picks who starts by saying a word related to the secret word
5. **Discuss, deceive, and deduce** — the svindler tries to blend in while guessing the word
6. **Reveal the roles** to see who fooled who

## Features

- Supports up to 50 players in a single session
- Custom word list with no repeats within a session
- Lucky wheel animation to pick a random starter
- Imposters know their role but not the word — they must bluff
- Safety screen to prevent accidental reveals
- Dynamic font scaling for long words
- Beautiful, modern UI with playful pastel accents and organic blob shapes
- Fully responsive, mobile-first design
- All interface text in Danish

## Tech Stack

- HTML5
- CSS3
- Vanilla ES6+ JavaScript
- Google Fonts (Fraunces + Nunito)

## Deployment

The app is deployed via GitHub Pages at:

**https://eliasreuss.github.io/svindleren-fra-svendborg/**

To deploy your own copy, fork the repo and enable GitHub Pages from the `main` branch in your repository settings.

## License

MIT
