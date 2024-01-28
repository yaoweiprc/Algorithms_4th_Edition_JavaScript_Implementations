const Comparable = require("./Comparable");

class StrComparable extends Comparable {
    constructor(str) {
        super();
        this.val = str;
    }

    /**
     * @param {StrComparable} w
     * @return {number}
     */
    compareTo(w) {
        return this.val.localeCompare(w.val);
    }
    toString() {
        return this.val;
    }
}

module.exports = StrComparable;