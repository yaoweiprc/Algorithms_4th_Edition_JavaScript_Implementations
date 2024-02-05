const BST = require('../3.2/BST');
const Node = require('../3.2/Node');

class ColoredNode extends Node {
    color;
    /**
     * @param {Key} key
     * @param {Value} val
     * @param {boolean} color
     * @param {number} size
     */
    constructor(key, val, color, size) {
        super(key, val, size);
        this.color = color;
    }
}

class RedBlackBST extends BST {
    static #RED = true;
    static #BLACK = false;
    #isRed(node) {
        if (node === null) return false;
        return node.color === RedBlackBST.#RED;
    }

    put(key, val) {
        super.put(key, val);
        this._root.color = RedBlackBST.#BLACK;
    }

    _put(node, key, val) {
        if (node === null) return new ColoredNode(key, val, RedBlackBST.#RED, 1);
        const cmp = this._compare(key, node.key);
        if (cmp < 0) node.left = this._put(node.left, key, val);
        else if (cmp > 0) node.right = this._put(node.right, key, val);
        else node.val = val;
        return this.#balance(node);
    }

    // Red-black tree deletion.

    deleteMin() {
        if (this.isEmpty()) throw new Error('Symbol table underflow');
        // if both children of root are black, set root to red
        if (!this.#isRed(this._root.left) && !this.#isRed(this._root.right))
            this._root.color = RedBlackBST.#RED;
        this._root = this.#deleteMin(this._root);
        if (!this.isEmpty()) this._root.color = RedBlackBST.#BLACK;
    }

    #deleteMin(node) {
        if (node.left === null) return null;
        if (!this.#isRed(node.left) && !this.#isRed(node.left.left))
            node = this.#moveRedLeft(node);
        node.left = this.#deleteMin(node.left);
        return this.#balance(node);
    }

    deleteMax() {
        if (this.isEmpty()) throw new Error('Symbol table underflow');
        // if both children of root are black, set root to red
        if (!this.#isRed(this._root.left) && !this.#isRed(this._root.right))
            this._root.color = RedBlackBST.#RED;
        this._root = this.#deleteMax(this._root);
        if (!this.isEmpty()) this._root.color = RedBlackBST.#BLACK;
    }

    #deleteMax(node) {
        if (this.#isRed(node.left)) node = this.#rotateRight(node);
        if (node.right === null) return null;
        if (!this.#isRed(node.right) && !this.#isRed(node.right.left))
            node = this.#moveRedRight(node);
        node.right = this.#deleteMax(node.right);
        return this.#balance(node);
    }

    delete(key) {
        if (!this.contains(key)) return;
        // if both children of root are black, set root to red
        if (!this.#isRed(this._root.left) && !this.#isRed(this._root.right))
            this._root.color = RedBlackBST.#RED;
        this._root = this.#delete(this._root, key);
        if (!this.isEmpty()) this._root.color = RedBlackBST.#BLACK;
    }

    #delete(node, key) {
        if (this._compare(key, node.key) < 0) {
            if (!this.#isRed(node.left) && !this.#isRed(node.left.left))
                node = this.#moveRedLeft(node);
            node.left = this.#delete(node.left, key);
        } else {
            if (this.#isRed(node.left))
                node = this.#rotateRight(node);
            if (this._compare(key, node.key) === 0 && node.right === null)
                return null;
            if (!this.#isRed(node.right) && !this.#isRed(node.right.left))
                node = this.#moveRedRight(node);
            if (this._compare(key, node.key) === 0) {
                const minNode = this._min(node.right);
                node.key = minNode.key;
                node.val = minNode.val;
                node.right = this.#deleteMin(node.right);
            } else {
                node.right = this.#delete(node.right, key);
            }
        }
        return this.#balance(node);
    }

    // Red-black tree helper functions.

    /**
     * @param {!ColoredNode} node
     * @returns {!ColoredNode}
     */
    #rotateLeft(node) {
        console.assert(node !== null && this.#isRed(node.right));
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        newRoot.color = node.color;
        node.color = RedBlackBST.#RED;
        newRoot.size = node.size;
        node.size = this._size(node.left) + this._size(node.right) + 1;
        return newRoot;
    }

    /**
     * @param {ColoredNode} node
     * @returns {ColoredNode}
     */
    #rotateRight(node) {
        console.assert(node !== null && this.#isRed(node.left));
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        newRoot.color = node.color;
        node.color = RedBlackBST.#RED;
        newRoot.size = node.size;
        node.size = this._size(node.left) + this._size(node.right) + 1;
        return newRoot;
    }

    /**
     * @param {ColoredNode} node
     */
    #flipColors(node) {
        node.color = !node.color;
        node.left.color = !node.left.color;
        node.right.color = !node.right.color;
    }

    /**
     * Assuming that h is red and both h.left and h.left.left
     * are black, make h.left or one of its children red.
     * @param {!ColoredNode} node
     * @returns {ColoredNode}
     */
    #moveRedLeft(node) {
        this.#flipColors(node);
        if (this.#isRed(node.right.left)) {
            node.right = this.#rotateRight(node.right);
            node = this.#rotateLeft(node);
            this.#flipColors(node);
        }
        return node;
    }

    /**
     * Assuming that h is red and both h.right and h.right.left
     * are black, make h.right or one of its children red.
     * @param {!ColoredNode} node
     * @returns {ColoredNode}
     */
    #moveRedRight(node) {
        this.#flipColors(node);
        if (this.#isRed(node.left.left)) {
            node = this.#rotateRight(node);
            this.#flipColors(node);
        }
        return node;
    }

    /**
     * restore red-black tree invariant
     * @param {!ColoredNode} node
     * @returns {ColoredNode}
     */
    #balance(node) {
        if (this.#isRed(node.right) && !this.#isRed(node.left)) node = this.#rotateLeft(node);
        if (this.#isRed(node.left) && this.#isRed(node.left.left)) node = this.#rotateRight(node);
        if (this.#isRed(node.left) && this.#isRed(node.right)) this.#flipColors(node);
        node.size = this._size(node.left) + this._size(node.right) + 1;
        return node;
    }
}

// RedBlackBST.test();

module.exports = RedBlackBST;