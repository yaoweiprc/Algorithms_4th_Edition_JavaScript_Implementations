const IndexPQ = require('./IndexPQ');

class IndexMinPQ extends IndexPQ {
    min() {
        return this._top();
    }
    minIndex() {
        return this._topIndex();
    }
    deleteMin() {
        return this._delTop();
    }
    // the larger one takes lower priority in MinPQ
    _lowerPriority(i, j) {
        return this._items[this._pq[i]].compareTo(this._items[this._pq[j]]) > 0;
    }
}

// should output
// 3 best
// 0 it
// 6 it
// 4 of
// 8 the
// 2 the
// 5 times
// 7 was
// 1 was
// 9 worst
// IndexMinPQ.test();

module.exports = IndexMinPQ;