import { IcCGreenCircle, IcCYelloCircle } from '@cogoport/icons-react';

import Amount from './Amount';
import Date from './Date';
import RenderComponent from './RenderComponent';
import styles from './styles.module.css';

import CustomerSatisfaction from '@/ui/commons/components/CustomerSatisfaction';

const SERVICE_NAME_MAPPING = {
	QUOTATION : 'quotations',
	DUTIES    : 'duties_and_taxes',
	DOCUMENTS : 'import_export_documents',
	SCREENING : 'trader_eligibility_check',
	CONTROLS  : 'import_export_controls',
};

const itemFunctions = () => {
	const newFunctions = {
		renderAmount: (itemData, field) => (
			<Amount currency={itemData.currency} field={itemData[field.key]} />
		),
		renderDate   : (itemData, field) => <Date itemData={itemData} field={field} />,
		renderStatus : (itemData) => (
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
					<RenderComponent itemData={itemData} />
				</div>
			)
		),
		renderHyperLink: (itemData, field) => (
			(
				<div className={itemData?.status === 'DATA_GENERATED' ? styles.hyper_link : ''}>
					{itemData[field.key]}
				</div>
			)
		),
		renderCsat: (itemData) => (
			itemData?.status === 'DATA_GENERATED' && (
				<CustomerSatisfaction
					serviceName={SERVICE_NAME_MAPPING[itemData.requestType]}
					details={{ id: itemData?.tradeEngineInputId }}
				/>
			)
		),
	};

	return {
		newFunctions,
	};
};

export default itemFunctions;
