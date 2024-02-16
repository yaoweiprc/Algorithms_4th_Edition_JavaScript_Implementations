const Graph = require('./Graph');

class Cycle {
    #marked;
    #hasCycle = false;

    /**
     * @param {Graph} g
     */
    constructor(g) {
        this.#marked = (new Array(g.V())).fill(false);
        for (let s = 0; s < g.V(); s++) {
            if (!this.#marked[s])
                this.dfs(g, s, s);
        }
    }

    /**
     * @param {Graph} g
     * @param {number} v
     * @param {number} u - pre-vertex of v on dfs path
     */
    dfs(g, v, u) {
        this.#marked[v] = true;
        for (let w of g.adj(v)) {
            if (!this.#marked[w])
                this.dfs(g, w, v);
            else if (w !== u)
                this.#hasCycle = true;
        }
    }

    hasCycle() {
        return this.#hasCycle;
    }

    static test() {
        const g = new Graph('./tinyG.txt');
        const cycle = new this(g);
        console.log(`Graph has${cycle.hasCycle() ? '' : ' no'} cycle`);
    }
}

Cycle.test();