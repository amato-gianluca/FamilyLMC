suite('CU', function () {
    let mem= new Memory()
    let pc= new PC()
    let alu= new ALU()
    let input= new ConsoleInput()
    let output= new ConsoleOutput()
    let cu = new CU(mem, pc, alu, input, output)

    test('read new cu', function () {
       mem.write(0,520)
       mem.write(20, 709)
       cu.executeOne()
       assert.equal (709, alu.read())
       assert.equal (1, pc.read())
    })
})
