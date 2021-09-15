function waitFor (fn) {
  function attempt (resolve) {
    const value = fn();

    if (value) {
      resolve(value);
      return;
    }

    setTimeout(() => attempt(resolve), 1);
  }

  return new Promise((resolve, reject) => {
    attempt(resolve);
  });
}

function increlation (minimum, maximum, timeout = Infinity) {
  const state = {
    available: Array((maximum + 1) - minimum).fill('').map((_, index) => index + minimum),
    unavailable: []
  };

  function release (value) {
    const index = state.unavailable.indexOf(value);
    state.unavailable.splice(index, 1);
    state.available.push(value);
  }

  function nextSync () {
    const value = state.available[0];
    state.available.splice(0, 1);
    state.unavailable.push(value);

    if (!value) {
      return {
        value: null,
        done: true
      };
    }

    return {
      value,
      done: false
    };
  }

  function next () {
    const startTime = Date.now();
    return waitFor(() => {
      const result = nextSync();

      if (result.done) {
        if (Date.now() - startTime > timeout) {
          return result;
        }

        return false;
      }

      return result;
    }, timeout);
  }

  return {
    release,
    next,

    [Symbol.asyncIterator]: function () { return this; }
  };
}

module.exports = increlation;
