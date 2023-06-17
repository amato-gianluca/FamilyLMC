suite('ConstantInput', function () {
    test('read', function () {
        const input = new ConstantInput(23)
        assert.equal(23, input.read())
        assert.equal(23, input.read())
    })
    test('read and reset', function () {
        const input = new ConstantInput(23)
        assert.equal(23, input.read())
        assert.equal(23, input.read())
        input.reset()
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
    test('read and reset', function () {
        const chainedInput = new ConstantInput(23)
        const input = new ArrayInput([2, 45, 100], chainedInput)
        assert.equal(2, input.read())
        assert.equal(45, input.read())
        input.reset()
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
        const out1 = output.outputs
        assert.deepEqual ([2,34], out1)
        output.write(999)
        assert.deepEqual ([2,34], out1)
        assert.deepEqual ([2,34,999], output.outputs)
    })

    test('write and reset', function () {
        const output = new ArrayOutput()
        output.write(2)
        output.write(34)
        const out1 = output.outputs
        assert.deepEqual([2,34], out1)
        output.reset()
        output.write(10)
        output.write(12)
        output.write(999)
        assert.deepEqual([2,34], out1)
        assert.deepEqual([10,12,999], output.outputs)
    })
})
