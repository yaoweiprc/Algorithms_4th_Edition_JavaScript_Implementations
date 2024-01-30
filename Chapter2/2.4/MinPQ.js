const PQ = require('./PQ');
const Comparable = require("../2.1/Comparable");

class MinPQ extends PQ {
    min() {
        return this._top();
    }
    delMin() {
        return this._delTop();
    }
    // the larger one takes lower priority in MinPQ
    _lowerPriority(i, j) {
        if (typeof this._compareFunc ===  'function') {
            return this._compareFunc(this._pq[i], this._pq[j]) > 0;
        }
        if (!(this._pq[i] instanceof Comparable && this._pq[j] instanceof Comparable)) {
            throw new Error('Must use Comparable interface or compareFunc!');
        }
        return this._pq[i].compareTo(this._pq[j]) > 0;
    }
}

// should output
// E A E (6 left on pq)
// MinPQ.test();

module.exports = MinPQ;