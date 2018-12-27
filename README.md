# Range Collector

### Usage

```javascript
const RC = require('range-collector');
const rc = new RC();
rc.add([1, 5]);
rc.add([10, 50]);
rc.add([11, 51]);
rc.remove([1, 2]);
rc.remove([25, 27]);
rc.remove([40, 100]);
rc.print();
// prints to console [2, 5) [10, 25) [27, 40)
```


### Development

```bash
$ node -v
v10.13.0
$ npm -v
6.4.1
$ npm i
# Run unit tests
$ npm run test
# Try out things in /index.js
$ npm run start
```

- RangeCollection class is in /lib/RangeCollector.js
- RangeCollection unit tests are in /lib/RangeCollector.spec.js
