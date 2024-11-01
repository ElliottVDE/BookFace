/* 
Unit tests for create.js
- Requires node.js and mocha framework
- Uncommemnt the export section in create.js to get the tests working properly
- For some reason, the test doesn't like any reference of document in create.js, so to get the test to
work, they need to be commented out. (I will look into why this is the case in the future)
*/


var assert = require('assert');

const { authenticatePass, authenticateEmail, authenticateUserName }  = require('../src/Pages/createAccount/create.js');

describe('authenticateEmail', () => {

    it('returns true if it follows the correct structure', () => {
        assert.equal(authenticateEmail("johnDOE@mail.mail"), true);
    });

    it ('returns false if it does not have a proper structure', () => {
        //missing extension
        assert.equal(authenticateEmail("John@popularEmailSite"), false);

        //missing '@'
        assert.equal(authenticateEmail("johndoegmail.com"), false);

        //banned inputs (spaces)
        assert.equal(authenticateEmail("John Doe @mail.mail"), false);
    });
});

describe('authenticatePass', () => {

    it('returns true if it is a proper password', () => {
        //Proper password and re-type
        assert.equal(authenticatePass("A1b2C#D$", "A1b2C#D$"), true);
    });

    it('returns false if it is an improper password', () => {
        
        //too short
        assert.equal(authenticatePass("5Fji", "5Fji"), false);

        //doesn't have a capital letter
        assert.equal(authenticatePass("j45htyu", "j45htyu"), false);

        //doesn't have a number
        assert.equal(authenticatePass("jUhUirt", "jUhUirt"), false);

        //retype doesn't match
        assert.equal(authenticatePass("test123", "test321"), false);

        //Banned inputs (spaces)
        assert.equal(authenticatePass("jUyer 345", "jUyer 345"), false);

    })
});

describe('authenticateUserName', () => {

    it('returns true if follows the proper structure', () =>{
        assert.equal(authenticateUserName("JohnDoe123"), true);
    });

    it('returns false if it is an improper username', () => {
        //Isn't alphanumeric (uses special characters)
        assert.equal(authenticateUserName("J0hnD0&321"), false);
        
        //Banned inputs (spaces)
        assert.equal(authenticateUserName("John Adam1234"), false);

    });

});

