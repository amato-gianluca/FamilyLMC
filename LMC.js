class Memory {

    constructor() {
        this.mem = new Array(100).fill(0)
    }

    read(n) {
        return this.mem[n]
    }

    write(n, val) {
        this.mem[n] = val % 1000
    }

    reset() {
        this.mem=Array(100).fill(0)
    }
}

class Calcurator {

    constructor() {
        this.calc = 0
    }

    read() {
        return this.calc
    }

    write(val) {
        this.calc = val % 1000
    }

    reset() {
        this.calc=0
    }
    
    add(val) {
        this.calc=this.calc+val % 1000
    }

    Sub(val) {
        this.calc=this.calc-val % 1000
    }

}