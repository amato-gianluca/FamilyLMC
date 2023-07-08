/**
 * Number of locations in the LMC memory.
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

    /**
     * Array keeping the content of the memory cells.
     */
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
     * Reset the memory and replace all values in cells with zero.
     */
    reset() {
        this.#mem = this.#mem.fill(0)
    }

    toString() {
        return "Memory: " + this.#mem.toString()
    }
}

/**
 * The ALU of the LMC.
 */
class ALU {

    /**
     * The value of the accumulator.
     */
    #accumulator

    /**
     * The flag indicating if the last subtract opeation has produced an overflow.
     */
    #negativeFlag

    /**
     * Build an ALU with zero as the current value of the accumulator.
     */
    constructor() {
        this.#accumulator = 0
        this.#negativeFlag = false
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
     * Return the current value of the negative flag.
     */
    getNegativeFlag() {
        return this.#negativeFlag
    }

    /**
     * Set the current value of the negative flag.
     */
    setNegativeFlag(val) {
        this.#negativeFlag = val;
    }

    /**
      * Reset the ALU, writing zero to the accumulator.
      */
    reset() {
        this.#accumulator = 0
        this.#negativeFlag = false
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
        if (this.#accumulator < 0) {
            this.#negativeFlag = true
            this.#accumulator += MAX_VALUE
        } else {
            this.#negativeFlag = false
        }
    }

    toString() {
        return "ALU: " + this.#accumulator + " " + "Neg: " + this.#negativeFlag
    }
}

/**
 * The Program Counter of the LMC
 */
class PC {

    /**
     * The current value of the program counter.
     */
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
        this.#pc = val
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
        // this.#pc = (this.#pc + 1) % MAX_VALUE
        this.write((this.#pc + 1) % MAX_VALUE)
    }

    toString() {
        return "PC: " + this.#pc
    }
}

/**
 * Abstract class for an input device of the LMC.
 *
 * Methods read and reset should be always overriden in subclasses,
 * since this implementation only throws an exception.
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

    /**
     * The constant value returned by the device.
     */
    #val

    /**
     * Constructor for the ConstantInput class.
     * @param val The constant value returned by the device.
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

    toString() {
        return "ConstantInput: " + this.#val
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

    toString() {
        return "ConsoleInput"
    }
}


/**
 * An input device which takes input values from an array. When all elements
 * from the array have been read, it pass the requesto to a chained input device.
 */
class ArrayInput extends Input {

    /**
     * The array with input values returned by the read() method.
     */
    #inputs

    /**
     * The chained input device to use when the inputs array has no more elements.
     */
    #chained

    /**
     * The index of the next element to read from the inputs array.
     */
    #i

    /**
     * Constructor for the ArrayInput class.
     * @param inputs The array with input values returned by the read() method.
     * @param chained The chained input device to use when the inputs array has no more elements.
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

    toString() {
        let s = "ArrayInput"
        for (let i = 0; i < this.#i; i++) {
            s += " ";
            s += this.#inputs[i]
        }
        if (this.#i < this.#inputs.length) {
            s += " (" + this.#inputs[this.#i] + ")"
        }
        for (let i = this.#i + 1; i < this.#inputs.length; i++) {
            s += " " + this.#inputs[i]
        }
        return "ArrayInput:" + s + " chained to " + this.#chained
    }
}

/**
 * Abstract class for an output device.
 *
 * Methods write and reset should be always overriden in subclasses,
 * since this implementation only throws an exception.
 */
class Output {

    /**
     * Send val to the output device.
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
 * An output device which sends all the output to the screen with an alert function.
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

    /**
     * The array with the output values.
     */
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
     * The status of the CU. It is true when the CU is running, and false when it is halted.
     */
    #status

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
        this.#status = true
    }

    setStatus(val) {
        this.#status=val
    }

    /**
     * Returns the status of the CU.
     */
    getStatus() {
        return this.#status
    }

    /**
     * Method to be called when an unimplemented instruction is found
     * @param instruction the untimplemented instruction
     * @param addr the address of the unimplemented instruction
     */
    unimplemented(instruction, addr) {
        this.#status = false;
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
                this.#status = false
                break
            case 1:
                var a = this.#mem.read(param)
                this.#alu.add(a)
                break
            case 2:
                var a = this.#mem.read(param)
                this.#alu.sub(a)
                break
            case 3:
                var a = this.#alu.read()
                this.#mem.write(param, a)
                break
            case 4:
                this.unimplemented(instruction, address)
                break
            case 5:
                var a = this.#mem.read(param)
                this.#alu.write(a)
                break
            case 6:
                this.#pc.write(param)
                break
            case 7:
                if (this.#alu.read() == 0)
                    this.#pc.write(param)
                break
            case 8:
                if (this.#alu.getNegativeFlag() == false)
                    this.#pc.write(param)
                break
            case 9:
                if (param == 1) {
                    var a = this.#inp.read()
                    this.#alu.write(a)
                }
                else if (param == 2) {
                    var a = this.#alu.read()
                    this.#out.write(a)
                }
                else {
                    this.unimplemented(instruction, address)
                }
                break
        }
    }

    /**
     * Executes instructions until the CU reach the halted state.
     */
    execute() {
        while (this.#status) this.executeOne()
    }

    /**
     * Resets the CU.
     */
    reset() {
        this.#status = true
    }

    toString() {
        return "CU status: " + this.#status
    }
}

/**
 * The Little Man Computer.
 */
class LMC {
    #mem
    #pc
    #alu
    #inp
    #out
    #cu

    /**
     * Constructor of the LMC
     * @param {Input} inp The input device to which the computer is connected
     * @param {Output} out The output device to which the computer is connected
     */
    constructor(inp, out) {
        this.#mem = new Memory()
        this.#pc = new PC()
        this.#alu = new ALU()
        this.#inp = inp
        this.#out = out
        this.#cu = new CU(this.#mem, this.#pc, this.#alu, this.#inp, this.#out)
    }

    /**
     * Resets all components of the LMC with the exception of the memory.
     */
    reset() {
        this.#pc.reset()
        this.#alu.reset()
        this.#cu.reset()
        this.#inp.reset()
        this.#out.reset()
    }
}