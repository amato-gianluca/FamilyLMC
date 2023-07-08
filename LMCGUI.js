const DATA_RANGE_ERROR = 'Data should be between 0 and 999'
const PC_RANGE_ERROR = 'PC should be between 0 and 99'

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

        guiAcc.value = '000'
        guiNeg.checked = false

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
        this.#guiAcc.value = String(n).padStart(3, '0')
    }

    setNegativeFlag(val) {
        super.setNegativeFlag(val)
        this.#guiNeg.checked = val
    }

    reset() {
        super.reset()
        this.#guiAcc.value = '000'
        this.#guiNeg.checked = false
    }
}

const lmc = new LMC(new ArrayInput(), new ArrayOutput())

const mem = new Memory()
const pc = new PC()
const alu = new ALUGui(document.getElementById('aluval'), document.getElementById('aluneg'))
const inp = new ArrayInput()
const out = new ArrayOutput()
const cu = new CU(mem, pc, alu, inp, out)
