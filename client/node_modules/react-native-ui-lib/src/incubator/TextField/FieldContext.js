import _ from 'lodash';
import React, { createContext } from 'react';
const FieldContext = createContext({
  isFocused: false,
  hasValue: false,
  isValid: true,
  failingValidatorIndex: undefined,
  disabled: false,
  validateField: _.noop
});
export default FieldContext;