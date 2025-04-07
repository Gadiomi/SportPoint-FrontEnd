export const fixEnding = (num: number): string => {
  if (num === 1) {
    return 'відгук';
  }

  if (num > 4 && num < 21) {
    return 'відгуків';
  } else {
    const lastDigit = parseInt(num.toString().slice(-1), 10);
    return !isNaN(lastDigit) && lastDigit === 1
      ? 'відгук'
      : !isNaN(lastDigit) && lastDigit > 1 && lastDigit < 5
        ? 'відгука'
        : 'відгуків';
  }

  // let word = 'відгук';

  // if (num > 4 && num < 21) {
  //   word = 'відгуків';
  // } else {
  //   const lastDigit = parseInt(num.toString().slice(-1), 10);
  //   word = !isNaN(lastDigit) && lastDigit === 1 ? 'відгук'
  //     : !isNaN(lastDigit) && lastDigit > 1 && lastDigit < 5
  //       ? 'відгука' : 'відгуків';
  // }
  // return `${num} ${word}`
};
