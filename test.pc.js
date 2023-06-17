suite('PC', function () {
    let pc = new PC()

    test('read after new', function () {
        assert.equal(0, pc.read())
    })
    test('read after write', function () {
        pc.write(100)
        assert.equal(100, pc.read())
    })
    test('increment', function () {
        pc.write(100)
        pc.increment()
        assert.equal(101, pc.read())
    })
    test('incrementwrap', function () {
        pc.write(999)
        pc.increment()
        assert.equal(0, pc.read())
    })
    test('reset', function () {
        pc.write(100)
        pc.reset()
        assert.equal(0, pc.read())
    })

})
