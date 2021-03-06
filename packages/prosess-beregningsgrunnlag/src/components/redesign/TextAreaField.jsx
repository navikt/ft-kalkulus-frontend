import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Textarea as NavTextarea } from 'nav-frontend-skjema';
import EtikettFokus from 'nav-frontend-etiketter';
import { FormattedMessage, injectIntl } from 'react-intl';
import { renderNavField } from '@navikt/ft-kalkulus-frontend-felles';
import styles from './textAreaField.less';
import ReadOnlyField from './ReadOnlyField';

const labelPropType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    args: PropTypes.shape(),
  }),
]);

const TextAreaWithBadge = ({
  badges,
  intl,
  ...otherProps
}) => {
  const { placeholder } = otherProps;
  return (
    <div className={badges ? styles.textAreaFieldWithBadges : null}>
      { badges
      && (
        <div className={styles.etikettWrapper}>
          { badges.map(({ textId, type, title }) => (
            <EtikettFokus key={textId} type={type} title={intl.formatMessage({ id: title })}>
              <FormattedMessage id={textId} />
            </EtikettFokus>
          ))}
        </div>
      )}
      <div className={placeholder ? styles.textAreaWithPlaceholder : null}>
        <NavTextarea {...otherProps} />
      </div>
    </div>
  );
};

const renderNavTextArea = renderNavField(injectIntl(TextAreaWithBadge));

const TextAreaField = ({
  name, label, validate, readOnly, ...otherProps
}) => (
  <Field
    name={name}
    validate={validate}
    component={readOnly ? ReadOnlyField : renderNavTextArea}
    label={label}
    {...otherProps}
    readOnly={readOnly}
    readOnlyHideEmpty
    autoComplete="off"
  />
);

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: labelPropType.isRequired,
  validate: PropTypes.arrayOf(PropTypes.func),
  readOnly: PropTypes.bool,
};

TextAreaField.defaultProps = {
  validate: null,
  readOnly: false,
};

TextAreaWithBadge.propTypes = {
  intl: PropTypes.shape().isRequired,
  badges: PropTypes.arrayOf(PropTypes.shape({
    textId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
};

TextAreaWithBadge.defaultProps = {
  badges: null,
};

export default TextAreaField;
