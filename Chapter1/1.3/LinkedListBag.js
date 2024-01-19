class LinkedListBag {
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
    add(item) {
        const oldFirst = this.#first;
        this.#first = new this.constructor.#Node;
        this.#first.item = item;
        this.#first.next = oldFirst;
        this.#N++;
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
    const bag = new LinkedListBag();
    const segs = str.split(' ');
    let result = '';
    for (let seg of segs) {
        bag.add(seg);
    }
    for (let item of bag) {
        result = result + item + ' ';
    }
    console.log('size of bag =', bag.size());
    console.log(result);
}

/**
 * should print:
 * size of bag = 14
 * is - - - that - - be - to not or be to
 */
// test('to be or not to - be - - that - - - is');

module.exports = LinkedListBag;