const Digraph = require('../../Chapter4/4.2/Digraph');
const DirectedDFS = require('../../Chapter4/4.2/DirectedDFS');

/**
 * The NFA class provides a data type for creating a nondeterministic finite state automaton from
 * a regular expression and testing whether a given string is matched by that regular expression.
 * It supports the following operations: concatenation, closure, binary or, and parentheses.
 */
class NFA {
    // char array of regex
    #reCharArray;
    // digraph of epsilon transitions
    #graph;
    // length of re
    get #M() {
        return this.#reCharArray.length;
    }

    /**
     * build nfa from regex
     * @param {string} reStr
     */
    constructor(reStr) {
        this.#reCharArray = [...reStr];
        this.#graph = new Digraph(this.#M + 1);
        const tmpStack = [];
        for (let i = 0; i < this.#M; i++) {
            const currReChar = this.#reCharArray[i];
            if ((currReChar === '(') || (currReChar === '|')) {
                tmpStack.push(i);
            }
            let leftParenthesisIdx = i;
            if (currReChar === ')') {
                leftParenthesisIdx = tmpStack.pop();
                if (this.#reCharArray[leftParenthesisIdx] === '|') {
                    let orIdx = leftParenthesisIdx;
                    leftParenthesisIdx = tmpStack.pop();
                    this.#graph.addEdge(orIdx, i);
                    this.#graph.addEdge(leftParenthesisIdx, orIdx + 1);
                }
            }
            if (i < this.#M -1 && this.#reCharArray[i + 1] === '*') {
                this.#graph.addEdge(leftParenthesisIdx, i + 1);
                this.#graph.addEdge(i + 1, leftParenthesisIdx);
            }
            if ((currReChar === '(')
                | (currReChar === ')')
                | (currReChar === '*')) {
                this.#graph.addEdge(i, i + 1);
            }
        }
    }

    /**
     * Returns true if the text is matched by the regular expression.
     * @param {string} txt
     * @return {boolean}
     */
    recognize(txt) {
        const currPossibleStatusSet = new Set();
        const dfs = new DirectedDFS(this.#graph, 0);
        for (let i = 0; i < this.#graph.V; i++) {
            if (dfs.marked(i)) {
                currPossibleStatusSet.add(i);
            }
        }
        for (let currChar of txt) {
            const possibleStatusArrAfterReadCurrChar = [];
            for (let possibleStatus of currPossibleStatusSet) {
                if (possibleStatus < this.#M
                    && ((this.#reCharArray[possibleStatus] === currChar)
                        || (this.#reCharArray[possibleStatus] === '.')
                    )
                ) {
                    possibleStatusArrAfterReadCurrChar.push(possibleStatus + 1);
                }
            }
            currPossibleStatusSet.clear();
            if (possibleStatusArrAfterReadCurrChar.length === 0) {
                break;
            }
            const dfs = new DirectedDFS(this.#graph, possibleStatusArrAfterReadCurrChar);
            for (let i = 0; i < this.#graph.V; i++) {
                if (dfs.marked(i)) {
                    currPossibleStatusSet.add(i);
                }
            }
        }
        if (currPossibleStatusSet.has(this.#M)) {
            return true;
        } else {
            return false;
        }
    }
}

console.log((new NFA('(A*B|AC)D').recognize('AAAABD')));
console.log((new NFA('(A*B|AC)D').recognize('AAAAC')));
console.log((new NFA('(a|(bc)*d)*').recognize('abcbcd')));
console.log((new NFA('(a|(bc)*d)*').recognize('abcbcbcdaaaabcbcdaaaddd')));
console.log((new NFA('ab*a*c*a').recognize('aaa')));