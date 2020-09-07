import PropTypes from 'prop-types';

import kodeverkObjektPropType from './beregningsgrunnlagKodeverkPropType';

const beregningsgrunnlagAksjonspunkterPropType = PropTypes.shape({
  definisjon: kodeverkObjektPropType.isRequired,
  status: kodeverkObjektPropType.isRequired,
  begrunnelse: PropTypes.string,
});

export default beregningsgrunnlagAksjonspunkterPropType;
