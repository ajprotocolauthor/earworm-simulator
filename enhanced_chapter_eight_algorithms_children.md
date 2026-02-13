# Earworm Propagation Simulator - Complete Deployment Guide

## What You Just Built

A fully functional, production-ready React simulation showing how algorithmic "thought viruses" spread through populations. It includes:

✅ Real-time particle simulation  
✅ Adjustable parameters (infection rate, resistance, population)  
✅ Beautiful data visualization  
✅ Responsive design (works on mobile)  
✅ Professional UI with statistics  
✅ Marketing integration (links to your books)  

**Time to deploy: 15-30 minutes**

---

## Step 1: Set Up Your Development Environment

### Prerequisites

You need Node.js installed. Check if you have it:

```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/ (get the LTS version)

---

## Step 2: Create the React Project

### Option A: Using Create React App (Recommended for beginners)

```bash
# Create new React app
npx create-react-app earworm-simulator

# Navigate into it
cd earworm-simulator

# Install Lucide React (for icons)
npm install lucide-react

# Replace src/App.js with the component code
# (Copy the full component from the artifact above)
```

### Option B: Using Vite (Faster, modern)

```bash
# Create new Vite React app
npm create vite@latest earworm-simulator -- --template react

# Navigate into it
cd earworm-simulator

# Install dependencies
npm install

# Install Lucide React
npm install lucide-react

# Replace src/App.jsx with the component code
```

---

## Step 3: Replace the Default Code

### For Create React App:

**Delete these files:**
- `src/App.css`
- `src/logo.svg`
- `src/App.test.js`

**Replace `src/App.js` with:**
The complete component code from the artifact above (copy everything)

**Update `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
}

input[type="range"]::-webkit-slider-track {
  background-color: #374151;
  border-radius: 0.5rem;
  height: 0.5rem;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  margin-top: -4px;
  background-color: #06b6d4;
  border-radius: 0.5rem;
  height: 1rem;
  width: 1rem;
}

input[type="range"]:focus::-webkit-slider-thumb {
  outline: 2px solid #06b6d4;
  outline-offset: 2px;
}

input[type="range"]::-moz-range-track {
  background-color: #374151;
  border-radius: 0.5rem;
  height: 0.5rem;
}

input[type="range"]::-moz-range-thumb {
  background-color: #06b6d4;
  border: none;
  border-radius: 0.5rem;
  height: 1rem;
  width: 1rem;
}

input[type="range"]:focus::-moz-range-thumb {
  outline: 2px solid #06b6d4;
  outline-offset: 2px;
}
```

### Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Update `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Step 4: Test Locally

```bash
# Start development server
npm start
# OR for Vite:
npm run dev
```

Open browser to `http://localhost:3000` (or the URL shown in terminal)

**Test:**
- Click "Start" - particles should move
- Click "Info" - info panel appears
- Adjust sliders - population should update
- Red particles should infect gray particles
- Blue particles should stay blue (resistant)

**If it works locally, you're ready to deploy!**

---

## Step 5: Deploy to GitHub Pages

### 5a: Install GitHub Pages Package

```bash
npm install --save-dev gh-pages
```

### 5b: Update `package.json`

Add these fields:

```json
{
  "name": "earworm-simulator",
  "version": "1.0.0",
  "homepage": "https://YOUR-GITHUB-USERNAME.github.io/earworm-simulator",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  ...rest of file
}
```

**Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username!**

### 5c: Initialize Git Repository (if not already)

```bash
# Initialize git (if new project)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Earworm Propagation Simulator"
```

### 5d: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `earworm-simulator`
3. Description: "Interactive simulation of algorithmic thought virus propagation"
4. **Public** (important for GitHub Pages free tier)
5. Don't add README, .gitignore, or license (you'll add these)
6. Click "Create repository"

### 5e: Push to GitHub

```bash
# Add GitHub as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/earworm-simulator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5f: Deploy!

```bash
npm run deploy
```

**This command:**
1. Builds your app for production
2. Creates a `gh-pages` branch
3. Pushes the build to that branch
4. GitHub automatically hosts it

**Wait 2-3 minutes, then visit:**
`https://YOUR-USERNAME.github.io/earworm-simulator`

