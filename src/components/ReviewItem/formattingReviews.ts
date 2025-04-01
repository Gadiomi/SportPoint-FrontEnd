export const formattingReviews = (reviews: any): any => {
  const ones: number[] = [];
  const twos: number[] = [];
  const threes: number[] = [];
  const fours: number[] = [];
  const fives: number[] = [];

  // Перевіряємо, чи є відгуки
  if (reviews !== null) {
    // Проходимо по кожному відгуку
    for (let i = 0; i < reviews.length; i++) {
      const rating = reviews[i].ratings;

      // Перебираємо кожен ключ (оцінка) і значення (кількість таких оцінок)
      for (const key in rating) {
        const value = rating[key];

        switch (value) {
          case 5:
            fives.push(value);
            break;
          case 4:
            fours.push(value);
            break;
          case 3:
            threes.push(value);
            break;
          case 2:
            twos.push(value);
            break;
          case 1:
            ones.push(value);
            break;
          default:
            break;
        }
      }
    }
  }

  // Загальна кількість оцінок для всіх категорій
  const onesLength = ones.reduce((acc, val) => acc + val, 0);
  const twosLength = twos.reduce((acc, val) => acc + val, 0);
  const threesLength = threes.reduce((acc, val) => acc + val, 0);
  const foursLength = fours.reduce((acc, val) => acc + val, 0);
  const fivesLength = fives.reduce((acc, val) => acc + val, 0);

  const totalReviews =
    ones.length + twos.length + threes.length + fours.length + fives.length;

  const ratingsLength =
    onesLength + twosLength + threesLength + foursLength + fivesLength;

  //       let onesPercentage = 0;
  //       if (ratingsLength > 0)
  //           onesPercentage = (onesLength / ratingsLength) * 100;

  //       let twosPercentage = 0;
  //       if (ratingsLength > 0)
  //           twosPercentage = (twosLength / ratingsLength) * 100;

  //       let threesPercentage = 0;
  //       if (ratingsLength > 0)
  //           threesPercentage = (threesLength / ratingsLength) * 100;

  //       let foursPercentage = 0;
  //       if (ratingsLength > 0)
  //           foursPercentage = (foursLength / ratingsLength) * 100;

  //       let fivesPercentage = 0;
  //       if (ratingsLength > 0)
  //           fivesPercentage = (fivesLength / ratingsLength) * 100;

  //       const Percentages = {
  //           ones: onesPercentage,
  //           twos: twosPercentage,
  //           threes: threesPercentage,
  //           fours: foursPercentage,
  //           fives: fivesPercentage
  //     }

  //       return Percentages;
  //   }

  // Обчислення відсотків
  const onesPercentage =
    totalReviews > 0 ? (onesLength / totalReviews) * 100 : 0;
  const twosPercentage =
    totalReviews > 0 ? (twosLength / totalReviews) * 100 : 0;
  const threesPercentage =
    totalReviews > 0 ? (threesLength / totalReviews) * 100 : 0;
  const foursPercentage =
    totalReviews > 0 ? (foursLength / totalReviews) * 100 : 0;
  const fivesPercentage =
    totalReviews > 0 ? (fivesLength / totalReviews) * 100 : 0;

  // Повертаємо відсотки
  return {
    ones: onesPercentage,
    twos: twosPercentage,
    threes: threesPercentage,
    fours: foursPercentage,
    fives: fivesPercentage,
  };
};

//   // If totalReviews is 0 (to avoid division by zero)
//   if (totalReviews === 0) {
//     return {
//       ones: 0,
//       twos: 0,
//       threes: 0,
//       fours: 0,
//       fives: 0,
//     };
//   }

//   const onesPercentage = (ones.length / totalReviews) * 100;
//   const twosPercentage = (twos.length / totalReviews) * 100;
//   const threesPercentage = (threes.length / totalReviews) * 100;
//   const foursPercentage = (fours.length / totalReviews) * 100;
//   const fivesPercentage = (fives.length / totalReviews) * 100;

//   return {
//     ones: onesPercentage,
//     twos: twosPercentage,
//     threes: threesPercentage,
//     fours: foursPercentage,
//     fives: fivesPercentage,
//   };
// };
