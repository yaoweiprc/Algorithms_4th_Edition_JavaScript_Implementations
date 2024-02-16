const Graph = require('./Graph');

class TwoColor {
    #marked;
    #color;
    #isTwoColorable = true;

    /**
     * @param {Graph} g
     */
    constructor(g) {
        this.#marked = (new Array(g.V())).fill(false);
        this.#color = new Array(g.V());
        for (let s = 0; s < g.V(); s++) {
            if (!this.#marked[s])
                this.dfs(g, s);
        }
    }
    dfs(g, v) {
        this.#marked[v] = true;
        for (let w of g.adj(v)) {
            if (!this.#marked[w]) {
                this.#color[w] = !this.#color[v];
                this.dfs(g, w);
            } else if (this.#color[w] === this.#color[v]) {
                this.#isTwoColorable = false;
            }
        }
    }

    isBipartite() {
        return this.#isTwoColorable;
    }

    static test() {
        const g = new Graph('./tinyG.txt');
        const twoColor = new this(g);
        if (twoColor.isBipartite()) {
            console.log('Graph is bipartite');
        } else {
            console.log('Graph has an odd-length cycle')
        }
    }
}

TwoColor.test();