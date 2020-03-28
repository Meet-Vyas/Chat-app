[{
  id: '3516afed',
  name: 'Meet',
  room: 'CSE'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    // an empty array
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // var user = this.users.filter((user) => user.id === id);
    var user = this.getUser(id);
    if (user) {
      this.users.pop(user);
      // this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser (id) {
    var user = this.users.filter((user) => user.id === id);
    return user[0];
  }
  getUserList (room) {
    // filter takes function as an argument
    var users = this.users.filter((user) => user.room === room);
    // now we just need name in the array rather than an array of objects
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// // in js u call a class with the first letter capital
// class Person {
//   constructor (name, age) {
//     // using this we customize individual instance
//     // here just giving out name and age will give everyone that there won't be a dB
//     // instance will give us a dB
//     // this will help in accessing the prop of the object
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// var me = new Person('Meet', 21);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
// console.log(me.getUserDescription());
