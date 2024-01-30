const Sort = require('./Sort');

class SelectionSort extends Sort {
    /**
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {
        for (let i = 0; i < a.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < a.length; j++) {
                if (this._less(a[j], a[minIdx], compareFunc)) {
                    minIdx = j;
                }
            }
            this._exch(a, i, minIdx);
        }
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// SelectionSort.test();

module.exports = SelectionSort;