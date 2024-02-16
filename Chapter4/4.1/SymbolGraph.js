const Graph = require('./Graph');
const ST = require('../../Chapter3/3.4/SeparateChainingHashST');
const fs = require("node:fs");
const readline = require('node:readline');

class SymbolGraph {
    #st = new ST();
    #keys = [];
    /**
     * @type {Graph}
     */
    #G;
    constructor(filename, sp) {
        const content = fs.readFileSync(filename, 'utf8');
        const lines = content.split('\n');
        for (let line of lines) {
            const vertices = line.split(sp);
            for (let vertex of vertices) {
                if (!this.#st.contains(vertex))
                    this.#st.put(vertex, this.#st.size());
            }
        }
        this.#keys = new Array(this.#st.size());
        for (let name of this.#st.keys()) {
            this.#keys[this.#st.get(name)] = name;
        }
        this.#G = new Graph(this.#st.size());
        for (let line of lines) {
            const vertices = line.split(sp);
            const startVertex = this.#st.get(vertices[0]);
            for (let i = 1; i < vertices.length; i++) {
                this.#G.addEdge(startVertex, this.#st.get(vertices[i]));
            }
        }
    }
    contains(s) {
        return this.#st.contains(s);
    }
    index(s) {
        return this.#st.get(s);
    }
    name(v) {
        return this.#keys[v];
    }
    G() {
        return this.#G;
    }
    static test() {
        const sg = new this('./routes.txt', ' ');
        const g = sg.G();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.on('line', source => {
            if (sg.contains(source)) {
                for (let w of g.adj(sg.index(source))) {
                    console.log(`    ${sg.name(w)}`);
                }
            } else {
                console.log(source, 'not in database.');
            }
        });
    }
}

// SymbolGraph.test();

module.exports = SymbolGraph;