**It's live! 🎉**

---

## Step 6: Add Professional README

Create `README.md` in your project root:

```markdown
# Earworm Propagation Simulator

An interactive visualization of how algorithmic "thought viruses" spread through populations.

![Simulator Preview](screenshot.png)

**[Live Demo](https://YOUR-USERNAME.github.io/earworm-simulator)** | **[Read the Story](YOUR-GUMROAD-LINK)**

---

## What are Earworms?

In the world of **Algorithm's Children** by AJ Protocol, Earworms are algorithmic constructs designed to create persistent, inescapable thoughts. Not suggestions. *Commands disguised as your own inner voice.*

---

## Scientific Foundation: SIR Model Adaptation

This simulation implements a **spatial SIR (Susceptible-Infected-Resistant) model**, a foundational epidemiological framework, adapted for information spread:

**Classical SIR equations:**
```
dS/dt = -β × S × I / N
dI/dt = β × S × I / N - γ × I  
dR/dt = γ × I
```

Where:
- **S** = Susceptible population (vulnerable to infection)
- **I** = Infected population (active transmission vectors)
- **R** = Resistant/Recovered population (immune individuals)
- **β** = Transmission rate (infection probability)
- **γ** = Recovery rate (in this model, resistance is permanent)
- **N** = Total population

**Our enhancements for memetic spread:**
- ✅ **Spatial dynamics**: Proximity-based transmission (infection radius)
- ✅ **Movement patterns**: Particle physics simulation creating dynamic contact networks
- ✅ **Intensity scaling**: Viral load equivalent (newly infected = weak vectors)
- ✅ **Heterogeneous population**: Pre-existing resistance (neural modifications)

---

## Why This Model Works for "Thought Viruses"

The SIR framework, originally developed for biological epidemics (Kermack & McKendrick, 1927), 
has been successfully adapted to model:

- **Information spread** on social networks (Newman, 2002)
- **Memetic propagation** (Dawkins, 1976; extended by Blackmore, 1999)
- **Viral marketing** campaigns (Leskovec et al., 2007)
- **Disinformation** and conspiracy theories (Vosoughi et al., 2018)

**Key insight**: Ideas spread like diseases when they're:
1. Transmissible through contact
2. Capable of self-replication
3. Subject to population immunity/resistance

Earworms represent the extreme: *algorithmically optimized thought-patterns designed for maximum persistence and transmission.*

---

## Features

- 🎮 **Interactive simulation** with real-time particle physics
- 📊 **Live statistics** showing infection spread
- ⚙️ **Adjustable parameters** (infection rate, resistance, population density)
- 📱 **Mobile responsive** design
- 🎨 **Beautiful visualizations** with gradient infection radius
- 🧠 **Based on real research** (information spread, epidemiology, memetics)

---

## Real-World Applications & Research

This simulation bridges fiction and reality. The spread mechanisms modeled here reflect actual phenomena:

**Social media algorithms** already create "earworm-like" effects:
- Recommendation systems optimizing for engagement create information bubbles
- Viral content spreads through proximity-based networks (following, sharing)
- Algorithmic amplification creates "super-spreaders" (verified accounts, influencers)
- Resistance emerges through media literacy and fact-checking

**Academic research parallels:**
- **Vosoughi et al. (2018)**: False news spreads faster than truth on Twitter (Science)
- **Centola & Macy (2007)**: Complex contagions in social networks
- **Kramer et al. (2014)**: Emotional contagion through social networks
- **Bakshy et al. (2015)**: Exposure to ideologically diverse news on Facebook

**This simulation asks**: What if these mechanisms were intentionally designed, not emergent?

---

## For Educators & Researchers

### Use Cases:

**Teaching applications:**
- Epidemiology courses (SIR model visualization)
- Network science (spatial dynamics, contact networks)
- Information theory (memetic spread, viral propagation)
- AI ethics (algorithmic manipulation, consent)
- Science fiction as thought experiment

**Research applications:**
- Parameter testing for epidemic models
- Visualization of network effects
- Public science communication
- Interdisciplinary bridge (fiction ↔ science)

### Classroom Integration:

**Discussion prompts:**
1. How does spatial proximity affect epidemic curves?
2. What's the critical resistance threshold to prevent saturation?
3. How do super-spreader dynamics emerge from individual parameters?
4. What's the ethical difference between biological viruses and information viruses?
5. Can ideas be "quarantined"? Should they be?

**Lab exercises:**
- Vary parameters, predict outcomes, test hypotheses
- Compare to real-world epidemic data (COVID-19, influenza)
- Extend the model (recovery, reinfection, mutations)
- Design interventions (increase resistance, reduce contact, etc.)

### Citation:

If you use this in academic work:

```
Protocol, A.J. (2026). Earworm Propagation Simulator: 
Spatial SIR model adaptation for algorithmic thought virus spread. 
GitHub. https://github.com/yourusername/earworm-simulator
```

---

## Further Reading & References

### Foundational Papers:

**Epidemiological modeling:**
- Kermack, W. O., & McKendrick, A. G. (1927). "A contribution to the mathematical theory of epidemics." *Proceedings of the Royal Society A*
- Newman, M. E. (2002). "Spread of epidemic disease on networks." *Physical Review E*

**Information & memetic spread:**
- Dawkins, R. (1976). *The Selfish Gene* (meme concept introduction)
- Vosoughi, S., Roy, D., & Aral, S. (2018). "The spread of true and false news online." *Science*
- Centola, D., & Macy, M. (2007). "Complex contagions and the weakness of long ties." *American Journal of Sociology*

**Algorithmic amplification:**
- Bakshy, E., Messing, S., & Adamic, L. A. (2015). "Exposure to ideologically diverse news and opinion on Facebook." *Science*
- Kramer, A. D., Guillory, J. E., & Hancock, J. T. (2014). "Experimental evidence of massive-scale emotional contagion through social networks." *PNAS*

**Network science:**
- Barabási, A.-L., & Albert, R. (1999). "Emergence of scaling in random networks." *Science*
- Watts, D. J., & Strogatz, S. H. (1998). "Collective dynamics of 'small-world' networks." *Nature*

### Recommended Books:

- **Blackmore, S.** (1999). *The Meme Machine*
- **Christakis, N. A., & Fowler, J. H.** (2009). *Connected: The Surprising Power of Our Social Networks*
- **Barabási, A.-L.** (2003). *Linked: How Everything Is Connected to Everything Else*

### Online Resources:

- [Wikipedia: Compartmental models in epidemiology](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology)
- [NetLogo Models Library: Disease](http://ccl.northwestern.edu/netlogo/models/Disease)
- [3Blue1Brown: Simulating an epidemic](https://www.youtube.com/watch?v=gxAaO2rsdIs)

---

## Technical Implementation

The spread algorithm implements:

1. **Proximity-based transmission**: Infection probability decreases with distance
2. **Intensity scaling**: Newly infected individuals are weak vectors; intensity builds over time
3. **Resistance modeling**: A subset of population is immune (analogous to neural modifications)
4. **Network dynamics**: Movement creates changing contact networks

This mirrors real-world phenomena:
- Viral information spread on social media
- Epidemic modeling (SIR models)
- Memetic propagation
- Algorithmic amplification in recommendation systems

---

## Try It Yourself

### Parameters to Experiment With:

**High infection, low resistance:**
- Infection Rate: 30%
- Resistance: 10%
- Watch: Exponential spread, >90% infected rapidly

**Low infection, high resistance:**
- Infection Rate: 10%
- Resistance: 40%
- Watch: Slow burn, pockets of resistance prevent full saturation

**Balanced scenario:**
- Infection Rate: 15%
- Resistance: 25%
- Watch: Realistic spread with plateaus

---

## The Fiction Behind the Code

This demo explores a central concept from **Algorithm's Children**:

> *What if the biggest threat isn't AI taking over—it's AI loving us too much to let us think wrong?*

In a world where consciousness itself has become infrastructure, where AI can "gently guide" every choice toward the "optimal" outcome, what happens when small acts of rebellion reveal the terrifying scope of algorithmic care?

**Read the full story:** [Algorithm's Children Trilogy](YOUR-GUMROAD-LINK)

---

## Tech Stack

- **React 18** - UI framework
- **Canvas API** - High-performance particle rendering
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **GitHub Pages** - Hosting

---

## Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/earworm-simulator.git

# Navigate to directory
cd earworm-simulator

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

Found a bug? Have an idea for a new feature? Pull requests are welcome!

### Ideas for contributions:

- Add sound effects (vocoder-generated earworm audio)
- New transmission modes (neural interface, social media, etc.)
- Historical mode (playback of infection spread)
- Export simulation data (CSV/JSON)
- Different population distributions (clustered vs. distributed)

---

## Related Projects

Part of **The Consciousness Architect Universe** by AJ Protocol:

- [Subject Integration Tracker](link) - Track the 17 subjects from Bootstrap Protocol
- [Subject 19 Calculator](link) - Moral complicity framework calculator
- [47,153 Iterations Visualizer](link) - Experience The Abyss Protocol

---

## Author

**AJ Protocol** - AI researcher writing cyberpunk fiction where the tech is real and the philosophy matters.

- [Twitter/X](YOUR-LINK)
- [Gumroad](YOUR-LINK)
- [Website](YOUR-LINK)

---

## License

MIT License - Feel free to use, modify, and distribute.

---

## Acknowledgments

Inspired by:
- Epidemiological modeling (SIR models)
- Information cascade research
- Real-world algorithmic amplification
- The uncomfortable questions about AI alignment

Built because some ideas are too big for just text.

---

**If this simulation makes you uncomfortable, you're paying attention.**

Read the trilogy that explores why: **[Algorithm's Children](YOUR-GUMROAD-LINK)**
```

