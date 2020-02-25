const expect = require('expect');
const {
    isRealString
} = require('./validation');

describe('isRealString', ()=> {
    it('should reject non-string values', () => {
        var res = isRealString(83);
        expect(res).toBe(false);
    })
    it('should reject empty string values', () => {
        var res = isRealString('     ');
        expect(res).toBe(false);
    })
    it('should allow empty string values', () => {
        var res = isRealString(' Andrew ');
        expect(res).toBe(true);
    })

    it('should allow string values', () => {
        var res = isRealString('Deparam');
        expect(res).toBe(true);
    })
})