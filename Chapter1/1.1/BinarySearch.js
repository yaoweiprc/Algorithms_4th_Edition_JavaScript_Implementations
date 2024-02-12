const fs = require('node:fs');
const readline = require('node:readline');

class BinarySearch {
    static indexOf(arr, key) {
        let lo = 0;
        let hi = arr.length - 1;
        while (lo <= hi) {
            let mid = lo + Math.floor((hi - lo) / 2);
            if (arr[mid] > key) {
                hi = mid - 1;
            } else if (arr[mid] < key) {
                lo = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }

    static test() {
        const content = fs.readFileSync('./tinyAllowlist.txt', 'utf8');
        const lines = content.split('\n').map(str => parseInt(str, 10));
        lines.sort((a, b) => a - b);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.log(`Allowed numbers are: ${lines.join(', ')}`);
        rl.on('line', line => {
            console.log(`${line} is ${
                this.indexOf(lines, parseInt(line, 10)) === -1
                    ? 'not '
                    : ''
            }allowed`);
        });
    }
}

// BinarySearch.test();

module.exports = BinarySearch;