# Rock Paper Scissors Game

A dual-mode Rock Paper Scissors project featuring a Next-Gen Interactive Web Application and the original Python Console Game. Compete against an AI algorithm with real-time feedback, animations, audio synthesis, and match tracking.

---

## Project Overview

This project provides two distinct ways to play the classic Rock Paper Scissors game:

1. **Modern Web Edition**: A sleek, browser-based battle arena built with semantic HTML5, glassmorphic CSS3, and vanilla JavaScript with Web Audio API sound synthesis and persistent stats.
2. **Python Console Edition**: The classic terminal game built using Python's standard library and random choice algorithms.

---

## Features

### Web Application Edition (`index.html`, `style.css`, `app.js`)

- **Interactive Battle Arena**: Real-time visual showdown between Challenger and AI with dynamic outcome banners.
- **AI Anticipation Animation**: Computer move shuffles dynamically before revealing its choice to create suspense.
- **Live Scoreboard and Stats**: Tracks Player Wins, Computer Wins, Ties, and total Rounds played.
- **Persistent Storage**: Game stats and match history are saved locally in the browser via `localStorage`.
- **Zero-Dependency Sound Effects**: Built-in Web Audio API synthesizer for victory fanfares, defeat tones, shuffle sounds, and button clicks (with sound toggle button).
- **Match History Feed**: Displays recent rounds with weapon showdowns, timestamps, and color-coded outcome badges (WIN / LOSE / TIE).
- **Keyboard Shortcuts**:
  - `1`: Choose Rock
  - `2`: Choose Paper
  - `3`: Choose Scissors
  - `R`: Reset Game Stats
- **Modern Glassmorphism UI**: Dark mode palette, ambient glowing orbs, glowing weapon borders, and responsive design for mobile, tablet, and desktop.

### Python Console Edition (`rockpaperscissorgame.py`)

- Simple, fast CLI gameplay in the terminal.
- Uses Python's `random.choice()` for computer weapon selection.
- Continuous game loop with replay prompt (`y`/`n`).

---

## Project Structure

```text
rockpaperscissorgame-proj/
│
├── index.html              # Modern Web UI structure and semantic layout
├── style.css               # Glassmorphism dark styling, design tokens and animations
├── app.js                  # Game engine, Web Audio synthesis and state persistence
│
├── rockpaperscissorgame.py # Original Python console game
└── README.md               # Project documentation
```

---

## Winning Conditions

The game follows standard Rock Paper Scissors rules:

| Player Weapon | Computer Weapon | Outcome | Rule |
| :--- | :--- | :--- | :--- |
| **Rock** | **Scissors** | **You Win!** | Rock crushes Scissors |
| **Paper** | **Rock** | **You Win!** | Paper covers Rock |
| **Scissors** | **Paper** | **You Win!** | Scissors cuts Paper |
| *Same Weapon* | *Same Weapon* | **Tie!** | Both chose the same |
| *Otherwise* | *Counter Weapon* | **You Lose!** | Computer weapon beats yours |

---

## How to Run

### 1. Running the Web Edition

#### Option A: Direct Browser Launch (Simplest)
Double-click `index.html` in your file manager or right-click `index.html` and select **Open with** (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, or Brave).

#### Option B: Local HTTP Server (Python)
Run a local lightweight server using Python:

```bash
# Navigate to the project directory
cd rockpaperscissorgame-proj

# Start a local web server
python -m http.server 8000
```

Open your browser and visit:
```text
http://localhost:8000
```

---

### 2. Running the Python Console Edition

Make sure Python 3 is installed on your computer.

```bash
# Check Python version
python --version
```

Run the game script in your terminal:

```bash
python rockpaperscissorgame.py
```

#### Example Terminal Output:

```text
enter rock, paper, or scissor: rock
player chose rock
computer chose scissor
you win!

do you want to play again?(y/n): y
enter rock, paper, or scissor: paper
player chose paper
computer chose paper
it is a tie!

do you want to play again?(y/n): n
Thank you for playing
```

---

## Technologies Used

| Area | Technologies |
| :--- | :--- |
| **Frontend UI** | HTML5 (Semantic elements, accessibility `aria-*` tags) |
| **Styling** | Vanilla CSS3 (Custom properties, Glassmorphism, CSS Grid and Flexbox, Keyframes) |
| **Web Logic** | JavaScript ES6+ (DOM manipulation, Web Audio API, `localStorage`, Keyboard Events) |
| **Typography** | Google Fonts (Outfit and JetBrains Mono) |
| **Console Game** | Python 3 (`random` module, `input()`, `while` loops, conditionals) |

---

## Author

**Rishu Shah**  
- Personal project created for practicing programming fundamentals and modern web design.

---

## License

This project is open-source and created for educational purposes. Feel free to use, modify, and improve it for learning and personal projects.
