const BoyerMoore = require('./BoyerMoore');
const KnuthMorrisPratt = require('./KnuthMorrisPratt');

function test(pattern, txt, algorithmClass) {
    const ins = new algorithmClass(pattern);
    const idx = ins.search(txt);
    console.log(`text:    ${txt}`);
    console.log(`pattern: ${' '.repeat(idx)}${pattern}`);
}

function runTest(algorithmClass) {
    test('abracadabra', 'abacadabrabracabracadabrabrabracad', algorithmClass);
    test('rab', 'abacadabrabracabracadabrabrabracad', algorithmClass);
    test('bcara', 'abacadabrabracabracadabrabrabracad', algorithmClass);
    test('rabrabracad', 'abacadabrabracabracadabrabrabracad', algorithmClass);
    test('abacad', 'abacadabrabracabracadabrabrabracad', algorithmClass);
}

runTest(BoyerMoore);