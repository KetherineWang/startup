import React from 'react';
import './rank.css';

export function Rank() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/rank')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem('scores', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  const scoresRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoresRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.username}</td>
          <td>{score.score}</td>
          <td>{new Date(new Date(score.date).getTime() + new Date(score.date).getTimezoneOffset() * 60000).toString()}</td>
        </tr>
      );
    }
  } else {
    scoresRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score!</td>
      </tr>
    );
  }

  return (
    <main className="rank table text-center">
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody id="scores">{scoresRows}</tbody>
      </table>
    </main>
  );
}