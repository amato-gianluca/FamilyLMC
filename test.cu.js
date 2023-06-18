suite('CU', function () {
    let mem = new Memory()
    let pc = new PC()
    let alu = new ALU()
    let input = new ConsoleInput()
    let output = new ConsoleOutput()
    let cu = new CU(mem, pc, alu, input, output)

    test('read new cu', function () {
        mem.write(0, 520)
        mem.write(20, 709)
        cu.executeOne()
        assert.equal(709, alu.read())
        assert.equal(1, pc.read())
    })

    test('sta', function () {

        mem.write(1, 320)
        alu.write(650)
        cu.executeOne()
        assert.equal(650, mem.read(20))
        assert.equal(2, pc.read())
    })

    test('sub', function () {
        mem.write(2,230)
        mem.write(30, 550)
        alu.write(700)
        cu.executeOne()
        assert.equal (150, alu.read())
        assert.equal (3, pc.read())
    })

    /*test('input', function () {
        mem.write(3, 901)
        cu.executeOne()
        assert.equal (150, alu.read())
        assert.equal (4, pc.read())
    })*/

    test('output', function () {
        mem.write(3,902)
        alu.write(300)
        cu.executeOne()
        //assert.equal (300, out.read())
        assert.equal (4, pc.read())
    })
})
