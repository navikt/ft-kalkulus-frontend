import { expect } from 'chai';
import {
  hasValidText,
  maxLength,
  minLength,
  required,
} from './validators';

describe('Validators', () => {
  describe('required', () => {
    it('skal gi feilmelding når verdi er lik null', () => {
      const result = required(null);
      expect(result).has.length(1);
      expect(result[0]).is.eql({ id: 'ValidationMessage.NotEmpty' });
    });

    it('skal gi feilmelding når verdi er lik undefined', () => {
      const result = required(undefined);
      expect(result).has.length(1);
      expect(result[0]).is.eql({ id: 'ValidationMessage.NotEmpty' });
    });

    it('skal ikke gi feilmelding når verdi er ulik null og undefined', () => {
      const result = required('test');
      expect(result).is.undefined;
    });
  });

  describe('minLength', () => {
    it('skal feile når verdi er mindre enn minimum lengde', () => {
      const minLength2 = minLength(2);
      const result = minLength2('e');
      expect(result).has.length(2);
      expect(result[0]).is.eql({ id: 'ValidationMessage.MinLength' });
      expect(result[1]).is.eql({ length: 2 });
    });

    it('skal ikke feile når verdi er større eller lik minimum lengde', () => {
      const minLength2 = minLength(2);
      const result = minLength2('er');
      expect(result).is.null;
    });
  });

  describe('maxLength', () => {
    it('skal feile når verdi er større enn maksimum lengde', () => {
      const maxLength2 = maxLength(2);
      const result = maxLength2('ert');
      expect(result).has.length(2);
      expect(result[0]).is.eql({ id: 'ValidationMessage.MaxLength' });
      expect(result[1]).is.eql({ length: 2 });
    });

    it('skal ikke feile når verdi er mindre eller lik minimum lengde', () => {
      const maxLength2 = maxLength(2);
      const result = maxLength2('er');
      expect(result).is.null;
    });
  });

  describe('hasValidText', () => {
    it('skal ikke feile når tekst ikke har ugyldig tegn', () => {
      const result = hasValidText('Hei hei\n'
        + 'Áá Čč Đđ Ŋŋ Šš Ŧŧ Žž Ää Ææ Øø Åå\n'
        + 'Lorem + ipsum_dolor, - (sit) amet?! 100%: §2&3="I\'m";');
      expect(result).is.null;
    });

    it('skal feile når fødselsnummer har ugyldige tegn', () => {
      const result = hasValidText('Hei {}*');
      expect(result).has.length(2);
      expect(result[0]).is.eql({ id: 'ValidationMessage.InvalidText' });
      expect(result[1]).is.eql({ text: '{}*' });
    });
  });
});
