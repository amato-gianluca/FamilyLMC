const DATA_RANGE_ERROR = 'Data should be between 0 and 999'
const PC_RANGE_ERROR = 'PC should be between 0 and 99'

/**
 * A PC connected to a GUI.
 */
class PCGui extends PC {
    /**
     * GUI component corresponding to the program counter
     */
    #guiPc

    constructor(guiPc) {
        super()
        this.#guiPc = guiPc

        this.reset()

        guiPc.addEventListener('change', () => {
            let n = parseInt(guiPc.value)
            if (n > 99) {
                window.alert(PC_RANGE_ERROR);
                n = 999
            } else if (n < 0) {
                window.alert(PC_RANGE_ERROR);
                n = 0;
            }
            this.write(n)
        })
    }

    write(val) {
        super.write(val)
        this.#guiPc.value = String(val).padStart(2, '0')
    }

    reset() {
        super.reset()
    }
}

/**
 * An ALU connected to a GUI.
 */
class ALUGui extends ALU {
    /**
     * GUI component corresponding to the accumulatore
     */
    #guiAcc

    /**
     * GUI component corresponding to the negative flag
     */
    #guiNeg

    constructor(guiAcc, guiNeg) {
        super()
        this.#guiAcc = guiAcc
        this.#guiNeg = guiNeg

        this.reset()

        guiAcc.addEventListener('change', () => {
            let n = parseInt(guiAcc.value)
            if (n > 999) {
                window.alert(DATA_RANGE_ERROR);
                n = 999
            } else if (n < 0) {
                window.alert(DATA_RANGE_ERROR);
                n = 0;
            }
            this.write(n)
        })

        guiNeg.addEventListener('change', () => {
            this.setNegativeFlag(guiNeg.checked)
        })
    }

    write(val) {
        super.write(val)
        this.#guiAcc.value = String(val).padStart(3, '0')
    }

    setNegativeFlag(val) {
        super.setNegativeFlag(val)
        this.#guiNeg.checked = val
    }

    reset() {
        super.reset()
    }
}

class CUGui extends CU {
    /**
     * GUI component corresponding to the CU halted state
     */
    #guiHalt

    constructor(mem, pc, alu, inp, out, guiHalt) {
        super(mem, pc, alu, inp, out)
        this.#guiHalt = guiHalt

        this.reset()

        guiHalt.addEventListener('change', () => {
            this.setHalted(guiHalt.checked)
        })
    }

    setHalted(val) {
        super.setHalted(val)
        this.#guiHalt.checked = val
    }
}

class MemoryGUI extends Memory {

    #memGui = new Array(NUM_LOCATIONS)

    constructor(guiMemTable) {
        super()
        let i = 0
        for (const cell of guiMemTable.querySelectorAll('input')) {
            this.#memGui[i] = cell
            cell.location = i
            cell.addEventListener('change', () => {
                let n = parseInt(cell.value)
                if (n > 999) {
                    window.alert(DATA_RANGE_ERROR);
                    n = 999
                } else if (n < 0) {
                    window.alert(DATA_RANGE_ERROR);
                    n = 0;
                }
                this.write(cell.location, n)
            })
            i++
        }

        this.reset()
    }

    write(location, val) {
        super.write(location, val)
        this.#memGui[location].value = String(val).padStart(3, '0')
    }
}

const mem = new MemoryGUI(document.getElementById('mem'))
const pc = new PCGui(document.getElementById('pcval'))
const alu = new ALUGui(document.getElementById('aluval'), document.getElementById('aluneg'))
const inp = new ArrayInput()
const out = new ArrayOutput()
const cu = new CUGui(mem, pc, alu, inp, out, document.getElementById("cu"))

step_button = document.getElementById('step')
step_button.addEventListener('click', () => {
    cu.executeOne()
})

execute_button = document.getElementById('execute')
execute_button.addEventListener('click', () => {
    cu.execute()
})

// stop_button = document.getElementById('stop')
// stop_button.addEventListener('onClick', () => {
//     ?????????
// })
