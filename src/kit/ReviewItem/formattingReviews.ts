export const formattingReviews = (reviews: any): any => {
  const ones: number[] = [];
  const twos: number[] = [];
  const threes: number[] = [];
  const fours: number[] = [];
  const fives: number[] = [];

  if (reviews !== null) {
    for (let i = 0; i < reviews.length; i++) {
      const rating = reviews[i].ratings;

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

  const onesLength = ones.length;
  const twosLength = twos.length;
  const threesLength = threes.length;
  const foursLength = fours.length;
  const fivesLength = fives.length;

  const totalReviews =
    ones.length + twos.length + threes.length + fours.length + fives.length;

  // const ratingsLength = onesLength + twosLength + threesLength + foursLength + fivesLength;

  //     let onesPercentage = 0;
  //     if (ratingsLength > 0)
  //         onesPercentage = (onesLength / ratingsLength) * 100;

  //     let twosPercentage = 0;
  //     if (ratingsLength > 0)
  //         twosPercentage = (twosLength / ratingsLength) * 100;

  //     let threesPercentage = 0;
  //     if (ratingsLength > 0)
  //         threesPercentage = (threesLength / ratingsLength) * 100;

  //     let foursPercentage = 0;
  //     if (ratingsLength > 0)
  //         foursPercentage = (foursLength / ratingsLength) * 100;

  //     let fivesPercentage = 0;
  //     if (ratingsLength > 0)
  //         fivesPercentage = (fivesLength / ratingsLength) * 100;

  //     const Percentages = {
  //         ones: onesPercentage,
  //         twos: twosPercentage,
  //         threes: threesPercentage,
  //         fours: foursPercentage,
  //         fives: fivesPercentage
  //     }

  //     return Percentages;
  // }

  // If totalReviews is 0 (to avoid division by zero)
  if (totalReviews === 0) {
    return {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
    };
  }

  const onesPercentage = (ones.length / totalReviews) * 100;
  const twosPercentage = (twos.length / totalReviews) * 100;
  const threesPercentage = (threes.length / totalReviews) * 100;
  const foursPercentage = (fours.length / totalReviews) * 100;
  const fivesPercentage = (fives.length / totalReviews) * 100;

  return {
    ones: onesPercentage,
    twos: twosPercentage,
    threes: threesPercentage,
    fours: foursPercentage,
    fives: fivesPercentage,
  };
};
