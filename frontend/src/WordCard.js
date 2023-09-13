import React, { useState } from 'react';
import './WordCard.css';

// WordCard component takes scrambled word, original word, guess result callback, and fetch new word callback as props
function WordCard({ scrambled, original, onGuessResult, fetchNewWord }) {
    
    // State to store the user's current guess
    const [guess, setGuess] = useState('');
    
    // State to store feedback message for user
    const [feedback, setFeedback] = useState('');

    // Function to handle the guess submission
    const handleGuessSubmit = async () => {
        try {
            // Make a POST request to the backend to validate the guess
            const response = await fetch('http://localhost:5001/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    guess: guess.toLowerCase(),
                    original: original.toLowerCase()
                })
            });
            
            const data = await response.json();
            
            // If guess is correct, show success feedback, else show retry feedback
            if (data.correct) {
                setFeedback('Correct guess! 👏 Want to try another word?');
                onGuessResult(true);
            } else {
                setFeedback('Try again! ❌');
                onGuessResult(false);
            }
        } catch (error) {
            // Log any errors during validation
            console.error("Error validating guess:", error);
        }
    };

    // Function to reset the state and fetch a new word
    const handleNextWordClick = () => {
        setFeedback('');
        setGuess('');
        fetchNewWord();
    }

    return (
        <center>
            <div>
                <h2>Guess the word: {scrambled}</h2>
                <input value={guess} onChange={(e) => setGuess(e.target.value)} />
                <button onClick={handleGuessSubmit}>Submit Guess</button>
                
                {/* Show feedback message if available */}
                {feedback && 
                    <div>
                        <div className="feedback">{feedback}</div>
                        {/* Show "Next Word" button only if the guess was correct */}
                        {feedback.includes("Correct guess") && 
                            <center>
                                <button onClick={handleNextWordClick}>
                                    Next Word
                                </button>
                            </center>
                        }
                    </div>
                }
            </div>
        </center>
    );
}

export default WordCard;
