const endpoint = `https://random-word-api.herokuapp.com/word`;

const getRandomQuote = async (words = 10) => {
    const response = await fetch(`${endpoint}?number=${words}`);
    const data = await response.json();
    console.log("data", data);
    return data.join(' ');
}

export const fetchRandomQuote = (words = 10) => getRandomQuote(words);
