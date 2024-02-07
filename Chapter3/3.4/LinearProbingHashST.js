const SymbolTable = require('../3.1/SymbolTable');
const {defaultHashCodeFunction, isPowerOf2} = require('./hashHelper');

class LinearProbingHashST extends SymbolTable {
    static #INIT_CAPACITY = 4;

    // number of key-value pairs
    #n = 0;

    // probing table size
    #m = this.constructor.#INIT_CAPACITY;

    #keys;
    #vals;

    /**
     * Return a 32-bit integer hashCode of key, like hashCode function in JAVA.
     * Should be defined by user for each key type, this is a default implementation.
     * @param {Key} key
     * @returns {number} 32-bit integer hashCode of key
     */
    #hashCodeFunc = defaultHashCodeFunction;

    /**
     * Initializes an empty symbol table with m chains.
     * @param {number} [m] - the initial number of chains
     * @param {function} [hashCodeFunc] - hashCode function for the symbol table key type
     */
    constructor(m, hashCodeFunc) {
        super();
        if (typeof m === 'number') {
            if (!isPowerOf2(m)) throw new Error('Capacity number must be power of 2!');
            this.#m = m;
        }
        if (typeof hashCodeFunc === 'function') this.#hashCodeFunc = hashCodeFunc;
        this.#keys = new Array(this.#m);
        this.#vals = new Array(this.#m);
    }

    // hash function for keys - returns value between 0 and m-1
    #hash(key) {
        return (this.#hashCodeFunc(key) & 0x7fffffff) % this.#m;
    }

    size() {
        return this.#n;
    }

    // resize the hash table to the given capacity, rehashing all the keys
    #resize(capacity) {
        const tempST = new this.constructor(capacity, this.#hashCodeFunc);
        for (let i = 0; i < this.#m; i++) {
            if (this.#keys[i] !== undefined) tempST.put(this.#keys[i], this.#vals[i]);
        }
        this.#keys = tempST.#keys;
        this.#vals = tempST.#vals;
        this.#m = tempST.#m;
    }

    put(key, val) {
        if (val === null) {
            this.delete(key);
            return;
        }
        // double table size if 50% full
        if (this.#n >= this.#m / 2) this.#resize(this.#m * 2);
        let i;
        for (i = this.#hash(key); this.#keys[i] !== undefined; i = (i + 1) % this.#m) {
            if (this.#keys[i] === key) {
                this.#vals[i] = val;
                return;
            }
        }
        this.#keys[i] = key;
        this.#vals[i] = val;
        this.#n++;
    }

    get(key) {
        for (let i = this.#hash(key); this.#keys[i] !== undefined; i = (i + 1) % this.#m) {
            if (this.#keys[i] === key)
                return this.#vals[i];
        }
        return null;
    }

    delete(key) {
        if (!this.contains(key)) return;
        // find position i of key
        let i = this.#hash(key);
        while (this.#keys[i] !== key) {
            i = (i + 1) % this.#m;
        }
        // delete key and associated value
        this.#keys[i] = undefined;
        this.#vals[i] = undefined;
        // rehash all keys in same cluster
        i = (i + 1) % this.#m;
        while (this.#keys[i] !== undefined) {
            // delete keys[i] and vals[i] and reinsert
            const tmpKey = this.#keys[i];
            const tmpVal = this.#vals[i];
            this.#keys[i] = undefined;
            this.#vals[i] = undefined;
            this.#n--;
            this.put(tmpKey, tmpVal);
            i = (i + 1) % this.#m;
        }
        this.#n--;
        // halve size of array if it's 12.5% full or less
        if (this.#n > 0 && this.#n <= this.#m / 8) this.#resize(this.#m / 2);
    }
    keys() {
        const resArr = [];
        for (let i = 0; i < this.#m; i++) {
            if (this.#keys[i] !== undefined)
                resArr.push(this.#keys[i]);
        }
        return resArr;
    }
}

// should print:
// C 4
// A 8
// X 7
// S 0
// R 3
// P 10
// M 9
// L 11
// H 5
// E 12
// LinearProbingHashST.test();

module.exports = LinearProbingHashST;