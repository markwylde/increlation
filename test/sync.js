const test = require('basictap');

const increlation = require('../sync');

test('sync - increment until too full', t => {
  t.plan(2);

  const increlatior = increlation(1, 100, 100);

  let lastResult;
  for (let x = 1; x <= 101; x++) {
    lastResult = increlatior.next();
  }

  t.equal(lastResult.done, true, 'done is true');
  t.equal(lastResult.value, null, 'value is null');
});

test('sync - increment over maximum but with release', t => {
  t.plan(2);

  const increlatior = increlation(1, 100, 200);

  let lastResult;
  for (let x = 1; x <= 101; x++) {
    if (x === 100) {
      increlatior.release(50);
    }

    lastResult = increlatior.next();
  }

  t.equal(lastResult.done, false, 'done is true');
  t.equal(lastResult.value, 50, 'value is null');
});

test('sync - iteration', t => {
  t.plan(3);

  const increlatior = increlation(1, 3);

  for (const i of increlatior) {
    t.pass();
    if (i === 3) {
      break;
    }
  }
});
