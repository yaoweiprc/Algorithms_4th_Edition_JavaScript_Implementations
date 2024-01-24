const Sort = require('../2.1/Sort');

class MergeSort extends Sort {
    // _auxiliary array
    static _aux;
    /**
     * @param {Comparable[]} a
     */
    static sort(a) {
        this._aux = new Array(a.length);
        this.#sort(a, 0, a.length - 1);
    }
    static #sort(oriArr, lo, hi) {
        if (hi <= lo) return;
        const mid = Math.floor(lo + (hi - lo) / 2);
        // sort left part
        this.#sort(oriArr, lo, mid);
        // sort right part
        this.#sort(oriArr, mid + 1, hi);
        // merge two parts
        this._merge(oriArr, lo, mid, hi);
    }
    static _merge(a, lo, mid, hi) {
        let i = lo, j = mid + 1;
        for (let k = lo; k <= hi; k++) {
            this._aux[k] = a[k];
        }
        for (let k = lo; k <= hi; k++) {
            // left part drained
            if (i > mid) a[k] = this._aux[j++];
            else if (j > hi) a[k] = this._aux[i++];
            else if (this._less(this._aux[j], this._aux[i])) a[k] = this._aux[j++];
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