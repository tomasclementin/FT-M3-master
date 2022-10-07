function* fizzBuzzGenerator(max) {
  // Tu código acá:
  if (max) {
    let i = 1;
    while(i <= max) {
      if(i % 3 === 0 && i % 5 === 0) yield 'Fizz Buzz';
      if(i % 3 === 0 && i % 5 !== 0) yield 'Fizz';
      if(i % 5 === 0 && i % 3 !== 0) yield 'Buzz';
      if(i % 3 !== 0 && i % 5 !== 0) yield i;
      i++;
    };
  }
  if (!max) {
    let i = 1;
    while(i) {
      if(i % 3 === 0 && i % 5 === 0) yield 'Fizz Buzz';
      if(i % 3 === 0 && i % 5 !== 0) yield 'Fizz';
      if(i % 5 === 0 && i % 3 !== 0) yield 'Buzz';
      if(i % 3 !== 0 && i % 5 !== 0) yield i;
      i++;
    };
  };
}

module.exports = fizzBuzzGenerator;
