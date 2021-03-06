import React from 'react';
import { expect } from 'chai';
import { shallowWithIntl, aktivitetStatus } from '@navikt/ft-kalkulus-frontend-felles';

import AvviksopplysningerSN from './AvvikopplysningerSN';

const sammenligningsgrunnlag = (kode) => ({
  sammenligningsgrunnlagFom: '2018-09-01',
  sammenligningsgrunnlagTom: '2019-10-31',
  rapportertPrAar: 330000,
  avvikPromille: 275,
  avvikProsent: 27.5,
  sammenligningsgrunnlagType: {
    kode,
  },
  differanseBeregnet: 12100,
});
const forstePeriode = [
  {
    pgiSnitt: 100,
    aktivitetStatus:
      {
        kode: aktivitetStatus.SELVSTENDIG_NAERINGSDRIVENDE,
      },
    næringer: [
      {
        erVarigEndret: false,
        erNyoppstartet: false,
      },
    ],
    erNyIArbeidslivet: false,
  },
];

describe('<AvviksopplysningerSN>', () => {
  it('Skal teste komponenten ved erNyArbLivet', () => {
    forstePeriode[0].erNyIArbeidslivet = true;
    const sammenligningsgrunnlagPrStatus = sammenligningsgrunnlag('SAMMENLIGNING_SN');
    const wrapper = shallowWithIntl(<AvviksopplysningerSN
      sammenligningsgrunnlagPrStatus={[sammenligningsgrunnlagPrStatus]}
      alleAndelerIForstePeriode={forstePeriode}
      relevanteStatuser={{ isKombinasjonsstatus: false }}
    />);
    const rows = wrapper.find('FlexRow');
    expect(rows).to.have.length(1);
    const omregnetAarsinntektText = rows.first().find('FormattedMessage');
    expect(omregnetAarsinntektText.first().prop('id')).to.eql('Beregningsgrunnlag.Avviksopplysninger.SN.NyIArbeidslivet');
  });
  it('Skal teste komponenten ved !erVarigEndring && !erNyoppstartet', () => {
    forstePeriode[0].erNyIArbeidslivet = false;
    forstePeriode[0].næringer[0].erVarigEndret = false;
    forstePeriode[0].næringer[0].erNyoppstartet = false;
    const sammenligningsgrunnlagPrStatus = sammenligningsgrunnlag('SAMMENLIGNING_SN');
    const wrapper = shallowWithIntl(<AvviksopplysningerSN
      sammenligningsgrunnlagPrStatus={[sammenligningsgrunnlagPrStatus]}
      alleAndelerIForstePeriode={forstePeriode}
      relevanteStatuser={{ isKombinasjonsstatus: false }}
    />);
    const rows = wrapper.find('FlexRow');
    expect(rows).to.have.length(1);
    const omregnetAarsinntektText = rows.first().find('FormattedMessage');
    expect(omregnetAarsinntektText.first().prop('id')).to.eql('Beregningsgrunnlag.Avviksopplysninger.SN.IkkeVarigEndring');
  });
  it('Skal teste at komponenten render avvikstabell', () => {
    forstePeriode[0].erNyIArbeidslivet = false;
    forstePeriode[0].næringer[0].erVarigEndret = true;
    const sammenligningsgrunnlagPrStatus = sammenligningsgrunnlag('SAMMENLIGNING_SN');
    const wrapper = shallowWithIntl(<AvviksopplysningerSN
      sammenligningsgrunnlagPrStatus={[sammenligningsgrunnlagPrStatus]}
      alleAndelerIForstePeriode={forstePeriode}
      relevanteStatuser={{ isKombinasjonsstatus: false }}
    />);
    const avviksTabell = wrapper.find('AvvikopplysningerATFLSN');
    expect(avviksTabell).to.have.length(1);
  });
});
