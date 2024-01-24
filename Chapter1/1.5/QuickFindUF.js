const UF = require('./UF');

class QuickFindUF extends UF {
    union(p, q) {
        const pID = this._id[p];
        const qID = this._id[q];
        if (pID === qID) return;
        for (let i = 0; i < this._id.length; i++) {
            if (this._id[i] === pID) {
                this._id[i] = qID;
            }
        }
        this._componentCount--;
    }
    find(p) {
        return this._id[p];
    }
}

// should print 2 components
// QuickFindUF.test();

module.exports = QuickFindUF;