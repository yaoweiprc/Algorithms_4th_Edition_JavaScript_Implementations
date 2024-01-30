const QuickSort = require('../2.3/QuickSort');

class SelectKthItem extends QuickSort {
    static #compare(a, b) {
        return a - b;
    }
    /**
     * @param {Array} arr
     * @param {number} k
     */
    static exec(arr, k) {
        if (k < 0 || k > arr.length - 1) {
            throw new Error('invalid k');
        }
        let lo = 0;
        let hi = arr.length - 1;
        while (hi > lo) {
            const j = this._partition(arr, lo, hi, this.#compare);
            if (j === k) return arr[j];
            if (j > k) hi = j - 1;
            if (j < k) lo = j + 1;
        }
        return arr[k];
    }
}

// should print 6
console.log(SelectKthItem.exec([4,5,2,8,6,1], 4));