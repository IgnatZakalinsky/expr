describe('global', () => {

    // describe('local1', async () => {
    describe('local1', () => {
        it('should 1', async () => {
            expect(1).toBe(1)
        })
    })

    describe('local2', () => {
        it('should 1', async () => {
            expect(0).toBe(1)
        })
    })
})
