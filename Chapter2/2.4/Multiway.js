const IndexMinPQ = require('./IndexMinPQ');
const StrComparable = require('../2.1/StrComparable');
/**
 * @param {number[][]} streams
 */
function merge(streams) {
    const pq = new IndexMinPQ();
    const streamCount = streams.length;
    for (let i = 0; i < streamCount; i++) {
        if (streams[i].length > 0) {
            pq.insert(i, new StrComparable(streams[i].shift()));
        }
    }
    while (!pq.isEmpty()) {
        process.stdout.write(pq.min().toString() + ' ');
        const streamIdx = pq.deleteMin();
        if (streams[streamIdx].length > 0) {
            pq.insert(streamIdx, new StrComparable(streams[streamIdx].shift()));
        }
    }
}

// should print
// A A B B B C D E F F G H I I J N P Q Q Z
merge([
    ['A', 'B', 'C', 'F', 'G', 'I', 'I', 'Z'],
    ['B', 'D', 'H', 'P', 'Q', 'Q'],
    ['A', 'B', 'E', 'F', 'J', 'N'],
]);