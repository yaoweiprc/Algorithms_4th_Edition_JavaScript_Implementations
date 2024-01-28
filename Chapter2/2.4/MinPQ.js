const PQ = require('./PQ');

class MinPQ extends PQ {
    min() {
        return this._top();
    }
    delMin() {
        return this._delTop();
    }
    // the larger one takes lower priority in MinPQ
    _lowerPriority(i, j) {
        return this._pq[i].compareTo(this._pq[j]) > 0;
    }
}

// should output
// E A E (6 left on pq)
// MinPQ.test();

module.exports = MinPQ;