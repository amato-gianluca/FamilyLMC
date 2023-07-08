suite('CU', function () {
   let mem, pc, alu, input, output, cu

   setup(function () {
      mem = new Memory()
      pc = new PC()
      alu = new ALU()
      input = new ConstantInput(150)
      output = new ArrayOutput()
      cu = new CU(mem, pc, alu, input, output)
   })

   test('lda', function () {
      mem.write(0, 520)
      mem.write(20, 709)
      cu.executeOne()
      assert.equal(709, alu.read())
      assert.equal(1, pc.read())
   })

   test('sta', function () {
      mem.write(0, 320)
      alu.write(650)
      cu.executeOne()
      assert.equal(650, mem.read(20))
      assert.equal(1, pc.read())
   })

   test('add', function () {
      alu.write(10)
      mem.write(0, 120)
      mem.write(20, 30)
      cu.executeOne()
      assert.equal(40, alu.read())
      assert.equal(1, pc.read())
   })

   test('sub', function () {
      mem.write(0, 230)
      mem.write(30, 550)
      alu.write(700)
      cu.executeOne()
      assert.equal(150, alu.read())
      assert.equal(1, pc.read())
      assert.equal(false, alu.getNegativeFlag())
   })

   test('sub wrap', function () {
      mem.write(0, 230)
      mem.write(30, 550)
      alu.write(500)
      cu.executeOne()
      assert.equal(950, alu.read())
      assert.equal(1, pc.read())
      assert.equal(true, alu.getNegativeFlag())
   })

   test('input', function () {
      mem.write(0, 901)
      cu.executeOne()
      assert.equal(150, alu.read())
      assert.equal(1, pc.read())
   })

   test('output', function () {
      mem.write(0, 902)
      alu.write(300)
      cu.executeOne()
      assert.deepEqual([300], output.getOutputs())
      assert.equal(1, pc.read())
   })

  test('halt', function () {
      cu.executeOne()
      assert.equal(cu.getHalted(), true)
   })

   test('bra', function () {
      alu.write(10)
      mem.write(0, 615)
      cu.executeOne()
      assert.equal(15, pc.read())
   })

   test('brz jump', function () {
      mem.write(0, 720)
      cu.executeOne()
      assert.equal(20, pc.read())
   })

   test('brz not jump', function () {
      alu.write(3)
      mem.write(0, 740)
      cu.executeOne()
      assert.equal(1, pc.read())
   })

   test('brp jump', function () {
      mem.write(0, 812)
      cu.executeOne()
      assert.equal(pc.read(), 12)
   })

   test('brp not jump', function () {
      alu.write(500)
      alu.sub(900)
      mem.write(0, 813)
      cu.executeOne()
      assert.equal(pc.read(), 1)
   })

   test('execute', function () {
      mem.write(0, 520)
      mem.write(20, 170)
      mem.write(1, 130)
      mem.write(30, 50)
      mem.write(2, 0)
      cu.execute()
      assert.equal(220, alu.read())
   })

})
