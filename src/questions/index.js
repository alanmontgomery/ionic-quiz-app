const API_URL = "https://quizapi.io/api/v1/questions";
const API_KEY = "B27jnk1wmfEOQ42FtmrgBogiNTLLhOArJj29y24a";

export const fetchQuestions = async (category, difficulty) => {

    const response = await fetch(`${ API_URL }?apiKey=${ API_KEY }&category=${ category }&difficulty=${ difficulty }&limit=10`);
    const questions = await response.json();
    
    return questions;
}