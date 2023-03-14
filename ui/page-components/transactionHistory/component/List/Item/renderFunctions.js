import { IcCGreenCircle, IcCYelloCircle } from '@cogoport/icons-react';

import Download from '../../Download';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const MAPPING = {
	PAID    : <IcCGreenCircle style={{ paddingRight: '2px' }} width={15} heigjht={15} />,
	PENDING : <IcCYelloCircle style={{ paddingRight: '2px' }} width={15} heigjht={15} />,
};
const itemFunctions = ({ functions }) => {
	const getStatus = (value) => (
		<div className={styles.circle_icon}>
			{MAPPING[value]}
			{value}
		</div>
	);
	const newFunctions = {
		renderAmount: (data, config) => {
			formatAmount({
				amount   : data[config.key],
				currency : data.billCurrency,
				options  : {
					notation : 'standard',
					style    : 'currency',
				},
			});
		},
		renderStatus  : (data, config) => getStatus(data[config.key]),
		renderService : (data) => <Download data={data} />,
		renderFormat  : (data, config) => data[config.key]?.replaceAll('_', ' '),
		...(functions || {}),
	};

	return {
		newFunctions,
	};
};

export default itemFunctions;
