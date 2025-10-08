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
  const [currentSimulation, setCurrentSimulation] = useState<'temperature' | 'pressure' | 'substances' | 'evaporation'>('temperature');
  const [pressure, setPressure] = useState<number>(1); // atmosfere
  const [selectedSubstance, setSelectedSubstance] = useState<string>('water');

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

  const substances = [
    { id: 'water', name: 'Acqua (H₂O)', meltingPoint: 0, boilingPoint: 100, color: '#74B9FF' },
    { id: 'alcohol', name: 'Alcool Etilico', meltingPoint: -114, boilingPoint: 78, color: '#FD79A8' },
    { id: 'mercury', name: 'Mercurio', meltingPoint: -39, boilingPoint: 357, color: '#95A5A6' },
    { id: 'iron', name: 'Ferro', meltingPoint: 1538, boilingPoint: 2862, color: '#FFD93D' },
    { id: 'oxygen', name: 'Ossigeno', meltingPoint: -218, boilingPoint: -183, color: '#4ECDC4' },
    { id: 'co2', name: 'CO₂ (ghiaccio secco)', meltingPoint: -78, boilingPoint: -57, color: '#6C5CE7' }
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
            <h3>🔬 Simulazioni Interattive - Stati della Materia</h3>
            <p>Scegli una simulazione per esplorare i diversi aspetti degli stati della materia!</p>
          </div>
          
          {/* Tabs per le diverse simulazioni */}
          <div className="simulation-tabs" style={{display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap', justifyContent: 'center'}}>
            <button 
              className={`simulation-tab ${currentSimulation === 'temperature' ? 'active' : ''}`}
              onClick={() => setCurrentSimulation('temperature')}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: currentSimulation === 'temperature' ? '2px solid #667eea' : '2px solid #e0e0e0',
                background: currentSimulation === 'temperature' ? '#667eea' : 'white',
                color: currentSimulation === 'temperature' ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              🌡️ Temperatura
            </button>
            <button 
              className={`simulation-tab ${currentSimulation === 'pressure' ? 'active' : ''}`}
              onClick={() => setCurrentSimulation('pressure')}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: currentSimulation === 'pressure' ? '2px solid #667eea' : '2px solid #e0e0e0',
                background: currentSimulation === 'pressure' ? '#667eea' : 'white',
                color: currentSimulation === 'pressure' ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              💨 Pressione
            </button>
            <button 
              className={`simulation-tab ${currentSimulation === 'substances' ? 'active' : ''}`}
              onClick={() => setCurrentSimulation('substances')}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: currentSimulation === 'substances' ? '2px solid #667eea' : '2px solid #e0e0e0',
                background: currentSimulation === 'substances' ? '#667eea' : 'white',
                color: currentSimulation === 'substances' ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              🧪 Sostanze Diverse
            </button>
            <button 
              className={`simulation-tab ${currentSimulation === 'evaporation' ? 'active' : ''}`}
              onClick={() => setCurrentSimulation('evaporation')}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: currentSimulation === 'evaporation' ? '2px solid #667eea' : '2px solid #e0e0e0',
                background: currentSimulation === 'evaporation' ? '#667eea' : 'white',
                color: currentSimulation === 'evaporation' ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              💧 Evaporazione
            </button>
          </div>

          {/* Simulazione 1: Temperatura */}
          {currentSimulation === 'temperature' && (
          <div className="temperature-simulation">
            <h4 style={{textAlign: 'center', color: '#667eea', marginBottom: '20px'}}>Regola la temperatura per vedere come cambia lo stato dell'acqua!</h4>
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
            
            {/* Legenda sopra al grafico */}
            <div style={{display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '15px', flexWrap: 'wrap', padding: '10px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '16px', height: '16px', backgroundColor: '#6C5CE7', borderRadius: '3px', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}></div>
                <span style={{fontSize: '13px', fontWeight: '500'}}>Solido (T {'<'} 0°C)</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '16px', height: '16px', backgroundColor: '#74B9FF', borderRadius: '3px', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}></div>
                <span style={{fontSize: '13px', fontWeight: '500'}}>Liquido (0°C {'≤'} T {'<'} 100°C)</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '16px', height: '16px', backgroundColor: '#A29BFE', borderRadius: '3px', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}></div>
                <span style={{fontSize: '13px', fontWeight: '500'}}>Gas (T {'≥'} 100°C)</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '16px', height: '16px', backgroundColor: '#FF6B6B', borderRadius: '50%', border: '3px solid white', boxShadow: '0 2px 6px rgba(255,107,107,0.4)'}}></div>
                <span style={{fontSize: '13px', fontWeight: '500'}}>Temperatura Attuale</span>
              </div>
            </div>
            
            <div className="diagram-container" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
              <div className="energy-curve" style={{width: '100%', maxWidth: '1400px'}}>
                <svg className="curve-svg" viewBox="0 0 800 450" style={{background: '#f8f9fa', borderRadius: '12px', width: '100%', height: 'auto', minHeight: '500px'}}>
                  <defs>
                    {/* Gradiente per l'area sotto la curva */}
                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 0.8}} />
                      <stop offset="50%" style={{stopColor: '#764ba2', stopOpacity: 0.5}} />
                      <stop offset="100%" style={{stopColor: '#f093fb', stopOpacity: 0.2}} />
                    </linearGradient>
                    
                    {/* Zone colorate per stati della materia */}
                    <linearGradient id="solidZone" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#6C5CE7', stopOpacity: 0.15}} />
                      <stop offset="100%" style={{stopColor: '#6C5CE7', stopOpacity: 0.05}} />
                    </linearGradient>
                    <linearGradient id="liquidZone" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#74B9FF', stopOpacity: 0.15}} />
                      <stop offset="100%" style={{stopColor: '#74B9FF', stopOpacity: 0.05}} />
                    </linearGradient>
                    <linearGradient id="gasZone" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#A29BFE', stopOpacity: 0.15}} />
                      <stop offset="100%" style={{stopColor: '#A29BFE', stopOpacity: 0.05}} />
                    </linearGradient>
                    
                    {/* Pattern griglia */}
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.5"/>
                    </pattern>
                    
                    {/* Ombra per il punto corrente */}
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  
                  {/* Griglia di sfondo */}
                  <rect x="100" y="50" width="650" height="350" fill="url(#grid)" />
                  
                  {/* Zone colorate per stati della materia */}
                  <rect x="100" y="50" width="162.5" height="350" fill="url(#solidZone)" />
                  <rect x="262.5" y="50" width="325" height="350" fill="url(#liquidZone)" />
                  <rect x="587.5" y="50" width="162.5" height="350" fill="url(#gasZone)" />
                  
                  {/* Linee verticali tratteggiate per punti di transizione */}
                  <line x1="262.5" y1="50" x2="262.5" y2="400" stroke="#6C5CE7" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                  <line x1="587.5" y1="50" x2="587.5" y2="400" stroke="#A29BFE" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                  
                  {/* Etichette zone */}
                  <text x="181" y="35" textAnchor="middle" fill="#6C5CE7" fontSize="16" fontWeight="bold">SOLIDO</text>
                  <text x="425" y="35" textAnchor="middle" fill="#74B9FF" fontSize="16" fontWeight="bold">LIQUIDO</text>
                  <text x="669" y="35" textAnchor="middle" fill="#A29BFE" fontSize="16" fontWeight="bold">GAS</text>
                  
                  {/* Assi */}
                  <line x1="100" y1="400" x2="750" y2="400" stroke="#2c3e50" strokeWidth="3" />
                  <line x1="100" y1="50" x2="100" y2="400" stroke="#2c3e50" strokeWidth="3" />
                  
                  {/* Frecce assi */}
                  <polygon points="750,400 738,395 738,405" fill="#2c3e50" />
                  <polygon points="100,50 95,62 105,62" fill="#2c3e50" />
                  
                  {/* Area sotto la curva con gradiente */}
                  <path 
                    d="M 100 400 L 100 300 Q 180 260 262.5 240 L 262.5 290 Q 360 240 425 190 Q 490 140 587.5 120 L 587.5 170 Q 650 120 700 75 Q 725 60 750 50 L 750 400 Z" 
                    fill="url(#energyGradient)"
                    opacity="0.6"
                  />
                  
                  {/* Curva energia principale */}
                  <path 
                    d="M 100 300 Q 180 260 262.5 240 L 262.5 290 Q 360 240 425 190 Q 490 140 587.5 120 L 587.5 170 Q 650 120 700 75 Q 725 60 750 50" 
                    stroke="url(#energyGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Plateau di fusione */}
                  <line x1="262.5" y1="240" x2="262.5" y2="290" stroke="#6C5CE7" strokeWidth="6" strokeLinecap="round" />
                  
                  {/* Plateau di ebollizione */}
                  <line x1="587.5" y1="120" x2="587.5" y2="170" stroke="#74B9FF" strokeWidth="6" strokeLinecap="round" />
                  
                  {/* Punti di transizione con alone */}
                  <circle cx="262.5" cy="265" r="14" fill="#6C5CE7" opacity="0.3" />
                  <circle cx="262.5" cy="265" r="8" fill="#6C5CE7" stroke="white" strokeWidth="2" />
                  
                  <circle cx="587.5" cy="145" r="14" fill="#74B9FF" opacity="0.3" />
                  <circle cx="587.5" cy="145" r="8" fill="#74B9FF" stroke="white" strokeWidth="2" />
                  
                  {/* Indicatore temperatura corrente con animazione */}
                  <circle 
                    cx={100 + (temperature + 50) * 3.25}
                    cy={Math.min(400 - ((temperature + 50) * 1.75), 50)}
                    r="16"
                    fill="#FF6B6B"
                    opacity="0.3"
                  />
                  <circle 
                    cx={100 + (temperature + 50) * 3.25}
                    cy={Math.min(400 - ((temperature + 50) * 1.75), 50)}
                    r="11"
                    fill="#FF6B6B"
                    stroke="white"
                    strokeWidth="3"
                    filter="url(#shadow)"
                  />
                  
                  {/* Linea verticale dall'indicatore */}
                  <line 
                    x1={100 + (temperature + 50) * 3.25}
                    y1={Math.min(400 - ((temperature + 50) * 1.75), 50)}
                    x2={100 + (temperature + 50) * 3.25}
                    y2="400"
                    stroke="#FF6B6B"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    opacity="0.5"
                  />
                  
                  {/* Etichette transizioni */}
                  <text x="262.5" y="235" textAnchor="middle" fill="#6C5CE7" fontSize="14" fontWeight="bold">Fusione</text>
                  <text x="262.5" y="305" textAnchor="middle" fill="#6C5CE7" fontSize="12">(0°C)</text>
                  
                  <text x="587.5" y="115" textAnchor="middle" fill="#74B9FF" fontSize="14" fontWeight="bold">Ebollizione</text>
                  <text x="587.5" y="185" textAnchor="middle" fill="#74B9FF" fontSize="12">(100°C)</text>
                  
                  {/* Etichette assi */}
                  <text x="425" y="430" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#2c3e50">Temperatura (°C)</text>
                  <text x="50" y="225" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#2c3e50" transform="rotate(-90 50 225)">Energia (J)</text>
                  
                  {/* Valori asse X */}
                  <text x="100" y="420" textAnchor="middle" fontSize="13" fill="#555">-50</text>
                  <text x="262.5" y="420" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6C5CE7">0</text>
                  <text x="425" y="420" textAnchor="middle" fontSize="13" fill="#555">50</text>
                  <text x="587.5" y="420" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#74B9FF">100</text>
                  <text x="669" y="420" textAnchor="middle" fontSize="13" fill="#555">125</text>
                  <text x="750" y="420" textAnchor="middle" fontSize="13" fill="#555">150</text>
                  
                  {/* Tick marks asse X */}
                  <line x1="100" y1="400" x2="100" y2="408" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="262.5" y1="400" x2="262.5" y2="410" stroke="#6C5CE7" strokeWidth="3" />
                  <line x1="425" y1="400" x2="425" y2="408" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="587.5" y1="400" x2="587.5" y2="410" stroke="#74B9FF" strokeWidth="3" />
                  <line x1="669" y1="400" x2="669" y2="408" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="750" y1="400" x2="750" y2="408" stroke="#2c3e50" strokeWidth="2" />
                  
                  {/* Valori asse Y */}
                  <text x="90" y="405" textAnchor="end" fontSize="13" fill="#555">0</text>
                  <text x="90" y="330" textAnchor="end" fontSize="13" fill="#555">100</text>
                  <text x="90" y="260" textAnchor="end" fontSize="13" fill="#555">200</text>
                  <text x="90" y="190" textAnchor="end" fontSize="13" fill="#555">300</text>
                  <text x="90" y="120" textAnchor="end" fontSize="13" fill="#555">400</text>
                  <text x="90" y="55" textAnchor="end" fontSize="13" fill="#555">500</text>
                  
                  {/* Tick marks asse Y */}
                  <line x1="93" y1="400" x2="100" y2="400" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="93" y1="330" x2="100" y2="330" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="93" y1="260" x2="100" y2="260" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="93" y1="190" x2="100" y2="190" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="93" y1="120" x2="100" y2="120" stroke="#2c3e50" strokeWidth="2" />
                  <line x1="93" y1="50" x2="100" y2="50" stroke="#2c3e50" strokeWidth="2" />
                  
                  {/* Badge temperatura corrente */}
                  <rect 
                    x={Math.max(Math.min(100 + (temperature + 50) * 3.25 - 40, 710), 100)}
                    y="12"
                    width="80"
                    height="24"
                    rx="12"
                    fill="#FF6B6B"
                  />
                  <text 
                    x={Math.max(Math.min(100 + (temperature + 50) * 3.25, 750), 140)}
                    y="27"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="white"
                  >
                    {temperature}°C
                  </text>
                </svg>
              </div>
            </div>
          </div>
          </div>
          )}

          {/* Simulazione 2: Pressione */}
          {currentSimulation === 'pressure' && (
          <div className="pressure-simulation">
            <h4 style={{textAlign: 'center', color: '#667eea', marginBottom: '20px'}}>Vedi come la pressione influenza gli stati della materia!</h4>
            
            <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '1000px', margin: '0 auto'}}>
              <div style={{marginBottom: '30px'}}>
                <label htmlFor="pressure-slider" style={{fontSize: '18px', fontWeight: '600', color: '#2c3e50'}}>
                  Pressione: {pressure.toFixed(2)} atm
                </label>
                <input
                  id="pressure-slider"
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  style={{width: '100%', marginTop: '10px'}}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#777', marginTop: '5px'}}>
                  <span>0.1 atm</span>
                  <span>1 atm (pressione normale)</span>
                  <span>5 atm</span>
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px'}}>
                <div style={{background: pressure < 1 ? '#e8f5e9' : '#f5f5f5', padding: '20px', borderRadius: '12px', border: pressure < 1 ? '3px solid #4caf50' : '2px solid #ddd'}}>
                  <h5 style={{color: '#4caf50', marginBottom: '10px'}}>⬇️ Bassa Pressione ({(pressure < 1).toString()})</h5>
                  <p style={{fontSize: '14px', lineHeight: '1.6'}}>
                    A pressione ridotta, il punto di ebollizione <strong>diminuisce</strong>. L'acqua può bollire anche a temperatura ambiente!
                  </p>
                  {pressure < 1 && <p style={{fontSize: '13px', color: '#4caf50', marginTop: '10px', fontWeight: '600'}}>✓ ATTIVO - L'acqua bolle più facilmente</p>}
                </div>

                <div style={{background: pressure >= 0.9 && pressure <= 1.1 ? '#e3f2fd' : '#f5f5f5', padding: '20px', borderRadius: '12px', border: pressure >= 0.9 && pressure <= 1.1 ? '3px solid #2196f3' : '2px solid #ddd'}}>
                  <h5 style={{color: '#2196f3', marginBottom: '10px'}}>➡️ Pressione Normale</h5>
                  <p style={{fontSize: '14px', lineHeight: '1.6'}}>
                    A 1 atm (pressione atmosferica al livello del mare), l'acqua bolle a 100°C e congela a 0°C.
                  </p>
                  {pressure >= 0.9 && pressure <= 1.1 && <p style={{fontSize: '13px', color: '#2196f3', marginTop: '10px', fontWeight: '600'}}>✓ ATTIVO - Condizioni normali</p>}
                </div>

                <div style={{background: pressure > 1.1 ? '#fff3e0' : '#f5f5f5', padding: '20px', borderRadius: '12px', border: pressure > 1.1 ? '3px solid #ff9800' : '2px solid #ddd'}}>
                  <h5 style={{color: '#ff9800', marginBottom: '10px'}}>⬆️ Alta Pressione</h5>
                  <p style={{fontSize: '14px', lineHeight: '1.6'}}>
                    Ad alta pressione, il punto di ebollizione <strong>aumenta</strong>. Nelle pentole a pressione l'acqua bolle a 120°C!
                  </p>
                  {pressure > 1.1 && <p style={{fontSize: '13px', color: '#ff9800', marginTop: '10px', fontWeight: '600'}}>✓ ATTIVO - L'acqua bolle più difficilmente</p>}
                </div>
              </div>

              <div style={{marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '12px'}}>
                <h5 style={{color: '#2c3e50', marginBottom: '15px'}}>📊 Effetti della Pressione su H₂O</h5>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '28px'}}>❄️</div>
                    <div style={{fontSize: '14px', fontWeight: '600'}}>Punto di Congelamento</div>
                    <div style={{fontSize: '16px', color: '#667eea'}}>{(0 - pressure * 0.01).toFixed(2)}°C</div>
                  </div>
                  <div style={{fontSize: '24px', color: '#ccc'}}>→</div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '28px'}}>💧</div>
                    <div style={{fontSize: '14px', fontWeight: '600'}}>Liquido</div>
                    <div style={{fontSize: '13px', color: '#999'}}>Stabile</div>
                  </div>
                  <div style={{fontSize: '24px', color: '#ccc'}}>→</div>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '28px'}}>💨</div>
                    <div style={{fontSize: '14px', fontWeight: '600'}}>Punto di Ebollizione</div>
                    <div style={{fontSize: '16px', color: '#667eea'}}>{(100 + (pressure - 1) * 20).toFixed(0)}°C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Simulazione 3: Sostanze Diverse */}
          {currentSimulation === 'substances' && (
          <div className="substances-simulation">
            <h4 style={{textAlign: 'center', color: '#667eea', marginBottom: '20px'}}>Confronta i punti di fusione e ebollizione di diverse sostanze!</h4>
            
            <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '1200px', margin: '0 auto'}}>
              <div style={{marginBottom: '30px'}}>
                <label style={{fontSize: '18px', fontWeight: '600', color: '#2c3e50', display: 'block', marginBottom: '15px'}}>
                  Seleziona una sostanza:
                </label>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px'}}>
                  {substances.map((substance) => (
                    <button
                      key={substance.id}
                      onClick={() => setSelectedSubstance(substance.id)}
                      style={{
                        padding: '15px',
                        borderRadius: '10px',
                        border: selectedSubstance === substance.id ? `3px solid ${substance.color}` : '2px solid #ddd',
                        background: selectedSubstance === substance.id ? `${substance.color}15` : 'white',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'all 0.3s'
                      }}
                    >
                      {substance.name}
                    </button>
                  ))}
                </div>
              </div>

              {substances.filter(s => s.id === selectedSubstance).map((substance) => (
                <div key={substance.id}>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px'}}>
                    <div style={{background: '#e3f2fd', padding: '25px', borderRadius: '12px'}}>
                      <h5 style={{color: '#2196f3', marginBottom: '15px', fontSize: '18px'}}>❄️ Punto di Fusione</h5>
                      <div style={{fontSize: '36px', fontWeight: 'bold', color: substance.color}}>{substance.meltingPoint}°C</div>
                      <p style={{fontSize: '14px', color: '#555', marginTop: '10px'}}>Temperatura a cui passa da solido a liquido</p>
                    </div>

                    <div style={{background: '#fff3e0', padding: '25px', borderRadius: '12px'}}>
                      <h5 style={{color: '#ff9800', marginBottom: '15px', fontSize: '18px'}}>💨 Punto di Ebollizione</h5>
                      <div style={{fontSize: '36px', fontWeight: 'bold', color: substance.color}}>{substance.boilingPoint}°C</div>
                      <p style={{fontSize: '14px', color: '#555', marginTop: '10px'}}>Temperatura a cui passa da liquido a gas</p>
                    </div>
                  </div>

                  <div style={{background: '#f8f9fa', padding: '25px', borderRadius: '12px'}}>
                    <h5 style={{color: '#2c3e50', marginBottom: '15px'}}>📈 Intervallo di Stati</h5>
                    <div style={{position: 'relative', height: '80px', background: 'linear-gradient(90deg, #6C5CE7 0%, #74B9FF 33%, #A29BFE 66%, #FF6B6B 100%)', borderRadius: '10px', marginBottom: '15px'}}>
                      <div style={{position: 'absolute', left: '33%', top: '0', bottom: '0', width: '2px', background: 'white'}}></div>
                      <div style={{position: 'absolute', left: '66%', top: '0', bottom: '0', width: '2px', background: 'white'}}></div>
                      <div style={{position: 'absolute', left: '0', bottom: '-25px', color: '#6C5CE7', fontWeight: '600', fontSize: '12px'}}>Solido</div>
                      <div style={{position: 'absolute', left: '33%', bottom: '-40px', textAlign: 'center', transform: 'translateX(-50%)', fontWeight: '600', fontSize: '13px'}}>{substance.meltingPoint}°C</div>
                      <div style={{position: 'absolute', left: '50%', bottom: '-25px', transform: 'translateX(-50%)', color: '#74B9FF', fontWeight: '600', fontSize: '12px'}}>Liquido</div>
                      <div style={{position: 'absolute', left: '66%', bottom: '-40px', textAlign: 'center', transform: 'translateX(-50%)', fontWeight: '600', fontSize: '13px'}}>{substance.boilingPoint}°C</div>
                      <div style={{position: 'absolute', right: '0', bottom: '-25px', color: '#A29BFE', fontWeight: '600', fontSize: '12px'}}>Gas</div>
                    </div>
                    <div style={{height: '40px'}}></div>
                    <div style={{fontSize: '14px', color: '#555', lineHeight: '1.6'}}>
                      ℹ️ Questa sostanza è <strong>solida</strong> sotto {substance.meltingPoint}°C, <strong>liquida</strong> tra {substance.meltingPoint}°C e {substance.boilingPoint}°C, e <strong>gassosa</strong> sopra {substance.boilingPoint}°C.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Simulazione 4: Evaporazione */}
          {currentSimulation === 'evaporation' && (
          <div className="evaporation-simulation">
            <h4 style={{textAlign: 'center', color: '#667eea', marginBottom: '20px'}}>Scopri la differenza tra evaporazione ed ebollizione!</h4>
            
            <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '1200px', margin: '0 auto'}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px', marginBottom: '30px'}}>
                <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px', borderRadius: '15px', color: 'white', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'}}>
                  <h5 style={{fontSize: '22px', marginBottom: '15px'}}>💧 Evaporazione</h5>
                  <ul style={{fontSize: '15px', lineHeight: '1.8', paddingLeft: '20px'}}>
                    <li>Avviene solo sulla <strong>superficie</strong> del liquido</li>
                    <li>Può avvenire a <strong>qualsiasi temperatura</strong></li>
                    <li>Processo <strong>lento e graduale</strong></li>
                    <li>Solo le molecole più energetiche fuggono</li>
                    <li>Es: pozzanghera che si asciuga</li>
                  </ul>
                  <div style={{marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', textAlign: 'center'}}>
                    <div style={{fontSize: '40px', marginBottom: '10px'}}>💧 💧 💧</div>
                    <div style={{fontSize: '30px'}}>↑ ↑ ↑</div>
                    <div style={{fontSize: '13px', marginTop: '10px'}}>Solo dalla superficie</div>
                  </div>
                </div>

                <div style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '30px', borderRadius: '15px', color: 'white', boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)'}}>
                  <h5 style={{fontSize: '22px', marginBottom: '15px'}}>🔥 Ebollizione</h5>
                  <ul style={{fontSize: '15px', lineHeight: '1.8', paddingLeft: '20px'}}>
                    <li>Avviene in <strong>tutto il volume</strong> del liquido</li>
                    <li>Solo alla <strong>temperatura di ebollizione</strong></li>
                    <li>Processo <strong>rapido e tumultuoso</strong></li>
                    <li>Formazione di bolle di vapore</li>
                    <li>Es: pentola d'acqua che bolle</li>
                  </ul>
                  <div style={{marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', textAlign: 'center'}}>
                    <div style={{fontSize: '40px', marginBottom: '10px'}}>🫧 🫧 🫧</div>
                    <div style={{fontSize: '30px'}}>↑ ↑ ↑ ↑ ↑ ↑</div>
                    <div style={{fontSize: '13px', marginTop: '10px'}}>Da tutto il liquido</div>
                  </div>
                </div>
              </div>

              <div style={{background: '#f8f9fa', padding: '25px', borderRadius: '12px'}}>
                <h5 style={{color: '#2c3e50', marginBottom: '20px', fontSize: '18px'}}>🔬 Confronto Velocità</h5>
                <div style={{display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
                  <div style={{flex: '1', minWidth: '200px', textAlign: 'center'}}>
                    <div style={{fontSize: '16px', fontWeight: '600', color: '#667eea', marginBottom: '10px'}}>Evaporazione</div>
                    <div style={{height: '30px', background: '#667eea', borderRadius: '15px', width: '40%', margin: '0 auto'}}></div>
                    <div style={{fontSize: '14px', color: '#999', marginTop: '8px'}}>Lenta</div>
                  </div>
                  <div style={{fontSize: '24px', color: '#ccc'}}>VS</div>
                  <div style={{flex: '1', minWidth: '200px', textAlign: 'center'}}>
                    <div style={{fontSize: '16px', fontWeight: '600', color: '#f5576c', marginBottom: '10px'}}>Ebollizione</div>
                    <div style={{height: '30px', background: '#f5576c', borderRadius: '15px', width: '100%', margin: '0 auto'}}></div>
                    <div style={{fontSize: '14px', color: '#999', marginTop: '8px'}}>Rapida</div>
                  </div>
                </div>
              </div>

              <div style={{marginTop: '25px', padding: '20px', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderRadius: '12px', border: '2px solid #667eea'}}>
                <h5 style={{color: '#2c3e50', marginBottom: '10px'}}>💡 Curiosità</h5>
                <p style={{fontSize: '14px', color: '#333', lineHeight: '1.7'}}>
                  Anche il ghiaccio può evaporare direttamente allo stato gassoso (sublimazione)! È per questo che i cubetti di ghiaccio nel freezer "scompaiono" lentamente nel tempo, anche se non si sciolgono.
                </p>
              </div>
            </div>
          </div>
          )}

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
