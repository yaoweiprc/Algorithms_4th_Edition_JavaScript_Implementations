const Graph = require('./Graph');

class DepthFirstSearch {
    #marked;
    #count = 0;

    /**
     * @param {Graph} G
     * @param {number} s - source vertex index
     */
    constructor(G, s) {
        this.#marked = new Array(G.V()).fill(false);
        this.dfs(G, s);
    }
    dfs(G, v) {
        this.#marked[v] = true;
        this.#count++;
        for (let w of G.adj(v)) {
            if (!this.#marked[w])
                this.dfs(G, w);
        }
    }

    /**
     * @param {number} v
     * @returns {boolean}
     */
    marked(v) {
        return this.#marked[v];
    }

    /**
     * @returns {number}
     */
    count() {
        return this.#count;
    }

    static test(s) {
        const g = new Graph('./tinyCG.txt');
        const search = new this(g, s);
        for (let v = 0; v < g.V(); v++) {
            if (search.marked(v))
                process.stdout.write(`${v} `);
        }
        process.stdout.write('\n');
        if (search.count() !== g.V())
            console.log('NOT connected');
        else
            console.log('connected')
    }
}

// DepthFirstSearch.test(0);

module.exports = DepthFirstSearch;