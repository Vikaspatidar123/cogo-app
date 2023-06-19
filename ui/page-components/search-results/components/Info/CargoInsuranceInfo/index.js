import { Tooltip } from '@cogoport/components';
import { IcACarriageInsurancePaidTo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Loading from '../loading';

import LocationDetails from './LocationDetails';
import styles from './styles.module.css';

function CargoInsuranceInfo({
	data = {},
	loading = false,
}) {
	const {
		commodity = '',
		cargo_insurance_commodity_description = '',
		trade_type = '',
		transit_mode = '',
	} = data || {};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.service_wrap}>
				<IcACarriageInsurancePaidTo height={30} width={30} />

				<div className={styles.service_type_text}>CARGO INSURANCE</div>
			</div>

			<div className={styles.line} />

			<LocationDetails data={data} />

			<div className={styles.line} />

			<div className={styles.commodity_details}>
				<div className={styles.description_container}>
					<div className={styles.styled_text}>Commodity</div>
					<Tooltip
						theme="light"
						animation="shift-away"
						interactive
						content={commodity}
					>
						<div className={styles.commodity}>{commodity}</div>
					</Tooltip>
				</div>

				<div className={styles.description_container}>
					<div className={styles.styled_text}>Description</div>

					<Tooltip
						theme="light"
						animation="shift-away"
						interactive
						content={cargo_insurance_commodity_description}
					>
						<div className={styles.commodity_description}>
							{cargo_insurance_commodity_description}
						</div>
					</Tooltip>
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.trade_type_container}>
				<div className={styles.styled_text}>Trade Type</div>

				<div>{startCase(trade_type) || '-'}</div>

			</div>
			<div className={styles.trade_type_flex_container}>
				<div className={styles.styled_text}>Transit Mode</div>
				<div>{startCase(transit_mode) || '-'}</div>

			</div>

		</div>
	);
}

export default CargoInsuranceInfo;
