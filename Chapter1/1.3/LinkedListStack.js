class LinkedListStack {
    static #Node = class {
        item;
        next;
    };
    #N = 0;
    #first = null;
    isEmpty() {
        return this.#N === 0;
    }
    size() {
        return this.#N;
    }
    push(item) {
        const oldFirst = this.#first;
        this.#first = new this.constructor.#Node;
        this.#first.item = item;
        this.#first.next = oldFirst;
        this.#N++;
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack underflow');
        }
        const item = this.#first.item;
        this.#first = this.#first.next;
        this.#N--;
        return item;
    }
    *[Symbol.iterator](){
        let current = this.#first;
        while (current !== null) {
            yield current.item;
            current = current.next;
        }
    }
}

function test(str) {
    const stack = new LinkedListStack();
    const segs = str.split(' ');
    let result = '';
    for (let seg of segs) {
        if (seg !== '-') {
            stack.push(seg);
        } else if (!stack.isEmpty()) {
            result = result + stack.pop() + ' ';
        }
    }
    console.log(result);
    console.log(stack.size(), 'left on stack');
}

/**
 * should print:
 * to be not that or be
 * 2 left on stack
 */
// test('to be or not to - be - - that - - - is');

module.exports = LinkedListStack;