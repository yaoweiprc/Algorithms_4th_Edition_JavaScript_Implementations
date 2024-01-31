const Comparable = require('../../Chapter2/2.1/Comparable');
const SymbolTable = require('./SymbolTable');

/**
 * Interface for Ordered Symbol Table
 * @interface
 */
class OrderedSymbolTable extends SymbolTable {
    /**
     * You can set a compare Function to compare keys, if not key should be of type Comparable
     * @param {?function} compareFunc
     */
    constructor(compareFunc) {
        super();
        if (typeof compareFunc === 'function') {
            this._compareFunc = compareFunc;
        }
    }

    /**
     * A function that defines the order. The return value should be a number whose sign
     * indicates the relative order of the two elements:
     * negative if a is less than b, positive if a is greater than b, and zero if they are equal.
     * @param {Comparable} a
     * @param {Comparable} b
     * @protected
     * @returns {number}
     */
    _compareFunc(a, b) {
        if (!(a instanceof Comparable && b instanceof Comparable)) {
            throw new Error('Must use Comparable interface or compareFunc!');
        }
        return a.compareTo(b);
    };

    /**
     * Returns the smallest key in the symbol table.
     * @returns {Key}
     */
    min() {}

    /**
     * Returns the largest key in the symbol table.
     * @returns {Key}
     */
    max() {}

    /**
     * Returns the largest key in the symbol table less than or equal to key.
     * @param {Key} key
     * @returns {Key}
     */
    floor(key) {}

    /**
     * Returns the smallest key in the symbol table greater than or equal to key.
     * @param {Key} key
     * @returns {Key}
     */
    ceiling(key) {}

    /**
     * Return the number of keys in the symbol table strictly less than key.
     * @param {Key} key
     * @returns {number}
     */
    rank(key) {}

    /**
     * Return the key in the symbol table of a given rank.
     * This key has the property that there are rank keys in
     * the symbol table that are smaller. In other words, this key is the
     * (rank+1)st smallest key in the symbol table.
     * @param {?Key} k
     */
    select(k) {}

    /**
     * Removes the smallest key and associated value from the symbol table.
     */
    deleteMin() {}

    /**
     * Removes the largest key and associated value from the symbol table.
     */
    deleteMax() {}

    /**
     * Returns the number of key-value pairs in this symbol table.
     * If lo and hi are specified, returns the number of keys in the symbol table in the given range(inclusive).
     * @param {Key} [lo]
     * @param {Key} [hi]
     * @returns {number}
     */
    size(lo, hi) {}

    /**
     * Returns all keys in the symbol table in ascending order, as an Iterable.
     * If lo and hi are specified, returns keys in the symbol table in the given range(inclusive).
     * @returns {Iterable}
     */
    keys(lo, hi) {}
}