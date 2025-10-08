import React, { useState, useEffect } from 'react';
import './Exercise4.css';
import { getRandomQuestions, Question } from '../data/questionsDatabase';

interface StateOfMatter {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  properties: string[];
  examples: string[];
  particleArrangement: string;
  energyLevel: 'low' | 'medium' | 'high';
}

interface PhaseTransition {
  id: string;
  name: string;
  from: string;
  to: string;
  process: string;
  energyChange: 'absorbed' | 'released';
  temperature: string;
  examples: string[];
  icon: string;
  description: string;
}

interface EnergyType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  examples: string[];
  unit: string;
  category: 'kinetic' | 'potential' | 'thermal' | 'chemical' | 'electrical' | 'nuclear';
}

const Exercise4: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'theory' | 'simulation' | 'exercises'>('theory');
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Question[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(25);
  const [showTransition, setShowTransition] = useState<string>('');

  const statesOfMatter: StateOfMatter[] = [
    {
      id: 'solid',
      name: 'Solido',
      icon: '🔶',
      color: '#6C5CE7',
      description: 'Stato con forma e volume definiti',
      properties: ['Forma fissa', 'Volume definito', 'Particelle ordinate', 'Movimento limitato'],
      examples: ['Ghiaccio', 'Metallo', 'Legno', 'Roccia'],
      particleArrangement: 'Particelle molto vicine e ordinate',
      energyLevel: 'low'
    },
    {
      id: 'liquid',
      name: 'Liquido',
      icon: '💧',
      color: '#74B9FF',
      description: 'Stato con volume definito ma forma variabile',
      properties: ['Forma variabile', 'Volume definito', 'Particelle semi-ordinate', 'Movimento moderato'],
      examples: ['Acqua', 'Mercurio', 'Olio', 'Sangue'],
      particleArrangement: 'Particelle vicine ma mobili',
      energyLevel: 'medium'
    },
    {
      id: 'gas',
      name: 'Gas',
      icon: '💨',
      color: '#A29BFE',
      description: 'Stato con forma e volume variabili',
      properties: ['Forma variabile', 'Volume variabile', 'Particelle disordinate', 'Movimento libero'],
      examples: ['Vapore acqueo', 'Ossigeno', 'Anidride carbonica', 'Elio'],
      particleArrangement: 'Particelle molto distanti e disordinate',
      energyLevel: 'high'
    },
    {
      id: 'plasma',
      name: 'Plasma',
      icon: '⚡',
      color: '#FD79A8',
      description: 'Stato ionizzato con particelle cariche',
      properties: ['Particelle ionizzate', 'Conduce elettricità', 'Molto caldo', 'Raro sulla Terra'],
      examples: ['Fulmini', 'Sole', 'Aurora boreale', 'Fiamma'],
      particleArrangement: 'Particelle ionizzate e cariche',
      energyLevel: 'high'
    }
  ];

  const phaseTransitions: PhaseTransition[] = [
    {
      id: 'melting',
      name: 'Fusione',
      from: 'solid',
      to: 'liquid',
      process: 'Solido → Liquido',
      energyChange: 'absorbed',
      temperature: 'Punto di fusione',
      examples: ['Ghiaccio → Acqua', 'Metallo fuso', 'Cera che si scioglie'],
      icon: '🔥',
      description: 'Assorbimento di calore per rompere i legami tra particelle'
    },
    {
      id: 'freezing',
      name: 'Solidificazione',
      from: 'liquid',
      to: 'solid',
      process: 'Liquido → Solido',
      energyChange: 'released',
      temperature: 'Punto di congelamento',
      examples: ['Acqua → Ghiaccio', 'Metallo che si raffredda', 'Cera che si solidifica'],
      icon: '❄️',
      description: 'Rilascio di calore durante la formazione di legami'
    },
    {
      id: 'vaporization',
      name: 'Vaporizzazione',
      from: 'liquid',
      to: 'gas',
      process: 'Liquido → Gas',
      energyChange: 'absorbed',
      temperature: 'Punto di ebollizione',
      examples: ['Acqua → Vapore', 'Alcool che evapora', 'Mercurio che bolle'],
      icon: '💨',
      description: 'Assorbimento di calore per vincere le forze intermolecolari'
    },
    {
      id: 'condensation',
      name: 'Condensazione',
      from: 'gas',
      to: 'liquid',
      process: 'Gas → Liquido',
      energyChange: 'released',
      temperature: 'Punto di condensazione',
      examples: ['Vapore → Acqua', 'Rugiada', 'Nebbia'],
      icon: '💧',
      description: 'Rilascio di calore durante la formazione di legami'
    },
    {
      id: 'sublimation',
      name: 'Sublimazione',
      from: 'solid',
      to: 'gas',
      process: 'Solido → Gas',
      energyChange: 'absorbed',
      temperature: 'Direttamente',
      examples: ['Ghiaccio secco', 'Iodio', 'Naftalina'],
      icon: '✨',
      description: 'Passaggio diretto da solido a gas senza passare per liquido'
    },
    {
      id: 'deposition',
      name: 'Deposizione',
      from: 'gas',
      to: 'solid',
      process: 'Gas → Solido',
      energyChange: 'released',
      temperature: 'Direttamente',
      examples: ['Brina', 'Neve', 'Formazione di cristalli'],
      icon: '❄️',
      description: 'Passaggio diretto da gas a solido senza passare per liquido'
    }
  ];

  const energyTypes: EnergyType[] = [
    {
      id: 'kinetic',
      name: 'Energia Cinetica',
      icon: '🏃',
      color: '#FF6B6B',
      description: 'Energia del movimento',
      examples: ['Automobile in movimento', 'Palla che rotola', 'Vento'],
      unit: 'J (Joule)',
      category: 'kinetic'
    },
    {
      id: 'potential',
      name: 'Energia Potenziale',
      icon: '⛰️',
      color: '#4ECDC4',
      description: 'Energia immagazzinata',
      examples: ['Palla in alto', 'Molla compressa', 'Dighe'],
      unit: 'J (Joule)',
      category: 'potential'
    },
    {
      id: 'thermal',
      name: 'Energia Termica',
      icon: '🌡️',
      color: '#FF9F43',
      description: 'Energia del calore',
      examples: ['Fuoco', 'Stufa', 'Corpo umano'],
      unit: 'J (Joule)',
      category: 'thermal'
    },
    {
      id: 'chemical',
      name: 'Energia Chimica',
      icon: '⚗️',
      color: '#6C5CE7',
      description: 'Energia nei legami chimici',
      examples: ['Batterie', 'Combustibili', 'Cibo'],
      unit: 'J (Joule)',
      category: 'chemical'
    },
    {
      id: 'electrical',
      name: 'Energia Elettrica',
      icon: '⚡',
      color: '#A29BFE',
      description: 'Energia delle cariche elettriche',
      examples: ['Corrente elettrica', 'Fulmini', 'Elettrodomestici'],
      unit: 'J (Joule)',
      category: 'electrical'
    },
    {
      id: 'nuclear',
      name: 'Energia Nucleare',
      icon: '☢️',
      color: '#E17055',
      description: 'Energia del nucleo atomico',
      examples: ['Sole', 'Centrali nucleari', 'Bombe atomiche'],
      unit: 'J (Joule)',
      category: 'nuclear'
    }
  ];

  // Carica domande randomizzate all'avvio
  useEffect(() => {
    const randomQuestions = getRandomQuestions(10, ['stati-materia', 'energia', 'trasformazioni']); // 10 domande sugli stati della materia
    setExercises(randomQuestions);
  }, []);

  // Funzione per ricaricare nuove domande
  const reloadQuestions = () => {
    const newQuestions = getRandomQuestions(10, ['stati-materia', 'energia', 'trasformazioni']);
    setExercises(newQuestions);
    setCurrentExercise(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentExercise] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetExercises = () => {
    reloadQuestions();
  };

  const getScore = () => {
    return selectedAnswers.filter((answer, index) => answer === exercises[index].correctAnswer).length;
  };

  const handleTemperatureChange = (newTemp: number) => {
    setTemperature(newTemp);
    
    // Determina lo stato della materia in base alla temperatura
    if (newTemp < 0) {
      setSelectedState('solid');
    } else if (newTemp >= 0 && newTemp < 100) {
      setSelectedState('liquid');
    } else {
      setSelectedState('gas');
    }

    // Mostra transizioni appropriate
    if (newTemp === 0) {
      setShowTransition('melting-freezing');
    } else if (newTemp === 100) {
      setShowTransition('vaporization-condensation');
    } else {
      setShowTransition('');
    }
  };

  const getCurrentState = () => {
    return statesOfMatter.find(state => state.id === selectedState);
  };

  const getParticlePosition = (index: number, total: number, state: string) => {
    const positions = [];
    
    if (state === 'solid') {
      // Particelle ordinate in una griglia
      const cols = Math.ceil(Math.sqrt(total));
      const row = Math.floor(index / cols);
      const col = index % cols;
      const spacing = 25;
      return {
        left: `${20 + col * spacing}px`,
        top: `${20 + row * spacing}px`
      };
    } else if (state === 'liquid') {
      // Particelle semi-ordinate con movimento
      const cols = Math.ceil(Math.sqrt(total));
      const row = Math.floor(index / cols);
      const col = index % cols;
      const spacing = 30;
      const offset = Math.sin(index) * 10;
      return {
        left: `${30 + col * spacing + offset}px`,
        top: `${30 + row * spacing + Math.cos(index) * 5}px`
      };
    } else {
      // Particelle sparse per il gas
      return {
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`
      };
    }
  };

  const getTransitionInfo = () => {
    if (showTransition === 'melting-freezing') {
      return phaseTransitions.filter(t => t.id === 'melting' || t.id === 'freezing');
    } else if (showTransition === 'vaporization-condensation') {
      return phaseTransitions.filter(t => t.id === 'vaporization' || t.id === 'condensation');
    }
    return [];
  };

  return (
    <div className="exercise4">
      <div className="exercise-header">
        <h2>🌡️ Stati della Materia ed Energia</h2>
        <div className="section-tabs">
          <button 
            className={`tab ${currentSection === 'theory' ? 'active' : ''}`}
            onClick={() => setCurrentSection('theory')}
          >
            📖 Teoria
          </button>
          <button 
            className={`tab ${currentSection === 'simulation' ? 'active' : ''}`}
            onClick={() => setCurrentSection('simulation')}
          >
            🔬 Simulazione
          </button>
          <button 
            className={`tab ${currentSection === 'exercises' ? 'active' : ''}`}
            onClick={() => setCurrentSection('exercises')}
          >
            ✏️ Esercizi
          </button>
        </div>
      </div>

      {currentSection === 'theory' && (
        <div className="theory-section">
          <div className="theory-intro">
            <h3>🎯 Stati della Materia</h3>
            <p>
              La materia può esistere in diversi <strong>stati fisici</strong> che dipendono dalla temperatura 
              e dalla pressione. I principali stati sono <strong>solido</strong>, <strong>liquido</strong>, 
              <strong>gas</strong> e <strong>plasma</strong>.
            </p>
            <p>
              Le <strong>trasformazioni</strong> tra questi stati avvengono attraverso l'assorbimento 
              o il rilascio di <strong>energia</strong>.
            </p>
          </div>

          <div className="states-grid">
            <h4>🔬 I Quattro Stati della Materia</h4>
            <div className="states-container">
              {statesOfMatter.map((state) => (
                <div key={state.id} className="state-card" style={{ '--state-color': state.color } as React.CSSProperties}>
                  <div className="state-header">
                    <div className="state-icon">{state.icon}</div>
                    <h5>{state.name}</h5>
                  </div>
                  <div className="state-description">{state.description}</div>
                  <div className="state-properties">
                    <h6>Proprietà:</h6>
                    <ul>
                      {state.properties.map((prop, index) => (
                        <li key={index}>{prop}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="state-examples">
                    <h6>Esempi:</h6>
                    <div className="examples-list">
                      {state.examples.map((example, index) => (
                        <span key={index} className="example-tag">{example}</span>
                      ))}
                    </div>
                  </div>
                  <div className="energy-level">
                    <span className={`energy-badge ${state.energyLevel}`}>
                      Energia: {state.energyLevel === 'low' ? 'Bassa' : state.energyLevel === 'medium' ? 'Media' : 'Alta'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="transitions-section">
            <h4>🔄 Trasformazioni di Fase</h4>
            <div className="transitions-grid">
              {phaseTransitions.map((transition) => (
                <div key={transition.id} className="transition-card">
                  <div className="transition-header">
                    <div className="transition-icon">{transition.icon}</div>
                    <h5>{transition.name}</h5>
                  </div>
                  <div className="transition-process">
                    <span className="from-state">{statesOfMatter.find(s => s.id === transition.from)?.icon}</span>
                    <span className="arrow">→</span>
                    <span className="to-state">{statesOfMatter.find(s => s.id === transition.to)?.icon}</span>
                  </div>
                  <div className="transition-description">{transition.description}</div>
                  <div className={`energy-change ${transition.energyChange}`}>
                    <span className="energy-icon">
                      {transition.energyChange === 'absorbed' ? '⬆️' : '⬇️'}
                    </span>
                    <span className="energy-text">
                      Energia {transition.energyChange === 'absorbed' ? 'assorbita' : 'rilasciata'}
                    </span>
                  </div>
                  <div className="transition-examples">
                    <h6>Esempi:</h6>
                    <ul>
                      {transition.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="energy-section">
            <h4>⚡ Tipi di Energia</h4>
            <div className="energy-grid">
              {energyTypes.map((energy) => (
                <div key={energy.id} className="energy-card" style={{ '--energy-color': energy.color } as React.CSSProperties}>
                  <div className="energy-header">
                    <div className="energy-icon">{energy.icon}</div>
                    <h5>{energy.name}</h5>
                  </div>
                  <div className="energy-description">{energy.description}</div>
                  <div className="energy-unit">Unità: {energy.unit}</div>
                  <div className="energy-examples">
                    <h6>Esempi:</h6>
                    <ul>
                      {energy.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentSection === 'simulation' && (
        <div className="simulation-section">
          <div className="simulation-header">
            <h3>🔬 Simulazione Stati della Materia</h3>
            <p>Regola la temperatura per vedere come cambia lo stato della materia!</p>
          </div>

          <div className="temperature-control">
            <div className="temperature-slider">
              <label htmlFor="temperature">Temperatura: {temperature}°C</label>
              <input
                id="temperature"
                type="range"
                min="-50"
                max="150"
                value={temperature}
                onChange={(e) => handleTemperatureChange(parseInt(e.target.value))}
                className="slider"
              />
              <div className="temperature-scale">
                <span>-50°C</span>
                <span>0°C</span>
                <span>50°C</span>
                <span>100°C</span>
                <span>150°C</span>
              </div>
            </div>
          </div>

          <div className="state-display">
            {getCurrentState() && (
              <div className="current-state" style={{ '--state-color': getCurrentState()!.color } as React.CSSProperties}>
                <div className="state-visualization">
                  <div className={`particles ${selectedState}`} key={`${selectedState}-${temperature}`}>
                    {Array.from({ length: selectedState === 'gas' ? 15 : selectedState === 'liquid' ? 20 : 25 }, (_, i) => {
                      const position = getParticlePosition(i, selectedState === 'gas' ? 15 : selectedState === 'liquid' ? 20 : 25, selectedState);
                      return (
                        <div 
                          key={`${selectedState}-${i}-${temperature}`} 
                          className="particle"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            '--particle-color': getCurrentState()!.color,
                            left: position.left,
                            top: position.top
                          } as React.CSSProperties}
                        ></div>
                      );
                    })}
                  </div>
                  <div className="temperature-indicator">
                    <span className="temp-value">{temperature}°C</span>
                    <span className="state-name">{getCurrentState()!.name}</span>
                  </div>
                </div>
                <div className="state-info">
                  <h4>{getCurrentState()!.name}</h4>
                  <p>{getCurrentState()!.description}</p>
                  <div className="state-properties">
                    <strong>Proprietà:</strong>
                    <ul>
                      {getCurrentState()!.properties.map((prop, index) => (
                        <li key={index}>{prop}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="energy-level-info">
                    <strong>Livello di energia:</strong> 
                    <span className={`energy-level-badge ${getCurrentState()!.energyLevel}`}>
                      {getCurrentState()!.energyLevel === 'low' ? 'Basso' : 
                       getCurrentState()!.energyLevel === 'medium' ? 'Medio' : 'Alto'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {getTransitionInfo().length > 0 && (
            <div className="transition-display">
              <h4>🔄 Trasformazioni Possibili</h4>
              <div className="transition-cards">
                {getTransitionInfo().map((transition) => (
                  <div key={transition.id} className="transition-info-card">
                    <div className="transition-icon">{transition.icon}</div>
                    <h5>{transition.name}</h5>
                    <p>{transition.description}</p>
                    <div className={`energy-indicator ${transition.energyChange}`}>
                      {transition.energyChange === 'absorbed' ? '⬆️ Energia Assorbita' : '⬇️ Energia Rilasciata'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="energy-diagram">
            <h4>📊 Diagramma Energia-Temperatura</h4>
            <div className="diagram-container">
              <div className="energy-curve">
                <svg className="curve-svg" viewBox="0 0 500 300">
                  {/* Griglia di riferimento */}
                  <defs>
                    <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#e0e0e0" stroke-width="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Assi - utilizzano tutto lo spazio */}
                  <line x1="50" y1="250" x2="450" y2="250" stroke="#333" strokeWidth="2" />
                  <line x1="50" y1="50" x2="50" y2="250" stroke="#333" strokeWidth="2" />
                  
                  {/* Linea curva che rappresenta l'energia */}
                  <path 
                    d="M 50 250 Q 150 200 250 150 Q 350 100 450 50" 
                    stroke="#4facfe" 
                    strokeWidth="4" 
                    fill="none"
                    className="energy-line"
                  />
                  
                  {/* Punti di transizione */}
                  <circle cx="150" cy="200" r="8" fill="#6C5CE7" className="transition-point" />
                  <circle cx="250" cy="150" r="8" fill="#74B9FF" className="transition-point" />
                  <circle cx="350" cy="100" r="8" fill="#A29BFE" className="transition-point" />
                  
                  {/* Indicatore della temperatura corrente */}
                  <circle 
                    cx={50 + (temperature + 50) * 2} 
                    cy={250 - (temperature + 50) * 0.8} 
                    r="10" 
                    fill="#FF6B6B" 
                    stroke="white"
                    strokeWidth="2"
                    className="current-temp-indicator"
                  />
                  
                  {/* Etichette dei punti */}
                  <text x="150" y="185" textAnchor="middle" className="point-label">Solido</text>
                  <text x="250" y="135" textAnchor="middle" className="point-label">Liquido</text>
                  <text x="350" y="85" textAnchor="middle" className="point-label">Gas</text>
                  
                  {/* Etichette degli assi */}
                  <text x="250" y="270" textAnchor="middle" className="axis-label">Temperatura (°C)</text>
                  <text x="20" y="150" textAnchor="middle" className="axis-label" transform="rotate(-90 20 150)">Energia</text>
                  
                  {/* Valori sull'asse X - distribuiti su tutto lo spazio */}
                  <text x="50" y="265" textAnchor="middle" className="axis-value">-50</text>
                  <text x="150" y="265" textAnchor="middle" className="axis-value">0</text>
                  <text x="250" y="265" textAnchor="middle" className="axis-value">50</text>
                  <text x="350" y="265" textAnchor="middle" className="axis-value">100</text>
                  <text x="450" y="265" textAnchor="middle" className="axis-value">150</text>
                  
                  {/* Valori sull'asse Y */}
                  <text x="40" y="255" textAnchor="middle" className="axis-value">0</text>
                  <text x="40" y="200" textAnchor="middle" className="axis-value">50</text>
                  <text x="40" y="150" textAnchor="middle" className="axis-value">100</text>
                  <text x="40" y="100" textAnchor="middle" className="axis-value">150</text>
                  <text x="40" y="60" textAnchor="middle" className="axis-value">200</text>
                  
                  {/* Etichette livelli energia */}
                  <text x="35" y="60" textAnchor="middle" className="energy-level-label">Alta</text>
                  <text x="35" y="150" textAnchor="middle" className="energy-level-label">Media</text>
                  <text x="35" y="240" textAnchor="middle" className="energy-level-label">Bassa</text>
                </svg>
                
                {/* Legenda */}
                <div className="diagram-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#6C5CE7'}}></div>
                    <span>Solido (T &lt; 0°C)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#74B9FF'}}></div>
                    <span>Liquido (0°C ≤ T &lt; 100°C)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#A29BFE'}}></div>
                    <span>Gas (T ≥ 100°C)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#FF6B6B'}}></div>
                    <span>Temperatura Attuale</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'exercises' && (
        <div className="exercises-section">
          {!showResults ? (
            <>
              <div className="exercise-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  Esercizio {currentExercise + 1} di {exercises.length}
                </span>
              </div>

              <div className="exercise-card">
                <div className="exercise-difficulty">
                  Difficoltà: <span className={`difficulty-badge ${exercises[currentExercise]?.difficulty}`}>
                    {exercises[currentExercise]?.difficulty === 'easy' ? '🟢 Facile' : 
                     exercises[currentExercise]?.difficulty === 'medium' ? '🟡 Media' : '🔴 Difficile'}
                  </span>
                </div>
                
                <h3>{exercises[currentExercise]?.question}</h3>
                
                <div className="options">
                  {exercises[currentExercise]?.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option ${selectedAnswers[currentExercise] === index ? 'selected' : ''}`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="exercise-navigation">
                <button 
                  className="nav-btn prev" 
                  onClick={prevExercise}
                  disabled={currentExercise === 0}
                >
                  ← Precedente
                </button>
                
                {currentExercise === exercises.length - 1 ? (
                  <button 
                    className="nav-btn check" 
                    onClick={checkAnswers}
                    disabled={selectedAnswers.length !== exercises.length}
                  >
                    ✅ Verifica Risposte
                  </button>
                ) : (
                  <button 
                    className="nav-btn next" 
                    onClick={nextExercise}
                    disabled={selectedAnswers[currentExercise] === undefined}
                  >
                    Successivo →
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="results-section">
              <div className="score-card">
                <h3>🎉 Risultati</h3>
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-number">{getScore()}</span>
                    <span className="score-total">/{exercises.length}</span>
                  </div>
                  <p className="score-percentage">
                    {Math.round((getScore() / exercises.length) * 100)}%
                  </p>
                </div>
                <p className="score-message">
                  {getScore() === exercises.length 
                    ? "Perfetto! 🏆 Hai padroneggiato gli stati della materia!"
                    : getScore() >= exercises.length * 0.8
                    ? "Ottimo lavoro! 👍 Hai una buona comprensione dell'argomento."
                    : getScore() >= exercises.length * 0.6
                    ? "Buono! 📚 Ripassa la teoria e riprova."
                    : "Continua a studiare! 💪 Ripassa gli stati della materia e l'energia."
                  }
                </p>
              </div>

              <div className="answers-review">
                <h4>📝 Rivedi le Risposte</h4>
                {exercises.map((exercise, index) => (
                  <div key={exercise.id} className="answer-item">
                    <div className="question-review">
                      <strong>Esercizio {index + 1}:</strong> {exercise.question}
                      <span className={`difficulty-indicator ${exercise.difficulty}`}>
                        {exercise.difficulty === 'easy' ? '🟢' : exercise.difficulty === 'medium' ? '🟡' : '🔴'}
                      </span>
                    </div>
                    <div className="answer-review">
                      <div className={`user-answer ${selectedAnswers[index] === exercise.correctAnswer ? 'correct' : 'incorrect'}`}>
                        <span className="answer-label">La tua risposta:</span>
                        <span className="answer-text">
                          {String.fromCharCode(65 + selectedAnswers[index])}. {exercise.options[selectedAnswers[index]]}
                        </span>
                        {selectedAnswers[index] === exercise.correctAnswer ? ' ✅' : ' ❌'}
                      </div>
                      {selectedAnswers[index] !== exercise.correctAnswer && (
                        <div className="correct-answer">
                          <span className="answer-label">Risposta corretta:</span>
                          <span className="answer-text">
                            {String.fromCharCode(65 + exercise.correctAnswer)}. {exercise.options[exercise.correctAnswer]}
                          </span>
                        </div>
                      )}
                      <div className="explanation">
                        <strong>Spiegazione:</strong> {exercise.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="results-actions">
                <button className="action-btn reset" onClick={resetExercises}>
                  🔄 Nuovi Esercizi
                </button>
                <button className="action-btn simulation" onClick={() => setCurrentSection('simulation')}>
                  🔬 Vedi Simulazione
                </button>
                <button className="action-btn theory" onClick={() => setCurrentSection('theory')}>
                  📖 Ripassa la Teoria
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exercise4;
