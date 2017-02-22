import BaseJoi from 'joi';
import {assert} from 'chai';

import JoiVerhoeff from '../lib';

const Joi = BaseJoi.extend(JoiVerhoeff);

describe('string', () => {
  describe('verhoeff()', () => {
    it('validates strings with a valid check digit', () => {
      const testValue = '698757';
      const testResult = Joi.validate(testValue, Joi.string().verhoeff());
      assert.isNotOk(testResult.error, 'should not produce an error');
      assert.equal(testResult.value, testValue, 'should output the input value');
    });

    it('does not validate strings with an invalid check digit', () => {
      const testValue = '698752';
      const testResult = Joi.validate(testValue, Joi.string().verhoeff());
      assert.isOk(testResult.error, 'should produce an error');
      assert.isTrue(testResult.error.isJoi, 'should produce a Joi error');
      assert.equal(testResult.error.details[0].type, 'string.verhoeff', 'should produce an verhoeff validation error');
      assert.equal(testResult.value, testValue, 'should output the input value');
    });

    it('produces valid, useful error', () => {
      const testValue = '698753';
      const testResult = Joi.validate(testValue, Joi.string().verhoeff());
      assert.isOk(testResult.error, 'should produce an error');
      assert.isTrue(testResult.error.isJoi, 'should produce a Joi error');
      assert.equal(testResult.error.details[0].type, 'string.verhoeff', 'should produce an verhoeff validation error');
      assert.match(testResult.error.message, /checksum failure/, 'should produce an error containing the ' +
        'expected string');
    });

    it('does not validate values that are not strings', () => {
      const testValue = 698752;
      const testResult = Joi.validate(testValue, Joi.string().verhoeff());
      assert.isOk(testResult.error, 'should produce an error');
      assert.isTrue(testResult.error.isJoi, 'should produce a Joi error');
      assert.equal(testResult.error.details[0].type, 'string.base', 'should produce an string validation error');
    });

    it('does not validate strings that are not all digits', () => {
      const testValue = ' 3942h';
      const testResult = Joi.validate(testValue, Joi.string().verhoeff());
      assert.isOk(testResult.error, 'should produce an error');
      assert.isTrue(testResult.error.isJoi, 'should produce a Joi error');
      assert.equal(testResult.error.details[0].type, 'string.verhoeff', 'should produce an verhoeff validation error');
    });
  });
});
