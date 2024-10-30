var assert = require('assert');

const { authenticatePass, authenticateEmail, authenticateUserName}  = require('./src/Pages/createAccount/create');

describe('authenticateEmail', () => {

    it('returns 1 if it follows the correct structure', () => {
        assert.equal(authenticateEmail("johnDOE@mail.mail"), 1);
    });

    it ('returns -1 if it does not have a proper structure', () => {
        //missing extension
        assert.equal(authenticateEmail("John@popularEmailSite"), -1);

        //missing '@'
        assert.equal(authenticateEmail("johndoegmail.com"), -1);

        //banned inputs (spaces)
        assert.equal(authenticateEmail("John Doe @mail.mail"), -1);
    });
});

describe('authenticatePass', () => {

    it('returns 1 if it is a proper password', () => {
        assert.equal(authenticatePass("A1b2C#D$"), 1);
    });

    it('returns -1 if it is an improper password', () => {
        
        //too short
        assert.equal(authenticatePass("5Fji"), -1);

        //doesn't have a capital letter
        assert.equal(authenticatePass("j45htyu"), -1);

        //doesn't have a number
        assert.equal(authenticatePass("jUhUirt"), -1);

        //Banned inputs (spaces)
        assert.equal(authenticatePass("jUyer 345"), -1);

    })
});

describe('authenticateUserName', () => {

    it('returns 1 if follows the proper structure', () =>{
        assert.equal(authenticateUserName("JohnDoe123"), 1);
    });

    it('returns -1 if it is an improper username', () => {
        //Isn't alphanumeric (uses special characters)
        assert.equal(authenticateUserName("J0hnD0&321"), -1);
        
        //Banned inputs (spaces)
        assert.equal(authenticateUserName("John Adam1234"), -1);

    });

});

