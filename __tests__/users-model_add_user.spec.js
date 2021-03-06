const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const Users = require('../helpers/users-model');

// test Users DB
describe('Users Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });
  // register or add a new user
  describe('addUser()', () => {
    it('can add a user to the DB', async () => {
      //mock users
      const mock_user_1 = {
        email: 'test1@gmail.com',
        username: 'IronMan',
        password: 'IAmIronMan',
        track_id: 2
      };
      const mock_user_2 = {
        email: 'test2@gmail.com',
        username: 'Thor',
        password: 'GodOfThunder',
        track_id: 3
      };
      const mock_user_3 = {
        email: 'test3@gmail.com',
        username: 'Rocket',
        password: 'M3chanic',
        track_id: 4
      };

      await Users.addUser(mock_user_1);
      await Users.addUser(mock_user_2);
      await Users.addUser(mock_user_3);

      const users = await db('users');
      // check they have been added to the db
      expect(users).toHaveLength(3);
      // double check db for a specific username
      expect(users[1].username).toBe(mock_user_2.username);
    });
  });
});
