var assert = chai.assert

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
