const OrderedSymbolTable = require('../3.1/OrderedSymbolTable');

class Node {
    constructor(key, val, size) {
        this.key = key;
        this.val = val;
        this.size = size;
        this.left = null;
        this.right = null;
    }
}

class BST extends OrderedSymbolTable {
    #root = null;

    size(lo, hi) {
        if (lo !== undefined && hi !== undefined) {
            if (this._compare(lo, hi) > 0) return 0;
            if (this.contains(hi)) return this.rank(hi) - this.rank(lo) + 1;
            else return this.rank(hi) - this.rank(lo);
        } else {
            return this.#size(this.#root);
        }
    }

    #size(node) {
        if (node === null) return 0;
        return node.size;
    }

    get(key) {
        return this.#get(this.#root, key);
    }

    #get(node, key) {
        if (node === null) return null;
        const cmp = this._compare(key, node.key);
        if (cmp < 0) return this.#get(node.left, key);
        else if (cmp > 0) return this.#get(node.right, key);
        else return node.val;
    }

    put(key, val) {
        if (val === null) {
            this.delete(key);
            return;
        }
        this.#root = this.#put(this.#root, key, val);
    }

    #put(node, key, val) {
        if (node === null) return new Node(key, val, 1);
        const cmp = this._compare(key, node.key);
        if (cmp < 0) node.left = this.#put(node.left, key, val);
        else if (cmp > 0) node.right = this.#put(node.right, key, val);
        else node.val = val;
        node.size = this.#size(node.left) + this.#size(node.right) + 1;
        return node;
    }

    min() {
        if (this.isEmpty()) throw new Error('calls min() with empty symbol table');
        return this.#min(this.#root).key;
    }

    /**
     * @param {!Node} node
     * @returns {Node}
     */
    #min(node) {
        if (node.left === null) return node;
        return this.#min(node.left);
    }

    max() {
        if (this.isEmpty()) throw new Error('calls max() with empty symbol table');
        return this.#max(this.#root).key;
    }

    /**
     * @param {!Node} node
     * @returns {Node}
     */
    #max(node) {
        if (node.right === null) return node;
        return this.#max(node.right);
    }

    floor(key) {
        if (this.isEmpty()) throw new Error('calls floor() with empty symbol table');
        const floorNode = this.#floor(this.#root, key);
        if (floorNode === null) throw new Error('argument to floor() is too small');
        return floorNode.key;
    }

    /**
     * @param {?Node} node
     * @param {Key} key
     * @returns {?Node}
     */
    #floor(node, key) {
        if (node === null) return null;
        const cmp = this._compare(key, node.key);
        if (cmp === 0) return node;
        if (cmp < 0) return this.#floor(node.left, key);
        const tmpNode = this.#floor(node.right, key);
        if (tmpNode !== null) return tmpNode;
        return node;
    }

    ceiling(key) {
        if (this.isEmpty()) throw new Error('calls ceiling() with empty symbol table');
        const ceilingNode = this.#ceiling(this.#root, key);
        if (ceilingNode === null) throw new Error('argument to ceiling() is too large');
        return ceilingNode.key;
    }

    /**
     * @param {?Node} node
     * @param {Key} key
     * @returns {?Node}
     */
    #ceiling(node, key) {
        if (node === null) return null;
        const cmp = this._compare(key, node.key);
        if (cmp === 0) return node;
        if (cmp > 0) return this.#ceiling(node.right, key);
        const tmpNode = this.#ceiling(node.left, key);
        if (tmpNode !== null) return tmpNode;
        return node;
    }

    select(rank) {
        if (rank < 0 || rank >= this.size()) {
            throw new Error('argument to select() is invalid: ' + rank);
        }
        return this.#select(this.#root, rank).key;
    }

    /**
     * @param {?Node} node
     * @param {number} rank
     * @returns {?Node}
     */
    #select(node, rank) {
        if (node === null) return null;
        const leftSize = this.#size(node.left);
        if (leftSize > rank) return this.#select(node.left, rank);
        if (leftSize < rank) return this.#select(node.right, rank - leftSize - 1);
        return node;
    }

    rank(key) {
        return this.#rank(key, this.#root);
    }

    /**
     * @param {Key} key
     * @param {?Node} node
     * @returns {number}
     */
    #rank(key, node) {
        if (node === null) return 0;
        const cmp = this._compare(key, node.key);
        if (cmp < 0) return this.#rank(key, node.left);
        if (cmp > 0) return this.#rank(key, node.right) + this.#size(node.left) + 1;
        return this.#size(node.left);
    }

    deleteMin() {
        if (this.isEmpty()) throw new Error('Symbol table underflow');
        this.#root = this.#deleteMin(this.#root);
    }

    /**
     * @param {!Node} node
     * @returns {?Node}
     */
    #deleteMin(node) {
        if (node.left === null) return node.right;
        node.left = this.#deleteMin(node.left);
        node.size = this.#size(node.left) + this.#size(node.right) + 1;
        return node;
    }

    deleteMax() {
        if (this.isEmpty()) throw new Error('Symbol table underflow');
        this.#root = this.#deleteMax(this.#root);
    }

    /**
     * @param {!Node} node
     * @returns {?Node}
     */
    #deleteMax(node) {
        if (node.right === null) return node.left;
        node.right = this.#deleteMax(node.right);
        node.size = this.#size(node.left) + this.#size(node.right) + 1;
        return node;
    }

    delete(key) {
        this.#root = this.#delete(this.#root, key);
    }

    /**
     * @param {?Node} node
     * @param {Key} key
     * @returns {?Node}
     */
    #delete(node, key) {
        if (node === null) return null;
        const cmp = this._compare(key, node.key);
        if (cmp < 0) node.left = this.#delete(node.left, key);
        else if (cmp > 0) node.right = this.#delete(node.right, key);
        else {
            if (node.right === null) return node.left;
            if (node.left === null) return node.right;
            const tmpNode = node;
            node = this.#min(node.right);
            node.right = this.#deleteMin(tmpNode.right);
            node.left = tmpNode.left;
        }
        node.size = this.#size(node.left) + this.#size(node.right) + 1;
        return node;
    }

    keys(lo, hi) {
        if (lo !== undefined && hi !== undefined) {
            let arr = [];
            this.#keys(this.#root, arr, lo, hi);
            return arr;
        } else {
            if (this.isEmpty()) return [];
            return this.keys(this.min(), this.max());
        }
    }

    /**
     * @param {?Node} node
     * @param {Array} arr
     * @param {Key} lo
     * @param {Key} hi
     */
    #keys(node, arr, lo, hi) {
        if (node === null) return;
        const cmpLo = this._compare(lo, node.key);
        const cmpHi = this._compare(hi, node.key);
        if (cmpLo < 0) this.#keys(node.left, arr, lo, hi);
        if (cmpLo <= 0 && cmpHi >= 0) arr.push(node.key);
        if (cmpHi > 0) this.#keys(node.right, arr, lo, hi);
    }
}

// BST.test();

module.exports = BST;