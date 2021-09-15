const test = require('basictap');

const increlation = require('../async');

test('async - increment until too full', async t => {
  t.plan(2);

  const increlatior = increlation(1, 100, 100);

  let lastResult;
  for (let x = 1; x <= 101; x++) {
    lastResult = await increlatior.next();
  }

  t.equal(lastResult.done, true, 'done is true');
  t.equal(lastResult.value, null, 'value is null');
});

test('async - increment over maximum but with release', async t => {
  t.plan(2);

  const increlatior = increlation(1, 100, 200);

  setTimeout(() => {
    increlatior.release(50);
  }, 100);

  let lastResult;
  for (let x = 1; x <= 101; x++) {
    lastResult = await increlatior.next();
  }

  t.equal(lastResult.done, false, 'done is true');
  t.equal(lastResult.value, 50, 'value is null');
});

test('async - iteration', async t => {
  t.plan(3);

  const increlatior = increlation(1, 3);

  for await (const i of increlatior) {
    t.pass();
    if (i === 3) {
      break;
    }
  }
});
