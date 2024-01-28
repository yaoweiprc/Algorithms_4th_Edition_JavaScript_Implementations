const PQ = require('./PQ');

class MaxPQ extends PQ {
    max() {
        return this._top();
    }
    delMax() {
        return this._delTop();
    }
    // the smaller one takes lower priority in MaxPQ
    _lowerPriority(i, j) {
        return this._pq[i].compareTo(this._pq[j]) < 0;
    }
}

// should output
// Q X P (6 left on pq)
// MaxPQ.test();

module.exports = MaxPQ;