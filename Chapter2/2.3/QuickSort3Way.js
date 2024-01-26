const Sort = require('../2.1/Sort');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

class QuickSort3Way extends Sort {
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
        const v = a[lo];
        // start pos of equal item
        let lt = lo;
        // last pos of unchecked item
        let gt = hi;
        // start pos of unchecked items
        let i = lo + 1;
        while (i <= gt) {
            if (this._less(a[i], v)) {
                this._exch(a, lt++, i++);
            } else if (this._less(v, a[i])) {
                this._exch(a, gt--, i);
            } else {
                i++;
            }
        }
        this.#sort(a, lo, lt - 1);
        this.#sort(a, gt + 1, hi);
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// QuickSort3Way.test();

module.exports = QuickSort3Way;