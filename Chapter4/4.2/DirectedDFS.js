const Digraph = require('./Digraph');

class DirectedDFS {
    #marked = [];
    /**
     *
     * @param {Digraph} graph
     * @param {Array|number} sources
     */
    constructor(graph, sources) {
        for (let i = 0; i < graph.V; i++) {
            this.#marked.push(false);
        }
        if (typeof sources === 'number') {
            this.#dfs(graph, sources);
        } else if (Array.isArray(sources)) {
            for (let v of sources) {
                if (!this.#marked[v]) {
                    this.#dfs(graph, v);
                }
            }
        }
    }
    #dfs(graph, v) {
        this.#marked[v] = true;
        for (let w of graph.adj(v)) {
            if (!this.#marked[w]) {
                this.#dfs(graph, w);
            }
        }
    }

    /**
     * Is vertex V reachable from sources
     * @param {number} v
     * @return {boolean}
     */
    marked(v) {
        return this.#marked[v];
    }
}

module.exports = DirectedDFS;