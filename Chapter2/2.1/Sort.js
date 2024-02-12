const Comparable = require('./Comparable');
const fs = require("node:fs");
const path = require('node:path');
const StrComparable = require('./StrComparable');

/**
 * super class of sorting
 */
class Sort {
    /**
     * abstract static sort method, must be implemented by derived classes
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static sort(a, compareFunc) {}

    /**
     * return true if v < w
     * @param {Comparable} v
     * @param {Comparable} w
     * @param {Function} [compareFunc] - A function that defines the sort order. The return value should be a number whose sign indicates the relative order of the two elements: negative if a is less than b, positive if a is greater than b, and zero if they are equal.
     * @return {boolean}
     */
    static _less(v, w, compareFunc) {
        if (typeof compareFunc === 'function') {
            return compareFunc(v, w) < 0;
        }
        if (!(v instanceof Comparable && w instanceof Comparable)) {
            throw new Error('Must use Comparable interface or compareFunc!');
        }
        return v.compareTo(w) < 0;
    }

    /**
     * exchange positions of elements indexed at i and j in array a
     * @param {Comparable[] | *[]} a
     * @param {number} i
     * @param {number} j
     */
    static _exch(a, i, j) {
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    /**
     * print array in one line
     * @param {Comparable[] | *[]} a
     */
    static _show(a) {
        console.log(a.reduce((accumulator, currVal) => accumulator + currVal + ' ', ''));
    }

    /**
     * test if array is sorted
     * @param {Comparable[] | *[]} a
     * @param {Function} [compareFunc] - must be defined when a is not type Comparable[]
     */
    static isSorted(a, compareFunc) {
        for (let i = 1; i < a.length; i++) {
            if (this._less(a[i], a[i - 1], compareFunc)) return false;
        }
        return true;
    }

    /**
     * sort input array and print the result
     * @param {Comparable[] | *[] | string} a
     */
    static test(a) {
        if (!Array.isArray(a)) {
            let fileName = path.resolve(__dirname, './tiny.txt');
            if (typeof a === 'string') {
                fileName = a;
            }
            const content = fs.readFileSync(fileName, 'utf8');
            const oriArr = content.trim().split(' ');
            a = oriArr.map(str => new StrComparable(str));
        }

        /*
        // sort by descending order
        function compareFunc(a, b) {
            return b.val.localeCompare(a.val);
        }
        this.sort(a, compareFunc);
        console.assert(this.isSorted(a, compareFunc), 'not sorted');
        */

        this.sort(a);
        console.assert(this.isSorted(a), 'not sorted');

        this._show(a);
    }
}

module.exports = Sort;