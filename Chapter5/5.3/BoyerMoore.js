class BoyerMoore {
    /**
     * build right map
     * @param {string} pattern
     */
    constructor(pattern) {
        this.#pattern = pattern;
        for (let i = 0; i < pattern.length; i++) {
            const currChar = pattern.charAt(i);
            this.#rightMap[currChar] = i;
        }
    }
    #pattern = '';
    #rightMap = {};

    /**
     * length of pattern
     */
    get #M() {
        return this.#pattern.length;
    }
    /**
     * search pattern in txt
     * @param {string} txt
     */
    search(txt) {
        const N = txt.length;
        let skip;
        for (let i = 0; i <= N - this.#M; i += skip) {
            skip = 0;
            for (let j = this.#M - 1; j >= 0; j--) {
                const currCharInTxt = txt.charAt(i + j);
                const currCharInPattern = this.#pattern.charAt(j);
                if (currCharInTxt !== currCharInPattern) {
                    // case 1: currCharInTxt not in pattern
                    if (!(currCharInTxt in this.#rightMap)) {
                        skip = j + 1;
                    } else {
                        // case 2: currCharInTxt in pattern
                        skip = Math.max(1, j - this.#rightMap[currCharInTxt]);
                    }
                    break;
                }
            }
            // if all letters match
            if (skip === 0) {
                return i;
            }
        }
        return N;
    }
}

module.exports = BoyerMoore;