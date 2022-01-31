import { StrengthPipe } from './strength.pipe';
describe('Strength Pipe', function () {
    it('should display "(Weak)" when strength is 5', function () {
        var pipe = new StrengthPipe();
        expect(pipe.transform(5)).toEqual('5 (weak)');
    });
});
//# sourceMappingURL=strength.pipe.spec.js.map