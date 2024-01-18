class KnuthMorrisPratt {
    constructor(pattern) {
        this.#pat = pattern;
        for (let i = 0; i < pattern.length; i++) {
            this.#patCharSet.add(pattern.charAt(i));
        }
        // build dfa table
        for (let c of this.#patCharSet) {
            this.#dfa[c] = [0];
        }
        const firstChar = pattern.charAt(0);
        this.#dfa[firstChar][0] = 1;
        for (let j = 1, x = 0; j < pattern.length; j++) {
            for (let c of this.#patCharSet) {
                this.#dfa[c][j] = this.#dfa[c][x];
            }
            let nextRightChar = pattern.charAt(j);
            this.#dfa[nextRightChar][j] = j+1;
            x = this.#dfa[nextRightChar][x];
        }
    }
    // pattern
    #pat = '';
    // pattern length
    get #M() {
        return this.#pat.length;
    }
    // unique chars in pattern
    #patCharSet = new Set();
    #dfa = {};
    search(txt) {
        let i, j;
        for (i = 0, j = 0; i < txt.length && j < this.#M; i++) {
            const nextChar = txt[i];
            if (this.#patCharSet.has(nextChar)) {
                j = this.#dfa[nextChar][j];
            } else {
                j = 0;
            }
        }
        if (j === this.#M) {
            return i - this.#M;
        } else {
            return txt.length;
        }
    }
}

module.exports = KnuthMorrisPratt;