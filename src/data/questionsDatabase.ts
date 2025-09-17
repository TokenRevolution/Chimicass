// Database centralizzato delle domande per gli esercizi di chimica
// Evita domande su elettricità e termodinamica come richiesto

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // indice della risposta corretta (0-based)
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questionsDatabase: Question[] = [
  // GRANDEZZE FONDAMENTALI E DERIVATE
  {
    id: 1,
    question: "Quale delle seguenti è una grandezza fondamentale?",
    options: ["Volume", "Velocità", "Massa", "Densità"],
    correctAnswer: 2,
    explanation: "La massa è una delle 7 grandezze fondamentali del Sistema Internazionale. Volume, velocità e densità sono grandezze derivate.",
    category: "grandezze",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Qual è l'unità di misura della lunghezza nel Sistema Internazionale?",
    options: ["Centimetro (cm)", "Metro (m)", "Chilometro (km)", "Pollice (in)"],
    correctAnswer: 1,
    explanation: "Il metro (m) è l'unità fondamentale per la misura della lunghezza nel Sistema Internazionale.",
    category: "grandezze",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "La velocità è una grandezza:",
    options: ["Fondamentale", "Derivata", "Scalare", "Vettoriale"],
    correctAnswer: 1,
    explanation: "La velocità è una grandezza derivata, ottenuta dal rapporto tra lunghezza e tempo (v = l/t).",
    category: "grandezze",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "Quale simbolo rappresenta la quantità di sostanza?",
    options: ["Q", "n", "N", "S"],
    correctAnswer: 1,
    explanation: "Il simbolo 'n' rappresenta la quantità di sostanza, misurata in moli (mol).",
    category: "grandezze",
    difficulty: "medium"
  },
  {
    id: 5,
    question: "L'unità di misura della massa è:",
    options: ["Grammo (g)", "Chilogrammo (kg)", "Libbra (lb)", "Oncia (oz)"],
    correctAnswer: 1,
    explanation: "Il chilogrammo (kg) è l'unità fondamentale per la misura della massa nel Sistema Internazionale.",
    category: "grandezze",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Quale delle seguenti grandezze è derivata?",
    options: ["Lunghezza", "Massa", "Area", "Tempo"],
    correctAnswer: 2,
    explanation: "L'area è una grandezza derivata, ottenuta moltiplicando due lunghezze (A = l × l = l²).",
    category: "grandezze",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "Il simbolo dell'intensità luminosa è:",
    options: ["I", "Iv", "L", "B"],
    correctAnswer: 1,
    explanation: "Il simbolo 'Iv' rappresenta l'intensità luminosa, misurata in candele (cd).",
    category: "grandezze",
    difficulty: "hard"
  },
  {
    id: 8,
    question: "Quale unità si usa per misurare il tempo?",
    options: ["Minuto", "Ora", "Secondo", "Giorno"],
    correctAnswer: 2,
    explanation: "Il secondo (s) è l'unità fondamentale per la misura del tempo nel Sistema Internazionale.",
    category: "grandezze",
    difficulty: "easy"
  },
  {
    id: 9,
    question: "La densità è una grandezza derivata che si calcola come:",
    options: ["m/V", "V/m", "m×V", "m+V"],
    correctAnswer: 0,
    explanation: "La densità si calcola come rapporto tra massa e volume: ρ = m/V.",
    category: "grandezze",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Quale grandezza fondamentale ha come unità il metro?",
    options: ["Massa", "Lunghezza", "Tempo", "Quantità di sostanza"],
    correctAnswer: 1,
    explanation: "La lunghezza ha come unità fondamentale il metro (m).",
    category: "grandezze",
    difficulty: "easy"
  },

  // SOSTANZE, COMPOSTI E MISCUGLI
  {
    id: 11,
    question: "L'acqua (H₂O) è:",
    options: ["Un elemento", "Un composto", "Un miscuglio", "Una soluzione"],
    correctAnswer: 1,
    explanation: "L'acqua è un composto formato da due elementi: idrogeno e ossigeno.",
    category: "sostanze",
    difficulty: "easy"
  },
  {
    id: 12,
    question: "Quale delle seguenti è una sostanza pura?",
    options: ["Aria", "Acqua distillata", "Acqua salata", "Succo d'arancia"],
    correctAnswer: 1,
    explanation: "L'acqua distillata è una sostanza pura, mentre gli altri sono miscugli.",
    category: "sostanze",
    difficulty: "medium"
  },
  {
    id: 13,
    question: "Il sale da cucina (NaCl) è:",
    options: ["Un elemento", "Un composto", "Un miscuglio", "Un gas"],
    correctAnswer: 1,
    explanation: "Il cloruro di sodio è un composto formato da sodio e cloro.",
    category: "sostanze",
    difficulty: "easy"
  },
  {
    id: 14,
    question: "Quale delle seguenti è un elemento?",
    options: ["H₂O", "NaCl", "O₂", "CO₂"],
    correctAnswer: 2,
    explanation: "O₂ (ossigeno) è un elemento, mentre gli altri sono composti.",
    category: "sostanze",
    difficulty: "medium"
  },
  {
    id: 15,
    question: "L'aria è:",
    options: ["Un elemento", "Un composto", "Un miscuglio", "Una sostanza pura"],
    correctAnswer: 2,
    explanation: "L'aria è un miscuglio di gas (azoto, ossigeno, argon, ecc.).",
    category: "sostanze",
    difficulty: "easy"
  },
  {
    id: 16,
    question: "Quale simbolo chimico rappresenta il carbonio?",
    options: ["Ca", "C", "Co", "Cu"],
    correctAnswer: 1,
    explanation: "Il simbolo chimico del carbonio è C.",
    category: "sostanze",
    difficulty: "easy"
  },
  {
    id: 17,
    question: "Il ferro ha simbolo chimico:",
    options: ["Fe", "F", "Ir", "Fr"],
    correctAnswer: 0,
    explanation: "Il simbolo chimico del ferro è Fe (dal latino 'ferrum').",
    category: "sostanze",
    difficulty: "easy"
  },
  {
    id: 18,
    question: "Quale delle seguenti è un miscuglio eterogeneo?",
    options: ["Aria", "Acqua salata", "Sabbia e acqua", "Alcool e acqua"],
    correctAnswer: 2,
    explanation: "Sabbia e acqua è un miscuglio eterogeneo perché le fasi sono distinguibili.",
    category: "sostanze",
    difficulty: "medium"
  },
  {
    id: 19,
    question: "L'idrogeno ha simbolo chimico:",
    options: ["H", "Hy", "Id", "Hg"],
    correctAnswer: 0,
    explanation: "Il simbolo chimico dell'idrogeno è H.",
    category: "sostanze",
    difficulty: "easy"
  },
  {
    id: 20,
    question: "Quale delle seguenti è un miscuglio omogeneo?",
    options: ["Sabbia e acqua", "Olio e acqua", "Acqua e sale", "Ferro e zolfo"],
    correctAnswer: 2,
    explanation: "Acqua e sale forma una soluzione omogenea dove il sale si dissolve completamente.",
    category: "sostanze",
    difficulty: "medium"
  },

  // STATI DELLA MATERIA
  {
    id: 21,
    question: "Quali sono i tre stati fondamentali della materia?",
    options: ["Solido, liquido, gassoso", "Caldo, freddo, tiepido", "Acido, basico, neutro", "Leggero, pesante, medio"],
    correctAnswer: 0,
    explanation: "I tre stati fondamentali della materia sono solido, liquido e gassoso.",
    category: "stati",
    difficulty: "easy"
  },
  {
    id: 22,
    question: "Il passaggio da solido a liquido si chiama:",
    options: ["Evaporazione", "Fusione", "Condensazione", "Sublimazione"],
    correctAnswer: 1,
    explanation: "Il passaggio da solido a liquido si chiama fusione.",
    category: "stati",
    difficulty: "easy"
  },
  {
    id: 23,
    question: "Il passaggio da liquido a gas si chiama:",
    options: ["Fusione", "Evaporazione", "Condensazione", "Solidificazione"],
    correctAnswer: 1,
    explanation: "Il passaggio da liquido a gas si chiama evaporazione.",
    category: "stati",
    difficulty: "easy"
  },
  {
    id: 24,
    question: "Quale stato della materia ha volume e forma definiti?",
    options: ["Solido", "Liquido", "Gas", "Plasma"],
    correctAnswer: 0,
    explanation: "Il solido ha sia volume che forma definiti.",
    category: "stati",
    difficulty: "easy"
  },
  {
    id: 25,
    question: "Quale stato della materia ha volume definito ma forma variabile?",
    options: ["Solido", "Liquido", "Gas", "Plasma"],
    correctAnswer: 1,
    explanation: "Il liquido ha volume definito ma forma variabile (si adatta al contenitore).",
    category: "stati",
    difficulty: "easy"
  },

  // REAZIONI CHIMICHE
  {
    id: 26,
    question: "In una reazione chimica, le sostanze che reagiscono si chiamano:",
    options: ["Prodotti", "Reagenti", "Catalizzatori", "Inibitori"],
    correctAnswer: 1,
    explanation: "Le sostanze che reagiscono si chiamano reagenti.",
    category: "reazioni",
    difficulty: "easy"
  },
  {
    id: 27,
    question: "In una reazione chimica, le sostanze che si formano si chiamano:",
    options: ["Reagenti", "Prodotti", "Catalizzatori", "Inibitori"],
    correctAnswer: 1,
    explanation: "Le sostanze che si formano si chiamano prodotti.",
    category: "reazioni",
    difficulty: "easy"
  },
  {
    id: 28,
    question: "La reazione H₂ + O₂ → H₂O è di tipo:",
    options: ["Decomposizione", "Sostituzione", "Combinazione", "Neutralizzazione"],
    correctAnswer: 2,
    explanation: "È una reazione di combinazione: due sostanze si uniscono per formare un composto.",
    category: "reazioni",
    difficulty: "medium"
  },
  {
    id: 29,
    question: "La reazione HCl + NaOH → NaCl + H₂O è di tipo:",
    options: ["Combinazione", "Neutralizzazione", "Decomposizione", "Combustione"],
    correctAnswer: 1,
    explanation: "È una reazione di neutralizzazione: acido + base → sale + acqua.",
    category: "reazioni",
    difficulty: "medium"
  },
  {
    id: 30,
    question: "La combustione è una reazione che avviene con:",
    options: ["Acqua", "Ossigeno", "Azoto", "Idrogeno"],
    correctAnswer: 1,
    explanation: "La combustione è una reazione che avviene con l'ossigeno.",
    category: "reazioni",
    difficulty: "easy"
  },

  // ACIDI E BASI
  {
    id: 31,
    question: "Gli acidi hanno pH:",
    options: ["Maggiore di 7", "Minore di 7", "Uguale a 7", "Maggiore di 14"],
    correctAnswer: 1,
    explanation: "Gli acidi hanno pH minore di 7.",
    category: "acidi-basi",
    difficulty: "easy"
  },
  {
    id: 32,
    question: "Le basi hanno pH:",
    options: ["Minore di 7", "Maggiore di 7", "Uguale a 7", "Minore di 0"],
    correctAnswer: 1,
    explanation: "Le basi hanno pH maggiore di 7.",
    category: "acidi-basi",
    difficulty: "easy"
  },
  {
    id: 33,
    question: "Una sostanza neutra ha pH:",
    options: ["0", "7", "14", "1"],
    correctAnswer: 1,
    explanation: "Una sostanza neutra ha pH = 7.",
    category: "acidi-basi",
    difficulty: "easy"
  },
  {
    id: 34,
    question: "Quale delle seguenti è una base?",
    options: ["HCl", "H₂SO₄", "NaOH", "HNO₃"],
    correctAnswer: 2,
    explanation: "NaOH (idrossido di sodio) è una base forte.",
    category: "acidi-basi",
    difficulty: "medium"
  },
  {
    id: 35,
    question: "Quale delle seguenti è un acido?",
    options: ["NaOH", "KOH", "HCl", "Ca(OH)₂"],
    correctAnswer: 2,
    explanation: "HCl (acido cloridrico) è un acido forte.",
    category: "acidi-basi",
    difficulty: "medium"
  },

  // SOLUZIONI
  {
    id: 36,
    question: "In una soluzione, la sostanza presente in maggiore quantità si chiama:",
    options: ["Soluto", "Solvente", "Catalizzatore", "Inibitore"],
    correctAnswer: 1,
    explanation: "Il solvente è la sostanza presente in maggiore quantità.",
    category: "soluzioni",
    difficulty: "easy"
  },
  {
    id: 37,
    question: "In una soluzione, la sostanza presente in minore quantità si chiama:",
    options: ["Solvente", "Soluto", "Catalizzatore", "Inibitore"],
    correctAnswer: 1,
    explanation: "Il soluto è la sostanza presente in minore quantità.",
    category: "soluzioni",
    difficulty: "easy"
  },
  {
    id: 38,
    question: "Una soluzione satura è:",
    options: ["Una soluzione diluita", "Una soluzione concentrata", "Una soluzione che non può più sciogliere soluto", "Una soluzione acida"],
    correctAnswer: 2,
    explanation: "Una soluzione satura non può più sciogliere soluto aggiuntivo.",
    category: "soluzioni",
    difficulty: "medium"
  },
  {
    id: 39,
    question: "Per aumentare la solubilità di un solido in acqua, generalmente si:",
    options: ["Aumenta la temperatura", "Diminuisce la temperatura", "Aggiunge sale", "Aggiunge acido"],
    correctAnswer: 0,
    explanation: "Generalmente aumentando la temperatura aumenta la solubilità dei solidi.",
    category: "soluzioni",
    difficulty: "medium"
  },
  {
    id: 40,
    question: "L'acqua è un solvente:",
    options: ["Polare", "Apolare", "Neutro", "Basico"],
    correctAnswer: 0,
    explanation: "L'acqua è un solvente polare, eccellente per sciogliere sostanze polari.",
    category: "soluzioni",
    difficulty: "medium"
  },

  // LEGAMI CHIMICI
  {
    id: 41,
    question: "Il legame tra Na e Cl nel NaCl è:",
    options: ["Covalente", "Ionico", "Metallico", "Idrogeno"],
    correctAnswer: 1,
    explanation: "Il legame tra sodio e cloro è ionico: Na⁺ + Cl⁻ → NaCl.",
    category: "legami",
    difficulty: "medium"
  },
  {
    id: 42,
    question: "Il legame tra H e O nell'H₂O è:",
    options: ["Ionico", "Covalente", "Metallico", "Idrogeno"],
    correctAnswer: 1,
    explanation: "Il legame tra idrogeno e ossigeno è covalente.",
    category: "legami",
    difficulty: "medium"
  },
  {
    id: 43,
    question: "I metalli formano legami:",
    options: ["Covalenti", "Ionici", "Metallici", "Idrogeno"],
    correctAnswer: 2,
    explanation: "I metalli formano legami metallici caratterizzati da elettroni delocalizzati.",
    category: "legami",
    difficulty: "medium"
  },
  {
    id: 44,
    question: "Nel legame covalente gli atomi:",
    options: ["Si scambiano elettroni", "Condividono elettroni", "Perdono elettroni", "Acquisiscono elettroni"],
    correctAnswer: 1,
    explanation: "Nel legame covalente gli atomi condividono elettroni.",
    category: "legami",
    difficulty: "medium"
  },
  {
    id: 45,
    question: "Nel legame ionico gli atomi:",
    options: ["Condividono elettroni", "Si scambiano elettroni", "Perdono protoni", "Acquisiscono neutroni"],
    correctAnswer: 1,
    explanation: "Nel legame ionico gli atomi si scambiano elettroni formando ioni.",
    category: "legami",
    difficulty: "medium"
  },

  // TABELLA PERIODICA
  {
    id: 46,
    question: "Gli elementi nella stessa colonna della tavola periodica hanno:",
    options: ["Stesso numero atomico", "Stesse proprietà chimiche", "Stessa massa atomica", "Stesso simbolo"],
    correctAnswer: 1,
    explanation: "Gli elementi nella stessa colonna (gruppo) hanno proprietà chimiche simili.",
    category: "tavola-periodica",
    difficulty: "medium"
  },
  {
    id: 47,
    question: "Il numero atomico di un elemento indica:",
    options: ["Il numero di neutroni", "Il numero di protoni", "Il numero di elettroni", "La massa atomica"],
    correctAnswer: 1,
    explanation: "Il numero atomico indica il numero di protoni nel nucleo.",
    category: "tavola-periodica",
    difficulty: "medium"
  },
  {
    id: 48,
    question: "Gli elementi del gruppo 1 sono chiamati:",
    options: ["Metalli alcalini", "Metalli alcalino-terrosi", "Alogeni", "Gas nobili"],
    correctAnswer: 0,
    explanation: "Gli elementi del gruppo 1 sono i metalli alcalini (Li, Na, K, Rb, Cs, Fr).",
    category: "tavola-periodica",
    difficulty: "medium"
  },
  {
    id: 49,
    question: "Gli elementi del gruppo 17 sono chiamati:",
    options: ["Metalli alcalini", "Metalli alcalino-terrosi", "Alogeni", "Gas nobili"],
    correctAnswer: 2,
    explanation: "Gli elementi del gruppo 17 sono gli alogeni (F, Cl, Br, I, At).",
    category: "tavola-periodica",
    difficulty: "medium"
  },
  {
    id: 50,
    question: "Gli elementi del gruppo 18 sono chiamati:",
    options: ["Metalli alcalini", "Metalli alcalino-terrosi", "Alogeni", "Gas nobili"],
    correctAnswer: 3,
    explanation: "Gli elementi del gruppo 18 sono i gas nobili (He, Ne, Ar, Kr, Xe, Rn).",
    category: "tavola-periodica",
    difficulty: "medium"
  }
];

// Funzione per ottenere domande randomizzate
export const getRandomQuestions = (count: number, categories?: string[]): Question[] => {
  let filteredQuestions = questionsDatabase;
  
  // Filtra per categorie se specificate
  if (categories && categories.length > 0) {
    filteredQuestions = questionsDatabase.filter(q => categories.includes(q.category));
  }
  
  // Mescola l'array e prendi il numero richiesto di domande
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Funzione per ottenere domande per difficoltà
export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard', count: number): Question[] => {
  const filteredQuestions = questionsDatabase.filter(q => q.difficulty === difficulty);
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Funzione per ottenere domande miste per difficoltà
export const getMixedDifficultyQuestions = (count: number): Question[] => {
  const easyCount = Math.ceil(count * 0.4); // 40% facili
  const mediumCount = Math.ceil(count * 0.4); // 40% medie
  const hardCount = count - easyCount - mediumCount; // 20% difficili
  
  const easyQuestions = getQuestionsByDifficulty('easy', easyCount);
  const mediumQuestions = getQuestionsByDifficulty('medium', mediumCount);
  const hardQuestions = getQuestionsByDifficulty('hard', hardCount);
  
  const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
  return allQuestions.sort(() => Math.random() - 0.5);
};
