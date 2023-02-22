import { IcCGreenCircle, IcCYelloCircle } from '@cogoport/icons-react';

import Amount from './Amount';
import Date from './Date';
import RenderComponent from './RenderComponent';
import styles from './styles.module.css';
import RenderTooltip from './TooltipText';

const itemFunctions = ({ functions = {}, isMobile = false }) => {
	const newFunctions = {
		renderAmount: (itemData, field) => (
			<Amount currency={itemData.currency} field={itemData[field.key]} />
		),
		renderDate    : (itemData, field) => <Date itemData={itemData} field={field} />,
		renderTooltip : (itemData, field) => <RenderTooltip value={itemData[field.key]} />,
		renderStatus  : (itemData) => (
			<div className={`${styles.flex_div} ${styles.status}`}>
				{itemData?.status === 'DATA_GENERATED' && (
					<IcCGreenCircle width={9} height={9} />
				)}
				{itemData?.status === 'DRAFT' && <IcCYelloCircle width={9} height={9} />}
				<div className={styles.title}>{itemData?.status?.replaceAll('_', ' ')}</div>
			</div>
		),
		renderDots: (itemData) => (
			itemData?.status === 'DATA_GENERATED' && (
				<div className={styles.dotcursor}>
					<RenderComponent itemData={itemData} isMobile={isMobile} />
				</div>
			)
		),
		...(functions || {}),
	};

	return {
		newFunctions,
	};
};

export default itemFunctions;
