import PropTypes from 'prop-types';

import kodeverkObjektPropType from './beregningsgrunnlagKodeverkPropType';

const beregningsgrunnlagVilkarPropType = PropTypes.shape({
  vilkarType: kodeverkObjektPropType.isRequired,
  vilkarStatus: kodeverkObjektPropType.isRequired,
});

export default beregningsgrunnlagVilkarPropType;
