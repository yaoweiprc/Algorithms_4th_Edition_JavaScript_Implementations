const QuickUnionUF = require('./QuickUnionUF');

class WeightedQuickUnionUF extends QuickUnionUF {
    #sz;
    constructor(n) {
        super(n);
        this.#sz = new Array(n);
        this.#sz.fill(1);
    }
    union(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) return;
        if (this.#sz[pRoot] <= this.#sz[qRoot]) {
            this._id[pRoot] = qRoot;
            this.#sz[qRoot] = this.#sz[pRoot] + this.#sz[qRoot];
        } else {
            this._id[qRoot] = pRoot;
            this.#sz[pRoot] = this.#sz[qRoot] + this.#sz[pRoot];
        }
        this._componentCount--;
    }
    static test() {
        const uf = super.test();
        console.log(uf.#sz);
    }
}

/**
 * should print:
 * 2 components
 * [5, 1, 1, 3, 3, 1, 5, 1, 3, 3]
 * [1, 6, 1, 4, 1, 3, 1, 1, 1, 1]
 */
// WeightedQuickUnionUF.test();

module.exports = WeightedQuickUnionUF;