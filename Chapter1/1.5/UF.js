const fs = require('node:fs');
class UF {
    constructor(n) {
        this._componentCount = n;
        this._id = new Array(n);
        for (let i = 0; i < n; i++) {
            this._id[i] = i;
        }
    }
    count() {
        return this._componentCount;
    }
    connected(p, q) {
        return this.find(p) === this.find(q);
    }
    union() {}
    find() {}
    static test() {
        const content = fs.readFileSync('./tinyUF.txt', 'utf8');
        const lines = content.split('\n');
        const uf = new this(parseInt(lines[0]));
        for (let i = 1; i < lines.length; i++) {
            let [p, q] = lines[i].split(' ');
            p = parseInt(p);
            q = parseInt(q);
            uf.union(p, q);
        }
        console.log(uf.count(), 'components');
        return uf;
    }
}

module.exports = UF;