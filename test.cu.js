suite('CU', function () {
    let mem = new Memory()
    let pc = new PC()
    let alu = new ALU()
    let input = new ConstantInput(150)
    let output = new ArrayOutput()
    let cu = new CU(mem, pc, alu, input, output)

    test('read new cu', function () {
        pc.reset()
        mem.write(0, 520)
        mem.write(20, 709)
        cu.executeOne()
        assert.equal(709, alu.read())
        assert.equal(1, pc.read())
    })

    test('sta', function () {
        pc.reset()
        mem.write(0, 320)
        alu.write(650)
        cu.executeOne()
        assert.equal(650, mem.read(20))
        assert.equal(1, pc.read())
    })

    test('sub', function () {
        pc.reset()
        mem.write(0,230)
        mem.write(30, 550)
        alu.write(700)
        cu.executeOne()
        assert.equal (150, alu.read())
        assert.equal (1, pc.read())
    })

    test('input', function () {
        pc.reset()
        mem.write(0, 901)
        cu.executeOne()
        assert.equal (150, alu.read())
        assert.equal (1, pc.read())
    })

    test('output', function () {
        pc.reset()
        mem.write(0,902)
        alu.write(300)
        cu.executeOne()
        assert.deepEqual ([300], output.getOutputs())
        assert.equal (1, pc.read())
    })

    test('add cu', function () {
        pc.reset()
        alu.write(10)
        mem.write(0,120)
        mem.write(20, 30)
        cu.executeOne()
        assert.equal(40, alu.read())
        assert.equal(1, pc.read())
     })


     test('bra cu', function () {
        pc.reset()
        alu.write(10)
        mem.write(0,615)
        cu.executeOne()
        assert.equal(15, pc.read())
     })


     test('brz jump cu', function () {
        pc.reset()
        alu.reset()
        mem.write(0,720)
        cu.executeOne()
        assert.equal(20, pc.read())
     })


     test('brz not jump cu', function () {
        pc.reset()
        alu.write(3)
        mem.write(0,740)
        cu.executeOne()
        assert.equal(1, pc.read())
     })


     test('halt cu', function () {
        pc.reset()
        mem.write(0,000)
        cu.executeOne()
        assert.equal(cu.getStatus(), false)
     })

     test('execute', function() {
        pc.reset()
        cu.reset()
        mem.write(0, 520)
        mem.write(20, 170)
        mem.write(1, 130)
        mem.write(30, 50)
        mem.write(2, 0)
        cu.execute()
        assert.equal(220, alu.read())
     })
})
