const Sort = require('./Sort');

class ShellSort extends Sort {
    /**
     * @param {Comparable[]} a
     */
    static sort(a) {
        let h = 1;
        while (h < Math.floor(a.length / 3)) {
            h = h * 3 + 1;
        }
        while (h >= 1) {
            let i = h;
            while (i < a.length) {
                let j = i;
                while (j >= h && this.less(a[j], a[j - h])) {
                    this.exch(a, j - h, j);
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