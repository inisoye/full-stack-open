const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    return 'Error: height must be greater than zero';
  }

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25) {
    return 'Overweight';
  } else {
    return 'Error: ensure you have entered nonzero numbers for height and weight';
  }
};

console.log(calculateBmi(180, 74));
