const Sort = require('../2.1/Sort');

class QuickSort extends Sort {

    static shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    /**
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {
        this.shuffle(a);
        this.#sort(a, 0, a.length - 1, compareFunc);
    }
    static #sort(a, lo, hi, compareFunc) {
        if (hi <= lo) {
            return;
        }
        const pos = this._partition(a, lo, hi, compareFunc);
        this.#sort(a, lo, pos - 1, compareFunc);
        this.#sort(a, pos + 1, hi, compareFunc);
    }
    static _partition(a, lo, hi, compareFunc) {
        const v = a[lo];
        let i = lo, j = hi + 1;
        while (true) {
            while (this._less(a[++i], v, compareFunc)) {
                if (i >= hi) {
                    break;
                }
            }
            // j can't be less than lo because a[lo] === v
            while (this._less(v, a[--j], compareFunc)) {}
            // a[i].val === a[j].val when i === j
            if (j <= i) {
                break;
            }
            this._exch(a, i, j);
        }
        this._exch(a, lo, j);
        return j;
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// QuickSort.test();

module.exports = QuickSort;