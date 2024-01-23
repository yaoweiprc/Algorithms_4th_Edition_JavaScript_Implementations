const Sort = require('./Sort');

class InsertionSort extends Sort {
    /**
     * @param {Comparable[]} a
     */
    static sort(a) {
        for (let i = 1; i < a.length; i++) {
            let j = i;
            while (j >= 1 && this.less(a[j], a[j - 1])) {
                this.exch(a, j - 1, j);
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