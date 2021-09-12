const test = require('basictap');

const increlation = require('../index');

test('increment until too full', async t => {
  t.plan(1);

  const increlatior = increlation(1, 100);

  const errors = [];
  for (let x = 1; x <= 101; x++) {
    try {
      increlatior.next();
    } catch (error) {
      console.log(error);
      errors.push(error);
    }
  }

  t.equal(errors.length, 1, 'resulted in 1 error');
});

test('increment over maximum but with release', async t => {
  t.plan(2);

  const increlatior = increlation(1, 100);

  const errors = [];
  let lastNumber;
  for (let x = 1; x <= 101; x++) {
    try {
      lastNumber = increlatior.next();

      if (x === 50) {
        increlatior.release(50);
      }
    } catch (error) {
      console.log(error);
      errors.push(error);
    }
  }

  t.equal(errors.length, 0, 'resulted in no errors');
  t.equal(lastNumber, 50, 'last number was last released');
});

test('waitForNext', async t => {
  t.plan(4);

  const increlatior = increlation(1, 3);

  t.equal(increlatior.next(), 1);
  t.equal(increlatior.next(), 2);
  t.equal(increlatior.next(), 3);
  increlatior.waitForNext().then((value) => {
    t.equal(value, 2);
  });
  increlatior.release(2);
});
