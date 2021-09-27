import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  const isEmptyOrOfWrongType = (param: any): boolean => {
    return !param || isNaN(Number(param));
  };

  if (isEmptyOrOfWrongType(weight) || isEmptyOrOfWrongType(height)) {
    res.status(400).send({
      error: 'malformatted parameters',
    });
  }

  res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
