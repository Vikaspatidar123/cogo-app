import { Pill } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import { RATE_COLOR_MAPPING } from '../../../constants';

import styles from './styles.module.css';

function ShippingCompany({ typeName, ratesBreakdown }) {
	const { validity_end } = ratesBreakdown || {};

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.validity}>
					Valid Till
					{' '}
					{format(
						validity_end,
						'dd-MMM-yyyy',
					)}
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
