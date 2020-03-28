const expect = require('expect');

const {Users} = require('./users.js');

describe('Users', () => {
  var users;

  beforeEach (() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Meet',
      room: 'Node course'
    }, {
      id: '2',
      name: 'Vyas',
      room: 'React course'
    }, {
      id: '3',
      name: 'Hallo',
      room: 'Node course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'vyas',
      room: 'cse'
    };
    // responseUser
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove user', () => {
    var resUser = users.removeUser('3');

    expect(resUser.id).toEqual('3');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var resUser = users.removeUser('128');

    expect(resUser).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var resUser = users.getUser('2');

    expect(resUser.id).toEqual('2');
  });

  it('should not find user', () => {
    var resUser = users.getUser('25');

    expect(resUser).toNotExist();
  });

  it('should return names for node course', () => {
    var resUser = users.getUserList('Node course');

    expect(resUser).toEqual(['Meet', 'Hallo']);
  });
});
