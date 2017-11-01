# url-validate
Validates URLS.

### Example
```js
const validateURL = require('url-validate');

validateURL('https://google.com');
// Returns true

validateURL('google.com');
// Returns true

validateURL('192.168.1.1');
// Returns true
```
Does not support ports (such as `google.com:8080`), yet.
