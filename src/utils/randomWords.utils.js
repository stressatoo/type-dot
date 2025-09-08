import { WORDS } from "./const/words.consts.js";

export const getRandomWords = (count = 50) => {
    // copia l'array per non modificare l'originale
    const shuffledWords = [...WORDS];
    
    // shuffle
    for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }
    
    // prende il numero di parole richiesto e le unisce con spazi, rendendole una stringa
    return shuffledWords.slice(0, count).join(" ");
}; 