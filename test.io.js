suite('ConstantInput', function () {
    let input

    setup(function () {
        input = new ConstantInput(23)
    })

    test('read', function () {
        assert.equal(23, input.read())
        assert.equal(23, input.read())
    })
    test('read and reset', function () {
        assert.equal(23, input.read())
        assert.equal(23, input.read())
        input.reset()
        assert.equal(23, input.read())
        assert.equal(23, input.read())
    })
})

suite('ArrayInput', function () {
    let input

    setup(function () {
        input = new ArrayInput([2, 45, 100], new ConstantInput(23))
    })

    test('read', function () {
        assert.equal(2, input.read())
        assert.equal(45, input.read())
        assert.equal(100, input.read())
        assert.equal(23, input.read())
        assert.equal(23, input.read())
    })
    test('read and reset', function () {
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
    let output

    setup(function () {
        output = new ArrayOutput()
    })

    test('write', function () {
        output.write(2)
        output.write(34)
        const out1 = output.getOutputs()
        assert.deepEqual([2, 34], out1)
        output.write(999)
        assert.deepEqual([2, 34], out1)
        assert.deepEqual([2, 34, 999], output.getOutputs())
    })

    test('write and reset', function () {
        output.write(2)
        output.write(34)
        const out1 = output.getOutputs()
        assert.deepEqual([2, 34], out1)
        output.reset()
        output.write(10)
        output.write(12)
        output.write(999)
        assert.deepEqual([2, 34], out1)
        assert.deepEqual([10, 12, 999], output.getOutputs())
    })
})