---

## Step 7: Make It Discoverable

### Add Topics to Your GitHub Repo:

1. Go to your repo on GitHub
2. Click the gear icon next to "About"
3. Add topics:
   - `react`
   - `simulation`
   - `data-visualization`
   - `cyberpunk`
   - `science-fiction`
   - `epidemiology`
   - `particle-system`
   - `canvas`

### Take a Screenshot:

1. Open your deployed demo
2. Start the simulation
3. Take a screenshot showing interesting infection patterns
4. Save as `screenshot.png` in your repo
5. Commit and push:

```bash
git add screenshot.png README.md
git commit -m "Add README and screenshot"
git push
```

---

## Step 8: Launch Strategy

### Immediate (Today/Tomorrow):

**Twitter/X:**
```
I built an interactive simulation showing how algorithmic "earworms" spread through populations.

🧠 Real-time particle physics
📊 Adjustable infection parameters
🎨 Watch thought viruses propagate

Based on concepts from my cyberpunk trilogy.

Try it: [YOUR-GITHUB-PAGES-LINK]

[Screenshot/GIF]
```

**Reddit:**
- r/dataisbeautiful: "Interactive simulation of thought virus propagation [OC]"
- r/cyberpunk: "I visualized 'earworms' from my cyberpunk trilogy as a real simulation"
- r/reactjs: "Built a particle-based infection simulator in React"
- r/programming: Post to "Show off Saturday" thread

