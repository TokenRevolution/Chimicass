import React, { useState, useEffect } from 'react';
import './Exercise3.css';
import { getRandomQuestions, Question } from '../data/questionsDatabase';

interface CalculationExample {
  id: number;
  title: string;
  formula: string;
  example: string;
  solution: string;
  explanation: string;
  category: 'density' | 'velocity' | 'volume' | 'area' | 'conversion' | 'energy';
}

const Exercise3: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'theory' | 'examples' | 'exercises'>('theory');
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Question[]>([]);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const calculationExamples: CalculationExample[] = [
    {
      id: 1,
      title: "Calcolo della Densità",
      formula: "ρ = m/V",
      example: "Un oggetto ha massa 2 kg e volume 0,001 m³. Calcola la densità.",
      solution: "ρ = 2 kg / 0,001 m³ = 2000 kg/m³",
      explanation: "La densità si calcola dividendo la massa per il volume.",
      category: 'density'
    },
    {
      id: 2,
      title: "Calcolo della Velocità",
      formula: "v = s/t",
      example: "Un'automobile percorre 120 km in 2 ore. Calcola la velocità media.",
      solution: "v = 120 km / 2 h = 60 km/h",
      explanation: "La velocità si calcola dividendo lo spazio percorso per il tempo impiegato.",
      category: 'velocity'
    },
    {
      id: 3,
      title: "Calcolo del Volume di un Cubo",
      formula: "V = l³",
      example: "Un cubo ha spigolo di 3 m. Calcola il volume.",
      solution: "V = (3 m)³ = 27 m³",
      explanation: "Il volume di un cubo è il cubo della lunghezza dello spigolo.",
      category: 'volume'
    },
    {
      id: 4,
      title: "Calcolo dell'Area di un Rettangolo",
      formula: "A = b × h",
      example: "Un rettangolo ha base 4 m e altezza 3 m. Calcola l'area.",
      solution: "A = 4 m × 3 m = 12 m²",
      explanation: "L'area di un rettangolo è il prodotto tra base e altezza.",
      category: 'area'
    },
    {
      id: 5,
      title: "Conversione di Unità di Tempo",
      formula: "1 ora = 3600 secondi",
      example: "Quanti secondi ci sono in 2,5 ore?",
      solution: "2,5 ore = 2,5 × 3600 s = 9000 s",
      explanation: "Per convertire le ore in secondi, moltiplica per 3600.",
      category: 'conversion'
    },
    {
      id: 6,
      title: "Calcolo dell'Energia Cinetica",
      formula: "Ek = ½mv²",
      example: "Un oggetto di massa 2 kg ha velocità 10 m/s. Calcola l'energia cinetica.",
      solution: "Ek = ½ × 2 kg × (10 m/s)² = ½ × 2 × 100 = 100 J",
      explanation: "L'energia cinetica dipende dalla massa e dal quadrato della velocità.",
      category: 'energy'
    }
  ];

  // Carica domande randomizzate all'avvio
  useEffect(() => {
    const randomQuestions = getRandomQuestions(10, ['calcoli']); // 10 domande sui calcoli
    setExercises(randomQuestions);
  }, []);

  // Funzione per ricaricare nuove domande
  const reloadQuestions = () => {
    const newQuestions = getRandomQuestions(10, ['calcoli']);
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

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="exercise3">
      <div className="exercise-header">
        <h2>🧮 Calcoli con Grandezze Fondamentali</h2>
        <div className="section-tabs">
          <button 
            className={`tab ${currentSection === 'theory' ? 'active' : ''}`}
            onClick={() => setCurrentSection('theory')}
          >
            📖 Teoria
          </button>
          <button 
            className={`tab ${currentSection === 'examples' ? 'active' : ''}`}
            onClick={() => setCurrentSection('examples')}
          >
            💡 Esempi
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
            <h3>🎯 Calcoli con Grandezze Fondamentali</h3>
            <p>
              Le grandezze fondamentali possono essere combinate attraverso operazioni matematiche 
              per ottenere <strong>grandezze derivate</strong>. Imparare a fare questi calcoli è 
              fondamentale per comprendere la fisica e la chimica.
            </p>
            <p>
              In questa sezione imparerai a calcolare densità, velocità, volumi, aree e a convertire 
              tra diverse unità di misura.
            </p>
          </div>

          <div className="formulas-grid">
            <h4>📐 Formule Principali</h4>
            <div className="formulas-container">
              <div className="formula-card">
                <h5>Densità</h5>
                <div className="formula">ρ = m/V</div>
                <p>Dove ρ è la densità, m la massa e V il volume</p>
                <div className="units">[kg/m³]</div>
              </div>
              
              <div className="formula-card">
                <h5>Velocità</h5>
                <div className="formula">v = s/t</div>
                <p>Dove v è la velocità, s lo spazio e t il tempo</p>
                <div className="units">[m/s]</div>
              </div>
              
              <div className="formula-card">
                <h5>Volume Cubo</h5>
                <div className="formula">V = l³</div>
                <p>Dove V è il volume e l la lunghezza dello spigolo</p>
                <div className="units">[m³]</div>
              </div>
              
              <div className="formula-card">
                <h5>Area Rettangolo</h5>
                <div className="formula">A = b × h</div>
                <p>Dove A è l'area, b la base e h l'altezza</p>
                <div className="units">[m²]</div>
              </div>
              
              <div className="formula-card">
                <h5>Forza</h5>
                <div className="formula">F = m × a</div>
                <p>Dove F è la forza, m la massa e a l'accelerazione</p>
                <div className="units">[N]</div>
              </div>
              
              <div className="formula-card">
                <h5>Energia Cinetica</h5>
                <div className="formula">Ek = ½mv²</div>
                <p>Dove Ek è l'energia cinetica, m la massa e v la velocità</p>
                <div className="units">[J]</div>
              </div>
            </div>
          </div>

          <div className="conversion-table">
            <h4>🔄 Conversioni di Unità</h4>
            <div className="conversion-grid">
              <div className="conversion-card">
                <h5>Lunghezza</h5>
                <div className="conversions">
                  <div>1 km = 1000 m</div>
                  <div>1 m = 100 cm</div>
                  <div>1 cm = 10 mm</div>
                </div>
              </div>
              
              <div className="conversion-card">
                <h5>Massa</h5>
                <div className="conversions">
                  <div>1 kg = 1000 g</div>
                  <div>1 g = 1000 mg</div>
                  <div>1 t = 1000 kg</div>
                </div>
              </div>
              
              <div className="conversion-card">
                <h5>Tempo</h5>
                <div className="conversions">
                  <div>1 h = 3600 s</div>
                  <div>1 min = 60 s</div>
                  <div>1 giorno = 86400 s</div>
                </div>
              </div>
              
              <div className="conversion-card">
                <h5>Volume</h5>
                <div className="conversions">
                  <div>1 L = 0,001 m³</div>
                  <div>1 mL = 0,000001 m³</div>
                  <div>1 m³ = 1000 L</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'examples' && (
        <div className="examples-section">
          <div className="examples-header">
            <h3>💡 Esempi di Calcoli</h3>
            <p>Clicca su "Mostra Soluzione" per vedere come risolvere ogni problema passo dopo passo.</p>
          </div>

          <div className="examples-grid">
            {calculationExamples.map((example) => (
              <div key={example.id} className="example-card">
                <div className="example-header">
                  <h4>{example.title}</h4>
                  <div className="formula-display">{example.formula}</div>
                </div>
                
                <div className="example-problem">
                  <h5>Problema:</h5>
                  <p>{example.example}</p>
                </div>
                
                <button 
                  className="solution-btn"
                  onClick={toggleSolution}
                >
                  {showSolution ? 'Nascondi' : 'Mostra'} Soluzione
                </button>
                
                {showSolution && (
                  <div className="example-solution">
                    <h5>Soluzione:</h5>
                    <div className="solution-steps">
                      <div className="step">
                        <strong>Formula:</strong> {example.formula}
                      </div>
                      <div className="step">
                        <strong>Calcolo:</strong> {example.solution}
                      </div>
                      <div className="step">
                        <strong>Spiegazione:</strong> {example.explanation}
                      </div>
                    </div>
                  </div>
                )}
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
                    ? "Perfetto! 🏆 Hai risposto correttamente a tutti i calcoli!"
                    : getScore() >= exercises.length * 0.8
                    ? "Ottimo lavoro! 👍 Hai una buona padronanza dei calcoli."
                    : getScore() >= exercises.length * 0.6
                    ? "Buono! 📚 Ripassa le formule e riprova."
                    : "Continua a esercitarti! 💪 Ripassa le formule e i calcoli."
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
                <button className="action-btn examples" onClick={() => setCurrentSection('examples')}>
                  💡 Vedi Esempi
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

export default Exercise3;
