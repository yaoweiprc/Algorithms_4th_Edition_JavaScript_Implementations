class Node {
    key;
    val;
    size;
    left;
    right;
    /**
     * @param {Key} key
     * @param {Value} val
     * @param {number} size
     */
    constructor(key, val, size) {
        this.key = key;
        this.val = val;
        this.size = size;
        this.left = null;
        this.right = null;
    }
}

module.exports = Node;