import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Element, Normaltekst, EtikettLiten,
} from 'nav-frontend-typografi';
import { VerticalSpacer, aktivitetStatus, formatCurrencyNoKr } from '@navikt/ft-kalkulus-frontend-felles';
import { Column, Row } from 'nav-frontend-grid';
import beregningStyles from '../beregningsgrunnlagPanel/beregningsgrunnlag.less';
import AvsnittSkiller from '../redesign/AvsnittSkiller';

const createHeaderRow = () => (
  <Row key="SNInntektHeader">
    <Column xs="10">
      <EtikettLiten className={beregningStyles.etikettLiten}>
        <FormattedMessage id="Beregningsgrunnlag.AarsinntektPanel.AarHeader" />
      </EtikettLiten>
    </Column>
    <Column xs="2" className={beregningStyles.colAarText}>

      <EtikettLiten className={beregningStyles.etikettLiten}>
        <FormattedMessage id="Beregningsgrunnlag.AarsinntektPanel.TotalPensjonsGivende" />
      </EtikettLiten>
    </Column>
  </Row>
);
const createSumRow = (pgiSnitt) => (
  <>
    {pgiSnitt !== undefined && (
      <>
        <Row key="grunnlagAarsinntektSNLine">
          <Column xs="12" className={beregningStyles.noPaddingRight}>
            <div className={beregningStyles.colDevider} />
          </Column>
        </Row>
        <Row key="grunnlagAarsinntektSN">
          <Column xs="10" className={beregningStyles.rightAlignTextInDiv}>
            <Element>
              <FormattedMessage
                id="Beregningsgrunnlag.AarsinntektPanel.SnittPensjonsGivende"
              />
            </Element>
          </Column>
          <Column xs="2" className={beregningStyles.colAarText}>
            <Element>
              {formatCurrencyNoKr(pgiSnitt)}
            </Element>
          </Column>
        </Row>
      </>
    )}
  </>
);
const createInntektRows = (pgiVerdier) => (
  <>
    {pgiVerdier.map((element) => (
      <Row key={element.årstall}>
        <Column xs="7">
          <EtikettLiten>
            {element.årstall}
          </EtikettLiten>
        </Column>
        <Column xs="5" className={beregningStyles.colAarText}>
          <EtikettLiten>
            {formatCurrencyNoKr(element.beløp)}
          </EtikettLiten>
        </Column>
      </Row>
    ))}
  </>
);

/**
 * GrunnlagForAarsinntektPanelSN
 *
 * Presentasjonskomponent. Viser PGI-verdier for selvstendig næringsdrivende.
 * Vises også hvis status er en kombinasjonsstatus som inkluderer selvstendig næringsdrivende.
 */
export const GrunnlagForAarsinntektPanelSN = ({
  alleAndeler,
}) => {
  const snAndel = alleAndeler.find((andel) => andel.aktivitetStatus.kode === aktivitetStatus.SELVSTENDIG_NAERINGSDRIVENDE);
  if (!snAndel) {
    return null;
  }
  const { pgiVerdier, pgiSnitt } = snAndel;
  return (
    <>
      <AvsnittSkiller luftOver luftUnder />
      <Element className={beregningStyles.avsnittOverskrift}>
        <FormattedMessage id="Beregningsgrunnlag.AarsinntektPanel.Pensjonsgivendeinntekt" />
      </Element>
      <VerticalSpacer eightPx />
      <Row key="SNInntektIngress">
        <Column xs="8">
          <Normaltekst>
            <FormattedMessage id="Beregningsgrunnlag.AarsinntektPanel.SN.sisteTreAar" />
          </Normaltekst>
        </Column>
      </Row>
      <VerticalSpacer fourPx />
      {createHeaderRow()}
      {createInntektRows(pgiVerdier)}
      {createSumRow(pgiSnitt)}

    </>
  );
};

GrunnlagForAarsinntektPanelSN.propTypes = {
  alleAndeler: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default GrunnlagForAarsinntektPanelSN;
