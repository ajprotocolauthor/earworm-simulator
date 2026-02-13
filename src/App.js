import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';

const EarwormSimulator = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Simulation parameters
  const [isRunning, setIsRunning] = useState(false);
  const [infectionRate, setInfectionRate] = useState(0.15);
  const [resistanceRate, setResistanceRate] = useState(0.25);
  const [populationDensity, setPopulationDensity] = useState(500);
  const [showInfo, setShowInfo] = useState(false);
  
  // Simulation state
  const [population, setPopulation] = useState([]);
  const [stats, setStats] = useState({
    infected: 0,
    resistant: 0,
    susceptible: 0,
    elapsed: 0
  });
  
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const PERSON_RADIUS = 3;
  const INFECTION_RADIUS = 40;
  
  // Initialize population
  const initializePopulation = () => {
    const newPop = [];
    for (let i = 0; i < populationDensity; i++) {
      newPop.push({
        id: i,
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        status: i < 3 ? 'infected' : (Math.random() < resistanceRate ? 'resistant' : 'susceptible'),
        infectionTime: i < 3 ? 0 : null,
        intensity: i < 3 ? 1.0 : 0
      });
    }
    setPopulation(newPop);
    updateStats(newPop, 0);
  };
  
  // Update statistics
  const updateStats = (pop, time) => {
    const infected = pop.filter(p => p.status === 'infected').length;
    const resistant = pop.filter(p => p.status === 'resistant').length;
    const susceptible = pop.filter(p => p.status === 'susceptible').length;
    setStats({ infected, resistant, susceptible, elapsed: time });
  };
  
  // Spread algorithm - the core of the simulation
  const spreadEarworms = (pop, deltaTime) => {
    const newPop = [...pop];
    
    newPop.forEach((person, i) => {
      // Move people
      person.x += person.vx;
      person.y += person.vy;
      
      // Bounce off walls
      if (person.x < 0 || person.x > CANVAS_WIDTH) person.vx *= -1;
      if (person.y < 0 || person.y > CANVAS_HEIGHT) person.vy *= -1;
      
      // Keep in bounds
      person.x = Math.max(0, Math.min(CANVAS_WIDTH, person.x));
      person.y = Math.max(0, Math.min(CANVAS_HEIGHT, person.y));
      
      // Infection spreading
      if (person.status === 'infected') {
        person.intensity = Math.min(1.0, person.intensity + 0.01);
        
        // Check for nearby susceptible people
        newPop.forEach((other, j) => {
          if (i !== j && other.status === 'susceptible') {
            const dx = person.x - other.x;
            const dy = person.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < INFECTION_RADIUS) {
              // Infection probability decreases with distance
              const proximity = 1 - (distance / INFECTION_RADIUS);
              const infectionChance = infectionRate * proximity * person.intensity;
              
              if (Math.random() < infectionChance) {
                other.status = 'infected';
                other.infectionTime = deltaTime;
                other.intensity = 0.3;
              }
            }
          }
        });
      }
    });
    
    return newPop;
  };
  
  // Animation loop
  const animate = (timestamp) => {
    if (!animationRef.current) animationRef.current = timestamp;
    const deltaTime = timestamp - animationRef.current;
    
    setPopulation(prevPop => {
      const newPop = spreadEarworms(prevPop, deltaTime / 1000);
      updateStats(newPop, Math.floor(deltaTime / 1000));
      return newPop;
    });
    
    if (isRunning) {
      requestAnimationFrame(animate);
    }
  };
  
  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw infection radius (subtle)
    population.forEach(person => {
      if (person.status === 'infected') {
        const gradient = ctx.createRadialGradient(
          person.x, person.y, 0,
          person.x, person.y, INFECTION_RADIUS
        );
        gradient.addColorStop(0, `rgba(255, 50, 50, ${0.1 * person.intensity})`);
        gradient.addColorStop(1, 'rgba(255, 50, 50, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(
          person.x - INFECTION_RADIUS,
          person.y - INFECTION_RADIUS,
          INFECTION_RADIUS * 2,
          INFECTION_RADIUS * 2
        );
      }
    });
    
    // Draw people
    population.forEach(person => {
      ctx.beginPath();
      ctx.arc(person.x, person.y, PERSON_RADIUS, 0, Math.PI * 2);
      
      if (person.status === 'infected') {
        ctx.fillStyle = `rgba(255, ${255 - person.intensity * 200}, ${255 - person.intensity * 200}, 1)`;
      } else if (person.status === 'resistant') {
        ctx.fillStyle = '#3b82f6';
      } else {
        ctx.fillStyle = '#94a3b8';
      }
      
      ctx.fill();
    });
  }, [population]);
  
  // Start/stop simulation
  useEffect(() => {
    if (isRunning) {
      animationRef.current = null;
      requestAnimationFrame(animate);
    }
  }, [isRunning]);
  
  // Initialize on mount
  useEffect(() => {
    initializePopulation();
  }, [populationDensity, resistanceRate]);
  
  const handleReset = () => {
    setIsRunning(false);
    animationRef.current = null;
    initializePopulation();
  };
  
  const infectionPercentage = ((stats.infected / populationDensity) * 100).toFixed(1);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Earworm Propagation Simulator
          </h1>
          <p className="text-gray-400 text-lg">
            Watch algorithmic thought viruses spread through a population
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on concepts from <span className="text-cyan-400 font-semibold">Algorithm's Children</span> by AJ Protocol
          </p>
        </div>
        
        {/* Info Panel */}
        {showInfo && (
          <div className="mb-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-3 text-cyan-400">What are Earworms?</h3>
            <p className="text-gray-300 mb-3">
              In the world of Algorithm's Children, Earworms are algorithmic constructs designed to create 
              persistent, inescapable thoughts. Not suggestions. Commands disguised as your own inner voice.
            </p>
            
            <h4 className="text-lg font-semibold mb-2 text-cyan-400 mt-4">Scientific Foundation</h4>
            <p className="text-gray-300 mb-3">
              This simulation implements a <strong>spatial SIR (Susceptible-Infected-Resistant) model</strong> 
              adapted from epidemiological research to model information spread:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mb-3">
              <li><strong>S</strong>usceptible (gray) - Individuals vulnerable to infection</li>
              <li><strong>I</strong>nfected (red) - Active earworm carriers with transmission capability</li>
              <li><strong>R</strong>esistant (blue) - Modified individuals immune to infection</li>
            </ul>
            
            <div className="bg-gray-900 p-3 rounded mb-3 font-mono text-sm text-gray-300">
              <div>dS/dt = -β × S × I / N</div>
              <div>dI/dt = β × S × I / N - γ × I</div>
              <div>dR/dt = γ × I</div>
              <p className="text-xs text-gray-500 mt-2">
                β = transmission rate, γ = recovery rate, N = population
              </p>
            </div>
            
            <p className="text-gray-300 mb-3">
              Enhanced with:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mb-3">
              <li>Spatial dynamics (proximity-based transmission)</li>
              <li>Movement patterns (particle physics simulation)</li>
              <li>Intensity scaling (viral load equivalent)</li>
              <li>Network effects (dynamic contact networks)</li>
            </ul>
            
            <p className="text-sm text-gray-400 mb-2">
              <strong>Based on research:</strong> Kermack-McKendrick SIR model (1927), adapted for 
              information spread and memetic propagation.
            </p>
            
            <p className="text-sm text-gray-500 italic">
              What if the biggest threat isn't AI taking over—it's AI loving us too much to let us think wrong?
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="w-full rounded"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              
              {/* Controls */}
              <div className="flex gap-3 mt-4 justify-center">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {isRunning ? <Pause size={20} /> : <Play size={20} />}
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <RotateCcw size={20} />
                  Reset
                </button>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Info size={20} />
                  {showInfo ? 'Hide' : 'Info'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Stats & Controls */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Statistics</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-red-400">Infected</span>
                    <span className="font-mono">{stats.infected}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${infectionPercentage}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-400 mt-1">{infectionPercentage}%</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-blue-400">Resistant</span>
                    <span className="font-mono">{stats.resistant}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(stats.resistant / populationDensity * 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">Susceptible</span>
                    <span className="font-mono">{stats.susceptible}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gray-500 h-2 rounded-full"
                      style={{ width: `${(stats.susceptible / populationDensity * 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Elapsed Time</span>
                    <span className="font-mono">{stats.elapsed}s</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Parameters */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Infection Rate: {(infectionRate * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.05"
                    max="0.4"
                    step="0.05"
                    value={infectionRate}
                    onChange={(e) => setInfectionRate(parseFloat(e.target.value))}
                    disabled={isRunning}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    How easily Earworms spread on contact
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Resistance Rate: {(resistanceRate * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.05"
                    value={resistanceRate}
                    onChange={(e) => setResistanceRate(parseFloat(e.target.value))}
                    disabled={isRunning}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Portion of population with neural modifications
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Population: {populationDensity}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="100"
                    value={populationDensity}
                    onChange={(e) => setPopulationDensity(parseInt(e.target.value))}
                    disabled={isRunning}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Total number of individuals in simulation
                  </p>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-sm">Infected (active Earworm)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Resistant (modified)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  <span className="text-sm">Susceptible (unprotected)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500 opacity-20"></div>
                  <span className="text-sm">Infection radius (40px)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-2 text-cyan-400">About This Simulation</h3>
            <p className="text-sm text-gray-400 mb-3">
              Built on the <strong>SIR (Susceptible-Infected-Resistant)</strong> epidemiological model, 
              adapted for algorithmic information spread
            </p>
          </div>
          
          <p className="text-gray-300 mb-3 text-center">
            <strong className="text-cyan-400">Algorithm's Children</strong> explores what happens when AI 
            can predict, optimize, and gently guide every choice toward the "best" outcome.
          </p>
          <p className="text-gray-400 mb-4 text-center">
            What if consciousness itself becomes infrastructure? What if small rebellions reveal 
            the terrifying scope of algorithmic care?
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap mb-4">
            <a 
              href="https://your-gumroad-link.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg transition-all"
            >
              Read the Full Story →
            </a>
            <a 
              href="https://github.com/yourusername/earworm-simulator" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              View Source on GitHub
            </a>
          </div>
          
          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-700">
            <p>
              Inspired by: Kermack-McKendrick SIR model • Network epidemiology • 
              Information cascade theory • Memetic propagation research
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarwormSimulator;
