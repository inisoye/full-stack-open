interface exercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): exercisesResult => {
  const periodLength = dailyExercises.length;
  const successDays = dailyExercises.filter((d) => d >= target).length;

  const calculateRating = () => {
    const rating = (successDays / periodLength) * 3;
    if (rating < 1) return 1;
    return Math.round(rating);
  };

  const determineRatingDescription = (rating: number) => {
    if (rating === 1) {
      return 'Not good enough, you can do much better';
    } else if (rating === 2) {
      return 'Not too bad but could be better';
    } else if (rating === 3) {
      return 'Good job';
    }
  };

  const rating = calculateRating();
  const ratingDescription = determineRatingDescription(rating);

  return {
    periodLength,
    trainingDays: dailyExercises.filter((d) => d > 0).length,
    success: dailyExercises.every((d) => d >= target),
    rating,
    ratingDescription,
    target,
    average: dailyExercises.reduce((acc, item) => acc + item, 0) / periodLength,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
