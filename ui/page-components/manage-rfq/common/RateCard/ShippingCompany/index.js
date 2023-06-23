import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { RATE_COLOR_MAPPING } from '../../../constants';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function ShippingCompany({ typeName, ratesBreakdown }) {
	const { validity_end } = ratesBreakdown || {};

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.validity}>
					Valid Till
					{' '}
					{formatDate({
						date       : validity_end,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
				<Pill
					color={RATE_COLOR_MAPPING[typeName]?.bgColor}
				>
					{startCase(RATE_COLOR_MAPPING[typeName]?.textType)}
				</Pill>

			</div>
		</div>
	);
}

export default ShippingCompany;
