const path = require("node:path");
const fs = require("node:fs");
const StrComparable = require('../2.1/StrComparable');

// base class for priority queue
class PQ {
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
    #n= 0;
    isEmpty() {
        return this.#n === 0;
    }
    size() {
        return this.#n;
    }
    // returns the top key on heap
    _top() {
        return this._pq[1];
    }
    // Adds a new key to this priority queue.
    insert(v) {
        this._pq[++this.#n] = v;
        this.#swim(this.#n);
    }
    // Removes and returns the top key on heap
    _delTop() {
        let top = this._pq[1];
        this.#exch(1, this.#n--);
        delete this._pq[this.#n + 1];
        this._pq.length--;
        this.#sink(1);
        return top;
    }
    #swim(k) {
        while (k > 1 && this._lowerPriority(Math.floor(k / 2), k)) {
            this.#exch(Math.floor(k / 2), k);
            k = Math.floor(k / 2);
        }
    }
    #sink(k) {
        while (2 * k <= this.#n) {
            let j = 2 * k;
            if (j < this.#n && this._lowerPriority(j, j + 1)) j++;
            if (this._lowerPriority(j, k)) break;
            this.#exch(k, j);
            k = j;
        }
    }

    // return true if ith item takes lower priority than jth item
    // must be implemented by derived classes
    _lowerPriority(i, j) {}

    #exch(i, j) {
        let tmp = this._pq[i];
        this._pq[i] = this._pq[j];
        this._pq[j] = tmp;
    }
    static test() {
        let fileName = path.resolve(__dirname, './tinyPQ.txt');
        const content = fs.readFileSync(fileName, 'utf8');
        const oriArr = content.trim().split(' ');
        // const pq = new this(function (a, b) {
        //     return a.val.localeCompare(b.val);
        // });
        const pq = new this();
        let res = '';
        while (oriArr.length > 0) {
            const item = new StrComparable(oriArr.shift());
            if (item.val !== '-') {
                pq.insert(item);
            } else if (!pq.isEmpty()) {
                res += pq._delTop() + ' ';
            }
        }
        console.log(`${res}(${pq.size()} left on pq)`);
    }
}

module.exports = PQ;