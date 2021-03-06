const fs = require('fs');
const path = require('path');

class TextList {
  constructor(file) {
    this.data = null;
    this.file = file;
    this.loadData();
  }

  loadData() {
    const dataRaw = fs.readFileSync(this.file, 'utf8');
    this.data = dataRaw.trim().split('\n').map(v => v.trim().toUpperCase());
  }

  check(value) {
    return this.data.indexOf(value.toUpperCase()) !== -1;
  }

  get() {
    return this.data;
  }
}

module.exports = TextList;
