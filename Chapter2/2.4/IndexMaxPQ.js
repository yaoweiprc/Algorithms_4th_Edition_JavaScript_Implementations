const IndexPQ = require('./IndexPQ');

class IndexMaxPQ extends IndexPQ {
    max() {
        return this._top();
    }
    maxIndex() {
        return this._topIndex();
    }
    deleteMax() {
        return this._delTop();
    }
    // the smaller one takes lower priority in MaxPQ
    _lowerPriority(i, j) {
        return this._items[this._pq[i]].compareTo(this._items[this._pq[j]]) < 0;
    }
}

// should output
// 9 worst
// 1 was
// 7 was
// 5 times
// 8 the
// 2 the
// 4 of
// 6 it
// 0 it
// 3 best
// IndexMaxPQ.test();

module.exports = IndexMaxPQ;