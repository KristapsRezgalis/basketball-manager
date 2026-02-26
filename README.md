# 🏀 Basketball Manager

A browser-based NBA simulation and management game built with vanilla HTML, CSS, and JavaScript. Pick your team, sim seasons, make trades, run the draft, and build a dynasty — all from a single-page web app with no dependencies or installs required.

---

## 📸 Screenshots

-- will be added soon --

---

## 🎮 Features

- **Season Simulation** — Simulate full NBA seasons game by game or all at once, with a real-time progress bar
- **Exhibition Games** — Pick any home/away matchup from all 30 NBA teams and sim a single game
- **Player Stats & Records** — Track per-game and season totals; single-game and all-time records are maintained across seasons
- **Standings** — Live Eastern and Western Conference standings updated after every game
- **Roster Management** — View and manage your team's full roster with player ratings
- **Player Awards** — Season MVP, scoring champion, and other award tracking
- **Trade System** — Execute player trades between teams and view full trade history
- **NBA Draft** — Annual draft system with prospects generated from a country-based player pool
- **Team Upgrades** — Invest in your franchise's skills and attributes using an upgrade system
- **Basketball Nations** — Dynamic country system where each nation has population, basketball popularity, and player quality ratings that evolve over seasons; select a youth camp country to boost your pipeline
- **Retired Players** — Archive of players who've aged out of the league
- **Playoff Bracket** — Full playoff simulation including Play-In Tournament, Conference Semifinals, Finals, and NBA Championship

---

## 🛠️ Built With

- **HTML5** — Structure and game UI
- **CSS3** — Styling and layout
- **Vanilla JavaScript** — All game logic, simulation engine, and state management (no frameworks or libraries)

---

## 🚀 Getting Started

No build tools, package managers, or servers required.

### Prerequisites

Any modern web browser (Chrome, Firefox, Edge, Safari).

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/KristapsRezgalis/basketball-manager.git
   ```

2. Open the project folder and launch `index.html` in your browser:
   ```bash
   open index.html
   ```
   Or simply double-click `index.html` in your file explorer.

That's it — the game runs entirely in the browser.

---

## 📁 Project Structure

```
basketball-manager/
├── index.html       # Main game UI and all HTML structure
├── styles.css       # All styling and layout
├── script.js        # Game engine, simulation logic, and state
└── images/          # Team logos, icons, and UI assets
```

---

## 🏗️ How It Works

The simulation engine is driven by a set of JavaScript classes — `Team`, `Player`, and `Country` — that hold all game state in memory. When you simulate a game, the engine runs a possession-by-possession calculation using player ratings to determine shot selection, scoring, rebounds, assists, and other stats. Results are accumulated into season totals, standings are recalculated, and records are updated automatically.

The country system adds a long-term strategic layer: each nation's basketball popularity and player quality ratings shift over time, affecting the quality of draft prospects that emerge from that region.

---

## 🗺️ Roadmap

- [ ] Save/load game state to `localStorage`
- [ ] Player progression and aging system
- [ ] Free agency and contract management
- [ ] Salary cap mechanics
- [ ] Coaching staff and game strategy options
- [ ] Mobile-responsive layout

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**
- GitHub: [@KristapsRezgalis](https://github.com/KristapsRezgalis)

---

*Built with ❤️ for basketball fans and simulation game lovers.*
