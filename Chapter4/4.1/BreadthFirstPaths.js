const Graph = require('./Graph');
const Stack = require('../../Chapter1/1.3/LinkedListStack');
const Queue = require('../../Chapter1/1.3/LinkedListQueue');

class BreadthFirstPaths {
    #marked;
    #edgeTo;
    #distTo;
    #s;

    /**
     * @param {Graph} G
     * @param {number} s - source vertex index
     */
    constructor(G, s) {
        this.#s = s;
        this.#marked = new Array(G.V()).fill(false);
        this.#edgeTo = new Array(G.V());
        this.#distTo = new Array(G.V()).fill(Number.POSITIVE_INFINITY);
        this.bfs(G, s);
    }

    bfs(G, s) {
        this.#marked[s] = true;
        this.#distTo[s] = 0;
        const queue = new Queue();
        queue.enqueue(s);
        while (!queue.isEmpty()) {
            const v = queue.dequeue();
            for (let w of G.adj(v)) {
                if (!this.#marked[w]) {
                    this.#marked[w] = true;
                    this.#edgeTo[w] = v;
                    this.#distTo[w] = this.#distTo[v] + 1;
                    queue.enqueue(w);
                }
            }
        }
    }

    /**
     * @param {number} v
     * @returns {number|undefined}
     */
    distTo(v) {
        return this.#distTo[v];
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
        const bfs = new this(g, s);
        for (let v = 0; v < g.V(); v++) {
            if (bfs.hasPathTo(v)) {
                process.stdout.write(`${s} to ${v} (${bfs.distTo(v)}): `);
                const path = bfs.pathTo(v);
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

// BreadthFirstPaths.test(0);

module.exports = BreadthFirstPaths;