import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './score.css'

export function Score() {
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
        const currentPlayerUsername = localStorage.getItem("username") || "Unknown Player";
        
        fetch(`/api/score/${currentPlayerUsername}`)
            .then(response => response.json())
            .then(data => {
                setScore(data.score || 0);
            })
            .catch(error => {
                console.error("Failed to fetch player score:", error);
                setScore(0);
            });
    }, []);

    const resetScoreZero = () => {
        const currentPlayer = localStorage.getItem("username") || "Unknown Player";
        localStorage.setItem(`${currentPlayer}_score`, 0);

        fetch("/api/score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: currentPlayer, score: 0 }),
        })
        .then(response => {
            console.log("Score reset successfully", response);
            navigate("/play");
        })
        .catch(error => {
            console.error("Error resetting score:", error);
        });
    };

    return (
        <main className="score">
            <div className="congratulations mb-5">
                <h1>Congratulations on your triumphal odyssey!</h1>
            </div>
            <div className="playerScore">
                <h2 className="mb-3">Encore Performance!</h2>
                <h3 className="mb-5">
                    With an impressive streak of 
                    <span> {score} </span> echoes<br />
                    Your musical intuition is spot on!<br />
                    Celebrate your dedication as a keshi connoisseur!
                </h3>
            </div>
            <div className="buttons">
                <button className="btn btn-light btn-lg" onClick={resetScoreZero}>New Game</button>
                <button className="btn btn-dark btn-lg" onClick={() => navigate("/rank")}>View Rank</button>
            </div>
        </main>
    );
}