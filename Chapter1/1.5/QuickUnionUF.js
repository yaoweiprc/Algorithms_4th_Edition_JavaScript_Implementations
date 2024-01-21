const UF = require('./UF');

class QuickUnionUF extends UF {
    union(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) return;
        this.id[pRoot] = qRoot;
        this.componentCount--;
    }
    find(p) {
        while (this.id[p] !== p) {
            p = this.id[p];
        }
        return p;
    }
    static async test() {
        const uf = await super.test();
        console.log(uf.id);
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