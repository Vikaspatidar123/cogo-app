// import { formatDateToString } from '@cogoport/front/date';
import { IcCGreenCircle, IcCYelloCircle } from '@cogoport/icons-react';

import { shortFormatNumber } from '../../../utils/getShortFormatNumber';
import Download from '../../Download';

import styles from './styles.module.css';

const MAPPING = {
	PAID    : <IcCGreenCircle style={{ paddingRight: '2px' }} width={15} heigjht={15} />,
	PENDING : <IcCYelloCircle style={{ paddingRight: '2px' }} width={15} heigjht={15} />,
};
const itemFunctions = ({ functions, isMobile }) => {
	const getStatus = (value) => (
		<div className={styles.circle_icon}>
			{MAPPING[value]}
			{value}
		</div>
	);
	const newFunctions = {
		renderAmount: (data, config) => shortFormatNumber(data[config.key], data.billCurrency),

		// renderDate: (data, config) => formatDateToString(data[config.key], 'dd MMM yyyy'),

		renderStatus  : (data, config) => getStatus(data[config.key]),
		renderService : (data) => <Download data={data} isMobile={isMobile} />,
		renderFormat  : (data, config) => data[config.key].replaceAll('_', ' '),
		...(functions || {}),
	};

	return {
		newFunctions,
	};
};

export default itemFunctions;
