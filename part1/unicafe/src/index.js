import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (state, setFunction) => {
    setFunction(state + 1);
  };

  const all = good + neutral + bad;

  const weightedRatings = [
    { count: good, weight: 1 },
    { count: neutral, weight: 0 },
    { count: bad, weight: -1 },
  ];

  const weightedSum = weightedRatings.reduce((acc, curr) => {
    return acc + curr.count * curr.weight;
  }, 0);

  const avg = weightedSum / all;

  const positive = (good / all) * 100;

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <Button buttonText='good' onClick={() => handleClick(good, setGood)} />
        <Button
          buttonText='neutral'
          onClick={() => handleClick(neutral, setNeutral)}
        />
        <Button buttonText='bad' onClick={() => handleClick(bad, setBad)} />
      </div>

      <div>
        <h2>statistics</h2>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          avg={avg}
          pos={positive}
        />
      </div>
    </>
  );
};

const Button = ({ buttonText, onClick }) => (
  <button onClick={onClick}>{buttonText}</button>
);

const Statistics = ({ good, neutral, bad, all, avg, pos }) => {
  if (!all) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <Stat statText='good' statNumber={good} />
        <Stat statText='neutral' statNumber={neutral} />
        <Stat statText='bad' statNumber={bad} />
        <Stat statText='all' statNumber={all} />
        <Stat statText='average' statNumber={avg} />
        <Stat statText='positive' statNumber={`${pos} %`} />
      </tbody>
    </table>
  );
};

const Stat = ({ statText, statNumber }) => (
  <tr>
    <td>{statText} </td>
    <td>{statNumber}</td>
  </tr>
);

ReactDOM.render(<App />, document.getElementById('root'));
