const { Dog, Temperament, conn } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', function() {
 
  describe('Dog model', function () {
    beforeEach(async function() {
      await Dog.sync({ force: true });
    });
    describe('Validations', function () {
      it('Should not be created without all required fields completed', function(done) {
         Dog.create({
          name: 'Galgo',
         })
          .then(() => done('Should not have been created!'))
          .catch(() => done());
      });
      it('Should not be created without all required fields completed', function(done) {
        Dog.create({
          height: 'New',
        })
        .then(() => done('Should not have been created!'))
        .catch(() => done());
      });
    });
  })
  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperament.sync({ force: true });
    });
        it('Should not be created without all required fields completed', function(done) {
        Temperament.create({
          id: '18',
        })
        .then(() => done('Should not have been created!'))
        .catch(() => done());
      });
      it('Name should be a string', function(){
        expect(typeof Temperament.name).equal("string")
      })
    });
})
