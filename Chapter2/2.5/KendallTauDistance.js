const MergeSort = require('../2.2/MergeSort');

class KendallTauDistance extends MergeSort {
    static count = 0;
    static #compare(a, b) {
        return a - b;
    }
    /**
     * return Kendall tau distance (number of inversions)
     * @param {number[]} a
     * @param {number[]} b
     */
    static exec(a, b) {
        this.count = 0;
        let valToIdxInA = {};
        for (let i = 0; i < a.length; i++) {
            valToIdxInA[a[i]] = i;
        }
        for (let i = 0; i < b.length; i++) {
            b[i] = valToIdxInA[b[i]];
        }
        this.sort(b, this.#compare);
        return this.count;
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
            else if (this._less(this._aux[j], this._aux[i], compareFunc)) {
                a[k] = this._aux[j++];
                this.count += mid - i + 1;
            }
            else a[k] = this._aux[i++];
        }
    }
}

// should print 4 because 0-1 3-1 2-4 5-4 are reversed
console.log(KendallTauDistance.exec(
    [0, 3, 1, 6, 2, 5, 4],
    [1, 0, 3, 6, 4, 2, 5]
));