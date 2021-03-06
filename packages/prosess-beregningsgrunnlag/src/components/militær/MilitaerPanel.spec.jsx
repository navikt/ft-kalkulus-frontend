import React from 'react';
import { expect } from 'chai';
import { aktivitetStatus, shallowWithIntl, formatCurrencyNoKr } from '@navikt/ft-kalkulus-frontend-felles';
import { MilitaerPanel as UnwrappedForm } from './MilitaerPanel';

const periode = {
  bruttoPrAar: 300000,
  beregningsgrunnlagPrStatusOgAndel: [
    {
      aktivitetStatus: {
        kode: aktivitetStatus.MILITAER_ELLER_SIVIL,
      },
      beregnetPrAar: 290000,
    },
  ],
};

describe('<MilitaerPanel>', () => {
  it('skal teste at korrekt brutto vises for militær', () => {
    const wrapper = shallowWithIntl(<UnwrappedForm
      alleAndeler={periode.beregningsgrunnlagPrStatusOgAndel}
    />);
    const elements = wrapper.find('Element');
    expect(elements).to.have.length(2);
    expect(elements.at(1).children().text()).to.equal(formatCurrencyNoKr(290000));
    const formattedMessages = wrapper.find('FormattedMessage');
    expect(formattedMessages.prop('id')).to.eql('Beregningsgrunnlag.AarsinntektPanel.Militær');
  });
});
