import { expect } from 'chai';
import {
  dateFormat,
} from './dateUtils';

  describe('dateFormat', () => {
    it('Skal formatere en dato til ISO', () => {
      const dateTime = '2017-08-02T01:54:25.455';
      expect(dateFormat(dateTime)).is.eql('02.08.2017');
    });
  });
