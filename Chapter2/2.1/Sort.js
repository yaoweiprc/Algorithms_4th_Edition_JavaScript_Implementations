const Comparable = require('./Comparable');
const fsPromises = require("node:fs/promises");
const path = require('node:path');
const StrComparable = require('./StrComparable');

/**
 * super class of sorting
 */
class Sort {
    /**
     * abstract static sort method, must be implemented by derived classes
     * @param {Comparable[]} a
     */
    static sort(a) {}
    /**
     * return true if v < w
     * @param {Comparable} v
     * @param {Comparable} w
     * @return {boolean}
     */
    static _less(v, w) {
        return v.compareTo(w) < 0;
    }

    /**
     * exchange positions of elements indexed at i and j in array a
     * @param {Comparable[]} a
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
     * @param {Comparable[]} a
     */
    static _show(a) {
        console.log(a.reduce((accumulator, currVal) => accumulator + currVal + ' ', ''));
    }

    /**
     * test if array is sorted
     * @param {Comparable[]} a
     */
    static isSorted(a) {
        for (let i = 1; i < a.length; i++) {
            if (this._less(a[i], a[i - 1])) return false;
        }
        return true;
    }

    /**
     * sort input array and print the result
     * @param {Comparable[] | string} a
     */
    static async test(a) {
        if (!Array.isArray(a)) {
            let fileName = path.resolve(__dirname, './tiny.txt');
            if (typeof a === 'string') {
                fileName = a;
            }
            const fileHandle = await fsPromises.open(fileName);
            const content = await fileHandle.readFile('utf8');
            const oriArr = content.trim().split(' ');
            a = oriArr.map(str => new StrComparable(str));
        }
        this.sort(a);
        console.assert(this.isSorted(a), 'not sorted');
        this._show(a);
    }
}

module.exports = Sort;