import {
  invalidTextMessage,
  isRequiredMessage,
  maxLengthMessage,
  minLengthMessage,
} from './messages';
import {
  isEmpty,
  textGyldigRegex,
  textRegex,
} from './validatorsHelper';

export const required = (value) => (isEmpty(value) ? isRequiredMessage() : undefined);

export const minLength = (length) => (text) => (isEmpty(text) || text.toString().trim().length >= length ? null : minLengthMessage(length));
export const maxLength = (length) => (text) => (isEmpty(text) || text.toString().trim().length <= length ? null : maxLengthMessage(length));


export const hasValidText = (text) => {
  if (!textRegex.test(text)) {
    const illegalChars = text.replace(textGyldigRegex, '');
    return invalidTextMessage(illegalChars.replace(/[\t]/g, 'Tabulatortegn'));
  }
  return null;
};