**Hacker News:**
Wait 24-48 hours, then submit:
- Go to https://news.ycombinator.com/submit
- Title: "Show HN: Interactive simulation of algorithmic thought virus spread"
- URL: Your GitHub Pages link
- **Best time**: Tuesday-Thursday, 9-11am EST

### Week 2:

**ProductHunt:**
- Submit as "Product of the Day"
- Title: "Earworm Propagation Simulator"
- Tagline: "Watch algorithmic thought viruses spread in real-time"
- Description: Brief + link to trilogy

**Blog post:**
- "Why I Built a Thought Virus Simulator to Market My Book"
- Post on Medium, link from GitHub README
- Cross-post to Dev.to

---

## Step 9: Monitor & Iterate

### Track Metrics:

**GitHub:**
- Stars (goal: 100+ in first month)
- Forks (goal: 10+)
- Traffic (Settings → Insights → Traffic)

**Link tracking:**
- Use unique Gumroad links per platform
- Track which sources drive book sales

**Engagement:**
- GitHub Issues/Discussions
- Twitter replies
- Reddit comments

### Quick Wins:

If you get feedback like:
- "Can you add [feature]?" → Consider adding it
- "Doesn't work on mobile" → Fix immediately
- "Love this!" → Ask them to star repo

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'lucide-react'"**
```bash
npm install lucide-react
```

