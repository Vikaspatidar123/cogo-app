import { isEmpty } from '@cogoport/utils';

import { SERVICE_UNIT_MAPPING } from '../../../../../constants';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function SingleEnquiry({ freightDetails }) {
	const [firstServiceObject = {}] = freightDetails;

	const {
		service_type: serviceType = '',
		basic_freight: bascicFreight = {},
		additional_services: additionalServices = [],
		additional_services_price: additionalServicesPrice = {},
		at_actuals: atActuals = false,
		is_additional_service_rate_present: addlPresent = false,
	} = firstServiceObject || {};

	const additionalServicesCount = (additionalServices || []).length;

	const showLabel = !addlPresent && atActuals
		? 'Local Services'
		: `${additionalServicesCount} ${
			additionalServicesCount <= 1 ? "Add'l Service" : "Add'l Services"
		}`;

	const freightArray = [
		{
			label      : 'Basic Freight',
			price      : bascicFreight?.price || 0,
			key        : 'basic_freight',
			fontWeight : 500,
			currency   : bascicFreight?.currency,
		},
		{
			label      : showLabel,
			price      : additionalServicesPrice?.price || 0,
			key        : 'additional_services_freight',
			fontWeight : 500,
			currency   : additionalServicesPrice?.currency,
		},
	];

	const withoutAddtionalService = freightArray.filter(
		(item) => item.key !== 'additional_services_freight',
	);

	const pricing = isEmpty(additionalServices) ? withoutAddtionalService : freightArray;

	return (
		(pricing || []).map((ele) => {
			const { label, price, key, fontWeight, currency } = ele || {};

			return (
				<div key={key} className={styles.card}>
					<p className={styles.label}>{label}</p>

					{!addlPresent && atActuals
						&& key === 'additional_services_freight'
						? (
							<div className={styles.price} style={{ fontWeight }}>
								At Actuals
							</div>
						)
						: (
							<div className={styles.price}>
								{formatAmount({
									amount  : price,
									currency,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										minimumFractionDigits : 2,
									},
								})}
								<span>{SERVICE_UNIT_MAPPING[serviceType]}</span>
							</div>
						)}

					{atActuals && addlPresent && key === 'additional_services_freight' && (
						<p className={styles.label}>Locals at Actuals</p>
					)}
				</div>
			);
		})
	);
}

export default SingleEnquiry;
