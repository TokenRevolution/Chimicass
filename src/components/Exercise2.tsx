import React, { useState, useEffect } from 'react';
import './Exercise2.css';
import { getRandomQuestions, Question } from '../data/questionsDatabase';

interface Substance {
  id: string;
  name: string;
  formula: string;
  type: 'element' | 'compound' | 'mixture';
  category: 'metal' | 'non-metal' | 'acid' | 'base' | 'salt' | 'organic' | 'gas' | 'liquid' | 'solid';
  color: string;
  icon: string;
  description: string;
}

interface ChemicalReaction {
  reactants: string[];
  products: string[];
  equation: string;
  type: 'combination' | 'decomposition' | 'single-replacement' | 'double-replacement' | 'combustion' | 'neutralization';
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
  
  // Stati per il quiz
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const substances: Substance[] = [
    // ELEMENTI - Gruppo 1 (Metalli Alcalini)
    { id: 'H', name: 'Idrogeno', formula: 'H₂', type: 'element', category: 'gas', color: '#FF6B6B', icon: '💨', description: 'Gas leggero e infiammabile' },
    { id: 'Li', name: 'Litio', formula: 'Li', type: 'element', category: 'metal', color: '#FFE66D', icon: '⚡', description: 'Metallo alcalino leggero' },
    { id: 'Na', name: 'Sodio', formula: 'Na', type: 'element', category: 'metal', color: '#FFE66D', icon: '⚡', description: 'Metallo alcalino molto reattivo' },
    { id: 'K', name: 'Potassio', formula: 'K', type: 'element', category: 'metal', color: '#FFE66D', icon: '⚡', description: 'Metallo alcalino essenziale' },
    { id: 'Rb', name: 'Rubidio', formula: 'Rb', type: 'element', category: 'metal', color: '#FFE66D', icon: '⚡', description: 'Metallo alcalino raro' },
    { id: 'Cs', name: 'Cesio', formula: 'Cs', type: 'element', category: 'metal', color: '#FFE66D', icon: '⚡', description: 'Metallo alcalino più pesante' },

    // Gruppo 2 (Metalli Alcalino-Terrosi)
    { id: 'Be', name: 'Berillio', formula: 'Be', type: 'element', category: 'metal', color: '#A8E6CF', icon: '🔷', description: 'Metallo leggero e tossico' },
    { id: 'Mg', name: 'Magnesio', formula: 'Mg', type: 'element', category: 'metal', color: '#A8E6CF', icon: '🔷', description: 'Metallo essenziale per la vita' },
    { id: 'Ca', name: 'Calcio', formula: 'Ca', type: 'element', category: 'metal', color: '#A8E6CF', icon: '🔷', description: 'Metallo per ossa e denti' },
    { id: 'Sr', name: 'Stronzio', formula: 'Sr', type: 'element', category: 'metal', color: '#A8E6CF', icon: '🔷', description: 'Metallo alcalino-terroso' },
    { id: 'Ba', name: 'Bario', formula: 'Ba', type: 'element', category: 'metal', color: '#A8E6CF', icon: '🔷', description: 'Metallo pesante' },

    // Gruppo 3-12 (Metalli di Transizione)
    { id: 'Sc', name: 'Scandio', formula: 'Sc', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo di transizione' },
    { id: 'Ti', name: 'Titanio', formula: 'Ti', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo resistente e leggero' },
    { id: 'V', name: 'Vanadio', formula: 'V', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo di transizione' },
    { id: 'Cr', name: 'Cromo', formula: 'Cr', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo lucido e resistente' },
    { id: 'Mn', name: 'Manganese', formula: 'Mn', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo essenziale' },
    { id: 'Fe', name: 'Ferro', formula: 'Fe', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo più comune sulla Terra' },
    { id: 'Co', name: 'Cobalto', formula: 'Co', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo magnetico' },
    { id: 'Ni', name: 'Nichel', formula: 'Ni', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo resistente alla corrosione' },
    { id: 'Cu', name: 'Rame', formula: 'Cu', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo conduttore' },
    { id: 'Zn', name: 'Zinco', formula: 'Zn', type: 'element', category: 'metal', color: '#FFD93D', icon: '🔶', description: 'Metallo per galvanizzazione' },

    // Gruppo 13 (Boro)
    { id: 'B', name: 'Boro', formula: 'B', type: 'element', category: 'non-metal', color: '#FF9F43', icon: '💎', description: 'Semi-metallo' },
    { id: 'Al', name: 'Alluminio', formula: 'Al', type: 'element', category: 'metal', color: '#FF9F43', icon: '🔶', description: 'Metallo leggero e resistente' },
    { id: 'Ga', name: 'Gallio', formula: 'Ga', type: 'element', category: 'metal', color: '#FF9F43', icon: '🔶', description: 'Metallo che fonde a bassa temperatura' },
    { id: 'In', name: 'Indio', formula: 'In', type: 'element', category: 'metal', color: '#FF9F43', icon: '🔶', description: 'Metallo raro' },
    { id: 'Tl', name: 'Tallio', formula: 'Tl', type: 'element', category: 'metal', color: '#FF9F43', icon: '🔶', description: 'Metallo tossico' },

    // Gruppo 14 (Carbonio)
    { id: 'C', name: 'Carbonio', formula: 'C', type: 'element', category: 'non-metal', color: '#2C3E50', icon: '💎', description: 'Elemento base della vita' },
    { id: 'Si', name: 'Silicio', formula: 'Si', type: 'element', category: 'non-metal', color: '#2C3E50', icon: '💎', description: 'Semi-metallo per semiconduttori' },
    { id: 'Ge', name: 'Germanio', formula: 'Ge', type: 'element', category: 'non-metal', color: '#2C3E50', icon: '💎', description: 'Semi-metallo' },
    { id: 'Sn', name: 'Stagno', formula: 'Sn', type: 'element', category: 'metal', color: '#2C3E50', icon: '🔶', description: 'Metallo malleabile' },
    { id: 'Pb', name: 'Piombo', formula: 'Pb', type: 'element', category: 'metal', color: '#2C3E50', icon: '🔶', description: 'Metallo pesante e tossico' },

    // Gruppo 15 (Azoto)
    { id: 'N', name: 'Azoto', formula: 'N₂', type: 'element', category: 'gas', color: '#4ECDC4', icon: '💨', description: 'Gas inerte principale dell\'aria' },
    { id: 'P', name: 'Fosforo', formula: 'P', type: 'element', category: 'non-metal', color: '#4ECDC4', icon: '💎', description: 'Non-metallo essenziale' },
    { id: 'As', name: 'Arsenico', formula: 'As', type: 'element', category: 'non-metal', color: '#4ECDC4', icon: '💎', description: 'Semi-metallo tossico' },
    { id: 'Sb', name: 'Antimonio', formula: 'Sb', type: 'element', category: 'non-metal', color: '#4ECDC4', icon: '💎', description: 'Semi-metallo' },
    { id: 'Bi', name: 'Bismuto', formula: 'Bi', type: 'element', category: 'metal', color: '#4ECDC4', icon: '🔶', description: 'Metallo pesante' },

    // Gruppo 16 (Ossigeno)
    { id: 'O', name: 'Ossigeno', formula: 'O₂', type: 'element', category: 'gas', color: '#4ECDC4', icon: '💨', description: 'Gas necessario per la respirazione' },
    { id: 'S', name: 'Zolfo', formula: 'S', type: 'element', category: 'non-metal', color: '#4ECDC4', icon: '💎', description: 'Non-metallo giallo' },
    { id: 'Se', name: 'Selenio', formula: 'Se', type: 'element', category: 'non-metal', color: '#4ECDC4', icon: '💎', description: 'Semi-metallo essenziale' },
    { id: 'Te', name: 'Tellurio', formula: 'Te', type: 'element', category: 'non-metal', color: '#4ECDC4', icon: '💎', description: 'Semi-metallo raro' },
    { id: 'Po', name: 'Polonio', formula: 'Po', type: 'element', category: 'metal', color: '#4ECDC4', icon: '☢️', description: 'Elemento radioattivo' },

    // Gruppo 17 (Alogeni)
    { id: 'F', name: 'Fluoro', formula: 'F₂', type: 'element', category: 'gas', color: '#95E1D3', icon: '☠️', description: 'Alogeno più reattivo' },
    { id: 'Cl', name: 'Cloro', formula: 'Cl₂', type: 'element', category: 'gas', color: '#95E1D3', icon: '☠️', description: 'Gas tossico giallo-verde' },
    { id: 'Br', name: 'Bromo', formula: 'Br₂', type: 'element', category: 'liquid', color: '#95E1D3', icon: '☠️', description: 'Liquido rosso-bruno' },
    { id: 'I', name: 'Iodio', formula: 'I₂', type: 'element', category: 'solid', color: '#95E1D3', icon: '☠️', description: 'Solido viola scuro' },
    { id: 'At', name: 'Astato', formula: 'At', type: 'element', category: 'solid', color: '#95E1D3', icon: '☢️', description: 'Elemento radioattivo' },

    // Gruppo 18 (Gas Nobili)
    { id: 'He', name: 'Elio', formula: 'He', type: 'element', category: 'gas', color: '#A29BFE', icon: '🎈', description: 'Gas nobile leggero' },
    { id: 'Ne', name: 'Neon', formula: 'Ne', type: 'element', category: 'gas', color: '#A29BFE', icon: '💡', description: 'Gas nobile per illuminazione' },
    { id: 'Ar', name: 'Argon', formula: 'Ar', type: 'element', category: 'gas', color: '#A29BFE', icon: '💨', description: 'Gas nobile inerte' },
    { id: 'Kr', name: 'Kripton', formula: 'Kr', type: 'element', category: 'gas', color: '#A29BFE', icon: '💨', description: 'Gas nobile raro' },
    { id: 'Xe', name: 'Xeno', formula: 'Xe', type: 'element', category: 'gas', color: '#A29BFE', icon: '💨', description: 'Gas nobile pesante' },
    { id: 'Rn', name: 'Radon', formula: 'Rn', type: 'element', category: 'gas', color: '#A29BFE', icon: '☢️', description: 'Gas nobile radioattivo' },

    // COMPOSTI INORGANICI - Acidi
    { id: 'HCl', name: 'Acido Cloridrico', formula: 'HCl', type: 'compound', category: 'acid', color: '#E17055', icon: '🧪', description: 'Acido forte corrosivo' },
    { id: 'H2SO4', name: 'Acido Solforico', formula: 'H₂SO₄', type: 'compound', category: 'acid', color: '#E17055', icon: '🧪', description: 'Acido forte industriale' },
    { id: 'HNO3', name: 'Acido Nitrico', formula: 'HNO₃', type: 'compound', category: 'acid', color: '#E17055', icon: '🧪', description: 'Acido forte ossidante' },
    { id: 'H3PO4', name: 'Acido Fosforico', formula: 'H₃PO₄', type: 'compound', category: 'acid', color: '#E17055', icon: '🧪', description: 'Acido per fertilizzanti' },
    { id: 'H2CO3', name: 'Acido Carbonico', formula: 'H₂CO₃', type: 'compound', category: 'acid', color: '#E17055', icon: '🧪', description: 'Acido debole nelle bibite' },

    // Basi
    { id: 'NaOH', name: 'Idrossido di Sodio', formula: 'NaOH', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Base forte caustica' },
    { id: 'KOH', name: 'Idrossido di Potassio', formula: 'KOH', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Base forte' },
    { id: 'Ca(OH)2', name: 'Idrossido di Calcio', formula: 'Ca(OH)₂', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Calce spenta' },
    { id: 'NH3', name: 'Ammoniaca', formula: 'NH₃', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Base debole gassosa' },

    // Sali
    { id: 'NaCl', name: 'Cloruro di Sodio', formula: 'NaCl', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale da cucina' },
    { id: 'KCl', name: 'Cloruro di Potassio', formula: 'KCl', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale per fertilizzanti' },
    { id: 'CaCl2', name: 'Cloruro di Calcio', formula: 'CaCl₂', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale igroscopico' },
    { id: 'Na2SO4', name: 'Solfato di Sodio', formula: 'Na₂SO₄', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale per detergenti' },
    { id: 'CaCO3', name: 'Carbonato di Calcio', formula: 'CaCO₃', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Calcare e marmo' },
    { id: 'Na2CO3', name: 'Carbonato di Sodio', formula: 'Na₂CO₃', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Soda per lavaggio' },

    // Ossidi
    { id: 'H2O', name: 'Acqua', formula: 'H₂O', type: 'compound', category: 'liquid', color: '#74B9FF', icon: '💧', description: 'Composto essenziale per la vita' },
    { id: 'CO2', name: 'Anidride Carbonica', formula: 'CO₂', type: 'compound', category: 'gas', color: '#6C5CE7', icon: '💨', description: 'Gas serra' },
    { id: 'CO', name: 'Monossido di Carbonio', formula: 'CO', type: 'compound', category: 'gas', color: '#6C5CE7', icon: '☠️', description: 'Gas tossico' },
    { id: 'SO2', name: 'Anidride Solforosa', formula: 'SO₂', type: 'compound', category: 'gas', color: '#6C5CE7', icon: '💨', description: 'Gas inquinante' },
    { id: 'NO2', name: 'Diossido di Azoto', formula: 'NO₂', type: 'compound', category: 'gas', color: '#6C5CE7', icon: '💨', description: 'Gas inquinante' },
    { id: 'Fe2O3', name: 'Ossido di Ferro', formula: 'Fe₂O₃', type: 'compound', category: 'solid', color: '#6C5CE7', icon: '🔶', description: 'Ruggine' },
    { id: 'Al2O3', name: 'Ossido di Alluminio', formula: 'Al₂O₃', type: 'compound', category: 'solid', color: '#6C5CE7', icon: '🔶', description: 'Allumina' },
    { id: 'SiO2', name: 'Ossido di Silicio', formula: 'SiO₂', type: 'compound', category: 'solid', color: '#6C5CE7', icon: '🔶', description: 'Sabbia e quarzo' },
    { id: 'MgO', name: 'Ossido di Magnesio', formula: 'MgO', type: 'compound', category: 'solid', color: '#6C5CE7', icon: '🔶', description: 'Ossido di magnesio' },
    { id: 'CaO', name: 'Ossido di Calcio', formula: 'CaO', type: 'compound', category: 'solid', color: '#6C5CE7', icon: '🔶', description: 'Calce viva' },
    { id: 'P2O5', name: 'Pentossido di Fosforo', formula: 'P₂O₅', type: 'compound', category: 'solid', color: '#6C5CE7', icon: '🔶', description: 'Ossido di fosforo' },
    { id: 'HF', name: 'Acido Fluoridrico', formula: 'HF', type: 'compound', category: 'acid', color: '#E17055', icon: '🧪', description: 'Acido molto corrosivo' },
    { id: 'LiOH', name: 'Idrossido di Litio', formula: 'LiOH', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Base di litio' },
    { id: 'RbOH', name: 'Idrossido di Rubidio', formula: 'RbOH', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Base di rubidio' },
    { id: 'CsOH', name: 'Idrossido di Cesio', formula: 'CsOH', type: 'compound', category: 'base', color: '#A29BFE', icon: '🧪', description: 'Base di cesio' },
    { id: 'MgCl2', name: 'Cloruro di Magnesio', formula: 'MgCl₂', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale di magnesio' },
    { id: 'ZnCl2', name: 'Cloruro di Zinco', formula: 'ZnCl₂', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale di zinco' },
    { id: 'FeCl2', name: 'Cloruro di Ferro(II)', formula: 'FeCl₂', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale di ferro' },
    { id: 'AgCl', name: 'Cloruro d\'Argento', formula: 'AgCl', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Sale d\'argento' },
    { id: 'NaNO3', name: 'Nitrato di Sodio', formula: 'NaNO₃', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Nitrato di sodio' },
    { id: 'KNO3', name: 'Nitrato di Potassio', formula: 'KNO₃', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Nitrato di potassio' },
    { id: 'Na3PO4', name: 'Fosfato di Sodio', formula: 'Na₃PO₄', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Fosfato di sodio' },
    { id: 'AgNO3', name: 'Nitrato d\'Argento', formula: 'AgNO₃', type: 'compound', category: 'salt', color: '#FDCB6E', icon: '🧂', description: 'Nitrato d\'argento' },

    // COMPOSTI ORGANICI
    { id: 'CH4', name: 'Metano', formula: 'CH₄', type: 'compound', category: 'gas', color: '#FD79A8', icon: '🔥', description: 'Gas naturale infiammabile' },
    { id: 'C2H6', name: 'Etano', formula: 'C₂H₆', type: 'compound', category: 'gas', color: '#FD79A8', icon: '🔥', description: 'Idrocarburo saturo' },
    { id: 'C2H4', name: 'Etilene', formula: 'C₂H₄', type: 'compound', category: 'gas', color: '#FD79A8', icon: '🔥', description: 'Idrocarburo insaturo' },
    { id: 'C2H2', name: 'Acetilene', formula: 'C₂H₂', type: 'compound', category: 'gas', color: '#FD79A8', icon: '🔥', description: 'Gas per saldatura' },
    { id: 'C6H6', name: 'Benzene', formula: 'C₆H₆', type: 'compound', category: 'liquid', color: '#FD79A8', icon: '🧪', description: 'Idrocarburo aromatico' },
    { id: 'C2H5OH', name: 'Etanolo', formula: 'C₂H₅OH', type: 'compound', category: 'liquid', color: '#FD79A8', icon: '🍷', description: 'Alcol etilico' },
    { id: 'CH3COOH', name: 'Acido Acetico', formula: 'CH₃COOH', type: 'compound', category: 'liquid', color: '#FD79A8', icon: '🧪', description: 'Aceto' },
    { id: 'C6H12O6', name: 'Glucosio', formula: 'C₆H₁₂O₆', type: 'compound', category: 'solid', color: '#FD79A8', icon: '🍯', description: 'Zucchero semplice' },
    { id: 'C12H22O11', name: 'Saccarosio', formula: 'C₁₂H₂₂O₁₁', type: 'compound', category: 'solid', color: '#FD79A8', icon: '🍯', description: 'Zucchero da tavola' },

    // MISCUGLI COMUNI
    { id: 'AIR', name: 'Aria', formula: 'N₂ + O₂ + altri', type: 'mixture', category: 'gas', color: '#B2BEC3', icon: '🌬️', description: 'Miscuglio di gas atmosferici' },
    { id: 'SALT_WATER', name: 'Acqua Salata', formula: 'H₂O + NaCl', type: 'mixture', category: 'liquid', color: '#81ECEC', icon: '🌊', description: 'Miscuglio omogeneo' },
    { id: 'SAND_WATER', name: 'Sabbia e Acqua', formula: 'SiO₂ + H₂O', type: 'mixture', category: 'solid', color: '#FDCB6E', icon: '🏖️', description: 'Miscuglio eterogeneo' },
    { id: 'BRASS', name: 'Ottone', formula: 'Cu + Zn', type: 'mixture', category: 'solid', color: '#FFD93D', icon: '🔶', description: 'Lega di rame e zinco' },
    { id: 'STEEL', name: 'Acciaio', formula: 'Fe + C + altri', type: 'mixture', category: 'solid', color: '#FFD93D', icon: '🔶', description: 'Lega di ferro e carbonio' },
    { id: 'BRONZE', name: 'Bronzo', formula: 'Cu + Sn', type: 'mixture', category: 'solid', color: '#FFD93D', icon: '🔶', description: 'Lega di rame e stagno' },
    { id: 'VINEGAR', name: 'Aceto', formula: 'H₂O + CH₃COOH', type: 'mixture', category: 'liquid', color: '#FD79A8', icon: '🍷', description: 'Soluzione di acido acetico' },
    { id: 'MILK', name: 'Latte', formula: 'H₂O + proteine + grassi', type: 'mixture', category: 'liquid', color: '#F8F9FA', icon: '🥛', description: 'Miscuglio complesso' },
    { id: 'BLOOD', name: 'Sangue', formula: 'H₂O + cellule + proteine', type: 'mixture', category: 'liquid', color: '#E74C3C', icon: '🩸', description: 'Miscuglio biologico' },
    { id: 'SOIL', name: 'Terreno', formula: 'minerali + H₂O + aria', type: 'mixture', category: 'solid', color: '#8B4513', icon: '🌱', description: 'Miscuglio eterogeneo' },
    { id: 'SMOKE', name: 'Fumo', formula: 'CO₂ + particelle + gas', type: 'mixture', category: 'gas', color: '#95A5A6', icon: '💨', description: 'Miscuglio di gas e particelle' },
    { id: 'FOG', name: 'Nebbia', formula: 'H₂O + aria', type: 'mixture', category: 'gas', color: '#BDC3C7', icon: '🌫️', description: 'Goccioline d\'acqua in aria' }
  ];

  const reactions: ChemicalReaction[] = [
    // REAZIONI DI COMBINAZIONE
    {
      reactants: ['H', 'O'],
      products: ['H2O'],
      equation: '2H₂ + O₂ → 2H₂O',
      type: 'combination',
      description: 'Combustione dell\'idrogeno: produce acqua pura!',
      isExplosive: false
    },
    {
      reactants: ['Na', 'Cl'],
      products: ['NaCl'],
      equation: '2Na + Cl₂ → 2NaCl',
      type: 'combination',
      description: 'Formazione del sale: sodio + cloro = cloruro di sodio',
      isExplosive: false
    },
    {
      reactants: ['K', 'Cl'],
      products: ['KCl'],
      equation: '2K + Cl₂ → 2KCl',
      type: 'combination',
      description: 'Potassio + cloro = cloruro di potassio',
      isExplosive: false
    },
    {
      reactants: ['Ca', 'Cl'],
      products: ['CaCl2'],
      equation: 'Ca + Cl₂ → CaCl₂',
      type: 'combination',
      description: 'Calcio + cloro = cloruro di calcio',
      isExplosive: false
    },
    {
      reactants: ['Mg', 'O'],
      products: ['MgO'],
      equation: '2Mg + O₂ → 2MgO',
      type: 'combination',
      description: 'Magnesio + ossigeno = ossido di magnesio',
      isExplosive: false
    },
    {
      reactants: ['Fe', 'O'],
      products: ['Fe2O3'],
      equation: '4Fe + 3O₂ → 2Fe₂O₃',
      type: 'combination',
      description: 'Ferro + ossigeno = ruggine (ossido di ferro)',
      isExplosive: false
    },
    {
      reactants: ['Al', 'O'],
      products: ['Al2O3'],
      equation: '4Al + 3O₂ → 2Al₂O₃',
      type: 'combination',
      description: 'Alluminio + ossigeno = allumina',
      isExplosive: false
    },
    {
      reactants: ['C', 'O'],
      products: ['CO2'],
      equation: 'C + O₂ → CO₂',
      type: 'combination',
      description: 'Carbonio + ossigeno = anidride carbonica',
      isExplosive: false
    },
    {
      reactants: ['S', 'O'],
      products: ['SO2'],
      equation: 'S + O₂ → SO₂',
      type: 'combination',
      description: 'Zolfo + ossigeno = anidride solforosa',
      isExplosive: false
    },
    {
      reactants: ['N', 'O'],
      products: ['NO2'],
      equation: 'N₂ + 2O₂ → 2NO₂',
      type: 'combination',
      description: 'Azoto + ossigeno = diossido di azoto',
      isExplosive: false
    },

    // REAZIONI DI NEUTRALIZZAZIONE
    {
      reactants: ['HCl', 'NaOH'],
      products: ['NaCl', 'H2O'],
      equation: 'HCl + NaOH → NaCl + H₂O',
      type: 'neutralization',
      description: 'Neutralizzazione: acido cloridrico + idrossido di sodio = sale + acqua',
      isExplosive: false
    },
    {
      reactants: ['H2SO4', 'NaOH'],
      products: ['Na2SO4', 'H2O'],
      equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
      type: 'neutralization',
      description: 'Acido solforico + idrossido di sodio = solfato di sodio + acqua',
      isExplosive: false
    },
    {
      reactants: ['HNO3', 'KOH'],
      products: ['KNO3', 'H2O'],
      equation: 'HNO₃ + KOH → KNO₃ + H₂O',
      type: 'neutralization',
      description: 'Acido nitrico + idrossido di potassio = nitrato di potassio + acqua',
      isExplosive: false
    },
    {
      reactants: ['HCl', 'Ca(OH)2'],
      products: ['CaCl2', 'H2O'],
      equation: '2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O',
      type: 'neutralization',
      description: 'Acido cloridrico + calce spenta = cloruro di calcio + acqua',
      isExplosive: false
    },
    {
      reactants: ['H3PO4', 'NaOH'],
      products: ['Na3PO4', 'H2O'],
      equation: 'H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O',
      type: 'neutralization',
      description: 'Acido fosforico + idrossido di sodio = fosfato di sodio + acqua',
      isExplosive: false
    },

    // REAZIONI DI COMBUSTIONE
    {
      reactants: ['CH4', 'O'],
      products: ['CO2', 'H2O'],
      equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      type: 'combustion',
      description: 'Combustione del metano: produce CO₂ e acqua',
      isExplosive: false
    },
    {
      reactants: ['C2H6', 'O'],
      products: ['CO2', 'H2O'],
      equation: '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O',
      type: 'combustion',
      description: 'Combustione dell\'etano: produce CO₂ e acqua',
      isExplosive: false
    },
    {
      reactants: ['C2H4', 'O'],
      products: ['CO2', 'H2O'],
      equation: 'C₂H₄ + 3O₂ → 2CO₂ + 2H₂O',
      type: 'combustion',
      description: 'Combustione dell\'etilene: produce CO₂ e acqua',
      isExplosive: false
    },
    {
      reactants: ['C2H2', 'O'],
      products: ['CO2', 'H2O'],
      equation: '2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O',
      type: 'combustion',
      description: 'Combustione dell\'acetilene: produce CO₂ e acqua',
      isExplosive: false
    },
    {
      reactants: ['C6H6', 'O'],
      products: ['CO2', 'H2O'],
      equation: '2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O',
      type: 'combustion',
      description: 'Combustione del benzene: produce CO₂ e acqua',
      isExplosive: false
    },
    {
      reactants: ['C2H5OH', 'O'],
      products: ['CO2', 'H2O'],
      equation: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
      type: 'combustion',
      description: 'Combustione dell\'etanolo: produce CO₂ e acqua',
      isExplosive: false
    },

    // REAZIONI DI SOSTITUZIONE SEMPLICE
    {
      reactants: ['Na', 'H2O'],
      products: ['NaOH', 'H'],
      equation: '2Na + 2H₂O → 2NaOH + H₂',
      type: 'single-replacement',
      description: 'Il sodio reagisce violentemente con l\'acqua!',
      isExplosive: true
    },
    {
      reactants: ['K', 'H2O'],
      products: ['KOH', 'H'],
      equation: '2K + 2H₂O → 2KOH + H₂',
      type: 'single-replacement',
      description: 'Il potassio reagisce esplosivamente con l\'acqua!',
      isExplosive: true
    },
    {
      reactants: ['Ca', 'H2O'],
      products: ['Ca(OH)2', 'H'],
      equation: 'Ca + 2H₂O → Ca(OH)₂ + H₂',
      type: 'single-replacement',
      description: 'Il calcio reagisce con l\'acqua formando calce spenta',
      isExplosive: false
    },
    {
      reactants: ['Mg', 'HCl'],
      products: ['MgCl2', 'H'],
      equation: 'Mg + 2HCl → MgCl₂ + H₂',
      type: 'single-replacement',
      description: 'Magnesio + acido cloridrico = cloruro di magnesio + idrogeno',
      isExplosive: false
    },
    {
      reactants: ['Zn', 'HCl'],
      products: ['ZnCl2', 'H'],
      equation: 'Zn + 2HCl → ZnCl₂ + H₂',
      type: 'single-replacement',
      description: 'Zinco + acido cloridrico = cloruro di zinco + idrogeno',
      isExplosive: false
    },
    {
      reactants: ['Fe', 'HCl'],
      products: ['FeCl2', 'H'],
      equation: 'Fe + 2HCl → FeCl₂ + H₂',
      type: 'single-replacement',
      description: 'Ferro + acido cloridrico = cloruro di ferro + idrogeno',
      isExplosive: false
    },

    // REAZIONI DI SOSTITUZIONE DOPPIA
    {
      reactants: ['NaCl', 'AgNO3'],
      products: ['AgCl', 'NaNO3'],
      equation: 'NaCl + AgNO₃ → AgCl + NaNO₃',
      type: 'double-replacement',
      description: 'Cloruro di sodio + nitrato d\'argento = cloruro d\'argento + nitrato di sodio',
      isExplosive: false
    },
    {
      reactants: ['CaCO3', 'HCl'],
      products: ['CaCl2', 'CO2', 'H2O'],
      equation: 'CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O',
      type: 'double-replacement',
      description: 'Carbonato di calcio + acido cloridrico = cloruro di calcio + CO₂ + acqua',
      isExplosive: false
    },
    {
      reactants: ['Na2CO3', 'HCl'],
      products: ['NaCl', 'CO2', 'H2O'],
      equation: 'Na₂CO₃ + 2HCl → 2NaCl + CO₂ + H₂O',
      type: 'double-replacement',
      description: 'Carbonato di sodio + acido cloridrico = cloruro di sodio + CO₂ + acqua',
      isExplosive: false
    },

    // REAZIONI DI DECOMPOSIZIONE
    {
      reactants: ['H2CO3'],
      products: ['CO2', 'H2O'],
      equation: 'H₂CO₃ → CO₂ + H₂O',
      type: 'decomposition',
      description: 'L\'acido carbonico si decompone in CO₂ e acqua',
      isExplosive: false
    },
    {
      reactants: ['CaCO3'],
      products: ['CaO', 'CO2'],
      equation: 'CaCO₃ → CaO + CO₂',
      type: 'decomposition',
      description: 'Il carbonato di calcio si decompone in ossido di calcio e CO₂',
      isExplosive: false
    },

    // REAZIONI ESPLOSIVE (combinazioni pericolose)
    {
      reactants: ['F', 'H2O'],
      products: ['HF', 'O2'],
      equation: '2F₂ + 2H₂O → 4HF + O₂',
      type: 'combination',
      description: 'Il fluoro reagisce violentemente con l\'acqua!',
      isExplosive: true
    },
    {
      reactants: ['Li', 'H2O'],
      products: ['LiOH', 'H'],
      equation: '2Li + 2H₂O → 2LiOH + H₂',
      type: 'single-replacement',
      description: 'Il litio reagisce esplosivamente con l\'acqua!',
      isExplosive: true
    },
    {
      reactants: ['Rb', 'H2O'],
      products: ['RbOH', 'H'],
      equation: '2Rb + 2H₂O → 2RbOH + H₂',
      type: 'single-replacement',
      description: 'Il rubidio reagisce violentemente con l\'acqua!',
      isExplosive: true
    },
    {
      reactants: ['Cs', 'H2O'],
      products: ['CsOH', 'H'],
      equation: '2Cs + 2H₂O → 2CsOH + H₂',
      type: 'single-replacement',
      description: 'Il cesio reagisce esplosivamente con l\'acqua!',
      isExplosive: true
    },
    {
      reactants: ['P', 'O'],
      products: ['P2O5'],
      equation: '4P + 5O₂ → 2P₂O₅',
      type: 'combination',
      description: 'Il fosforo brucia violentemente con l\'ossigeno!',
      isExplosive: true
    }
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

    // Cerca una reazione che corrisponda alle sostanze selezionate
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
      // Combinazione sbagliata - esplosione!
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

    // Reset dopo 2 secondi
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

  // Carica domande per il quiz
  useEffect(() => {
    if (currentSection === 'quiz') {
      const quizQuestions = getRandomQuestions(10, ['sostanze', 'reazioni', 'acidi-basi', 'soluzioni', 'legami', 'tavola-periodica']);
      setQuizQuestions(quizQuestions);
      setCurrentQuizQuestion(0);
      setQuizAnswers([]);
      setShowQuizResults(false);
    }
  }, [currentSection]);

  // Funzioni per il quiz
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
    
    // Filtro speciale per organici (composti con carbonio)
    if (selectedCategory === 'organic') {
      return substances.filter(substance => 
        substance.type === 'compound' && 
        (substance.formula.includes('C') || substance.id.includes('C'))
      );
    }
    
    // Filtri per tipo (element, compound, mixture)
    if (['element', 'compound', 'mixture'].includes(selectedCategory)) {
      return substances.filter(substance => substance.type === selectedCategory);
    }
    
    // Filtri per categoria (gas, liquid, solid, acid, base, salt, metal, non-metal)
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
    { id: 'organic', name: 'Organici', icon: '🍯', color: '#fd79a8' }
  ];

  return (
    <div className="exercise2">
      <div className="exercise-header">
        <h2>🧪 Sostanze, Composti e Miscugli</h2>
        <div className="section-tabs">
          <button 
            className={`tab ${currentSection === 'theory' ? 'active' : ''}`}
            onClick={() => setCurrentSection('theory')}
          >
            📖 Teoria
          </button>
          <button 
            className={`tab ${currentSection === 'lab' ? 'active' : ''}`}
            onClick={() => setCurrentSection('lab')}
          >
            🔬 Laboratorio Virtuale
          </button>
          <button 
            className={`tab ${currentSection === 'quiz' ? 'active' : ''}`}
            onClick={() => setCurrentSection('quiz')}
          >
            ✏️ Quiz
          </button>
        </div>
      </div>

      {currentSection === 'theory' && (
        <div className="theory-section">
          <div className="theory-intro">
            <h3>🎯 Sostanze Pure e Miscugli</h3>
            <p>
              In chimica distinguiamo tra <strong>sostanze pure</strong> e <strong>miscugli</strong>. 
              Le sostanze pure possono essere <strong>elementi</strong> o <strong>composti</strong>.
            </p>
          </div>

          <div className="concepts-grid">
            <div className="concept-card element">
              <div className="concept-icon">⚛️</div>
              <h4>Elementi</h4>
              <p>Sostanze pure costituite da un solo tipo di atomo</p>
              <div className="examples">
                <span className="example">H₂ (Idrogeno)</span>
                <span className="example">O₂ (Ossigeno)</span>
                <span className="example">Na (Sodio)</span>
              </div>
            </div>

            <div className="concept-card compound">
              <div className="concept-icon">🔗</div>
              <h4>Composti</h4>
              <p>Sostanze pure costituite da due o più elementi combinati</p>
              <div className="examples">
                <span className="example">H₂O (Acqua)</span>
                <span className="example">NaCl (Sale)</span>
                <span className="example">CO₂ (Anidride Carbonica)</span>
              </div>
            </div>

            <div className="concept-card mixture">
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
                <p>A + B → AB</p>
                <p>Due sostanze si uniscono per formare un composto</p>
              </div>
              <div className="reaction-type">
                <h5>🧪 Neutralizzazione</h5>
                <p>Acido + Base → Sale + Acqua</p>
                <p>Reazione tra acido e base</p>
              </div>
              <div className="reaction-type">
                <h5>🔥 Combustione</h5>
                <p>Sostanza + O₂ → Prodotti + Calore</p>
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
            <button 
              className={`cabinet-door ${cabinetOpen ? 'open' : ''}`}
              onClick={() => setCabinetOpen(!cabinetOpen)}
            >
              <div className="cabinet-handle">🚪</div>
              <div className="cabinet-label">Armadio delle Sostanze</div>
            </button>

            <div className={`substances-grid ${cabinetOpen ? 'visible' : ''}`}>
              <div className="category-filters">
                <h4>Filtra per categoria:</h4>
                <div className="filter-info">
                  <span className="substance-count">
                    Mostrando {getFilteredSubstances().length} sostanze
                  </span>
                </div>
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
              <button 
                className="assemble-btn"
                onClick={assembleSubstances}
                disabled={selectedSubstances.length < 2}
              >
                🔬 ASSEMBLA!
              </button>
              <button 
                className="clear-btn"
                onClick={clearSelection}
                disabled={selectedSubstances.length === 0}
              >
                🗑️ Pulisci
              </button>
            </div>
          </div>

          {lastReaction && (
            <div className={`reaction-result ${lastReaction.isExplosive ? 'explosive' : 'success'}`}>
              <div className="reaction-header">
                <h4>{lastReaction.isExplosive ? '💥 ESPLOSIONE!' : '✅ Reazione Riuscita!'}</h4>
              </div>
              <div className="reaction-equation">
                <div className="reactants">
                  {lastReaction.reactants.map(reactant => {
                    const substance = substances.find(s => s.id === reactant);
                    return (
                      <span key={reactant} className="reaction-substance">
                        {substance?.icon} {substance?.formula}
                      </span>
                    );
                  })}
                </div>
                <div className="arrow">→</div>
                <div className="products">
                  {lastReaction.products.map(product => {
                    if (product === '💥') {
                      return <span key={product} className="explosion">💥</span>;
                    }
                    const substance = substances.find(s => s.id === product);
                    return (
                      <span key={product} className="reaction-substance">
                        {substance?.icon} {substance?.formula}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="reaction-description">
                {lastReaction.description}
              </div>
            </div>
          )}

          {showExplosion && (
            <div className="explosion-animation">
              <div className="explosion-particle">💥</div>
              <div className="explosion-particle">💥</div>
              <div className="explosion-particle">💥</div>
              <div className="explosion-particle">💥</div>
              <div className="explosion-particle">💥</div>
              <div className="explosion-particle">💥</div>
              <div className="explosion-particle">💥</div>
              <div className="explosion-particle">💥</div>
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
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  Domanda {currentQuizQuestion + 1} di {quizQuestions.length}
                </span>
              </div>

              <div className="quiz-card">
                <h3>{quizQuestions[currentQuizQuestion]?.question}</h3>
                <div className="quiz-difficulty">
                  Difficoltà: <span className={`difficulty-badge ${quizQuestions[currentQuizQuestion]?.difficulty}`}>
                    {quizQuestions[currentQuizQuestion]?.difficulty === 'easy' ? '🟢 Facile' : 
                     quizQuestions[currentQuizQuestion]?.difficulty === 'medium' ? '🟡 Media' : '🔴 Difficile'}
                  </span>
                </div>
                <div className="options">
                  {quizQuestions[currentQuizQuestion]?.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option ${quizAnswers[currentQuizQuestion] === index ? 'selected' : ''}`}
                      onClick={() => handleQuizAnswerSelect(index)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="quiz-navigation">
                <button 
                  className="nav-btn prev" 
                  onClick={prevQuizQuestion}
                  disabled={currentQuizQuestion === 0}
                >
                  ← Precedente
                </button>
                
                {currentQuizQuestion === quizQuestions.length - 1 ? (
                  <button 
                    className="nav-btn check" 
                    onClick={checkQuizAnswers}
                    disabled={quizAnswers.length !== quizQuestions.length}
                  >
                    ✅ Verifica Risposte
                  </button>
                ) : (
                  <button 
                    className="nav-btn next" 
                    onClick={nextQuizQuestion}
                    disabled={quizAnswers[currentQuizQuestion] === undefined}
                  >
                    Successivo →
                  </button>
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
                  <p className="score-percentage">
                    {Math.round((getQuizScore() / quizQuestions.length) * 100)}%
                  </p>
                </div>
                <p className="score-message">
                  {getQuizScore() === quizQuestions.length 
                    ? "Perfetto! 🏆 Hai risposto correttamente a tutte le domande!"
                    : getQuizScore() >= quizQuestions.length * 0.8
                    ? "Ottimo lavoro! 👍 Hai una buona conoscenza dell'argomento."
                    : getQuizScore() >= quizQuestions.length * 0.6
                    ? "Buono! 📚 Ripassa la teoria e riprova."
                    : "Continua a studiare! 💪 Ripassa gli argomenti trattati."
                  }
                </p>
              </div>

              <div className="answers-review">
                <h4>📝 Rivedi le Risposte</h4>
                {quizQuestions.map((question, index) => (
                  <div key={question.id} className="answer-item">
                    <div className="question-review">
                      <strong>Domanda {index + 1}:</strong> {question.question}
                      <span className={`difficulty-indicator ${question.difficulty}`}>
                        {question.difficulty === 'easy' ? '🟢' : question.difficulty === 'medium' ? '🟡' : '🔴'}
                      </span>
                    </div>
                    <div className="answer-review">
                      <div className={`user-answer ${quizAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                        <span className="answer-label">La tua risposta:</span>
                        <span className="answer-text">
                          {String.fromCharCode(65 + quizAnswers[index])}. {question.options[quizAnswers[index]]}
                        </span>
                        {quizAnswers[index] === question.correctAnswer ? ' ✅' : ' ❌'}
                      </div>
                      {quizAnswers[index] !== question.correctAnswer && (
                        <div className="correct-answer">
                          <span className="answer-label">Risposta corretta:</span>
                          <span className="answer-text">
                            {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                          </span>
                        </div>
                      )}
                      <div className="explanation">
                        <strong>Spiegazione:</strong> {question.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quiz-actions">
                <button className="action-btn reset" onClick={resetQuiz}>
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

export default Exercise2;
