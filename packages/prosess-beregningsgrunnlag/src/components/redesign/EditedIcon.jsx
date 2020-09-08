import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Image } from '@navikt/ft-kalkulus-frontend-felles';
import { useIntl } from 'react-intl';
import endretFelt from '../../../assets/endret_felt.svg';

import styles from './editedIcon.less';

const classNames = classnames.bind(styles);

/*
 * EditedIcon
 *
 * Komponent/Ikon som viser om noe i GUI er endret.
 */

const EditedIcon = ({ className }) => {
  const intl = useIntl();
  return (
    <span className={classNames('editedIcon', className)}>
      <Image
        src={endretFelt}
        alt={intl.formatMessage({ id: 'Behandling.EditedField' })}
        tooltip={intl.formatMessage({ id: 'Behandling.EditedField' })}
      />
    </span>
  );
};

EditedIcon.propTypes = {
  className: PropTypes.string,
};

EditedIcon.defaultProps = {
  className: '',
};

export default EditedIcon;
