import React, { useState, useEffect } from 'react';
import './Exercise1.css';
import { getRandomQuestions, Question } from '../data/questionsDatabase';

interface FundamentalQuantity {
  id: number;
  name: string;
  symbol: string;
  unit: string;
  unitSymbol: string;
  description: string;
}

// Rimuovo l'interfaccia Exercise locale, uso quella importata

const Exercise1: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<'theory' | 'exercises'>('theory');
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Question[]>([]);

  const fundamentalQuantities: FundamentalQuantity[] = [
    {
      id: 1,
      name: "Lunghezza",
      symbol: "l",
      unit: "metro",
      unitSymbol: "m",
      description: "Distanza tra due punti nello spazio"
    },
    {
      id: 2,
      name: "Massa",
      symbol: "m",
      unit: "chilogrammo",
      unitSymbol: "kg",
      description: "Quantità di materia contenuta in un corpo"
    },
    {
      id: 3,
      name: "Tempo",
      symbol: "t",
      unit: "secondo",
      unitSymbol: "s",
      description: "Durata di un evento o intervallo temporale"
    },
    {
      id: 4,
      name: "Corrente elettrica",
      symbol: "I",
      unit: "ampere",
      unitSymbol: "A",
      description: "Quantità di carica elettrica che attraversa una sezione nell'unità di tempo"
    },
    {
      id: 5,
      name: "Temperatura termodinamica",
      symbol: "T",
      unit: "kelvin",
      unitSymbol: "K",
      description: "Misura dell'energia cinetica media delle particelle"
    },
    {
      id: 6,
      name: "Quantità di sostanza",
      symbol: "n",
      unit: "mole",
      unitSymbol: "mol",
      description: "Numero di entità elementari (atomi, molecole, ioni) presenti"
    },
    {
      id: 7,
      name: "Intensità luminosa",
      symbol: "Iv",
      unit: "candela",
      unitSymbol: "cd",
      description: "Potenza luminosa emessa in una direzione specifica"
    }
  ];

  // Carica domande randomizzate all'avvio
  useEffect(() => {
    const randomQuestions = getRandomQuestions(8, ['grandezze']); // 8 domande sulla categoria grandezze
    setExercises(randomQuestions);
  }, []);

  // Funzione per ricaricare nuove domande
  const reloadQuestions = () => {
    const newQuestions = getRandomQuestions(8, ['grandezze']);
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

  return (
    <div className="exercise1">
      <div className="exercise-header">
        <h2>🧪 Grandezze Fondamentali e Derivate</h2>
        <div className="section-tabs">
          <button 
            className={`tab ${currentSection === 'theory' ? 'active' : ''}`}
            onClick={() => setCurrentSection('theory')}
          >
            📖 Teoria
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
            <h3>🎯 Le Grandezze Fondamentali</h3>
            <p>
              Nel Sistema Internazionale (SI) esistono <strong>7 grandezze fondamentali</strong> 
              che sono indipendenti tra loro e dalle quali si possono derivare tutte le altre grandezze fisiche.
            </p>
            <p>
              Le grandezze derivate sono invece ottenute combinando le grandezze fondamentali 
              attraverso operazioni matematiche (moltiplicazione, divisione, elevazione a potenza).
            </p>
          </div>

          <div className="quantities-table">
            <h4>📊 Tabella delle 7 Grandezze Fondamentali</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Grandezza</th>
                    <th>Simbolo</th>
                    <th>Unità</th>
                    <th>Simbolo Unità</th>
                    <th>Descrizione</th>
                  </tr>
                </thead>
                <tbody>
                  {fundamentalQuantities.map((quantity) => (
                    <tr key={quantity.id}>
                      <td className="quantity-name">{quantity.name}</td>
                      <td className="quantity-symbol">{quantity.symbol}</td>
                      <td className="quantity-unit">{quantity.unit}</td>
                      <td className="unit-symbol">{quantity.unitSymbol}</td>
                      <td className="quantity-description">{quantity.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="examples-section">
            <h4>💡 Esempi di Grandezze Derivate</h4>
            <div className="examples-grid">
              <div className="example-card">
                <h5>Volume</h5>
                <p><strong>Formula:</strong> V = l³</p>
                <p><strong>Unità:</strong> m³ (metro cubo)</p>
                <p>Derivata dalla lunghezza elevata al cubo</p>
              </div>
              <div className="example-card">
                <h5>Velocità</h5>
                <p><strong>Formula:</strong> v = l/t</p>
                <p><strong>Unità:</strong> m/s (metro al secondo)</p>
                <p>Derivata dal rapporto tra lunghezza e tempo</p>
              </div>
              <div className="example-card">
                <h5>Densità</h5>
                <p><strong>Formula:</strong> ρ = m/V</p>
                <p><strong>Unità:</strong> kg/m³ (chilogrammo per metro cubo)</p>
                <p>Derivata dal rapporto tra massa e volume</p>
              </div>
              <div className="example-card">
                <h5>Forza</h5>
                <p><strong>Formula:</strong> F = m·a</p>
                <p><strong>Unità:</strong> N (newton)</p>
                <p>Derivata dal prodotto tra massa e accelerazione</p>
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
                <h3>{exercises[currentExercise].question}</h3>
                <div className="options">
                  {exercises[currentExercise].options.map((option, index) => (
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
                    ? "Perfetto! 🏆 Hai risposto correttamente a tutte le domande!"
                    : getScore() >= exercises.length * 0.8
                    ? "Ottimo lavoro! 👍 Hai una buona conoscenza dell'argomento."
                    : getScore() >= exercises.length * 0.6
                    ? "Buono! 📚 Ripassa la teoria e riprova."
                    : "Continua a studiare! 💪 Ripassa le grandezze fondamentali."
                  }
                </p>
              </div>

              <div className="answers-review">
                <h4>📝 Rivedi le Risposte</h4>
                {exercises.map((exercise, index) => (
                  <div key={exercise.id} className="answer-item">
                    <div className="question-review">
                      <strong>Domanda {index + 1}:</strong> {exercise.question}
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
                  🔄 Nuove Domande
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

export default Exercise1;
