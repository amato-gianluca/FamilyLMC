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