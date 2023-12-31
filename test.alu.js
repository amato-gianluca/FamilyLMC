suite('ALU', function () {
    let alu

    setup(function () {
        alu = new ALU()
    })

    test('read new alu', function () {
        assert.equal(0, alu.read())
    })

    test('read after write', function () {
        alu.write(100)
        assert.equal(100, alu.read())
    })

    test('reset', function () {
        alu.write(100)
        alu.reset()
        assert.equal(0, alu.read())
    })

    test('add', function () {
        alu.write(100)
        alu.add(200)
        assert.equal(300, alu.read())
    })

    test('addwrap', function () {
        alu.write(800)
        alu.add(250)
        assert.equal(50, alu.read())
    })

    test('sub', function () {
        alu.write(300)
        alu.sub(200)
        assert.equal(100, alu.read())
        assert.equal(false, alu.getNegativeFlag())
    })

    test('subwrap', function () {
        alu.write(200)
        alu.sub(350)
        assert.equal(850, alu.read())
        assert.equal(true, alu.getNegativeFlag())
    })

    test('subwrap2', function () {
        alu.write(200)
        alu.sub(350)
        assert.equal(850, alu.read())
        assert.equal(true, alu.getNegativeFlag())
        alu.write(300)
        alu.sub(200)
        assert.equal(100, alu.read())
        assert.equal(false, alu.getNegativeFlag())
    })
})
