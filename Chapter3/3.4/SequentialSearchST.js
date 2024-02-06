const SymbolTable = require('../3.1/SymbolTable');

class Node {
    key;
    val;
    next;
    /**
     * @param {Key} key
     * @param {Value} val
     * @param {Node} next
     */
    constructor(key,val, next) {
        this.key = key;
        this.val = val;
        this.next = next;
    }
}

class SequentialSearchST extends SymbolTable {
    // number of key-value pairs
    #n;
    // the linked list of key-value pairs
    #first = null;
    size() {
        return this.#n;
    }
    get(key) {
        for (let node = this.#first; node !== null; node = node.next) {
            if (node.key === key) return node.val;
        }
        return null;
    }

    put(key, val) {
        if (val === null) {
            this.delete(key);
            return;
        }
        for (let node = this.#first; node !== null; node = node.next) {
            if (node.key === key) {
                node.val = val;
                return;
            }
        }
        this.#first = new Node(key, val, this.#first);
        this.#n++;
    }

    delete(key) {
        this.#first = this.#delete(this.#first, key);
    }

    // delete key in linked list beginning at node, return the linked list after delete
    #delete(node, key) {
        if (node === null) return null;
        if (key === node.key) {
            this.#n--;
            return node.next;
        }
        node.next = this.#delete(node.next, key);
        return node;
    }

    keys() {
        const resArr = [];
        for (let node = this.#first; node !== null; node = node.next) {
            resArr.push(node.key);
        }
        return resArr;
    }
}

// should print:
// L 11
// P 10
// M 9
// X 7
// H 5
// C 4
// R 3
// A 8
// E 12
// S 0
// SequentialSearchST.test();

module.exports = SequentialSearchST;