const Sort = require('../2.1/Sort');

class HeapSort extends Sort {
    /**
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {
        const n = a.length;
        // Insert 1 dummy element at start, so that array can be 1-based to adapt to priority queue's structure.
        // Unshift and shift operations take constant time in JS
        a.unshift(undefined);
        for (let i = Math.floor(n / 2); i >= 1; i--) {
            this.#sink(a, i, n, compareFunc);
        }
        let i = n;
        while (i > 1) {
            this._exch(a, 1, i--);
            this.#sink(a, 1, i, compareFunc);
        }
        // remove the dummy element
        a.shift();
    }
    static #sink(a, i, length, compareFunc) {
        while (2 * i <= length) {
            let j = 2 * i;
            if (j + 1 <= length && this._less(a[j], a[j + 1], compareFunc)) j++;
            if (!this._less(a[i], a[j], compareFunc)) break;
            this._exch(a, i, j);
            i = j;
        }
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// HeapSort.test();

module.exports = HeapSort;