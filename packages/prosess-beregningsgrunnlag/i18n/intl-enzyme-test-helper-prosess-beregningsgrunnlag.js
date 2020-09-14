import { shallowWithIntl as globalShallowWithIntl, mountWithIntl as globalMountWithIntl } from '@navikt/ft-kalkulus-frontend-felles';

import messages from './nb_NO.json';

const shallowWithIntl = (node) => globalShallowWithIntl(node, null, messages);

export const mountWithIntl = (node) => globalMountWithIntl(node, null, messages);

export default shallowWithIntl;
