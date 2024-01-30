const PQ = require('./PQ');
const Comparable = require("../2.1/Comparable");

class MaxPQ extends PQ {
    max() {
        return this._top();
    }
    delMax() {
        return this._delTop();
    }
    // the smaller one takes lower priority in MaxPQ
    _lowerPriority(i, j) {
        if (typeof this._compareFunc ===  'function') {
            return this._compareFunc(this._pq[i], this._pq[j]) < 0;
        }
        if (!(this._pq[i] instanceof Comparable && this._pq[j] instanceof Comparable)) {
            throw new Error('Must use Comparable interface or compareFunc!');
        }
        return this._pq[i].compareTo(this._pq[j]) < 0;
    }
}

// should output
// Q X P (6 left on pq)
// MaxPQ.test();

module.exports = MaxPQ;