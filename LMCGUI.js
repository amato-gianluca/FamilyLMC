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

        guiPc.value = '0'

        guiPc.addEventListener('change', () => {
            let n = parseInt(guiPc.value)
            if (n > 999) {
                window.alert(DATA_RANGE_ERROR);
                n = 999
            } else if (n < 0) {
                window.alert(DATA_RANGE_ERROR);
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
        this.#guiPc.value = '0'
    }

    increment(){
        super.increment()
        // this.#guiPc.value = String(parseInt(this.#guiPc.value)+1)
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
        this.#guiAcc.value = String(val).padStart(3, '0')
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

class CUGui extends CU {
    #guicu
    constructor(mem, pc, alu, inp, out, guicu) {
        super(mem, pc, alu, inp, out)
        this.#guicu = guicu

        guicu.addEventListener('change', () => {
            this.setStatus(guicu.checked)
        })
    }

    setStatus(val) {
        super.setStatus(val)
        this.#guicu.checked = val
    }


}

const lmc = new LMC(new ArrayInput(), new ArrayOutput())

const mem = new Memory()
const pc = new PCGui(document.getElementById('pcval'))
const alu = new ALUGui(document.getElementById('aluval'), document.getElementById('aluneg'))
const inp = new ArrayInput()
const out = new ArrayOutput()
var cu = new CUGui(mem, pc, alu, inp, out, document.getElementById("cu")) 


step_button = document.getElementById('step')
step_button.addEventListener('click', () => {
    window.alert('step')
    cu.executeOne()
})


execute_button = document.getElementById('execute')
execute_button.addEventListener('click', () => {
    window.alert('execute')
    cu.execute()
})


// stop_button = document.getElementById('stop')
// stop_button.addEventListener('onClick', () => {
//     ?????????
// })
