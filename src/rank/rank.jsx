import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <td>{i}</td>
          <td>{score.usernname.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
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
    <main className="table text-center">
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