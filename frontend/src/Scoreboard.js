import React from 'react';

function Scoreboard({ score, attempts }) {
  return (
    // Scoreboard component to display the user's score and accuracy
    <center>
      <div>
        <h2>Scoreboard</h2>
        <p>Correct Guesses: {score}</p>
        <p>Total Attempts: {attempts}</p>
        <p>Accuracy: {((score / attempts) * 100 || 0).toFixed(2)}%</p>
      </div>
    </center>
  );
}

export default Scoreboard;