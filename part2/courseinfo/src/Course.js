import React from 'react';

const Header = ({ course }) => (
  <>
    <h2>{course}</h2>
  </>
);

const Content = ({ parts }) => {
  const partComponents = parts.map((eachItem) => {
    return (
      <Part
        key={eachItem.id}
        part={eachItem.name}
        exercises={eachItem.exercises}
      />
    );
  });

  return <>{partComponents}</>;
};

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Total = ({ exercises }) => {
  const exercisesTotal = exercises.reduce((accum, eachItem) => {
    return accum + eachItem.exercises;
  }, 0);
  return <strong>total of {exercisesTotal} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </>
  );
};

export default Course;
