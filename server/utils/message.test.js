var expect = require('expect');
var {
    generateMessage,
    generateLocationMessage
} = require('./message');

describe('generate message', () => {
    it('should return correct message object', () => {
        var from = 'Jen';
        var text = 'hello';
        var message = generateMessage(from, text)
        expect(message).toMatchObject({
            from,
            text
        });
        expect(typeof message.createdAt).toBe('number')
    })
});

describe('generat location', () => {
    it('should return loaction object', () => {
        var from = 'jem';
        var lat = '15';
        var long = '16';
        var url = `https://www.google.com/maps?q=${lat},${long}`;
        var location = generateLocationMessage(from, lat, long);
        expect(location).toMatchObject({
            from,
            url
        })
        expect(typeof location.createdAt).toBe('number');

    });
})