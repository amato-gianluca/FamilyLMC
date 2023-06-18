/**
 * Number of locations in the LMC memory
 */
const NUM_LOCATIONS = 100

/**
 * Maximum value (+1) allowed in the ALU and in the memory cells.
 */
const MAX_VALUE = 1000

/**
 * The memory of the LMC.
 */
class Memory {

    #mem

    /**
     * Build a new memory with all cells initialized to zero.
     */
    constructor() {
        this.#mem = Array(NUM_LOCATIONS).fill(0)
    }

    /**
     * Return the content of the memory cell n.
     */
    read(n) {
        return this.#mem[n]
    }

    /**
     * Replace the content of the memory cell n with val.
     */
    write(n, val) {
        this.#mem[n] = val % MAX_VALUE
    }

    /**
     * Reset the memory, replace all values in cells with zero.
     */
    reset() {
        this.#mem = this.#mem.fill(0)
    }

    toString() {
        //TODO
    }
}

/**
 * The ALU of the LMC.
 */
class ALU {

    #accumulator

    /**
     * Build an ALU with zero as the current value of the accumulator.
     */
    constructor() {
        this.#accumulator = 0
    }

    /**
     * Return the current value of the accumulator.
     */
    read() {
        return this.#accumulator
    }

    /**
     * Replace the current value of the accumulator with zero.
     */
    write(val) {
        this.#accumulator = val % MAX_VALUE
    }

    /**
     * Reset the ALU, writing zero to the accumulator.
     */
    reset() {
        this.#accumulator = 0
    }

    /**
     * Add val to the accumulator.
     */
    add(val) {
        this.#accumulator = (this.#accumulator + val) % MAX_VALUE
    }

    /**
     * Subtract val from the accumulator.
     */
    sub(val) {
        this.#accumulator -= val
        if (this.#accumulator < 0) this.#accumulator += MAX_VALUE
    }

    toString() {
        //TODO
    }
}

/**
 * The Program Counter of the LMC
 */
class PC {

    #pc

    /**
     * Build a program counter initialized to zero.
     */
    constructor() {
        this.#pc = 0
    }

    /**
     * Read the curret value of the program counter.
     */
    read() {
        return this.#pc
    }

    /**
     * Replace the current value of the program counter with val.
     */
    write(val) {
        this.#pc = val % MAX_VALUE
    }

    /**
     * Reset the program value, replacing its value to zero.
     */
    reset() {
        this.#pc = 0
    }

    /**
     * Increment the current value of the program counter.
     */
    increment() {
        this.#pc = (this.#pc + 1) % MAX_VALUE
    }

    toString() {
        //TODO
    }
}

/**
 * Abstract class for an input device of the LMC.
 *
 * Methods read and reset should be always overriden in subclasses,
 * since this implementation only throw an exception.
 */
class Input {

    /**
     * Return the next data read from the input device.
     */
    read() {
        throw new Error('Not implemented')
    }

    /**
     * Resets the input device.
     */
    reset() {
        throw new Error('Not implemented')
    }
}

/**
 * An input device which always returns the same constant value.
 */
class ConstantInput extends Input {
    #val

    /**
     * Constructor for the ConstantInput class.
     * @param {int} val The constant value returned by the device.
     */
    constructor(val) {
        super()
        this.#val = val
    }

    read() {
        return this.#val
    }


    /**
     * Resets the input device.
     *
     * It does nothing.
     */
    reset() {
    }
}

/**
 * An input device which asks the user for the input value. It checks that
 * the input is a numeric value between 0 and the maximum allowed value.
 */
class ConsoleInput extends Input {

    read() {
        let ok
        let parsed
        do {
            ok = true
            const data = prompt("Input: ")
            parsed = parseInt(data)
            if (isNaN(parsed) || parsed < 0 || parsed > MAX_VALUE) {
                alert("Please write a number between 0 and " + MAX_VALUE)
                ok = false
            }
        } while (!ok)
        return parsed;
    }

    /**
     * Resets the input device.
     *
     * It does nothing.
     */
    reset() {
    }
}


/**
 * An input device which takes input values from an array. When all elements
 * from the array have been read, it pass the requesto to a chained input device.
 */
class ArrayInput extends Input {

    #inputs
    #chained
    #i

    /**
     * Constructor for the ArrayInput class.
     * @param {Array<int>} inputs The array with input values returned by the read() method.
     * @param {Input} chained The chained input device to use when the inputs array has no more elements.
     */
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

    /**
     * Resets the input device.
     *
     * It starts reading again from the first position of the array, and forward
     * the reset to the chained device.
     */
    reset() {
        this.#i = 0
        this.#chained.reset()
    }
}

/**
 * Abstract class for an output device.
 *
 * Methods write and reset should be always overriden in subclasses,
 * since this implementation only throw an exception.
 */
class Output {

    /**
     * Send val to the output device.
     * @param {int} val The output value
     */
    write(val) {
        throw new Error('Not implemented')
    }

    /**
     * Resets the output device.
     */
    reset() {
        throw new Error('Not implemented')
    }
}

/**
 * An output device which sends all the output to the screen with an
 * alert function.
 */
class ConsoleOutput {
    write(val) {
        alert('Output: ' + val)
    }

    /**
      * Resets the output device.
      *
      * It does nothing.
      */
    reset() {
    }
}

/**
 * An output device which keeps all the output in an internal array.
 */
class ArrayOutput extends Output {

    #outputs

    constructor() {
        super()
        this.#outputs = Array(0)
    }

    write(val) {
        this.#outputs.push(val)
    }

    /**
      * Resets the output device.
      *
      * It empties the array used to keep the output values.
      */
    reset() {
        this.#outputs.length = 0
    }

    /**
     * Returns a copy of the current array of output values.
     */
    getOutputs() {
        return Array.from(this.#outputs)
    }
}

/**
 * The Control Unit of the LMC.
 */
class CU {

    #mem
    #pc
    #alu
    #inp
    #out

    /**
     * Constructor of the Control Unit.
     * @param {Memory} memory The memory object to which the CU is connected
     * @param {PC} pc The program counter to which the CU is connected
     * @param {ALU} alu The ALU to which the CU is connected
     * @param {Input} inp The input device to which the CU is connected
     * @param {Output} out The output device to which the CU is connected
     */
    constructor(mem, pc, alu, inp, out) {
        this.#mem = mem
        this.#pc = pc
        this.#alu = alu
        this.#inp = inp
        this.#out = out
    }

    /**
     * Execute one instruction.
     */
    executeOne() {
        const address = this.#pc.read()
        const instruction = this.#mem.read(address)
        this.#pc.increment()
        const opcode = Math.floor(instruction / 100)
        const param = instruction % 100
        switch (opcode) {
            case 0:
                // TODO HALT
                break
            case 1:
                // TODO ADD
                break
            case 2:
                var a= this.#mem.read(param)
                this.#alu.sub(a)
                break
            case 3:
                var a= this.#alu.read()
                this.#mem.write(param, a)
                break
            case 4:
                // TODO ?????
                break
            case 5:
                var a = this.#mem.read(param)
                this.#alu.write(a)
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
                if (param==1) {var a=this.#inp.read(); this.#alu.write(a) }
                if (param==2) {var a=this.#alu.read(); this.#out.write(a) }
                break

        }
    }

    /**
     * Executes instructions until the CU reach the halted state.
     */
    execute() {
        // TODO: execute instructions until the halt state si reached
    }

    /**
     * Resets the CU.
     */
    reset() {
        // TODO: what ??
    }

    toString() {
        //TODO
    }

}