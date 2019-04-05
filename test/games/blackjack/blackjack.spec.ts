import * as mocha from 'mocha';
import * as chai from 'chai';

declare function describe(name:string,object: any): any;
declare function it(name:string,object: any): any;

var assert = require("assert");

const expect = chai.expect;
describe('Blackjack Game', () => {

  it('should run the game' , () => {
    //expections below
    expect(1).be.equal(1);
  });

});