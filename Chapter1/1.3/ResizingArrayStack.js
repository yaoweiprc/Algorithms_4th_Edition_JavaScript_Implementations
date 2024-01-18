class ResizingArrayStack {
    // stack items
    #a = new Array(1);
    // number of elements on stack
    #N = 0;
    isEmpty() {
        return this.#N === 0;
    }
    size() {
        return this.#N;
    }
    // resize the underlying array holding the elements
    #resize(max) {
        this.#a.length = max;
    }
    push(item) {
        if (this.#N === this.#a.length) {
            this.#resize(2 * this.#a.length);
        }
        this.#a[this.#N++] = item;
    }
    pop() {
        const item = this.#a[--this.#N];
        delete this.#a[this.#N];
        if (this.#N > 0 && this.#N === Math.floor(this.#a.length / 4)) {
            this.#resize(Math.floor(this.#a.length / 2));
        }
        return item;
    }
    *[Symbol.iterator]() {
        for (let i = this.#N - 1; i >= 0; i--) {
            yield this.#a[i];
        }
    }
}

module.exports = ResizingArrayStack;