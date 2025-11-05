import React, { useState, useEffect } from 'react';
import './Exercise5.css';
import { getRandomQuestions, Question } from '../data/questionsDatabase';

interface SeparationMethod {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  principle: string;
  steps: string[];
  examples: string[];
  applications: string[];
  visualType: 'filtration' | 'centrifugation' | 'extraction' | 'decantation' | 'distillation' | 'crystallization' | 'chromatography' | 'sieving' | 'magnetization' | 'sublimation';
}

const Exercise5: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'theory' | 'simulation' | 'practical' | 'exercises'>('theory');
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Question[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('filtration');
  const [animationProgress, setAnimationProgress] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [commentary, setCommentary] = useState<string>('');

  const separationMethods: SeparationMethod[] = [
    {
      id: 'filtration',
      name: 'Filtrazione',
      icon: '🔍',
      color: '#4ECDC4',
      description: 'Separazione di un solido insolubile da un liquido usando un filtro',
      principle: 'Il filtro ha pori che permettono al liquido di passare ma trattengono le particelle solide',
      steps: ['Preparare il filtro', 'Versare il miscuglio', 'Il liquido passa attraverso', 'Il solido rimane sul filtro'],
      examples: ['Caffè e filtro', 'Sabbia e acqua', 'Fango e acqua', 'Precipitati in laboratorio'],
      applications: ['Trattamento acque', 'Industria alimentare', 'Laboratori chimici', 'Purificazione'],
      visualType: 'filtration'
    },
    {
      id: 'centrifugation',
      name: 'Centrifugazione',
      icon: '🌀',
      color: '#FF6B6B',
      description: 'Separazione di sostanze con diversa densità mediante forza centrifuga',
      principle: 'La forza centrifuga fa sedimentare le particelle più dense verso il fondo',
      steps: ['Inserire il campione', 'Avviare la centrifuga', 'Le particelle si separano', 'Raccogliere i componenti'],
      examples: ['Sangue e plasma', 'Latte e panna', 'Cellule e mezzo', 'Separazione proteine'],
      applications: ['Medicina', 'Biologia', 'Industria alimentare', 'Analisi chimiche'],
      visualType: 'centrifugation'
    },
    {
      id: 'extraction',
      name: 'Estrazione',
      icon: '🧪',
      color: '#95E1D3',
      description: 'Separazione di sostanze usando la loro diversa solubilità in un solvente',
      principle: 'Le sostanze si sciolgono diversamente in solventi diversi',
      steps: ['Aggiungere il solvente', 'Mescolare', 'Lasciare separare le fasi', 'Raccogliere la fase desiderata'],
      examples: ['Caffè solubile', 'Oli essenziali', 'Principi attivi', 'Colori dai vegetali'],
      applications: ['Farmacia', 'Industria alimentare', 'Cosmetica', 'Chimica organica'],
      visualType: 'extraction'
    },
    {
      id: 'decantation',
      name: 'Decantazione',
      icon: '💧',
      color: '#A8E6CF',
      description: 'Separazione di liquidi immiscibili o solido-liquido per gravità',
      principle: 'Le sostanze si stratificano per differenza di densità',
      steps: ['Lasciare riposare', 'Le sostanze si stratificano', 'Versare delicatamente', 'Separare gli strati'],
      examples: ['Olio e acqua', 'Sabbia e acqua', 'Fango e acqua limpida', 'Vino e sedimenti'],
      applications: ['Trattamento acque', 'Industria petrolifera', 'Viticultura', 'Purificazione'],
      visualType: 'decantation'
    },
    {
      id: 'distillation',
      name: 'Distillazione',
      icon: '🌡️',
      color: '#FFD93D',
      description: 'Separazione di liquidi con diverse temperature di ebollizione',
      principle: 'I componenti evaporano a temperature diverse e vengono raccolti separatamente',
      steps: ['Riscaldare il miscuglio', 'Il componente più volatile evapora', 'Condensare il vapore', 'Raccogliere il distillato'],
      examples: ['Acqua distillata', 'Alcool da vino', 'Petrolio raffinato', 'Separazione miscele'],
      applications: ['Petrolchimica', 'Produzione alcool', 'Purificazione acque', 'Industria farmaceutica'],
      visualType: 'distillation'
    },
    {
      id: 'crystallization',
      name: 'Cristallizzazione',
      icon: '✨',
      color: '#C7CEEA',
      description: 'Separazione di un soluto da un solvente formando cristalli',
      principle: 'Il soluto precipita formando cristalli quando la soluzione diventa satura',
      steps: ['Preparare soluzione satura', 'Evaporare il solvente', 'Formazione cristalli', 'Filtrare i cristalli'],
      examples: ['Zucchero cristallino', 'Sale da acqua', 'Cristalli di sale', 'Purificazione sostanze'],
      applications: ['Industria alimentare', 'Farmacia', 'Chimica', 'Purificazione'],
      visualType: 'crystallization'
    },
    {
      id: 'chromatography',
      name: 'Cromatografia',
      icon: '🎨',
      color: '#F38181',
      description: 'Separazione di sostanze in base alla loro affinità per fase mobile e stazionaria',
      principle: 'Le sostanze migrano a velocità diverse attraverso una fase stazionaria',
      steps: ['Preparare la fase stazionaria', 'Applicare il campione', 'Lasciare migrare', 'Visualizzare le bande'],
      examples: ['Separazione colori inchiostro', 'Analisi farmaci', 'Separazione proteine', 'Gascromatografia'],
      applications: ['Analisi chimica', 'Forensics', 'Biologia', 'Controllo qualità'],
      visualType: 'chromatography'
    },
    {
      id: 'sieving',
      name: 'Setacciatura',
      icon: '⛓️',
      color: '#AA96DA',
      description: 'Separazione di particelle di diversa dimensione usando un setaccio',
      principle: 'Le particelle più piccole passano attraverso i fori, quelle più grandi rimangono',
      steps: ['Preparare il setaccio', 'Versare il miscuglio', 'Agitare', 'Separare le frazioni'],
      examples: ['Farina e crusca', 'Sabbia e ghiaia', 'Semi di diversa dimensione', 'Materiali granulari'],
      applications: ['Agricoltura', 'Costruzioni', 'Industria alimentare', 'Riciclaggio'],
      visualType: 'sieving'
    },
    {
      id: 'magnetization',
      name: 'Imantazione',
      icon: '🧲',
      color: '#FCBAD3',
      description: 'Separazione di sostanze ferrose usando un magnete',
      principle: 'Le sostanze magnetiche sono attratte dal magnete',
      steps: ['Avvicinare il magnete', 'Le sostanze ferrose si attaccano', 'Rimuovere il magnete', 'Separare i componenti'],
      examples: ['Lima e ferro', 'Sabbia e limatura', 'Rifiuti metallici', 'Minerale di ferro'],
      applications: ['Riciclaggio', 'Estrazione minerali', 'Industria siderurgica', 'Separazione rifiuti'],
      visualType: 'magnetization'
    },
    {
      id: 'sublimation',
      name: 'Sublimazione',
      icon: '❄️',
      color: '#D4A5A5',
      description: 'Separazione di sostanze che sublimano facilmente',
      principle: 'Alcune sostanze passano direttamente da solido a gas senza liquefarsi',
      steps: ['Riscaldare il miscuglio', 'La sostanza sublima', 'Raffreddare per condensare', 'Raccogliere il prodotto'],
      examples: ['Iodio puro', 'Ghiaccio secco', 'Naftalina', 'Purificazione sostanze'],
      applications: ['Purificazione', 'Industria chimica', 'Conservazione', 'Laboratori'],
      visualType: 'sublimation'
    }
  ];

  // Carica domande randomizzate all'avvio
  useEffect(() => {
    const randomQuestions = getRandomQuestions(10, ['separazione']);
    setExercises(randomQuestions);
  }, []);

  // Funzione per ricaricare nuove domande
  const reloadQuestions = () => {
    const newQuestions = getRandomQuestions(10, ['separazione']);
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

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationProgress(0);
    const interval = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          return 100;
        }
        return prev + 0.5; // Ridotto da 2 a 0.5 per essere 4 volte più lento
      });
    }, 200); // Aumentato da 50ms a 200ms per essere 4 volte più lento
  };

  const getCurrentMethod = () => {
    return separationMethods.find(m => m.id === selectedMethod);
  };

  const getCommentary = (methodId: string, progress: number): string => {
    const progressRounded = Math.floor(progress);
    
    switch (methodId) {
      case 'filtration':
        if (progressRounded === 0) return '🔍 Preparazione: Il miscuglio di solido e liquido viene versato nel filtro...';
        if (progressRounded < 30) return '💧 Filtrazione in corso: Il liquido passa attraverso i pori del filtro mentre le particelle solide vengono trattenute...';
        if (progressRounded < 60) return '⏳ Separazione: Le particelle solide si accumulano sul filtro, il liquido limpido viene raccolto...';
        if (progressRounded < 90) return '✅ Quasi completato: La maggior parte del liquido è stata filtrata...';
        return '🎉 Completato! Il solido è separato sul filtro, il liquido puro è nel contenitore!';
      
      case 'centrifugation':
        if (progressRounded === 0) return '🌀 Preparazione: Il campione viene inserito nella centrifuga...';
        if (progressRounded < 20) return '⚡ Rotazione: La centrifuga inizia a ruotare ad alta velocità...';
        if (progressRounded < 50) return '🔬 Separazione: La forza centrifuga spinge le particelle più dense verso il fondo...';
        if (progressRounded < 80) return '📊 Sedimentazione: Le particelle si stanno depositando, il sopranatante si sta separando...';
        return '✅ Completato! Le particelle dense sono sedimentate sul fondo, il sopranatante è in alto!';
      
      case 'extraction':
        if (progressRounded === 0) return '🧪 Preparazione: Il miscuglio viene mescolato con il solvente...';
        if (progressRounded < 30) return '🔄 Mescolamento: Le due fasi vengono agitate per favorire l\'estrazione...';
        if (progressRounded < 50) return '⏸️ Separazione: Il mescolamento si ferma, le fasi iniziano a separarsi...';
        if (progressRounded < 70) return '📊 Stratificazione: Le due fasi si stanno stratificando per differenza di densità...';
        if (progressRounded < 90) return '💧 Estrazione: Il rubinetto viene aperto per raccogliere la fase inferiore...';
        return '✅ Completato! Le due fasi sono completamente separate e la fase desiderata è stata estratta!';
      
      case 'decantation':
        if (progressRounded === 0) return '💧 Preparazione: Il miscuglio viene lasciato riposare...';
        if (progressRounded < 40) return '⏳ Sedimentazione: Le particelle solide iniziano a sedimentare per gravità...';
        if (progressRounded < 60) return '📊 Stratificazione: Le sostanze si stanno stratificando, la fase più densa in basso...';
        if (progressRounded < 80) return '🚰 Versamento: Il liquido superiore viene versato delicatamente...';
        return '✅ Completato! Il liquido limpido è stato separato dal sedimento!';
      
      case 'distillation':
        if (progressRounded === 0) return '🌡️ Preparazione: Il miscuglio viene riscaldato...';
        if (progressRounded < 20) return '🔥 Riscaldamento: La temperatura aumenta, il liquido inizia a riscaldarsi...';
        if (progressRounded < 30) return '💨 Ebollizione: Il componente più volatile inizia a bollire e formare vapore...';
        if (progressRounded < 50) return '🌊 Condensazione: Il vapore sale nel condensatore e viene raffreddato...';
        if (progressRounded < 70) return '💧 Gocciolamento: Il vapore condensato gocciola nel raccoglitore...';
        return '✅ Completato! Il componente più volatile è stato distillato e raccolto!';
      
      case 'crystallization':
        if (progressRounded === 0) return '✨ Preparazione: La soluzione satura viene riscaldata...';
        if (progressRounded < 30) return '💨 Evaporazione: Il solvente inizia ad evaporare, la soluzione si concentra...';
        if (progressRounded < 50) return '🔬 Saturazione: La soluzione diventa sempre più concentrata...';
        if (progressRounded < 70) return '💎 Nucleazione: I primi cristalli iniziano a formarsi...';
        if (progressRounded < 90) return '✨ Crescita: I cristalli continuano a crescere e moltiplicarsi...';
        return '✅ Completato! I cristalli sono completamente formati e possono essere raccolti!';
      
      case 'chromatography':
        if (progressRounded === 0) return '🎨 Preparazione: Il campione viene applicato sulla fase stazionaria...';
        if (progressRounded < 20) return '💧 Migrazione: Il solvente inizia a salire per capillarità...';
        if (progressRounded < 40) return '🌈 Separazione: I componenti iniziano a migrare a velocità diverse...';
        if (progressRounded < 60) return '📊 Bande: Le bande colorate dei diversi componenti diventano visibili...';
        if (progressRounded < 80) return '📏 Analisi: Le bande continuano a separarsi, mostrando le diverse affinità...';
        return '✅ Completato! Tutti i componenti sono stati separati in bande distinte!';
      
      case 'sieving':
        if (progressRounded === 0) return '⛓️ Preparazione: Il miscuglio viene versato sul setaccio...';
        if (progressRounded < 30) return '🔄 Scuotimento: Il setaccio viene agitato per far passare le particelle...';
        if (progressRounded < 50) return '📉 Separazione: Le particelle piccole passano attraverso i fori...';
        if (progressRounded < 70) return '📊 Raccolta: Le particelle piccole si accumulano nel contenitore...';
        return '✅ Completato! Le particelle sono state separate per dimensione!';
      
      case 'magnetization':
        if (progressRounded === 0) return '🧲 Preparazione: Il magnete viene avvicinato al miscuglio...';
        if (progressRounded < 20) return '⚡ Campo magnetico: Il campo magnetico si attiva e attrae le particelle ferrose...';
        if (progressRounded < 40) return '🔗 Attrazione: Le particelle magnetiche si muovono verso il magnete...';
        if (progressRounded < 60) return '📊 Separazione: Le particelle magnetiche sono attaccate al magnete...';
        return '✅ Completato! Le particelle magnetiche sono state separate da quelle non magnetiche!';
      
      case 'sublimation':
        if (progressRounded === 0) return '❄️ Preparazione: Il campione solido viene riscaldato...';
        if (progressRounded < 20) return '🔥 Riscaldamento: La temperatura aumenta, il solido inizia a sublimare...';
        if (progressRounded < 50) return '💨 Sublimazione: Le molecole passano direttamente da solido a vapore...';
        if (progressRounded < 70) return '❄️ Condensazione: Il vapore raggiunge la superficie fredda e si condensa...';
        return '✅ Completato! Il solido è stato sublimato e ricondensato in forma pura!';
      
      default:
        return '🎬 Simulazione in corso...';
    }
  };

  // Aggiorna la telecronaca quando cambia il progresso
  useEffect(() => {
    if (isAnimating || animationProgress > 0) {
      setCommentary(getCommentary(selectedMethod, animationProgress));
    } else {
      setCommentary('👆 Clicca "Avvia Simulazione" per vedere il processo in azione!');
    }
  }, [animationProgress, selectedMethod, isAnimating]);

  return (
    <div className="exercise5">
      <div className="exercise-header">
        <h2>🔬 Metodi di Separazione dei Miscugli</h2>
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
            🎬 Simulazione
          </button>
          <button 
            className={`tab ${currentSection === 'practical' ? 'active' : ''}`}
            onClick={() => setCurrentSection('practical')}
          >
            🧪 Pratico
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
            <h3>🎯 Metodi di Separazione dei Miscugli</h3>
            <p>
              I <strong>metodi di separazione</strong> permettono di separare i componenti di un miscuglio 
              sfruttando le loro <strong>proprietà fisiche</strong> diverse, come densità, solubilità, 
              temperatura di ebollizione, dimensione delle particelle o proprietà magnetiche.
            </p>
            <p>
              La scelta del metodo dipende dal tipo di miscuglio e dalle proprietà dei componenti da separare.
            </p>
          </div>

          <div className="methods-grid">
            <h4>🔬 Metodi di Separazione</h4>
            <div className="methods-container">
              {separationMethods.map((method) => (
                <div 
                  key={method.id} 
                  className="method-card" 
                  style={{ '--method-color': method.color } as React.CSSProperties}
                >
                  <div className="method-header">
                    <div className="method-icon">{method.icon}</div>
                    <h5>{method.name}</h5>
                  </div>
                  <div className="method-description">{method.description}</div>
                  <div className="method-principle">
                    <h6>Principio:</h6>
                    <p>{method.principle}</p>
                  </div>
                  <div className="method-steps">
                    <h6>Procedura:</h6>
                    <ol>
                      {method.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="method-examples">
                    <h6>Esempi:</h6>
                    <div className="examples-list">
                      {method.examples.map((example, index) => (
                        <span key={index} className="example-tag">{example}</span>
                      ))}
                    </div>
                  </div>
                  <div className="method-applications">
                    <h6>Applicazioni:</h6>
                    <ul>
                      {method.applications.map((app, index) => (
                        <li key={index}>{app}</li>
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
            <h3>🎬 Simulazioni Interattive</h3>
            <p>Visualizza come funzionano i metodi di separazione!</p>
          </div>

          <div className="method-selector">
            <h4>Seleziona un metodo:</h4>
            <div className="method-buttons">
              {separationMethods.map((method) => (
                <button
                  key={method.id}
                  className={`method-btn ${selectedMethod === method.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setAnimationProgress(0);
                    setIsAnimating(false);
                    setCommentary('👆 Clicca "Avvia Simulazione" per vedere il processo in azione!');
                  }}
                  style={{ '--method-color': method.color } as React.CSSProperties}
                >
                  <span className="method-btn-icon">{method.icon}</span>
                  <span className="method-btn-name">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {getCurrentMethod() && (
            <div className="animation-container">
              <div className="animation-controls">
                <button 
                  className="play-btn"
                  onClick={startAnimation}
                  disabled={isAnimating}
                >
                  ▶️ Avvia Simulazione
                </button>
                <button 
                  className="reset-btn"
                  onClick={() => {
                    setAnimationProgress(0);
                    setIsAnimating(false);
                    setCommentary('👆 Clicca "Avvia Simulazione" per vedere il processo in azione!');
                  }}
                >
                  🔄 Reset
                </button>
              </div>

              <div className="animation-display">
                <div className={`visual-animation ${getCurrentMethod()!.visualType}`}>
                  {getCurrentMethod()!.visualType === 'filtration' && (
                    <div className="filtration-animation">
                      <div className="filtration-setup">
                        <div className="funnel-container">
                          <div className="funnel">
                            <div className="filter-paper"></div>
                            <div 
                              className="mixture" 
                              style={{ height: `${Math.max(0, 100 - animationProgress * 1.2)}%` }}
                            >
                              <div className="solid-particles">
                                {Array.from({ length: 15 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="solid-particle"
                                    style={{
                                      left: `${(i % 5) * 20 + 10}%`,
                                      top: `${Math.floor(i / 5) * 15 + 10}%`,
                                      animationDelay: `${i * 0.1}s`
                                    }}
                                  ></div>
                                ))}
                              </div>
                              <div className="liquid-layer"></div>
                            </div>
                            {animationProgress > 0 && (
                              <div className="drops-container">
                                {Array.from({ length: Math.min(5, Math.floor(animationProgress / 20)) }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="drop"
                                    style={{
                                      left: `${30 + (i % 3) * 20}%`,
                                      animationDelay: `${i * 0.3}s`,
                                      animationDuration: `${1 + i * 0.2}s`
                                    }}
                                  ></div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="filtrate-container">
                            <div className="filtrate-beaker">
                              <div className="filtrate-liquid" style={{ height: `${Math.min(100, animationProgress * 0.8)}%` }}>
                                <div className="liquid-waves"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'centrifugation' && (
                    <div className="centrifugation-animation">
                      <div className="centrifuge-machine">
                        <div className={`centrifuge-rotor ${isAnimating ? 'spinning' : ''}`}>
                          <div className="centrifuge-tube tube-1">
                            <div className="tube-content">
                              <div 
                                className="sediment-layer" 
                                style={{ height: `${Math.min(40, animationProgress * 0.4)}%` }}
                              >
                                <div className="sediment-particles"></div>
                              </div>
                              <div className="supernatant-layer" style={{ height: `${Math.max(60, 100 - animationProgress * 0.4)}%` }}>
                                <div className="supernatant-particles"></div>
                              </div>
                            </div>
                          </div>
                          <div className="centrifuge-tube tube-2">
                            <div className="tube-content">
                              <div 
                                className="sediment-layer" 
                                style={{ height: `${Math.min(40, animationProgress * 0.4)}%` }}
                              >
                                <div className="sediment-particles"></div>
                              </div>
                              <div className="supernatant-layer" style={{ height: `${Math.max(60, 100 - animationProgress * 0.4)}%` }}>
                                <div className="supernatant-particles"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="centrifuge-base"></div>
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'extraction' && (
                    <div className="extraction-animation">
                      <div className="extraction-setup">
                        <div className="separatory-funnel">
                          {animationProgress < 30 ? (
                            <div className="mixed-phase" style={{ height: '100%' }}>
                              <div className="mixing-bubbles">
                                {Array.from({ length: 8 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="bubble"
                                    style={{
                                      left: `${Math.random() * 80 + 10}%`,
                                      top: `${Math.random() * 80 + 10}%`,
                                      animationDelay: `${i * 0.2}s`
                                    }}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <>
                              <div 
                                className="organic-layer" 
                                style={{ height: `${Math.max(30, 50 - animationProgress * 0.25)}%` }}
                              >
                                <div className="organic-molecules"></div>
                              </div>
                              <div 
                                className="interface-line"
                                style={{ top: `${Math.max(30, 50 - animationProgress * 0.25)}%` }}
                              ></div>
                              <div 
                                className="aqueous-layer" 
                                style={{ 
                                  height: `${Math.min(70, 50 + animationProgress * 0.25)}%`,
                                  top: `${Math.max(30, 50 - animationProgress * 0.25)}%`
                                }}
                              >
                                <div className="aqueous-molecules"></div>
                              </div>
                            </>
                          )}
                          <div className="stopcock" style={{ opacity: animationProgress > 70 ? 1 : 0.3 }}>
                            <div className="stopcock-handle"></div>
                          </div>
                        </div>
                        {animationProgress > 70 && (
                          <div className="extracted-container">
                            <div className="extracted-liquid" style={{ height: `${(animationProgress - 70) * 3.33}%` }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'decantation' && (
                    <div className="decantation-animation">
                      <div className="decantation-setup">
                        <div className="beaker-original">
                          <div className="beaker-label">Miscuglio</div>
                          <div className="beaker-content">
                            {animationProgress < 40 ? (
                              <div className="suspension">
                                <div className="suspended-particles">
                                  {Array.from({ length: 20 }).map((_, i) => (
                                    <div 
                                      key={i} 
                                      className="suspended-particle"
                                      style={{
                                        left: `${Math.random() * 90 + 5}%`,
                                        top: `${Math.random() * 90 + 5}%`,
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: `${2 + Math.random()}s`
                                      }}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <>
                                <div 
                                  className="top-layer" 
                                  style={{ height: `${Math.max(20, 50 - (animationProgress - 40) * 0.5)}%` }}
                                >
                                  <div className="layer-particles"></div>
                                </div>
                                <div 
                                  className="interface"
                                  style={{ top: `${Math.max(20, 50 - (animationProgress - 40) * 0.5)}%` }}
                                ></div>
                                <div 
                                  className="bottom-layer" 
                                  style={{ 
                                    height: `${Math.min(80, 50 + (animationProgress - 40) * 0.5)}%`,
                                    top: `${Math.max(20, 50 - (animationProgress - 40) * 0.5)}%`
                                  }}
                                >
                                  <div className="settled-particles"></div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {animationProgress > 60 && (
                          <div className="pouring-stream"></div>
                        )}
                        {animationProgress > 60 && (
                          <div className="beaker-decanted">
                            <div className="beaker-label">Separato</div>
                            <div className="decanted-liquid" style={{ height: `${Math.min(100, (animationProgress - 60) * 2.5)}%` }}>
                              <div className="liquid-particles"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'distillation' && (
                    <div className="distillation-animation">
                      <div className="distillation-apparatus">
                        <div className="heating-mantle">
                          <div className="flask">
                            <div className="liquid-mixture" style={{ height: `${Math.max(20, 100 - animationProgress * 0.8)}%` }}>
                              {animationProgress > 10 && (
                                <div className="boiling-bubbles">
                                  {Array.from({ length: Math.min(10, Math.floor(animationProgress / 5)) }).map((_, i) => (
                                    <div 
                                      key={i} 
                                      className="boiling-bubble"
                                      style={{
                                        left: `${Math.random() * 80 + 10}%`,
                                        bottom: `${Math.random() * 30}%`,
                                        animationDelay: `${i * 0.2}s`,
                                        animationDuration: `${0.8 + Math.random() * 0.4}s`
                                      }}
                                    ></div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {animationProgress > 15 && (
                              <div className="vapor-rising" style={{ opacity: Math.min(1, (animationProgress - 15) / 20) }}>
                                <div className="vapor-stream"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="condenser-tube">
                          {animationProgress > 20 && (
                            <div className="vapor-flow" style={{ opacity: Math.min(1, (animationProgress - 20) / 15) }}>
                              <div className="vapor-molecules"></div>
                            </div>
                          )}
                          <div className="cooling-jacket">
                            <div className="cooling-water"></div>
                          </div>
                          <div 
                            className="condensate-drops" 
                            style={{ opacity: animationProgress > 35 ? 1 : 0 }}
                          >
                            {Array.from({ length: Math.min(8, Math.floor((animationProgress - 35) / 8)) }).map((_, i) => (
                              <div 
                                key={i} 
                                className="condensate-drop"
                                style={{
                                  left: `${20 + (i % 3) * 30}%`,
                                  animationDelay: `${i * 0.3}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="distillate-receiver">
                          <div className="distillate-liquid" style={{ height: `${Math.max(0, (animationProgress - 40) * 1.67)}%` }}>
                            <div className="distillate-waves"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'crystallization' && (
                    <div className="crystallization-animation">
                      <div className="crystallization-setup">
                        <div className="evaporation-dish">
                          <div className="solution-layer" style={{ height: `${Math.max(30, 100 - animationProgress * 0.7)}%` }}>
                            {animationProgress < 60 && (
                              <div className="evaporating-molecules">
                                {Array.from({ length: Math.min(15, Math.floor(animationProgress / 4)) }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="evaporating-molecule"
                                    style={{
                                      left: `${Math.random() * 90 + 5}%`,
                                      top: `${Math.random() * 100}%`,
                                      animationDelay: `${i * 0.15}s`,
                                      animationDuration: `${1.5 + Math.random()}s`
                                    }}
                                  ></div>
                                ))}
                              </div>
                            )}
                            <div className="solution-particles"></div>
                          </div>
                          {animationProgress > 50 && (
                            <div className="crystals-container">
                              {Array.from({ length: Math.min(12, Math.floor((animationProgress - 50) / 4)) }).map((_, i) => {
                                const angle = (i * 30) % 360;
                                const radius = 30 + (Math.floor(i / 4) * 15);
                                const x = 50 + radius * Math.cos(angle * Math.PI / 180);
                                const y = 50 + radius * Math.sin(angle * Math.PI / 180);
                                return (
                                  <div 
                                    key={i} 
                                    className="crystal"
                                    style={{
                                      left: `${x}%`,
                                      top: `${y}%`,
                                      animationDelay: `${i * 0.3}s`,
                                      transform: `scale(${Math.min(1, (animationProgress - 50 - i * 4) / 20)})`
                                    }}
                                  ></div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className="heat-source">
                          <div className="flame"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'chromatography' && (
                    <div className="chromatography-animation">
                      <div className="chromatography-setup">
                        <div className="chromatography-strip">
                          <div className="stationary-phase"></div>
                          <div className="spot-original" style={{ opacity: animationProgress < 5 ? 1 : 0.3 }}>
                            <div className="spot-circle"></div>
                          </div>
                          <div className="solvent-container">
                            <div className="solvent-level" style={{ height: `${100 - animationProgress}%` }}></div>
                            <div className="solvent-front" style={{ top: `${animationProgress}%` }}>
                              <div className="front-line"></div>
                            </div>
                          </div>
                          <div className="migrating-bands">
                            <div 
                              className="band band-1" 
                              style={{ 
                                top: `${Math.min(animationProgress * 0.25, 25)}%`,
                                opacity: animationProgress > 10 ? 1 : 0
                              }}
                            >
                              <div className="band-color"></div>
                              <div className="band-label">Componente 1</div>
                            </div>
                            <div 
                              className="band band-2" 
                              style={{ 
                                top: `${Math.min(animationProgress * 0.45, 45)}%`,
                                opacity: animationProgress > 15 ? 1 : 0
                              }}
                            >
                              <div className="band-color"></div>
                              <div className="band-label">Componente 2</div>
                            </div>
                            <div 
                              className="band band-3" 
                              style={{ 
                                top: `${Math.min(animationProgress * 0.65, 65)}%`,
                                opacity: animationProgress > 20 ? 1 : 0
                              }}
                            >
                              <div className="band-color"></div>
                              <div className="band-label">Componente 3</div>
                            </div>
                          </div>
                        </div>
                        <div className="solvent-reservoir">
                          <div className="reservoir-liquid"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'sieving' && (
                    <div className="sieving-animation">
                      <div className="sieving-setup">
                        <div className={`sieve-mesh ${isAnimating ? 'shaking' : ''}`}>
                          <div className="mesh-holes"></div>
                          <div className="particles-on-sieve">
                            {Array.from({ length: 8 }).map((_, i) => {
                              const isLarge = i < 3;
                              return (
                                <div 
                                  key={i} 
                                  className={isLarge ? 'large-particle' : 'small-particle'}
                                  style={{
                                    left: `${(i % 4) * 25 + 10}%`,
                                    top: `${Math.floor(i / 4) * 30 + 20}%`,
                                    opacity: isLarge ? (animationProgress > 60 ? 0 : 1) : (animationProgress > 40 ? 0 : 1),
                                    transform: isLarge ? 'none' : `translateY(${Math.min(100, animationProgress * 2)}px)`
                                  }}
                                ></div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="collection-tray">
                          <div className="collected-particles-layer" style={{ height: `${Math.min(100, animationProgress * 1.2)}%` }}>
                            <div className="collected-particles-pattern">
                              {Array.from({ length: Math.min(20, Math.floor(animationProgress / 5)) }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="collected-particle"
                                  style={{
                                    left: `${Math.random() * 90 + 5}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.1}s`
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'magnetization' && (
                    <div className="magnetization-animation">
                      <div className="magnetization-setup">
                        <div className="magnet-top">
                          <div className="magnet-body">
                            <div className="magnet-north">N</div>
                            <div className="magnet-south">S</div>
                          </div>
                          <div className="magnetic-field" style={{ opacity: animationProgress > 5 ? Math.min(0.6, animationProgress / 50) : 0 }}>
                            <div className="field-lines"></div>
                          </div>
                        </div>
                        <div className="mixture-container">
                          <div className="particles-mixture">
                            {Array.from({ length: 10 }).map((_, i) => {
                              const isMagnetic = i < 4;
                              const angle = (i * 36) * Math.PI / 180;
                              const radius = 40 + (isMagnetic ? 0 : 20);
                              const startX = 50 + radius * Math.cos(angle);
                              const startY = 50 + radius * Math.sin(angle);
                              return (
                                <div 
                                  key={i} 
                                  className={isMagnetic ? 'magnetic-particle' : 'non-magnetic-particle'}
                                  style={{
                                    left: `${startX}%`,
                                    top: `${isMagnetic ? startY - (animationProgress * 0.3) : startY}%`,
                                    transform: `translate(-50%, -50%) ${isMagnetic ? `rotate(${animationProgress * 2}deg)` : ''}`,
                                    opacity: isMagnetic ? 1 : (animationProgress > 30 ? 0.3 : 1)
                                  }}
                                >
                                  {isMagnetic && <div className="magnetic-indicator"></div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="separated-magnetic">
                          {animationProgress > 40 && (
                            <div className="magnetic-collection" style={{ opacity: (animationProgress - 40) / 60 }}>
                              {Array.from({ length: 4 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="collected-magnetic"
                                  style={{
                                    left: `${20 + i * 20}%`,
                                    top: `${10 + (animationProgress - 40) * 0.5}%`
                                  }}
                                ></div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {getCurrentMethod()!.visualType === 'sublimation' && (
                    <div className="sublimation-animation">
                      <div className="sublimation-setup">
                        <div className="heating-chamber">
                          <div className="heat-source-bottom">
                            <div className="flame-animation"></div>
                          </div>
                          <div className="solid-sample-container">
                            <div className="solid-sample" style={{ height: `${Math.max(10, 100 - animationProgress * 0.9)}%` }}>
                              <div className="solid-structure"></div>
                            </div>
                            {animationProgress > 15 && (
                              <div className="subliming-molecules">
                                {Array.from({ length: Math.min(20, Math.floor((animationProgress - 15) / 4)) }).map((_, i) => {
                                  const angle = (i * 18) * Math.PI / 180;
                                  const radius = 30;
                                  const startX = 50 + radius * Math.cos(angle);
                                  const startY = 80;
                                  const endY = 20;
                                  const progress = Math.min(1, (animationProgress - 15 - i * 4) / 30);
                                  return (
                                    <div 
                                      key={i} 
                                      className="subliming-molecule"
                                      style={{
                                        left: `${startX}%`,
                                        top: `${startY - (endY - startY) * progress}%`,
                                        opacity: progress > 0 && progress < 1 ? 1 : 0,
                                        animationDelay: `${i * 0.2}s`
                                      }}
                                    ></div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="cold-finger">
                          <div className="cold-surface-label">Superficie Fredda</div>
                          <div className="cold-surface-area">
                            {animationProgress > 50 && (
                              <div className="condensed-crystals">
                                {Array.from({ length: Math.min(15, Math.floor((animationProgress - 50) / 3)) }).map((_, i) => {
                                  const angle = (i * 24) * Math.PI / 180;
                                  const radius = 20 + (Math.floor(i / 6) * 10);
                                  const x = 50 + radius * Math.cos(angle);
                                  const y = 30 + radius * Math.sin(angle);
                                  return (
                                    <div 
                                      key={i} 
                                      className="condensed-crystal"
                                      style={{
                                        left: `${x}%`,
                                        top: `${y}%`,
                                        animationDelay: `${i * 0.3}s`,
                                        transform: `scale(${Math.min(1, (animationProgress - 50 - i * 3) / 15)})`
                                      }}
                                    ></div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="animation-info">
                  <h4>{getCurrentMethod()!.name}</h4>
                  <p>{getCurrentMethod()!.description}</p>
                  
                  <div className="commentary-box">
                    <div className="commentary-icon">📢</div>
                    <div className="commentary-text">{commentary}</div>
                  </div>
                  
                  <div className="progress-bar-container">
                    <div className="animation-progress-bar" style={{ '--progress': `${animationProgress}%` } as React.CSSProperties}>
                      <span className="progress-text">{animationProgress}%</span>
                    </div>
                  </div>
                  
                  <div className="method-details">
                    <div className="detail-item">
                      <strong>Principio:</strong> {getCurrentMethod()!.principle}
                    </div>
                    <div className="detail-item">
                      <strong>Esempi pratici:</strong> {getCurrentMethod()!.examples.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {currentSection === 'practical' && (
        <div className="practical-section">
          <div className="practical-header">
            <h3>🧪 Esempi Pratici</h3>
            <p>Scopri come vengono applicati i metodi di separazione nella vita quotidiana!</p>
          </div>

          <div className="practical-examples">
            {separationMethods.map((method) => (
              <div key={method.id} className="practical-card" style={{ '--method-color': method.color } as React.CSSProperties}>
                <div className="practical-card-header">
                  <div className="practical-icon">{method.icon}</div>
                  <h4>{method.name}</h4>
                </div>
                <div className="practical-content">
                  <div className="practical-example">
                    <h5>Esempio Pratico:</h5>
                    <p>{method.examples[0]}</p>
                  </div>
                  <div className="practical-steps">
                    <h5>Come funziona:</h5>
                    <ol>
                      {method.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="practical-applications">
                    <h5>Dove si usa:</h5>
                    <ul>
                      {method.applications.map((app, index) => (
                        <li key={index}>{app}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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
                    ? "Perfetto! 🏆 Hai padroneggiato i metodi di separazione!"
                    : getScore() >= exercises.length * 0.8
                    ? "Ottimo lavoro! 👍 Hai una buona comprensione dell'argomento."
                    : getScore() >= exercises.length * 0.6
                    ? "Buono! 📚 Ripassa la teoria e riprova."
                    : "Continua a studiare! 💪 Ripassa i metodi di separazione."
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
                  🎬 Vedi Simulazioni
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

export default Exercise5;

