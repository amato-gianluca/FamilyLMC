const NUM_LOCATIONS = 100
const MAX_VALUE = 1000

class Memory {

    #mem

    constructor() {
        this.#mem = Array(NUM_LOCATIONS).fill(0)
    }

    read(n) {
        return this.#mem[n]
    }

    write(n, val) {
        this.#mem[n] = val % MAX_VALUE
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
        this.#accumulator = val % MAX_VALUE
    }

    reset() {
        this.#accumulator = 0
    }

    add(val) {
        this.#accumulator = (this.#accumulator + val) % MAX_VALUE
    }

    sub(val) {
        this.#accumulator -= val
        if (this.#accumulator < 0) this.#accumulator += MAX_VALUE
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
        this.#pc = val % MAX_VALUE
    }

    reset() {
        this.#pc = 0
    }

    increment() {
        this.#pc = (this.#pc + 1) % MAX_VALUE
    }
}

class Input {

    read() {
        throw new Error('Not implemented')
    }
}

class ConstantInput extends Input {
    #val

    constructor(val) {
        super()
        this.#val = val
    }

    read() {
        return this.#val
    }
}

class ConsoleInput extends Input {

    read() {
        let ok
        do {
            ok = true
            const data = prompt("Input: ")
            const parsed = parseInt(data)
            if (isNaN(parsed) || parsed < 0 || parsed > 999) {
                alert("Please write a number between 0 and 999")
                ok = false
            }
        } while (!ok)
        return data;
    }
}

class ArrayInput extends Input {

    #inputs
    #chained
    #i

    constructor(inputs, chained) {
        super()
        this.#inputs = inputs
        this.#chained = chained
        this.#i = 0
    }

    read() {
        if (this.#i < this.#inputs.length)
            return this.#inputs[this.#i++]
        else
            return this.#chained.read()
    }
}

class Output {

    write(val) {
        throw new Error('Not implemented')
    }
}

class ArrayOutput extends Output {

    #outputs

    constructor() {
        super()
        this.#outputs = Array(0)
    }

    write(val) {
        this.#outputs.push(val)
    }

    get outputs() {
        return this.#outputs
    }
}
