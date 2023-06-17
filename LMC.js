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

    toString() {
        //TODO
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

    toString() {
        //TODO
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

    toString() {
        //TODO
    }
}

class Input {

    read() {
        throw new Error('Not implemented')
    }

    reset() {
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

    reset() {
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

    reset() {
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

    reset() {
        this.#i = 0
        this.#chained.reset()
    }
}

class Output {

    write(val) {
        throw new Error('Not implemented')
    }

    reset() {
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

    reset() {
        this.#outputs.length = 0
    }

    get outputs() {
        return Array.from(this.#outputs)
    }
}

class CU {

    #mem
    #pc
    #alu
    #inp
    #out

    constructor(mem, pc, alu, inp, out) {
        this.#mem = mem
        this.#pc = pc
        this.#alu = alu
        this.#inp = inp
        this.#out = out
    }

    executeOne () {
        const instruction = this.#mem.read(this.#pc)
        this.#pc.increment()
        const opcode = instruction / 100
        const param = instruction % 100
        switch (opcode) {
            case 0:
                // TODO HALT
                break
            case 1:
                // TODO ADD
                break
            case 2:
                // TODO SUB
                break
            case 3:
                // TODO STA
                break
            case 4:
                // TODO ?????
                break
            case 5:
                // TODO LDA
                break
            case 6:
                // TODO BRA
                break
            case 7:
                // TODO BRZ
                break
            case 8:
                // BRP
                break
            case 9:
                // TODO Input/Output
                break

        }
    }

    execute() {
        // TODO: execute instructions until the halt state si reached

    }

    reset() {
        // TODO: what ??
    }

    toString() {
        //TODO
    }

}