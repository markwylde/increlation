function increlation (minimum, maximum) {
  const state = {
    available: Array((maximum + 1) - minimum).fill('').map((_, index) => index + minimum),
    unavailable: []
  };

  function release (value) {
    const index = state.unavailable.indexOf(value);
    state.unavailable.splice(index, 1);
    state.available.push(value);
  }

  function next () {
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

  return {
    release,
    next,

    [Symbol.iterator]: function () { return this; }
  };
}

module.exports = increlation;
