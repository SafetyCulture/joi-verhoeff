import Joi from 'joi';
import verhoeff from 'node-verhoeff';

module.exports = {
  base: Joi.string(),
  name: 'string',
  language: { verhoeff: 'checksum failure'},
  rules: [{
    name: 'verhoeff',
    validate(params, value, state, options) {
      if (!(value.match(/^\d+$/) && verhoeff.validate(value))) {
        return this.createError('string.verhoeff', { v: value }, state, options)
      }

      return value;
    }
  }]
};
