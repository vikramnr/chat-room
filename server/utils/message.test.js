var expect = require('expect');
var {generateMessage} = require('./message');

describe('generate message', () => {
    it('should return correct message object', () => {
        var from = 'Jen';
        var text = 'hello';
        var message = generateMessage(from, text)
        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number')
    })
});