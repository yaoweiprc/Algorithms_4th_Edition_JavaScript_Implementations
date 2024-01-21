const fsPromises = require('node:fs/promises');
class UF {
    constructor(n) {
        this.componentCount = n;
        this.id = new Array(n);
        for (let i = 0; i < n; i++) {
            this.id[i] = i;
        }
    }
    count() {
        return this.componentCount;
    }
    connected(p, q) {
        return this.find(p) === this.find(q);
    }
    union() {}
    find() {}
    static async test() {
        const fileHandle = await fsPromises.open(`tinyUF.txt`);
        const content = await fileHandle.readFile('utf8');
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