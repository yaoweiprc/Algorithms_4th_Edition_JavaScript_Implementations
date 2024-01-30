const Sort = require('./Sort');

class ShellSort extends Sort {
    /**
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {
        let h = 1;
        while (h < Math.floor(a.length / 3)) {
            h = h * 3 + 1;
        }
        while (h >= 1) {
            let i = h;
            while (i < a.length) {
                let j = i;
                while (j >= h && this._less(a[j], a[j - h], compareFunc)) {
                    this._exch(a, j - h, j);
                    j = j - h;
                }
                i++;
            }
            h = Math.floor(h / 3);
        }
    }
}

/**
 * should print
 * A E E L M O P R S T X
 */
// ShellSort.test();

module.exports = ShellSort;