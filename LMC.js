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
}
