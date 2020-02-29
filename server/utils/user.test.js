const expect = require('expect');
const {
    User
} = require('./user');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new User();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'nodeCourse'
        }, {
            id: '2',
            name: 'Jans',
            room: 'Rasc Course'
        }, {
            id: '4',
            name: 'Posk',
            room: 'nodeCourse'
        }]
    });
    it('should add new user', () => {
        var users = new User();
        var user = {
            id: 123,
            name: 'andrew',
            room: 'otter bays'
        }

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should find a user', () => {
        var userID = '2'
        user = users.getUser(userID)
        expect(user.id).toEqual(userID)
    });

    it('should not find user for invalid id', () => {
        var userID = '122'
        user = users.getUser(userID)
        expect(user).toBeUndefined();
    });

    it('should remove user', () => {
        var userID = '1'
        var user = users.removeUser(userID);
        expect(user.id).toBe(userID)
        expect(users.users.length).toEqual(2);
    });

    it('should not remove user', () => {
        var userID = '1231';
        var user = users.removeUser(userID);
        expect(user).toBeFalsy();
        expect(users.users.length).toEqual(3);
    });

    it('should return names for nodeCourse', () => {
        var userList = users.getUserList('nodeCourse')
        expect(userList).toEqual(['Mike', 'Posk'])
    })
})