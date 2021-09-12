# Increlation
An incremenentor that is limited to a minimum and maximum value, but allows reusing a value once resolved.

## Install
```javascript
npm install --save increlation
```

## Usage
```javascript
const increlation = require('increlation');

const incrementor = increlation(1, 10);

incrementor.next() // === 1
incrementor.next() // === 2
///...
incrementor.next() // === 10
incrementor.release(5)
incrementor.next() // === 5
incrementor.next()
  /* === throw new Error(
    'increlation: incrementor has used all available values'
  )*/
incrementor.waitForNext().then(
  value => {
    console.log('value is 5 after the release line below runs')
  }
)
incrementor.release(5)
```
