const sinon = require('sinon');
var should = require('should');

const RangeCollection = require('./RangeCollection');

// Example run
let rc;
let outputInterface;

describe('provided tests', () => {

  beforeEach(() => {
    outputInterface = sinon.stub();
    rc = new RangeCollection({ outputInterface });
  });

  it('passes the provided tests', () => {
    rc.add([1, 5]);
    rc.print();
    outputInterface.args[0][0].should.equal('[1, 5)');

    rc.add([10, 20]);
    rc.print();
    outputInterface.args[1][0].should.equal('[1, 5) [10, 20)');

    rc.add([20, 20]);
    rc.print();
    outputInterface.args[2][0].should.equal('[1, 5) [10, 20)');

    rc.add([20, 21]);
    rc.print();
    outputInterface.args[3][0].should.equal('[1, 5) [10, 21)');

    rc.add([2, 4]);
    rc.print();
    outputInterface.args[4][0].should.equal('[1, 5) [10, 21)');

    rc.add([3, 8]);
    rc.print();
    outputInterface.args[5][0].should.equal('[1, 8) [10, 21)');

    rc.remove([10, 10]);
    rc.print();
    outputInterface.args[6][0].should.equal('[1, 8) [10, 21)');

    rc.remove([10, 11]);
    rc.print();
    outputInterface.args[7][0].should.equal('[1, 8) [11, 21)');

    rc.remove([15, 17]);
    rc.print();
    outputInterface.args[8][0].should.equal('[1, 8) [11, 15) [17, 21)');

    rc.remove([3, 19]);
    rc.print();
    outputInterface.args[9][0].should.equal('[1, 3) [19, 21)');
  });

  it('review question', () => {
    rc.add([1, 5]);
    rc.add([10, 20]);
    rc.add([6, 8]);
    rc.print();
    outputInterface.args[0][0].should.equal('[1, 5) [6, 8) [10, 20)');
  });
});
