const Sort = require('./Sort');

class InsertionSort extends Sort {
    /**
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {
        for (let i = 1; i < a.length; i++) {
            let j = i;
            while (j >= 1 && this._less(a[j], a[j - 1], compareFunc)) {
                this._exch(a, j - 1, j);
                j--;
            }
        }
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// InsertionSort.test();

module.exports = InsertionSort;