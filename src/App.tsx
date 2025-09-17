import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';

const App: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<number>(1);

  const exercises = [
    { id: 1, title: "Grandezze Fondamentali e Derivate", component: Exercise1 },
    { id: 2, title: "Sostanze, Composti e Miscugli", component: Exercise2 },
    { id: 3, title: "Esercizio 3", component: null },
    { id: 4, title: "Esercizio 4", component: null }
  ];

  const CurrentComponent = exercises.find(ex => ex.id === currentExercise)?.component;

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <nav className="exercise-nav">
          <div className="nav-title">
            <h2>📚 Esercizi di Chimica</h2>
            <p>IIS P.Boselli - Primo Anno Socio Sanitario</p>
          </div>
          <div className="exercise-tabs">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                className={`exercise-tab ${currentExercise === exercise.id ? 'active' : ''}`}
                onClick={() => setCurrentExercise(exercise.id)}
                disabled={exercise.component === null}
              >
                <span className="tab-number">{exercise.id}</span>
                <span className="tab-title">{exercise.title}</span>
              </button>
            ))}
          </div>
        </nav>
        
        <main className="exercise-content">
          {CurrentComponent ? <CurrentComponent /> : (
            <div className="coming-soon">
              <h3>🚧 In Arrivo!</h3>
              <p>Questo esercizio sarà disponibile presto.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
