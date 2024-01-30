const StrComparable = require('../2.1/StrComparable');

class IndexPQ {
    /**
     * @param {Function} [compareFunc] - A function that defines the sort order. The return value should be a number whose sign indicates the relative order of the two elements: negative if a is less than b, positive if a is greater than b, and zero if they are equal.
     */
    constructor(compareFunc) {
        if (typeof compareFunc === 'function') {
            this._compareFunc = compareFunc;
        }
    }
    _compareFunc;
    _pq = [];
    // _qp[idx] === _pq.indexOf(idx), _qp[x] returns the index of x in _pq
    _qp = [];
    #n = 0;
    // index to item
    _items = [];

    // Returns true if this priority queue is empty
    isEmpty() {
        return this.#n === 0;
    }

    // Returns the number of items on this priority queue
    size() {
        return this.#n;
    }

    // Is idx an index on this priority queue?
    contains(idx) {
        return this._qp[idx] !== undefined;
    }

    // Associates key with idx
    insert(idx, item) {
        if (this.contains(idx)) {
            throw new Error('index is already in the priority queue');
        }
        this.#n++;
        this._qp[idx] = this.#n;
        this._pq[this.#n] = idx;
        this._items[idx] = item;
        this.#swim(this.#n);
    }

    // Returns the index associated with the top item.
    _topIndex() {
        if (this.#n === 0) throw new Error('Priority queue underflow');
        return this._pq[1];
    }

    // Returns the top item
    _top() {
        if (this.#n === 0) throw new Error('Priority queue underflow');
        return this._items[this._pq[1]];
    }

    // Removes the top item and returns its associated index
    _delTop() {
        if (this.#n === 0) throw new Error('Priority queue underflow');
        const topIdx = this._pq[1];
        this.#exch(1, this.#n--);
        delete this._pq[this.#n + 1];
        this._pq.length--;
        this.#sink(1);
        this._qp[topIdx] = undefined;
        this._items[topIdx] = undefined
        return topIdx;
    }

    // Change the item associated with idx to the specified value
    change(idx, item) {
        if (!this.contains(idx)) throw new Error('index is not in the priority queue');
        this._items[idx] = item;
        this.#swim(this._qp[idx]);
        this.#sink(this._qp[idx]);
    }

    // Remove the item associated with idx
    delete(idx) {
        if (!this.contains(idx)) throw new Error('index is not in the priority queue');
        const idxInPq = this._qp[idx];
        this.#exch(idxInPq, this.#n--);
        delete this._pq[this.#n + 1];
        this._pq.length--;
        this.#swim(idxInPq);
        this.#sink(idxInPq);
        this._qp[idx] = undefined;
        this._items[idx] = undefined;
    }

    // return true if ith item in pq takes lower priority than jth item in pq
    // must be implemented by derived classes
    _lowerPriority(i, j) {}

    // exchange ith item and jth item in pq
    #exch(i, j) {
        const swap = this._pq[i];
        this._pq[i] = this._pq[j];
        this._pq[j] = swap;
        this._qp[this._pq[i]] = i;
        this._qp[this._pq[j]] = j;
    }

    // k is the index in pq
    #swim(k) {
        while (k > 1 && this._lowerPriority(Math.floor(k / 2), k)) {
            this.#exch(k, Math.floor(k / 2));
            k = Math.floor(k / 2);
        }
    }

    // k is the index in pq
    #sink(k) {
        while (2 * k <= this.#n) {
            let j = 2 * k;
            if (j + 1 <= this.#n && this._lowerPriority(j, j + 1)) j++;
            if (!this._lowerPriority(k, j)) break;
            this.#exch(k, j);
            k = j;
        }
    }

    static test() {
        const strs = ['it', 'was', 'the', 'best', 'of', 'times', 'it', 'was', 'the', 'worst'];
        // const pq = new this(function (a, b) {
        //     return a.val.localeCompare(b.val);
        // });
        const pq = new this();
        for (let i = 0; i < strs.length; i++) {
            pq.insert(i, new StrComparable(strs[i]));
        }
        while (!pq.isEmpty()) {
            const idx = pq._delTop();
            console.log(idx, strs[idx]);
        }
    }
}

module.exports = IndexPQ;