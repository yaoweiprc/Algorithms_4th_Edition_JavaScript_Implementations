const UF = require('./UF');

class QuickFindUF extends UF {
    union(p, q) {
        const pID = this.id[p];
        const qID = this.id[q];
        if (pID === qID) return;
        for (let i = 0; i < this.id.length; i++) {
            if (this.id[i] === pID) {
                this.id[i] = qID;
            }
        }
        this.componentCount--;
    }
    find(p) {
        return this.id[p];
    }
}

// should print 2 components
// QuickFindUF.test();

module.exports = QuickFindUF;