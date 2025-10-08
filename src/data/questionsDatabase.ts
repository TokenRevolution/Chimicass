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

  // CALCOLI CON GRANDEZZE FONDAMENTALI
  {
    id: 51,
    question: "Un oggetto ha una massa di 2,5 kg e un volume di 0,001 m³. Qual è la sua densità?",
    options: ["250 kg/m³", "2500 kg/m³", "25 kg/m³", "0,25 kg/m³"],
    correctAnswer: 1,
    explanation: "La densità si calcola come ρ = m/V = 2,5 kg / 0,001 m³ = 2500 kg/m³.",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 52,
    question: "Se un'automobile percorre 120 km in 2 ore, qual è la sua velocità media?",
    options: ["60 km/h", "240 km/h", "30 km/h", "120 km/h"],
    correctAnswer: 0,
    explanation: "La velocità si calcola come v = s/t = 120 km / 2 h = 60 km/h.",
    category: "calcoli",
    difficulty: "easy"
  },
  {
    id: 53,
    question: "Un cubo ha uno spigolo di 3 m. Qual è il suo volume?",
    options: ["9 m³", "27 m³", "6 m³", "12 m³"],
    correctAnswer: 1,
    explanation: "Il volume di un cubo è V = l³ = (3 m)³ = 27 m³.",
    category: "calcoli",
    difficulty: "easy"
  },
  {
    id: 54,
    question: "Quanti secondi ci sono in 2,5 ore?",
    options: ["9000 s", "150 s", "900 s", "15000 s"],
    correctAnswer: 0,
    explanation: "2,5 ore = 2,5 × 3600 s = 9000 s.",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 55,
    question: "Un oggetto di massa 0,5 kg viene accelerato con una forza di 10 N. Qual è la sua accelerazione?",
    options: ["20 m/s²", "5 m/s²", "0,05 m/s²", "50 m/s²"],
    correctAnswer: 0,
    explanation: "Dalla seconda legge di Newton: a = F/m = 10 N / 0,5 kg = 20 m/s².",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 56,
    question: "Un rettangolo ha base 4 m e altezza 3 m. Qual è la sua area?",
    options: ["7 m²", "12 m²", "14 m²", "16 m²"],
    correctAnswer: 1,
    explanation: "L'area di un rettangolo è A = b × h = 4 m × 3 m = 12 m².",
    category: "calcoli",
    difficulty: "easy"
  },
  {
    id: 57,
    question: "Se la densità dell'acqua è 1000 kg/m³, qual è la massa di 2 litri d'acqua?",
    options: ["2 kg", "2000 kg", "0,002 kg", "20 kg"],
    correctAnswer: 0,
    explanation: "2 litri = 0,002 m³. Massa = ρ × V = 1000 kg/m³ × 0,002 m³ = 2 kg.",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 58,
    question: "Un oggetto cade per 3 secondi. Se l'accelerazione di gravità è 9,8 m/s², qual è la velocità finale?",
    options: ["29,4 m/s", "3,27 m/s", "9,8 m/s", "32,4 m/s"],
    correctAnswer: 0,
    explanation: "v = v₀ + at = 0 + 9,8 m/s² × 3 s = 29,4 m/s.",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 59,
    question: "Quanti metri ci sono in 5 chilometri?",
    options: ["500 m", "5000 m", "50 m", "50000 m"],
    correctAnswer: 1,
    explanation: "5 km = 5 × 1000 m = 5000 m.",
    category: "calcoli",
    difficulty: "easy"
  },
  {
    id: 60,
    question: "Un cilindro ha raggio 2 m e altezza 5 m. Qual è il suo volume? (π ≈ 3,14)",
    options: ["62,8 m³", "31,4 m³", "15,7 m³", "125,6 m³"],
    correctAnswer: 0,
    explanation: "V = πr²h = 3,14 × (2 m)² × 5 m = 3,14 × 4 × 5 = 62,8 m³.",
    category: "calcoli",
    difficulty: "hard"
  },
  {
    id: 61,
    question: "Se un oggetto ha densità 800 kg/m³ e massa 1,6 kg, qual è il suo volume?",
    options: ["0,002 m³", "0,02 m³", "0,2 m³", "2 m³"],
    correctAnswer: 0,
    explanation: "V = m/ρ = 1,6 kg / 800 kg/m³ = 0,002 m³.",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 62,
    question: "Un'automobile accelera da 0 a 72 km/h in 10 secondi. Qual è la sua accelerazione?",
    options: ["7,2 m/s²", "2 m/s²", "72 m/s²", "0,72 m/s²"],
    correctAnswer: 1,
    explanation: "72 km/h = 20 m/s. a = Δv/Δt = 20 m/s / 10 s = 2 m/s².",
    category: "calcoli",
    difficulty: "hard"
  },
  {
    id: 63,
    question: "Quanti grammi ci sono in 2,5 chilogrammi?",
    options: ["25 g", "250 g", "2500 g", "25000 g"],
    correctAnswer: 2,
    explanation: "2,5 kg = 2,5 × 1000 g = 2500 g.",
    category: "calcoli",
    difficulty: "easy"
  },
  {
    id: 64,
    question: "Un oggetto di massa 2 kg ha una velocità di 10 m/s. Qual è la sua energia cinetica?",
    options: ["20 J", "100 J", "200 J", "10 J"],
    correctAnswer: 1,
    explanation: "Ek = ½mv² = ½ × 2 kg × (10 m/s)² = ½ × 2 × 100 = 100 J.",
    category: "calcoli",
    difficulty: "hard"
  },
  {
    id: 65,
    question: "Se la temperatura è 25°C, qual è la temperatura in Kelvin?",
    options: ["298 K", "248 K", "273 K", "323 K"],
    correctAnswer: 0,
    explanation: "T(K) = T(°C) + 273 = 25 + 273 = 298 K.",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 66,
    question: "Un oggetto percorre 150 m in 30 secondi. Qual è la sua velocità?",
    options: ["5 m/s", "50 m/s", "0,2 m/s", "180 m/s"],
    correctAnswer: 0,
    explanation: "v = s/t = 150 m / 30 s = 5 m/s.",
    category: "calcoli",
    difficulty: "easy"
  },
  {
    id: 67,
    question: "Quanti millimetri ci sono in 1 metro?",
    options: ["100 mm", "1000 mm", "10 mm", "10000 mm"],
    correctAnswer: 1,
    explanation: "1 m = 1000 mm.",
    category: "calcoli",
    difficulty: "easy"
  },
  {
    id: 68,
    question: "Un oggetto di massa 0,8 kg viene sollevato di 2 m. Qual è il lavoro compiuto? (g = 9,8 m/s²)",
    options: ["15,68 J", "1,6 J", "16,8 J", "1,568 J"],
    correctAnswer: 0,
    explanation: "L = mgh = 0,8 kg × 9,8 m/s² × 2 m = 15,68 J.",
    category: "calcoli",
    difficulty: "hard"
  },
  {
    id: 69,
    question: "Se un oggetto ha volume 0,5 m³ e densità 400 kg/m³, qual è la sua massa?",
    options: ["200 kg", "800 kg", "0,2 kg", "0,8 kg"],
    correctAnswer: 0,
    explanation: "m = ρV = 400 kg/m³ × 0,5 m³ = 200 kg.",
    category: "calcoli",
    difficulty: "medium"
  },
  {
    id: 70,
    question: "Un'automobile viaggia a 90 km/h per 2 ore. Quanta strada percorre?",
    options: ["180 km", "45 km", "360 km", "90 km"],
    correctAnswer: 0,
    explanation: "s = vt = 90 km/h × 2 h = 180 km.",
    category: "calcoli",
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

  // STATI DELLA MATERIA ED ENERGIA
  {
    id: 71,
    question: "Quali sono i quattro stati della materia?",
    options: ["Solido, liquido, gas, plasma", "Caldo, freddo, tiepido, neutro", "Acido, basico, neutro, salato", "Leggero, pesante, medio, variabile"],
    correctAnswer: 0,
    explanation: "I quattro stati della materia sono: solido, liquido, gas e plasma.",
    category: "stati-materia",
    difficulty: "easy"
  },
  {
    id: 72,
    question: "Nel passaggio da solido a liquido l'energia viene:",
    options: ["Rilasciata", "Assorbita", "Distrutta", "Creata"],
    correctAnswer: 1,
    explanation: "Durante la fusione (solido → liquido) l'energia viene assorbita per rompere i legami tra le particelle.",
    category: "stati-materia",
    difficulty: "medium"
  },
  {
    id: 73,
    question: "Quale stato della materia ha particelle molto vicine e ordinate?",
    options: ["Gas", "Liquido", "Solido", "Plasma"],
    correctAnswer: 2,
    explanation: "Nel solido le particelle sono molto vicine e disposte in modo ordinato.",
    category: "stati-materia",
    difficulty: "easy"
  },
  {
    id: 74,
    question: "Il passaggio diretto da solido a gas si chiama:",
    options: ["Evaporazione", "Fusione", "Sublimazione", "Condensazione"],
    correctAnswer: 2,
    explanation: "La sublimazione è il passaggio diretto da solido a gas senza passare per lo stato liquido.",
    category: "stati-materia",
    difficulty: "medium"
  },
  {
    id: 75,
    question: "Quale stato della materia ha volume e forma variabili?",
    options: ["Solido", "Liquido", "Gas", "Tutti i precedenti"],
    correctAnswer: 2,
    explanation: "Il gas ha sia volume che forma variabili, si espande per riempire tutto lo spazio disponibile.",
    category: "stati-materia",
    difficulty: "easy"
  },
  {
    id: 76,
    question: "Durante la condensazione (gas → liquido) l'energia viene:",
    options: ["Assorbita", "Rilasciata", "Trasformata", "Distrutta"],
    correctAnswer: 1,
    explanation: "Durante la condensazione l'energia viene rilasciata sotto forma di calore.",
    category: "stati-materia",
    difficulty: "medium"
  },
  {
    id: 77,
    question: "Il punto di ebollizione dell'acqua è:",
    options: ["0°C", "25°C", "100°C", "273°C"],
    correctAnswer: 2,
    explanation: "Il punto di ebollizione dell'acqua è 100°C alla pressione atmosferica standard.",
    category: "stati-materia",
    difficulty: "easy"
  },
  {
    id: 78,
    question: "Quale esempio rappresenta meglio il plasma?",
    options: ["Ghiaccio", "Acqua", "Vapore", "Fulmine"],
    correctAnswer: 3,
    explanation: "Il fulmine è un esempio di plasma, uno stato della materia con particelle ionizzate.",
    category: "stati-materia",
    difficulty: "medium"
  },
  {
    id: 79,
    question: "Nel liquido le particelle sono:",
    options: ["Fisse e ordinate", "Vicine ma mobili", "Molto distanti", "Ionizzate"],
    correctAnswer: 1,
    explanation: "Nel liquido le particelle sono vicine tra loro ma possono muoversi liberamente.",
    category: "stati-materia",
    difficulty: "easy"
  },
  {
    id: 80,
    question: "La deposizione è il passaggio da:",
    options: ["Gas a solido", "Solido a gas", "Liquido a solido", "Gas a liquido"],
    correctAnswer: 0,
    explanation: "La deposizione è il passaggio diretto da gas a solido, come la formazione della brina.",
    category: "stati-materia",
    difficulty: "hard"
  },
  {
    id: 81,
    question: "Quale tipo di energia è associata al movimento delle particelle?",
    options: ["Energia potenziale", "Energia cinetica", "Energia chimica", "Energia nucleare"],
    correctAnswer: 1,
    explanation: "L'energia cinetica è associata al movimento delle particelle.",
    category: "energia",
    difficulty: "easy"
  },
  {
    id: 82,
    question: "L'energia immagazzinata nei legami chimici si chiama:",
    options: ["Energia cinetica", "Energia potenziale", "Energia chimica", "Energia termica"],
    correctAnswer: 2,
    explanation: "L'energia chimica è l'energia immagazzinata nei legami chimici tra gli atomi.",
    category: "energia",
    difficulty: "medium"
  },
  {
    id: 83,
    question: "Quale unità si usa per misurare l'energia?",
    options: ["Watt (W)", "Joule (J)", "Newton (N)", "Pascal (Pa)"],
    correctAnswer: 1,
    explanation: "Il Joule (J) è l'unità di misura dell'energia nel Sistema Internazionale.",
    category: "energia",
    difficulty: "easy"
  },
  {
    id: 84,
    question: "L'energia del Sole proviene principalmente da:",
    options: ["Reazioni chimiche", "Reazioni nucleari", "Combustione", "Fotovoltaico"],
    correctAnswer: 1,
    explanation: "L'energia del Sole proviene dalle reazioni nucleari di fusione che avvengono nel suo nucleo.",
    category: "energia",
    difficulty: "medium"
  },
  {
    id: 85,
    question: "Quale tipo di energia è associata alla temperatura?",
    options: ["Energia cinetica", "Energia potenziale", "Energia termica", "Energia elettrica"],
    correctAnswer: 2,
    explanation: "L'energia termica è associata alla temperatura e al movimento delle particelle.",
    category: "energia",
    difficulty: "easy"
  },
  {
    id: 86,
    question: "L'energia potenziale gravitazionale dipende da:",
    options: ["Solo dalla massa", "Solo dall'altezza", "Massa, altezza e accelerazione di gravità", "Solo dalla velocità"],
    correctAnswer: 2,
    explanation: "L'energia potenziale gravitazionale dipende da massa, altezza e accelerazione di gravità (Ep = mgh).",
    category: "energia",
    difficulty: "medium"
  },
  {
    id: 87,
    question: "Quale trasformazione energetica avviene in una batteria?",
    options: ["Chimica → Elettrica", "Elettrica → Chimica", "Termica → Elettrica", "Nucleare → Elettrica"],
    correctAnswer: 0,
    explanation: "In una batteria l'energia chimica viene trasformata in energia elettrica.",
    category: "trasformazioni",
    difficulty: "medium"
  },
  {
    id: 88,
    question: "Nel motore di un'automobile avviene la trasformazione:",
    options: ["Chimica → Meccanica", "Elettrica → Chimica", "Termica → Elettrica", "Nucleare → Termica"],
    correctAnswer: 0,
    explanation: "Nel motore l'energia chimica del combustibile viene trasformata in energia meccanica.",
    category: "trasformazioni",
    difficulty: "easy"
  },
  {
    id: 89,
    question: "Quale principio afferma che l'energia non si crea né si distrugge?",
    options: ["Principio di Archimede", "Principio di conservazione dell'energia", "Principio di Pascal", "Principio di Bernoulli"],
    correctAnswer: 1,
    explanation: "Il principio di conservazione dell'energia afferma che l'energia non si crea né si distrugge, ma si trasforma.",
    category: "trasformazioni",
    difficulty: "medium"
  },
  {
    id: 90,
    question: "Quale esempio rappresenta una trasformazione di energia cinetica in energia termica?",
    options: ["Batteria che si carica", "Freni di un'automobile", "Motore elettrico", "Pannello solare"],
    correctAnswer: 1,
    explanation: "Quando si frenano le ruote di un'automobile, l'energia cinetica si trasforma in energia termica per attrito.",
    category: "trasformazioni",
    difficulty: "medium"
  },
  {
    id: 91,
    question: "Quale stato della materia ha la maggiore energia cinetica delle particelle?",
    options: ["Solido", "Liquido", "Gas", "Plasma"],
    correctAnswer: 3,
    explanation: "Il plasma ha la maggiore energia cinetica delle particelle, che sono ionizzate e molto energetiche.",
    category: "stati-materia",
    difficulty: "hard"
  },
  {
    id: 92,
    question: "Il punto di fusione del ghiaccio è:",
    options: ["-10°C", "0°C", "10°C", "100°C"],
    correctAnswer: 1,
    explanation: "Il punto di fusione del ghiaccio è 0°C alla pressione atmosferica standard.",
    category: "stati-materia",
    difficulty: "easy"
  },
  {
    id: 93,
    question: "Quale tipo di energia è associata alle cariche elettriche in movimento?",
    options: ["Energia chimica", "Energia elettrica", "Energia termica", "Energia nucleare"],
    correctAnswer: 1,
    explanation: "L'energia elettrica è associata alle cariche elettriche in movimento.",
    category: "energia",
    difficulty: "easy"
  },
  {
    id: 94,
    question: "Durante l'evaporazione l'energia viene:",
    options: ["Rilasciata", "Assorbita", "Distrutta", "Creata"],
    correctAnswer: 1,
    explanation: "Durante l'evaporazione l'energia viene assorbita per vincere le forze intermolecolari.",
    category: "stati-materia",
    difficulty: "medium"
  },
  {
    id: 95,
    question: "Quale esempio rappresenta meglio l'energia potenziale?",
    options: ["Automobile in movimento", "Palla in alto", "Fuoco che brucia", "Corrente elettrica"],
    correctAnswer: 1,
    explanation: "Una palla in alto ha energia potenziale gravitazionale che può essere trasformata in energia cinetica.",
    category: "energia",
    difficulty: "easy"
  },
  {
    id: 96,
    question: "Nel passaggio da liquido a solido l'energia viene:",
    options: ["Assorbita", "Rilasciata", "Trasformata", "Distrutta"],
    correctAnswer: 1,
    explanation: "Durante la solidificazione (liquido → solido) l'energia viene rilasciata sotto forma di calore.",
    category: "stati-materia",
    difficulty: "medium"
  },
  {
    id: 97,
    question: "Quale trasformazione energetica avviene in una lampadina?",
    options: ["Chimica → Luminosa", "Elettrica → Luminosa", "Termica → Elettrica", "Nucleare → Luminosa"],
    correctAnswer: 1,
    explanation: "In una lampadina l'energia elettrica viene trasformata in energia luminosa (e termica).",
    category: "trasformazioni",
    difficulty: "easy"
  },
  {
    id: 98,
    question: "Quale stato della materia ha particelle ionizzate?",
    options: ["Solido", "Liquido", "Gas", "Plasma"],
    correctAnswer: 3,
    explanation: "Il plasma è caratterizzato da particelle ionizzate (elettroni e ioni separati).",
    category: "stati-materia",
    difficulty: "medium"
  },
  {
    id: 99,
    question: "L'energia cinetica di un oggetto dipende da:",
    options: ["Solo dalla massa", "Solo dalla velocità", "Massa e velocità", "Solo dall'altezza"],
    correctAnswer: 2,
    explanation: "L'energia cinetica dipende sia dalla massa che dalla velocità: Ek = ½mv².",
    category: "energia",
    difficulty: "medium"
  },
  {
    id: 100,
    question: "Quale esempio rappresenta una trasformazione di energia termica in energia meccanica?",
    options: ["Motore elettrico", "Motore a vapore", "Batteria", "Pannello solare"],
    correctAnswer: 1,
    explanation: "In un motore a vapore l'energia termica del vapore viene trasformata in energia meccanica.",
    category: "trasformazioni",
    difficulty: "hard"
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
