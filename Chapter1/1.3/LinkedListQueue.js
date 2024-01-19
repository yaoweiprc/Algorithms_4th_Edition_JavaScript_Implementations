class LinkedListQueue {
    static #Node = class {
        item;
        next;
    };
    #N = 0;
    #first = null;
    #last = null;
    isEmpty() {
        return this.#N === 0;
    }
    size() {
        return this.#N;
    }
    enqueue(item) {
        const oldLast = this.#last;
        this.#last = new this.constructor.#Node();
        this.#last.item = item;
        this.#last.next = null;
        if (this.isEmpty()) {
            this.#first = this.#last;
        } else {
            oldLast.next = this.#last;
        }
        this.#N++;
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue underflow');
        }
        const item = this.#first.item;
        this.#first = this.#first.next;
        this.#N--;
        if (this.isEmpty()) {
            this.#last = null;
        }
        return item;
    }
    *[Symbol.iterator](){
        let current = this.#first;
        while (current?.item) {
            yield current.item;
            current = current.next;
        }
    }
}

function test(str) {
    const queue = new LinkedListQueue();
    const segs = str.split(' ');
    let result = '';
    for (let seg of segs) {
        if (seg !== '-') {
            queue.enqueue(seg);
        } else if (!queue.isEmpty()) {
            result = result + queue.dequeue() + ' ';
        }
    }
    console.log(result);
    console.log(queue.size(), 'left on stack');
}

/**
 * should print:
 * to be or not to be
 * 2 left on stack
 */
// test('to be or not to - be - - that - - - is');

module.exports = LinkedListQueue;