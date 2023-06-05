import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useUpdateCheckout from '../../hooks/useUpdateCheckout';

import styles from './styles.module.css';

import CargoInsurance from '@/ui/page-components/search-results/commons/CargoInsurance';
import PremiumRate from '@/ui/page-components/search-results/commons/CargoInsurance/PremiumRate';

function CargoInsuranceApp(props) {
	const {
		primaryServiceDetailsData = {},
		insuranceData = {},
		detail = {},
		refetch,
	} = props;

	const {
		trade_type = '',
		importer_exporter_id = '',
		user = {},
		id = '',
		importer_exporter = {},
	} = detail || {};

	const { id: user_id = '' } = user || {};

	const { destination_country_id = '', origin_country_id = '' } = primaryServiceDetailsData;

	const {
		saas_rate = {},
		id: cargoInsuranceId,
		commodity = '',
		cargo_insurance_commodity_description = '',
	} = insuranceData || {};

	const { updateCheckout, loading } = useUpdateCheckout({
		serviceId : cargoInsuranceId,
		refetch,
		type      : 'cargo_insurance',
	});

	if (!isEmpty(saas_rate)) {
		return (
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div className={styles.text}>Cargo Insurance Details </div>
					<Button
						size="md"
						themeType="secondary"
						type="button"
						loading={loading}
						onClick={() => updateCheckout({ status: 'inactive' })}
					>
						Remove cargo insurance
					</Button>
				</div>

				<div className={styles.custom_tag}>
					{commodity.replaceAll('/', ',')}
					(
					{cargo_insurance_commodity_description}
					)
				</div>

				<PremiumRate rateData={saas_rate} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<CargoInsurance
				destination_country_id={destination_country_id}
				origin_country_id={origin_country_id}
				trade_type={trade_type}
				importer_exporter_id={
                    importer_exporter_id || importer_exporter?.id
                }
				user_id={user_id}
				checkout_id={id}
				refetch={refetch}
				source="app"
				importer_exporter={importer_exporter}
			/>
		</div>
	);
}
export default CargoInsuranceApp;
