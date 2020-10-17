import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </>
  );
};

const Header = ({ course }) => (
  <>
    <h1>{course}</h1>
  </>
);

const Content = ({ parts, exercises }) => {
  const partComponents = parts.map((eachPart, index) => {
    return <Part part={eachPart} key={index} exercise={exercises[index]} />;
  });

  return <>{partComponents}</>;
};

const Part = ({ part, exercise }) => (
  <p>
    {part} {exercise}
  </p>
);

const Total = ({ exercises }) => {
  const exercisesSum = exercises.reduce((sum, current) => sum + current, 0);

  return <p>Number of exercises {exercisesSum}</p>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
