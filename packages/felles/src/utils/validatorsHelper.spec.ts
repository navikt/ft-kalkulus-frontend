import { expect } from 'chai';
import {
  isEmpty,
  textGyldigRegex,
  textRegex,
} from './validatorsHelper';

describe('textRegex', () => {
  it('Skal sjekke om input er tekst', () => {
    expect(textRegex.test('text')).is.true;
    expect(textRegex.test('3434')).is.true;
  });
});

describe('textGyldigRegex', () => {
  it('Skal sjekke om input er i gyldig tekst format', () => {
    expect(textGyldigRegex.test('Text')).is.true;
  });
});

describe('isEmpty', () => {
  it('Skal sjekke om input er tom', () => {
    const emptyText = null;
    const text = 'Not Empty';
    expect(isEmpty(emptyText)).is.true;
    expect(isEmpty(text)).is.false;
  });
});
