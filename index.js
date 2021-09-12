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
      throw new Error('increlation: incrementor has used all available values');
    }

    return value;
  }

  function waitForNext () {
    return waitFor(() => {
      try {
        return next();
      } catch (error) {
        if (error.message !== 'increlation: incrementor has used all available values') {
          throw error;
        }

        return false;
      }
    });
  }

  return {
    release,
    next,
    waitForNext
  };
}

module.exports = increlation;
