suite('ConstantInput', function () {
    test('read one value', function () {
        const input = new ConstantInput(23)
        assert.equal(23, input.read())
        assert.equal(23, input.read())
    })
})

suite('ArrayInput', function () {
    test('read', function () {
        const chainedInput = new ConstantInput(23)
        const input = new ArrayInput([2, 45, 100], chainedInput)
        assert.equal(2, input.read())
        assert.equal(45, input.read())
        assert.equal(100, input.read())
        assert.equal(23, input.read())
        assert.equal(23, input.read())
    })
})

suite('ArrayOutput', function () {
    test('write', function () {
        const output = new ArrayOutput()
        output.write(2)
        output.write(34)
        output.write(999)
        assert.deepEqual ([2,34,999], output.outputs)
    })
})
