// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
module.exports = class RangeCollection {
  constructor({ outputInterface } = {}) {
    this.outputInterface = outputInterface || console.log;
    this.ranges = [];
  }

  validateInputRange(newRange) {
    if (
      newRange.length !== 2
      || typeof newRange[0] !== 'number'
      || typeof newRange[1] !== 'number'
    ) {
      throw new Error('a valid range should be an array of two integers')
    }

    if (newRange[1] < newRange[0]) {
      throw new Error('the range must be non-decreasing');
    }
  }

  findIndexOfRnage(range) {
    let i = 0;
    // NOTE: big O can be reduced by switching to a better searching algorithm
    // such as binary search for example
    while(this.ranges[i] && this.ranges[i][0] < range[0]) {
      i++;
    }

    return i;
  }

  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(newRange = []) {
    this.validateInputRange(newRange);

    // insert new range at index
    if (!this.ranges.length) {
      this.ranges = [newRange];
      return;
    }

    const insertIndex = this.findIndexOfRnage(newRange);

    this.ranges.splice(insertIndex, 0, newRange);

    let i = insertIndex-1;
    while(this.ranges[i] && this.ranges[i+1] && this.ranges[i][1] >= this.ranges[i+1][0]) {
      this.ranges[i][1] = this.ranges[i][1] > this.ranges[i+1][1] ? this.ranges[i][1] : this.ranges[i+1][1];
      this.ranges.splice(i+1, 1);
    }

    return this;
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(rangeToRemove) {
    this.validateInputRange(rangeToRemove);

    // insert new range at index
    if (!this.ranges.length || rangeToRemove[0] === rangeToRemove[1]) {
      return this;
    }

    const startRemovingAtIndex = this.findIndexOfRnage(rangeToRemove);

    let i = startRemovingAtIndex - 1;
    let remainder = rangeToRemove;

    while(this.ranges[i] && remainder[1] > this.ranges[i][0]) {
      if (remainder[0] > this.ranges[i][1]) {
        i++;
      // case remove full range
      } else if (remainder[0] <= this.ranges[i][0] && remainder[1] >= this.ranges[i][1]) {
        // increase the low end of what is to be removed
        remainder[0] = this.ranges[i][1];
        this.ranges.splice(i, 1);
        // don't need to increase i because this.ranges[i] just changed, we removed the old one
      // case remove beginning to mid
      } else if (remainder[0] <= this.ranges[i][0] && remainder[1] < this.ranges[i][1]) {
        this.ranges[i][0] = remainder[1];
        remainder = [];
        break;
        // case remove from mid to end
      } else if (remainder[0] > this.ranges[i][0] && remainder[1] >= this.ranges[i][1]) {
        const highEndTemp = this.ranges[i][1];
        // remove range
        this.ranges[i][1] = remainder[0];
        // increase the low end of what is to be removed
        remainder[0] = highEndTemp;
        i++;
      // case remove from mid to mid
      } else if (remainder[0] > this.ranges[i][0] && remainder[1] < this.ranges[i][1]) {
        this.ranges.splice(i+1, 0, [remainder[1], this.ranges[i][1]]);
        this.ranges[i][1] = remainder[0];
        break;
      }
    }

    return this;
  }

  rangeToString(range) {
    const str = JSON.stringify(range);
    return str.replace(/]/g, ')').replace(/\,/g, ', ')
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    this.outputInterface(this.ranges.map(this.rangeToString).join(' '));
  }
}
