import React, { useState, useEffect } from 'react';
import './Exercise2.css';
import { getRandomQuestions, Question } from '../data/questionsDatabase';

interface Substance {
  id: string;
  name: string;
  formula: string;
  type: 'element' | 'compound' | 'mixture';
  category: string;
  color: string;
  icon: string;
  description: string;
}

interface ChemicalReaction {
  reactants: string[];
  products: string[];
  equation: string;
  type: string;
  description: string;
  isExplosive: boolean;
}

const Exercise2: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'theory' | 'lab' | 'quiz'>('theory');
  const [selectedSubstances, setSelectedSubstances] = useState<string[]>([]);
  const [lastReaction, setLastReaction] = useState<ChemicalReaction | null>(null);
  const [showExplosion, setShowExplosion] = useState<boolean>(false);
  const [cabinetOpen, setCabinetOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const substances: Substance[] = [
    { id: 'H', name: 'Idrogeno', formula: 'H₂', type: 'element', category: 'gas', color: '#FF6B6B', icon: '💨', description: 'Gas leggero' },
    { id: 'O', name: 'Ossigeno', formula: 'O₂', type: 'element', category: 'gas', color: '#4ECDC4', icon: '💨', description: 'Gas necessario' },
    { id: 'Na', name: 'Sodio', formula: 'Na', type: 'element', category: 'metal', color: '#FFE66D', icon: '⚡', description: 'Metallo reattivo' },
    { id: 'Cl', name: 'Cloro', formula: 'Cl₂', type: 'element', category: 'gas', color: '#95E1D3', icon: '☠️', description: 'Gas tossico' },
    { id: 'Fe', name: 'Ferro', formula: 'Fe', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo comune' },
    { id: 'C', name: 'Carbonio', formula: 'C', type: 'element', category: 'non-metal', color: '#2C3E50', icon: '💎', description: 'Elemento base' },
    { id: 'H2O', name: 'Acqua', formula: 'H₂O', type: 'compound', category: 'liquid', color: '#74B9FF', icon: '💧', description: 'Composto essenziale' },
    { id: 'NaCl', name: 'Cloruro di Sodio', formula: 'NaCl', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale da cucina' },
    { id: 'CO2', name: 'Anidride Carbonica', formula: 'CO₂', type: 'compound', category: 'gas', color: '#6C5CE7', icon: '💨', description: 'Gas serra' },
    { id: 'HCl', name: 'Acido Cloridrico', formula: 'HCl', type: 'compound', category: 'acid', color: '#E17055', icon: '🧪', description: 'Acido forte' },
    { id: 'NaOH', name: 'Idrossido di Sodio', formula: 'NaOH', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Base forte' },
    { id: 'CH4', name: 'Metano', formula: 'CH₄', type: 'compound', category: 'gas', color: '#FD79A8', icon: '🔥', description: 'Gas naturale' },
    { id: 'AIR', name: 'Aria', formula: 'N₂ + O₂', type: 'mixture', category: 'gas', color: '#B2BEC3', icon: '🌬️', description: 'Miscuglio di gas' },
    { id: 'SALT_WATER', name: 'Acqua Salata', formula: 'H₂O + NaCl', type: 'mixture', category: 'liquid', color: '#81ECEC', icon: '🌊', description: 'Miscuglio omogeneo' },
    { id: 'SAND_WATER', name: 'Sabbia e Acqua', formula: 'SiO₂ + H₂O', type: 'mixture', category: 'solid', color: '#FDCB6E', icon: '🏖️', description: 'Miscuglio eterogeneo' },
    { id: 'STEEL', name: 'Acciaio', formula: 'Fe + C', type: 'mixture', category: 'solid', color: '#FFD93D', icon: '🔶', description: 'Lega metallica' },
  ];

  const reactions: ChemicalReaction[] = [
    { reactants: ['H', 'O'], products: ['H2O'], equation: '2H₂ + O₂ → 2H₂O', type: 'combination', description: 'Combustione dell\'idrogeno', isExplosive: false },
    { reactants: ['Na', 'Cl'], products: ['NaCl'], equation: '2Na + Cl₂ → 2NaCl', type: 'combination', description: 'Formazione del sale', isExplosive: false },
    { reactants: ['HCl', 'NaOH'], products: ['NaCl', 'H2O'], equation: 'HCl + NaOH → NaCl + H₂O', type: 'neutralization', description: 'Neutralizzazione', isExplosive: false },
    { reactants: ['CH4', 'O'], products: ['CO2', 'H2O'], equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O', type: 'combustion', description: 'Combustione del metano', isExplosive: false },
    { reactants: ['Na', 'H2O'], products: ['NaOH', 'H'], equation: '2Na + 2H₂O → 2NaOH + H₂', type: 'single-replacement', description: 'Sodio reagisce con acqua!', isExplosive: true },
  ];

  const handleSubstanceSelect = (substanceId: string) => {
    if (selectedSubstances.includes(substanceId)) {
      setSelectedSubstances(selectedSubstances.filter(id => id !== substanceId));
    } else if (selectedSubstances.length < 3) {
      setSelectedSubstances([...selectedSubstances, substanceId]);
    }
  };

  const assembleSubstances = () => {
    if (selectedSubstances.length < 2) return;
    const matchingReaction = reactions.find(reaction => 
      reaction.reactants.every(reactant => selectedSubstances.includes(reactant))
    );
    if (matchingReaction) {
      setLastReaction(matchingReaction);
      if (matchingReaction.isExplosive) {
        setShowExplosion(true);
        setTimeout(() => setShowExplosion(false), 3000);
      }
    } else {
      setShowExplosion(true);
      setLastReaction({
        reactants: selectedSubstances,
        products: ['💥'],
        equation: 'Sostanze Incompatibili → 💥 ESPLOSIONE!',
        type: 'combination',
        description: 'Attenzione! Queste sostanze non possono essere mescolate!',
        isExplosive: true
      });
      setTimeout(() => setShowExplosion(false), 3000);
    }
    setTimeout(() => {
      setSelectedSubstances([]);
      setLastReaction(null);
    }, 2000);
  };

  const clearSelection = () => {
    setSelectedSubstances([]);
    setLastReaction(null);
    setShowExplosion(false);
  };

  const getSelectedSubstancesData = () => {
    return selectedSubstances.map(id => substances.find(s => s.id === id)).filter(Boolean);
  };

  useEffect(() => {
    if (currentSection === 'quiz') {
      const quizQuestions = getRandomQuestions(10, ['sostanze', 'reazioni', 'acidi-basi', 'soluzioni', 'legami', 'tavola-periodica']);
      setQuizQuestions(quizQuestions);
      setCurrentQuizQuestion(0);
      setQuizAnswers([]);
      setShowQuizResults(false);
    }
  }, [currentSection]);

  const handleQuizAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizQuestion] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const nextQuizQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    }
  };

  const prevQuizQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion(currentQuizQuestion - 1);
    }
  };

  const checkQuizAnswers = () => {
    setShowQuizResults(true);
  };

  const resetQuiz = () => {
    const newQuestions = getRandomQuestions(10, ['sostanze', 'reazioni', 'acidi-basi', 'soluzioni', 'legami', 'tavola-periodica']);
    setQuizQuestions(newQuestions);
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
    setShowQuizResults(false);
  };

  const getQuizScore = () => {
    return quizAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length;
  };

  const getFilteredSubstances = () => {
    if (selectedCategory === 'all') return substances;
    if (['element', 'compound', 'mixture'].includes(selectedCategory)) {
      return substances.filter(substance => substance.type === selectedCategory);
    }
    return substances.filter(substance => substance.category === selectedCategory);
  };

  const categories = [
    { id: 'all', name: 'Tutte', icon: '🧪', color: '#667eea' },
    { id: 'element', name: 'Elementi', icon: '⚛️', color: '#ff6b6b' },
    { id: 'compound', name: 'Composti', icon: '🔗', color: '#4ecdc4' },
    { id: 'mixture', name: 'Miscugli', icon: '🌪️', color: '#fdcb6e' },
    { id: 'gas', name: 'Gas', icon: '💨', color: '#95e1d3' },
    { id: 'liquid', name: 'Liquidi', icon: '💧', color: '#74b9ff' },
    { id: 'solid', name: 'Solidi', icon: '🔶', color: '#6c5ce7' },
    { id: 'acid', name: 'Acidi', icon: '🧪', color: '#e17055' },
    { id: 'base', name: 'Basi', icon: '🧪', color: '#a29bfe' },
    { id: 'salt', name: 'Sali', icon: '🧂', color: '#fdcb6e' },
    { id: 'metal', name: 'Metalli', icon: '🔶', color: '#ffd93d' },
    { id: 'non-metal', name: 'Non-Metalli', icon: '💎', color: '#2c3e50' },
  ];

  return (
    <div className="exercise2">
      <div className="exercise-header">
        <h2>🧪 Sostanze, Composti e Miscugli</h2>
        <div className="section-tabs">
          <button className={`tab ${currentSection === 'theory' ? 'active' : ''}`} onClick={() => setCurrentSection('theory')}>📖 Teoria</button>
          <button className={`tab ${currentSection === 'lab' ? 'active' : ''}`} onClick={() => setCurrentSection('lab')}>🔬 Laboratorio</button>
          <button className={`tab ${currentSection === 'quiz' ? 'active' : ''}`} onClick={() => setCurrentSection('quiz')}>✏️ Quiz</button>
        </div>
      </div>

      {currentSection === 'theory' && (
        <div className="theory-section">
          <div className="theory-intro">
            <h3>🎯 Sostanze Pure e Miscugli</h3>
            <p>In chimica distinguiamo tra <strong>sostanze pure</strong> e <strong>miscugli</strong>. Le sostanze pure possono essere <strong>elementi</strong> o <strong>composti</strong>.</p>
          </div>

          <div className="concepts-grid">
            <div className="concept-card element-card">
              <div className="concept-icon">⚛️</div>
              <h4>Elementi</h4>
              <p>Sostanze pure costituite da un solo tipo di atomo</p>
              <div className="examples">
                <span className="example">H₂ (Idrogeno)</span>
                <span className="example">O₂ (Ossigeno)</span>
                <span className="example">Na (Sodio)</span>
              </div>
            </div>

            <div className="concept-card compound-card">
              <div className="concept-icon">🔗</div>
              <h4>Composti</h4>
              <p>Sostanze pure costituite da due o più elementi combinati</p>
              <div className="examples">
                <span className="example">H₂O (Acqua)</span>
                <span className="example">NaCl (Sale)</span>
                <span className="example">CO₂ (Anidride Carbonica)</span>
              </div>
            </div>

            <div className="concept-card mixture-card">
              <div className="concept-icon">🌪️</div>
              <h4>Miscugli</h4>
              <p>Combinazioni di sostanze che mantengono le loro proprietà</p>
              <div className="examples">
                <span className="example">Aria</span>
                <span className="example">Acqua Salata</span>
                <span className="example">Sabbia e Acqua</span>
              </div>
            </div>
          </div>

          <div className="reactions-info">
            <h4>⚡ Tipi di Reazioni Chimiche</h4>
            <div className="reaction-types">
              <div className="reaction-type">
                <h5>🔄 Combinazione</h5>
                <p className="reaction-equation">A + B → AB</p>
                <p>Due sostanze si uniscono per formare un composto</p>
              </div>
              <div className="reaction-type">
                <h5>🧪 Neutralizzazione</h5>
                <p className="reaction-equation">Acido + Base → Sale + Acqua</p>
                <p>Reazione tra acido e base</p>
              </div>
              <div className="reaction-type">
                <h5>🔥 Combustione</h5>
                <p className="reaction-equation">Sostanza + O₂ → Prodotti + Calore</p>
                <p>Reazione con ossigeno che produce calore</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'lab' && (
        <div className="lab-section">
          <div className="lab-header">
            <h3>🔬 Laboratorio Virtuale</h3>
            <p>Seleziona 2-3 sostanze dall'armadio e premi "Assembla" per vedere la reazione!</p>
          </div>

          <div className="cabinet-container">
            <button className={`cabinet-door ${cabinetOpen ? 'open' : ''}`} onClick={() => setCabinetOpen(!cabinetOpen)}>
              <div className="cabinet-handle">🚪</div>
              <div className="cabinet-label">Armadio delle Sostanze</div>
            </button>

            {cabinetOpen && (
              <div className="substances-panel">
                <div className="category-filters">
                  <h4>Filtra per categoria:</h4>
                  <div className="filter-buttons">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                        style={{ '--category-color': category.color } as React.CSSProperties}
                      >
                        <span className="filter-icon">{category.icon}</span>
                        <span className="filter-name">{category.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="substance-count">Mostrando {getFilteredSubstances().length} sostanze</div>
                </div>
                
                <div className="substances-container">
                  {getFilteredSubstances().map(substance => (
                    <div
                      key={substance.id}
                      className={`substance-item ${selectedSubstances.includes(substance.id) ? 'selected' : ''} ${substance.type}`}
                      onClick={() => handleSubstanceSelect(substance.id)}
                      style={{ '--substance-color': substance.color } as React.CSSProperties}
                    >
                      <div className="substance-icon">{substance.icon}</div>
                      <div className="substance-name">{substance.name}</div>
                      <div className="substance-formula">{substance.formula}</div>
                      <div className="substance-type">{substance.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="assembly-area">
            <div className="selected-substances">
              <h4>Sostanze Selezionate:</h4>
              <div className="selected-list">
                {getSelectedSubstancesData().map(substance => (
                  <div key={substance!.id} className="selected-substance">
                    <span className="substance-icon">{substance!.icon}</span>
                    <span className="substance-name">{substance!.name}</span>
                    <span className="substance-formula">{substance!.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="assembly-controls">
              <button className="assemble-btn" onClick={assembleSubstances} disabled={selectedSubstances.length < 2}>🔬 ASSEMBLA!</button>
              <button className="clear-btn" onClick={clearSelection} disabled={selectedSubstances.length === 0}>🗑️ Pulisci</button>
            </div>
          </div>

          {lastReaction && (
            <div className={`reaction-result ${lastReaction.isExplosive ? 'explosive' : 'success'}`}>
              <div className="reaction-header">
                <h4>{lastReaction.isExplosive ? '💥 ESPLOSIONE!' : '✅ Reazione Riuscita!'}</h4>
              </div>
              <div className="reaction-equation-display">
                <div className="reactants">
                  {lastReaction.reactants.map(reactant => {
                    const substance = substances.find(s => s.id === reactant);
                    return <span key={reactant} className="reaction-substance">{substance?.icon} {substance?.formula}</span>;
                  })}
                </div>
                <div className="arrow">→</div>
                <div className="products">
                  {lastReaction.products.map(product => {
                    if (product === '💥') return <span key={product} className="explosion">💥</span>;
                    const substance = substances.find(s => s.id === product);
                    return <span key={product} className="reaction-substance">{substance?.icon} {substance?.formula}</span>;
                  })}
                </div>
              </div>
              <div className="reaction-description">{lastReaction.description}</div>
            </div>
          )}

          {showExplosion && (
            <div className="explosion-animation">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="explosion-particle">💥</div>)}
            </div>
          )}
        </div>
      )}

      {currentSection === 'quiz' && (
        <div className="quiz-section">
          {!showQuizResults ? (
            <>
              <div className="quiz-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}></div>
                </div>
                <span className="progress-text">Domanda {currentQuizQuestion + 1} di {quizQuestions.length}</span>
              </div>

              <div className="quiz-card">
                <h3>{quizQuestions[currentQuizQuestion]?.question}</h3>
                <div className="quiz-difficulty">
                  Difficoltà: <span className={`difficulty-badge ${quizQuestions[currentQuizQuestion]?.difficulty}`}>
                    {quizQuestions[currentQuizQuestion]?.difficulty === 'easy' ? '🟢 Facile' : quizQuestions[currentQuizQuestion]?.difficulty === 'medium' ? '🟡 Media' : '🔴 Difficile'}
                  </span>
                </div>
                <div className="options">
                  {quizQuestions[currentQuizQuestion]?.options.map((option, index) => (
                    <button key={index} className={`option ${quizAnswers[currentQuizQuestion] === index ? 'selected' : ''}`} onClick={() => handleQuizAnswerSelect(index)}>
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="quiz-navigation">
                <button className="nav-btn prev" onClick={prevQuizQuestion} disabled={currentQuizQuestion === 0}>← Precedente</button>
                {currentQuizQuestion === quizQuestions.length - 1 ? (
                  <button className="nav-btn check" onClick={checkQuizAnswers} disabled={quizAnswers.length !== quizQuestions.length}>✅ Verifica Risposte</button>
                ) : (
                  <button className="nav-btn next" onClick={nextQuizQuestion} disabled={quizAnswers[currentQuizQuestion] === undefined}>Successivo →</button>
                )}
              </div>
            </>
          ) : (
            <div className="quiz-results-section">
              <div className="score-card">
                <h3>🎉 Risultati Quiz</h3>
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-number">{getQuizScore()}</span>
                    <span className="score-total">/{quizQuestions.length}</span>
                  </div>
                  <p className="score-percentage">{Math.round((getQuizScore() / quizQuestions.length) * 100)}%</p>
                </div>
                <p className="score-message">
                  {getQuizScore() === quizQuestions.length ? "Perfetto! 🏆 Hai risposto correttamente a tutte le domande!"
                    : getQuizScore() >= quizQuestions.length * 0.8 ? "Ottimo lavoro! 👍 Hai una buona conoscenza dell'argomento."
                    : getQuizScore() >= quizQuestions.length * 0.6 ? "Buono! 📚 Ripassa la teoria e riprova."
                    : "Continua a studiare! 💪 Ripassa gli argomenti trattati."}
                </p>
              </div>

              <div className="answers-review">
                <h4>📝 Rivedi le Risposte</h4>
                {quizQuestions.map((question, index) => (
                  <div key={question.id} className="answer-item">
                    <div className="question-review"><strong>Domanda {index + 1}:</strong> {question.question}</div>
                    <div className="answer-review">
                      <div className={`user-answer ${quizAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                        <span className="answer-label">La tua risposta:</span>
                        <span className="answer-text">{String.fromCharCode(65 + quizAnswers[index])}. {question.options[quizAnswers[index]]}</span>
                        {quizAnswers[index] === question.correctAnswer ? ' ✅' : ' ❌'}
                      </div>
                      {quizAnswers[index] !== question.correctAnswer && (
                        <div className="correct-answer">
                          <span className="answer-label">Risposta corretta:</span>
                          <span className="answer-text">{String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}</span>
                        </div>
                      )}
                      <div className="explanation"><strong>Spiegazione:</strong> {question.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quiz-actions">
                <button className="action-btn reset" onClick={resetQuiz}>🔄 Nuove Domande</button>
                <button className="action-btn theory" onClick={() => setCurrentSection('theory')}>📖 Ripassa la Teoria</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exercise2;

