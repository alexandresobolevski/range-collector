const RC = require('./utils/RangeCollection');
const rc = new RC();

// Try out some stuff
rc.add([1, 5]);
rc.add([10, 50]);
rc.add([11, 51]);
rc.remove([1, 2]);
rc.remove([25, 27]);
rc.remove([40, 100]);
rc.print();

// [2, 5) [10, 25) [27, 40)
