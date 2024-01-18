const Stack = require('./ResizingArrayStack');

/**
 * Evaluates (fully parenthesized) arithmetic expressions using Dijkstra's two-stack algorithm.
 * Note: the operators, operands, and parentheses must be
 * separated by whitespace. Also, each operation must
 * be enclosed in parentheses. For example, you must write
 * ( 1 + ( 2 + 3 ) ) instead of ( 1 + 2 + 3 ).
 * @param {String} exp - fully parenthesized arithmetic expressions
 * @returns {Number} calculation result
 */
function evaluate(exp) {
    const ops = new Stack();
    const vals = new Stack();
    const eles = exp.split(' ');
    eles.forEach(s => {
        if (s === '(') {}
        else if (s === '+' || s === '-' || s === '*' || s === '/' || s === 'sqrt') {
            ops.push(s);
        }
        else if (s === ')') {
            const op = ops.pop();
            const secondVal = vals.pop();
            let result;
            if (op === 'sqrt') {
                result = Math.sqrt(secondVal);
            } else {
                const firstVal = vals.pop();
                if (op === '+') {
                    result = firstVal + secondVal;
                } else if (op === '-') {
                    result = firstVal - secondVal;
                } else if (op === '*') {
                    result = firstVal * secondVal;
                } else if (op === '/') {
                    result = firstVal / secondVal;
                }
            }
            vals.push(result);
        } else {
            if (s.indexOf('.') > -1) {
                vals.push(parseFloat(s));
            } else {
                vals.push(parseInt(s));
            }
        }
    });
    return vals.pop();
}

console.log(evaluate('( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )'));
console.log(evaluate('( ( 1 + sqrt ( 5 ) ) / 2.0 )'));