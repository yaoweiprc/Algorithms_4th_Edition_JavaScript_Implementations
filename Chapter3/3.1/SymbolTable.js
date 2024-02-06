/**
 * key type in symbol table
 * @typedef {!*} Key
 */

/**
 * value type in symbol table
 * @typedef {*} Value
 */

/**
 * Interface for Symbol Table
 * @interface
 */
class SymbolTable {
    /**
     * Inserts the specified key-value pair into the symbol table, overwriting the old
     * value with the new value if the symbol table already contains the specified key.
     * Deletes the specified key (and its associated value) from this symbol table
     * if the specified value is null.
     * @param {Key} key
     * @param {Value} val
     */
    put(key, val) {}

    /**
     * Returns the value associated with the given key.
     * @param {Key} key
     * @returns {Value} the value associated with the given key if the key is in the symbol table and null if the key is not in the symbol table
     */
    get(key) {}

    /**
     * Removes the specified key and its associated value from this symbol table
     * (if the key is in this symbol table).
     * @param {Key} key
     */
    delete(key) {
        this.put(key, null);
    }

    /**
     * Does this symbol table contain the given key?
     * @param {Key} key
     * @returns {boolean}
     */
    contains(key) {
        return this.get(key) !== null;
    }

    /**
     * Returns true if this symbol table is empty.
     * @returns {boolean}
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * Returns the number of key-value pairs in this symbol table.
     * @returns {number}
     */
    size() {}

    /**
     * Returns all keys in the symbol table in ascending order, as an Iterable.
     * To iterate over all of the keys in the symbol table named st,
     * use the for-of notation: for (let key of st.keys()) {}
     * @returns {Iterable}
     */
    keys() {}

    static test() {
        const st = new this((a, b) => a.localeCompare(b));
        const testKeys = 'S E A R C H E X A M P L E'.split(' ');
        for (let [val, key] of testKeys.entries()) {
            st.put(key, val);
        }
        for (let key of st.keys()) {
            console.log(key, st.get(key));
        }
    }
}

module.exports = SymbolTable;