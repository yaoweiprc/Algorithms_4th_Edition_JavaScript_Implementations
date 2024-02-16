const Graph = require('./Graph');
const Stack = require('../../Chapter1/1.3/LinkedListStack');

class DepthFirstPaths {
    #marked;
    #edgeTo;
    #s;

    /**
     * @param {Graph} G
     * @param {number} s - source vertex index
     */
    constructor(G, s) {
        this.#s = s;
        this.#marked = new Array(G.V()).fill(false);
        this.#edgeTo = new Array(G.V());
        this.dfs(G, s);
    }
    dfs(G, v) {
        this.#marked[v] = true;
        for (let w of G.adj(v)) {
            if (!this.#marked[w]) {
                this.#edgeTo[w] = v;
                this.dfs(G, w);
            }
        }
    }

    /**
     * @param {number} v
     * @returns {boolean}
     */
    hasPathTo(v) {
        return this.#marked[v];
    }

    pathTo(v) {
        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        for (let currVertexIdx = v; currVertexIdx !== this.#s; currVertexIdx = this.#edgeTo[currVertexIdx]) {
            path.push(currVertexIdx);
        }
        path.push(this.#s);
        return path;
    }

    static test(s) {
        const g = new Graph('./tinyCG.txt');
        const dfs = new this(g, s);
        for (let v = 0; v < g.V(); v++) {
            if (dfs.hasPathTo(v)) {
                process.stdout.write(`${s} to ${v}: `);
                const path = dfs.pathTo(v);
                for (let x of path) {
                    if (x === s) process.stdout.write(x.toString());
                    else process.stdout.write(`-${x}`);
                }
                process.stdout.write('\n');
            } else {
                console.log(`${s} to ${v}: not connected`);
            }
        }
    }
}

// DepthFirstPaths.test(0);

module.exports = DepthFirstPaths;