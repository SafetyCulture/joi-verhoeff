# joi-verhoeff

[![Build Status](https://travis-ci.org/SafetyCulture/joi-verhoeff.svg?branch=master)](https://travis-ci.org/SafetyCulture/joi-verhoeff)
[![Coverage Status](https://coveralls.io/repos/github/SafetyCulture/joi-verhoeff/badge.svg?branch=master)](https://coveralls.io/github/SafetyCulture/joi-verhoeff?branch=master)

Provides a Joi rule to validate strings as sequences of numerals with a valid verhoeff checksum digit.  

Strings are validated as being entirely composed of digits, and containing a valid checksum using [node-verhoeff](https://www.npmjs.com/package/node-verhoeff).
 
## Usage

```js
import BaseJoi from 'joi';
import JoiVerhoeff from 'joi-verhoeff';

const Joi = BaseJoi.extend(JoiVerhoeff);

// Create a joi schema using the Verhoeff validator;
const schema = Joi.string().verhoeff();
```

Results with valid checksum:
```js
Joi.validate('3789125', Joi.string().verhoeff());
/*
  {
    error: null,
    value: '3789125'
  }
 */
```

Results with invalid checksum:
```js
Joi.validate('3789122', Joi.string().verhoeff());
/*
{ error: {
    [ValidationError: "value" checksum failure]
    isJoi: true,
    name: 'ValidationError',
    details: [{
      message: '"value" checksum failure',
      path: 'value',
      type: 'string.verhoeff',
      context: { v: '3789122', key: 'value' }
    }],
    ...
  },
  value: '3789122'
}
 */
```


