# Increlation
An incremenentor that is limited to a minimum and maximum value, but allows reusing a value once resolved.

## Install
```javascript
npm install --save increlation
```

## Usage
### Sync
increlation.sync (minimum, maximum)

```javascript
const increlation = require('increlation');

const incrementor = increlation.sync(1, 10);

incrementor.next() // === { done: false, value: 1 }
incrementor.next() // === { done: false, value: 2 }
///...
incrementor.next() // === { done: false, value: 10 }
incrementor.release(5)
incrementor.next() // === { done: false, value: 5 }
incrementor.next() // === { done: true, value: null }
```

### Async
increlation.async (minimum, maximum, timeout = Infinity)

```javascript
const increlation = require('increlation');

const incrementor = increlation.async(1, 10, 1000);

await incrementor.next() // === { done: false, value: 1 }
await incrementor.next() // === { done: false, value: 2 }
///...
await incrementor.next() // === { done: false, value: 10 }
incrementor.next().then(result => {
  result // === { done: false, value: 5 }
})
incrementor.release(5)
```
