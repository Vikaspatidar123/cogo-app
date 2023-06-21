import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { SERVICE_UNIT_MAPPING } from '../../constants';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Freight({
	itemData = {},
	showBreakup = false,
	setShowBreakup = () => { },
	setShowPlanBox = () => { },
}) {
	const {
		service_type: serviceType = '',
		basic_freight: bascicFreight = {},
		total_freight_price: totalFreightPrice = {},
		additional_services: additionalServices = [],
		additional_services_price: additionalServicesPrice = {},
		at_actuals: atActuals = false,
		is_additional_service_rate_present: addlPresent = false,
	} = itemData || {};

	const additionalServicesCount = (additionalServices || []).length;

	const showLabel = !addlPresent && atActuals
		? 'Local Services'
		: `${additionalServicesCount} ${additionalServicesCount <= 1 ? "Add'l Service" : "Add'l Services"
		}`;

	const freightArray = [
		{
			label: 'Basic Freight',
			price: bascicFreight?.price || 0,
			key: 'basic_freight',
			fontWeight: 500,
		},
		{
			label: showLabel,
			price: additionalServicesPrice?.price || 0,
			key: 'additional_services_freight',
			fontWeight: 500,
		},
		{
			label: 'Total (Inc. All Services)',
			price: totalFreightPrice?.price || 0,
			key: 'total_freight',
			fontWeight: 600,
		},
	];

	const withoutAddtionalService = freightArray.filter(
		(item) => item.key !== 'additional_services_freight',
	);
	const pricing = isEmpty(additionalServices)
		? withoutAddtionalService
		: freightArray;

	const viewBreakup = () => {
		setShowPlanBox(false);
		setShowBreakup(!showBreakup);
	};
	return (
		<div className={styles.container}>
			{(pricing || []).map((i) => {
				const { label, price, key, fontWeight } = i || {};
				return (
					<div className={styles.card} key={key}>
						<div className={styles.label}>{label}</div>
						{!addlPresent
							&& atActuals
							&& key === 'additional_services_freight' ? (
							<div className={styles.price} fontWeight={fontWeight}>At Actuals</div>
						) : (
							<div className={styles.price} fontWeight={fontWeight}>
								{formatAmount({
									amount: price,
									currency: totalFreightPrice?.currency || 'INR',
									options: {
										notation: 'standard',
										style: 'currency',
									},
								})}
								<div className={styles.unit}>{SERVICE_UNIT_MAPPING[serviceType]}</div>
							</div>
						)}

						{key === 'total_freight' && (
							<Button
								themeType="linkUi"
								className={styles.note}
								onClick={viewBreakup}
							>
								View Breakup
							</Button>
						)}
						{atActuals
							&& addlPresent
							&& key === 'additional_services_freight' && (
								<div className={styles.label}>Locals at Actuals</div>
							)}
					</div>
				);
			})}
		</div>
	);
}

export default Freight;
