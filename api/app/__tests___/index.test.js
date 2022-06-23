const atLaunchServer = require('../../index');

console.log(atLaunchServer);
const nodeEnv = process.env.NODE_ENV;

describe('check if NODE_ENV is production or developement', () => {
  it('Should be a string', () => {
    expect(typeof nodeEnv).toBe('string');
  });
  it('Should be developpement or production', () => {
    expect(nodeEnv === 'production' || nodeEnv === 'developpement').toBeTruthy();
  });
});

describe('Port should be a number', () => {
  it('Should be a number', () => {
    expect(typeof parseInt(atLaunchServer.port, 10)).toBe('number');
  });
});

describe('', () => {

});
