import PropTypes from 'prop-types';

import kodeverkObjektPropType from './beregningsgrunnlagKodeverkPropType';

const beregningsgrunnlagBehandlingPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  versjon: PropTypes.number.isRequired,
  sprakkode: kodeverkObjektPropType.isRequired,
});

export default beregningsgrunnlagBehandlingPropType;
