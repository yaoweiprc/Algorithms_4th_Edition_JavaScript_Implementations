const Bag = require('../../Chapter1/1.3/LinkedListBag');
const fs = require("node:fs");

class Graph {
    #V = 0;
    #E = 0;
    #adj = [];

    /**
     * @param {number|string} arg0 vertices number or graph file content string
     */
    constructor(arg0) {
        if (typeof arg0 === 'number') {
            const V = arg0;
            this.#initByVerticesNum(V);
        } else if (typeof arg0 === 'string') {
            const content = fs.readFileSync(arg0, 'utf8');
            const lines = content.split('\n');
            const V = parseInt(lines.shift(), 10);
            this.#initByVerticesNum(V);
            const E = parseInt(lines.shift(), 10);
            for (let i = 0; i < E; i++) {
                this.addEdge(...(
                    lines.shift().split(' ').map(val => parseInt(val, 10))
                ));
            }
        }
    }
    #initByVerticesNum(V) {
        this.#V = V;
        for (let i = 0; i < V; i++) {
            this.#adj[i] = new Bag();
        }
    }
    V() {
        return this.#V;
    }
    E() {
        return this.#E;
    }

    /**
     * @param {number} v
     * @param {number} w
     */
    addEdge(v, w) {
        this.#validateVertex(v);
        this.#validateVertex(w);
        this.#adj[v].add(w);
        this.#adj[w].add(v);
        this.#E++;
    }

    /**
     * Returns the vertices adjacent to vertex v.
     * @param {number} v
     * @returns {Bag}
     */
    adj(v) {
        return this.#adj[v];
    }

    /**
     * Returns the degree of vertex v.
     * @param {number} v
     * @returns {number}
     */
    degree(v) {
        this.#validateVertex(v);
        return this.#adj[v].size();
    }

    toString() {
        const resArr = [];
        resArr.push(this.#V, ' vertices, ', this.#E, ' edges \n');
        for (let v = 0; v < this.#V; v++) {
            resArr.push(v, ': ');
            for (let w of this.#adj[v]) {
                resArr.push(w, ' ');
            }
            resArr.push('\n');
        }
        return resArr.join('');
    }

    #validateVertex(v) {
        if (v < 0 || v >= this.#V)
            throw new Error(`vertex ${v} is not between 0 and ${this.#V - 1}`);
    }

    static test() {
        const G = new this('./tinyG.txt');
        console.log(G.toString());
    }
}

// Graph.test();

module.exports = Graph;