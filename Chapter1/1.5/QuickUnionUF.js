const UF = require('./UF');

class QuickUnionUF extends UF {
    union(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) return;
        this._id[pRoot] = qRoot;
        this._componentCount--;
    }
    find(p) {
        while (this._id[p] !== p) {
            p = this._id[p];
        }
        return p;
    }
    static test() {
        const uf = super.test();
        console.log(uf._id);
        return uf;
    }
}
/**
 * should print:
 * 2 components
 * [1, 1, 1, 8, 3, 0, 5, 1, 8, 8]
 */
// QuickUnionUF.test();

module.exports = QuickUnionUF;