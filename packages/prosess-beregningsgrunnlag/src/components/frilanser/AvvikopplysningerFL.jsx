import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { sammenligningType, FlexRow } from '@navikt/ft-kalkulus-frontend-felles';

import { Column } from 'nav-frontend-grid';
import AvvikopplysningerATFL from '../fellesPaneler/AvvikopplysningerATFLSN';

const AvviksopplysningerFL = ({
  relevanteStatuser, sammenligningsgrunnlagPrStatus, beregnetAarsinntekt,
}) => {
  const kombinasjonsstatusFNSN = relevanteStatuser.isKombinasjonsstatus
    && !relevanteStatuser.isArbeidstaker
    && relevanteStatuser.isSelvstendigNaeringsdrivende
    && relevanteStatuser.isFrilanser;
  const kombinasjonsstatusATFL = relevanteStatuser.isKombinasjonsstatus
    && relevanteStatuser.isArbeidstaker
    && relevanteStatuser.isFrilanser;
  if (kombinasjonsstatusFNSN) {
    return (
      <FlexRow>
        <Column xs="12">
          <Normaltekst>
            <FormattedMessage id="Beregningsgrunnlag.Avviksopplysninger.FL.KobinasjonsStatusFLSN" />
          </Normaltekst>
        </Column>
      </FlexRow>
    );
  }
  const sammenligningsGrunnlagFL = sammenligningsgrunnlagPrStatus
    ? sammenligningsgrunnlagPrStatus.find((status) => status.sammenligningsgrunnlagType.kode === sammenligningType.FL
      || status.sammenligningsgrunnlagType.kode === sammenligningType.ATFLSN)
    : undefined;
  if (!sammenligningsGrunnlagFL) {
    return null;
  }
  if (kombinasjonsstatusATFL && sammenligningsgrunnlagPrStatus.find((status) => status.sammenligningsgrunnlagType.kode === sammenligningType.ATFLSN)) {
    return null;
  }
  const avvikFL = sammenligningsGrunnlagFL.avvikProsent !== undefined ? sammenligningsGrunnlagFL.avvikProsent : '';
  const avvikRoundedFL = avvikFL ? parseFloat((avvikFL.toFixed(1))) : 0;
  const sammenligningsgrunnlagSumFL = sammenligningsGrunnlagFL.rapportertPrAar;
  const { differanseBeregnet } = sammenligningsGrunnlagFL;
  const visPaneler = {
    visAT: false,
    visFL: true,
    visSN: false,
  };
  return (
    <AvvikopplysningerATFL
      beregnetAarsinntekt={beregnetAarsinntekt}
      avvikProsentAvrundet={avvikRoundedFL}
      differanseBeregnet={differanseBeregnet}
      relevanteStatuser={relevanteStatuser}
      visPanel={visPaneler}
      sammenligningsgrunnlagSum={sammenligningsgrunnlagSumFL}
    />
  );
};

AvviksopplysningerFL.propTypes = {
  beregnetAarsinntekt: PropTypes.number,
  sammenligningsgrunnlagPrStatus: PropTypes.arrayOf(PropTypes.shape()),
  relevanteStatuser: PropTypes.shape().isRequired,
};

AvviksopplysningerFL.defaultProps = {
  beregnetAarsinntekt: undefined,
  sammenligningsgrunnlagPrStatus: undefined,
};
export default AvviksopplysningerFL;
