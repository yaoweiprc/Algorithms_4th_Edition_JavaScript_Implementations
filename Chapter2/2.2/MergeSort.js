const Sort = require('../2.1/Sort');

class MergeSort extends Sort {
    // _auxiliary array
    static _aux;
    /**
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {
        this._aux = new Array(a.length);
        this._sort(a, 0, a.length - 1, compareFunc);
    }
    static _sort(oriArr, lo, hi, compareFunc) {
        if (hi <= lo) return;
        const mid = Math.floor(lo + (hi - lo) / 2);
        // sort left part
        this._sort(oriArr, lo, mid, compareFunc);
        // sort right part
        this._sort(oriArr, mid + 1, hi, compareFunc);
        // merge two parts
        this._merge(oriArr, lo, mid, hi, compareFunc);
    }
    static _merge(a, lo, mid, hi, compareFunc) {
        let i = lo, j = mid + 1;
        for (let k = lo; k <= hi; k++) {
            this._aux[k] = a[k];
        }
        for (let k = lo; k <= hi; k++) {
            // left part drained
            if (i > mid) a[k] = this._aux[j++];
            else if (j > hi) a[k] = this._aux[i++];
            else if (this._less(this._aux[j], this._aux[i], compareFunc)) a[k] = this._aux[j++];
            else a[k] = this._aux[i++];
        }
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// MergeSort.test();

module.exports = MergeSort;