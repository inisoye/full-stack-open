interface ParsedBmiArgs {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): ParsedBmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    throw new Error('Height must be greater than zero!');
  }

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25) {
    return 'Overweight';
  } else {
    throw new Error('Ensure you have entered nonzero numbers!');
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(bmi);
} catch (e) {
  console.log('Error, something bad happened, message: ', e);
}
