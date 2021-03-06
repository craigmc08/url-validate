var assert = require('assert');
const urlValidate = require('../index.js');

describe('urlValidate', () => {
  it('should return true for a string that starts with a valid protocol', () => {
    assert.equal(true, urlValidate('http://google'));
    assert.equal(true, urlValidate('http://google_'));
    assert.equal(true, urlValidate('https://google'));
    assert.equal(false, urlValidate('httpd://google.com'));
  });
  it('should return false for any string with a space', () => {
    assert.equal(false, urlValidate('http://google google'));
    assert.equal(false, urlValidate('http://google .com'));
  });
  it('should return true for a string that has a domain and valid TLD', () => {
    assert.equal(true, urlValidate('google.com'));
    assert.equal(true, urlValidate('blog.google'));
    assert.equal(true, urlValidate('electron.io'));
    assert.equal(false, urlValidate('google.come'));
  });
  it('should return false for a string with no domain', () => {
    assert.equal(false, urlValidate('google'));
  });
});
