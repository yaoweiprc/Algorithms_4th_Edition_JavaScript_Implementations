const SymbolGraph = require('./SymbolGraph');
const BreadthFirstPaths = require('./BreadthFirstPaths');
const readline = require("node:readline");

class DegreesOfSeparation {
    static test(filename, sp, source) {
        const sg = new SymbolGraph(filename, sp);
        const g = sg.G();
        if (!sg.contains(source)) {
            console.log(source, 'not in database.');
            return;
        }
        const s = sg.index(source);
        const bfs = new BreadthFirstPaths(g, s);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.on('line', dest => {
            if (sg.contains(dest)) {
                const t = sg.index(dest);
                if (bfs.hasPathTo(t)) {
                    for (let v of bfs.pathTo(t)) {
                        console.log(`    ${sg.name(v)}`);
                    }
                } else {
                    console.log('Not connected.')
                }
            } else {
                console.log(dest, 'not in database.');
            }
        });
    }
}

DegreesOfSeparation.test('./routes.txt', ' ', 'JFK');