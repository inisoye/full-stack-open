import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(10));

  const changeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const highestVote = Math.max(...votes);
  const highestIndex = votes.indexOf(highestVote);

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p></p>
        <button onClick={handleVote}>vote</button>
        <button onClick={changeAnecdote}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>

        <p>
          {/* display 'no votes' if there  have been no votes. highest vote is 0 in the no vote state */}
          {highestVote
            ? `${anecdotes[highestIndex]} has ${votes[highestIndex]}`
            : 'No'}{' '}
          votes
        </p>
      </div>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
