const Sort = require('../2.1/Sort');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

class QuickSort extends Sort {
    /**
     * @param {Comparable[]} a
     */
    static sort(a) {
        shuffle(a);
        this.#sort(a, 0, a.length - 1);
    }
    static #sort(a, lo, hi) {
        if (hi <= lo) {
            return;
        }
        const pos = this.#partition(a, lo, hi);
        this.#sort(a, lo, pos - 1);
        this.#sort(a, pos + 1, hi);
    }
    static #partition(a, lo, hi) {
        const v = a[lo];
        let i = lo, j = hi + 1;
        while (true) {
            while (this._less(a[++i], v)) {
                if (i >= hi) {
                    break;
                }
            }
            // j can't be less than lo because a[lo] === v
            while (this._less(v, a[--j]));
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