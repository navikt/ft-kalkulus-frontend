import PropTypes from 'prop-types';

const kodeverkObjektPropType = PropTypes.shape({
    kode: PropTypes.string.isRequired,
    kodeverk: PropTypes.string,
});

export default kodeverkObjektPropType;
