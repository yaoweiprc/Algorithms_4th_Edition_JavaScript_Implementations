class Digraph {
    // number of vertices
    #V = 0;
    // number of edges
    #E = 0;
    // adj[v] = vertices connected to v by edges pointing from v
    #adj = [];

    /**
     * @param {number} V
     */
    constructor(V) {
        this.#V = V;
        for (let i = 0; i < V; i++) {
            this.#adj.push([]);
        }
    }
    get V() {
        return this.#V;
    }
    get E() {
        return this.#E;
    }

    /**
     * Adds the directed edge v→w to this digraph.
     * @param {number} v
     * @param {number} w
     */
    addEdge(v, w) {
        this.#adj[v].push(w);
        this.#E++;
    }

    /**
     * Returns the vertices adjacent from vertex v in this digraph.
     * @param v
     */
    adj(v) {
        return this.#adj[v];
    }

    /**
     * Returns the reverse of the digraph.
     * @returns {Digraph}
     */
    reverse() {
        const r = new Digraph(this.V);
        for (let i = 0; i < this.V; i++) {
            for (let v of this.adj(i)) {
                r.addEdge(v, i);
            }
        }
        return r;
    }
}

module.exports = Digraph;