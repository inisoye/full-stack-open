import * as React from 'react';
import { CoursePart } from '../types';

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps): JSX.Element => {
  switch (coursePart.type) {
    case 'normal': {
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <em>{coursePart.description}</em>
        </p>
      );
    }

    case 'groupProject': {
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}{' '}
          </b>
          <br />
          <span>project exercises {coursePart.groupProjectCount}</span>
        </p>
      );
    }

    case 'submission': {
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}{' '}
          </b>
          <br />
          <em>{coursePart.description}</em>
          <br />
          <span>submit to {coursePart.exerciseSubmissionLink}</span>
        </p>
      );
    }

    case 'special': {
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}{' '}
          </b>
          <br />
          <em>{coursePart.description}</em>
          <br />
          <span>
            required skills{' '}
            {coursePart.requirements.map((r, i) => (
              <span key={r}>
                {r}
                {i + 1 < coursePart.requirements.length && ','}{' '}
              </span>
            ))}
          </span>
        </p>
      );
    }

    // Exhaustive type checking
    default: {
      assertNever(coursePart);
    }
  }

  return <div>Stuff</div>;
};

export default Part;
