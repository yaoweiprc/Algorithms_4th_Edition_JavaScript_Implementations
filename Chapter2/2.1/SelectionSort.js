const Sort = require('./Sort');

class SelectionSort extends Sort {
    /**
     * @param {Comparable[]} a
     */
    static sort(a) {
        for (let i = 0; i < a.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < a.length; j++) {
                if (this.less(a[j], a[minIdx])) {
                    minIdx = j;
                }
            }
            this.exch(a, i, minIdx);
        }
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// SelectionSort.test();

module.exports = SelectionSort;