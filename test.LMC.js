var assert = chai.assert

suite('Memory', function () {
    var mem = new Memory()
    test('read new memory', function () {
        assert.equal(0, mem.read(4))
    })
    test('read after write', function () {
        mem.write(4, 100)
        assert.equal(100, mem.read(4))
    })
    test('read after reset', function () {
        mem.write(4, 100)
        mem.reset()
        assert.equal(0, mem.read(4))
    })
})

suite('Calculator', function () {
    var calc = new Calculator()
    test('read new calculator', function () {
        assert.equal(0, calc.read())
    })
    test('read after write', function () {
        calc.write(100)
        assert.equal(100, calc.read())
    })
    test('reset', function () {
        calc.write(100)
        calc.reset()
        assert.equal(0, calc.read())
    })
    test('add', function () {
        calc.write(100)
        calc.add(200)
        assert.equal(300, calc.read())
    })
    test('addwrap', function () {
        calc.write(800)
        calc.add(250)
        assert.equal(50, calc.read())
    })
    test('sub', function () {
        calc.write(300)
        calc.sub(200)
        assert.equal(100, calc.read())
    })
    test('subwrap', function () {
        calc.write(200)
        calc.sub(350)
        assert.equal(850, calc.read())
    })
})

suite('PC', function () {
    var pc = new PC()
    test('read after new', function () {
        assert.equal(0, pc.value)
    })
    test('read after write', function () {
        pc.write(100)
        assert.equal(100, pc.value)
    })
    test('increment', function () {
        pc.write(100)
        pc.increment()
        assert.equal(101, pc.value)
    })
    test('reset', function () {
        pc.write(100)
        pc.reset()
        assert.equal(0, pc.value)
    })

    // addwrap
})
