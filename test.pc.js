var assert = chai.assert

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
