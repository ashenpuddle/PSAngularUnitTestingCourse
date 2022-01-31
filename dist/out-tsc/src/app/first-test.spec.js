describe('my first test', function () {
    var sut;
    beforeEach(function () {
        sut = {};
    });
    describe('My first test', function () {
        it('should should be true if true', function () {
            // arrange
            sut.a = false;
            // act
            sut.a = true;
            // assert
            expect(sut.a).toBe(true);
        });
    });
});
//# sourceMappingURL=first-test.spec.js.map