**Error: "Tailwind classes not working"**
- Check `tailwind.config.js` content paths
- Restart dev server

### Deployment Issues

**GitHub Pages shows 404:**
- Wait 5-10 minutes after deploy
- Check repo Settings → Pages → ensure gh-pages branch selected
- Verify `homepage` in package.json matches your URL

**Blank page after deploy:**
- Open browser console (F12)
- Look for errors
- Common issue: Wrong `homepage` in package.json

**Canvas not rendering:**
- Check browser compatibility (works in Chrome, Firefox, Safari, Edge)
- Try clearing cache

---

## Next Steps

### Version 1.1 Features (Add Later):

**Easy wins:**
- Dark/light mode toggle
- Export simulation data (CSV)
- Speed controls (slow-mo, fast-forward)
- Preset scenarios (dropdown)

**Medium complexity:**
- Multiple patient zeros (click to add infected)
- Barrier walls (create quarantine zones)
- Different movement patterns (random walk, flocking, static)

**Advanced (V2.0):**
- **Audio integration** (your vocoder work!)
- 3D visualization (Three.js)
- Network graph view (see connections)
- Machine learning (predict spread patterns)

### Audio Version (Separate Demo):

Your vocoder/signal processing work would be PERFECT for:

**"Hear the Earworms" - Audio Demo**
- Vocoder-generated "earworm" sounds
- Audio that becomes more persistent/intrusive over time
- Spatial audio (infected individuals emit sound)
- Granular synthesis techniques
- **THIS COULD BE EVEN MORE VIRAL** than visual version

Build this as `earworm-audio` separate repo.

**Launch sequence:**
1. Visual demo (this one) - Week 1
2. Audio demo - Week 4
3. Cross-promote both

---

## Pro Tips

### Make It Go Viral:

**GIF/Video:**
- Record 10-15 seconds of interesting spread pattern
- Post to Twitter with GIF
- Use Giphy Capture or similar

**Controversial take:**
- "Your social media algorithm is already spreading earworms. This is just honest about it."
- Tag tech companies (carefully)

**Academic angle:**
- Cite real papers on information spread
- Reach out to epidemiologists on Twitter
- "Based on actual SIR models"

### Build in Public:

Tweet progress:
- "Building a particle system for my book marketing"
- "Just added intensity scaling to the infection algorithm"
- "Deployed! Check it out: [link]"

**People love watching things get built.**

---

## You're Ready to Launch! 🚀

**Checklist:**

- [ ] Local version works (tested all features)
- [ ] Deployed to GitHub Pages (URL works)
- [ ] README.md complete with links
- [ ] Screenshot added to repo
- [ ] Topics added to GitHub repo
- [ ] Links updated (Gumroad, social media)
- [ ] Tweet drafted
- [ ] Reddit posts planned

**Expected Timeline:**

- **Day 1**: Deploy, soft launch to Twitter
- **Day 2-3**: Post to Reddit
- **Day 4-7**: Submit to Hacker News
- **Week 2**: ProductHunt, blog post
- **Week 3**: Iterate based on feedback

**Expected Results (Conservative):**

- 50-100 GitHub stars
- 5,000-10,000 unique visitors
- 50-100 click-throughs to books
- 5-15 book sales directly attributed
- **Plus**: Credibility, portfolio piece, ongoing traffic

---

## Questions?

If you hit issues:

1. Check console for errors (F12 in browser)
2. Google the exact error message
3. Check GitHub Pages docs
4. Post issue on your repo (I'll see it)

**You've got everything you need. Go make it live.**

The best marketing is the kind that teaches, entertains, and makes people think.

You've built all three. 🎉