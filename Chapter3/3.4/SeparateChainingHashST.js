const SequentialSearchST = require('./SequentialSearchST');
const SymbolTable = require('../3.1/SymbolTable');
const {defaultHashCodeFunction, isPowerOf2} = require('./hashHelper');

class SeparateChainingHashST extends SymbolTable {
    static #INIT_CAPACITY = 4;

    // number of key-value pairs
    #n = 0;

    // hash table size
    #m = SeparateChainingHashST.#INIT_CAPACITY;

    // array of linked-list symbol tables
    #stArr;

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
        this.#stArr = new Array(this.#m);
        for (let i = 0; i < this.#m; i++) {
            this.#stArr[i] = new SequentialSearchST();
        }
    }

    // resize the hash table to have the given number of chains, rehashing all the keys
    #resize(chainNum) {
        const tempST = new this.constructor(chainNum, this.#hashCodeFunc);
        for (let st of this.#stArr) {
            for (let key of st.keys()) {
                tempST.put(key, st.get(key));
            }
        }
        this.#n = tempST.#n;
        this.#m = tempST.#m;
        this.#stArr = tempST.#stArr;
    }

    // hash function for keys - returns value between 0 and m-1
    #hash(key) {
        return (this.#hashCodeFunc(key) & 0x7fffffff) % this.#m;
    }

    size() {
        return this.#n;
    }

    put(key, val) {
        if (val === null) {
            this.delete(key);
            return;
        }
        // double table size if average length of list >= 8
        if (this.#n >= 8 * this.#m) this.#resize(this.#m * 2);
        let hash = this.#hash(key);
        if (!this.#stArr[hash].contains(key)) this.#n++;
        this.#stArr[hash].put(key, val);
    }

    get(key) {
        let hash = this.#hash(key);
        return this.#stArr[hash].get(key);
    }

    delete(key) {
        let hash = this.#hash(key);
        if (this.#stArr[hash].contains(key)) this.#n--;
        this.#stArr[hash].delete(key);
        // halve table size if average length of list <= 2
        if (this.#m > SeparateChainingHashST.#INIT_CAPACITY && this.#n <= this.#m * 2)
            this.#resize(this.#m / 2);
    }

    keys() {
        let resArr = [];
        for (let st of this.#stArr) {
            for (let key of st.keys()) {
                resArr.push(key);
            }
        }
        return resArr;
    }
}

// should print:
// L 11
// P 10
// X 7
// H 5
// C 4
// S 0
// R 3
// M 9
// A 8
// E 12
// SeparateChainingHashST.test();

module.exports = SeparateChainingHashST;