import React, { FunctionComponent } from 'react';
import classnames from 'classnames/bind';
import { useIntl } from 'react-intl';
import Image from './Image';

import endretFelt from '../assets/endret_felt.svg';
import styles from './editedIcon.less';

const classNames = classnames.bind(styles);

interface OwnProps {
  className?: string;
}

/*
 * EditedIcon
 *
 * Komponent/Ikon som viser om noe i GUI er endret.
 */

const EditedIcon: FunctionComponent<OwnProps> = ({
  className = '',
}) => {
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

export default EditedIcon;
