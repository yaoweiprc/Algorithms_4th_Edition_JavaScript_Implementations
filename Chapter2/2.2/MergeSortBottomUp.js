const MergeSort = require('./MergeSort');

class MergeSortBottomUp extends MergeSort {
    /**
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {
        this._aux = new Array(a.length);
        for (let sz = 1; sz < a.length; sz *=2) {
            for (let lo = 0; lo + sz < a.length; lo += 2 * sz) {
                this._merge(a, lo, lo + sz - 1, Math.min(lo + 2 * sz - 1, a.length - 1), compareFunc);
            }
        }
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// MergeSortBottomUp.test();

module.exports = MergeSortBottomUp;