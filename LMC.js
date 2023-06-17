class Memory {

    #mem

    constructor() {
        this.#mem = new Array(100).fill(0)
    }

    read(n) {
        return this.#mem[n]
    }

    write(n, val) {
        this.#mem[n] = val % 1000
    }

    reset() {
        this.#mem = this.#mem.fill(0)
    }
}

class ALU {

    #accumulator

    constructor() {
        this.#accumulator = 0
    }

    read() {
        return this.#accumulator
    }

    write(val) {
        this.#accumulator = val % 1000
    }

    reset() {
        this.#accumulator = 0
    }

    add(val) {
        this.#accumulator = (this.#accumulator + val) % 1000
    }

    sub(val) {
        this.#accumulator -= val
        if (this.#accumulator < 0) this.#accumulator += 1000
    }

}

class PC {

    #pc

    constructor() {
        this.#pc = 0
    }

    read() {
        return this.#pc
    }

    write(val) {
        this.#pc = val % 1000
    }

    reset() {
        this.#pc = 0
    }

    increment() {
        this.#pc = (this.#pc + 1) % 1000
    }
}