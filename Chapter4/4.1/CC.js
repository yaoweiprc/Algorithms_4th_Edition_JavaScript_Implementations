const Graph = require('./Graph');

class CC {
    #marked;
    #count = 0;
    #id;

    /**
     * @param {Graph} G
     */
    constructor(G) {
        this.#marked = (new Array(G.V())).fill(false);
        this.#id = new Array(G.V());
        for (let v = 0; v < G.V(); v++) {
            if (!this.#marked[v]) {
                this.dfs(G, v);
                this.#count++;
            }

        }
    }
    dfs(G, v) {
        this.#marked[v] = true;
        this.#id[v] = this.#count;
        for (let w of G.adj(v)) {
            if (!this.#marked[w])
                this.dfs(G, w);
        }
    }

    count() {
        return this.#count;
    }

    id(v) {
        return this.#id[v];
    }

    connected(v, w) {
        return this.id(v) === this.id(w);
    }

    static test() {
        const g = new Graph('./tinyG.txt');
        const cc = new this(g);
        const m = cc.count();
        console.log(m, 'components');
        const components = new Array(m);
        for (let i = 0; i < m; i++) {
            components[i] = [];
        }
        for (let v = 0; v < g.V(); v++) {
            components[cc.id(v)].push(v);
        }
        for (let i = 0; i < m; i++) {
            for (let v of components[i])
                process.stdout.write(`${v} `);
            process.stdout.write('\n');
        }
    }
}

CC.test();