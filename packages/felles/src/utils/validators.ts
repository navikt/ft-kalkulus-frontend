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

export const ariaCheck = () => {
  let errors;
  setTimeout(() => {
    if (document.getElementsByClassName('skjemaelement__feilmelding').length > 0) {
      errors = document.getElementsByClassName('skjemaelement__feilmelding');
    } else if (document.getElementsByClassName('alertstripe--advarsel')) {
      errors = (document.getElementsByClassName('alertstripe--advarsel'));
    }
    if (errors && errors.length > 0) {
      const ariaNavTab = document.createAttribute('tabindex');
      ariaNavTab.value = '-1';
      const firstError = errors[0];
      firstError.setAttributeNode(ariaNavTab);
      const element = document.activeElement as HTMLElement;
      element.blur();
      firstError.focus();
    }
  }, 300);
};
