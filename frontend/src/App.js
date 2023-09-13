import React, { useState, useEffect } from 'react';
import './App.css';
import WordCard from './WordCard';
import Scoreboard from './Scoreboard';
import Title from './Title';

function App() {
    // State for the scrambled and original versions of the word
    const [scrambledWord, setScrambledWord] = useState('');
    const [originalWord, setOriginalWord] = useState('');
    
    // State for keeping track of user's score and total attempts
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    // Using useEffect to fetch a word when the component first mounts
    useEffect(() => {
        fetchWord();
    }, []);

    // Function to fetch a new word from the backend
    const fetchWord = async () => {
        try {
            const response = await fetch('http://localhost:5001/word');
            const data = await response.json();
            setScrambledWord(data.scrambled);
            setOriginalWord(data.original);
        } catch (error) {
            // Log any errors during fetching
            console.error("Error fetching word:", error);
        }
    };

    // Function to handle the result of a user's guess
    const handleGuessResult = (isCorrect) => {
        setAttempts(attempts + 1); // Increment attempts count
        if (isCorrect) {
            setScore(score + 1); // Increment score if the guess was correct
        }
    }

    return (
        <div className="App">
            <Title /> {/*Display title component*/}
            {/* Display the scoreboard with the current score and attempts */}
            <Scoreboard score={score} attempts={attempts} />
            {/*Display the word card for user to guess the word*/}
            <WordCard 
                scrambled={scrambledWord} 
                original={originalWord} 
                onGuessResult={handleGuessResult} 
                fetchNewWord={fetchWord} 
            />
        </div>
    );
}

export default App;
