import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

import CargoInsuranceApp from '../CargoInsuranceApp';

import styles from './styles.module.css';

function CargoInsuranceDetails(props) {
	const {
		onClickInsurance,
		showInsurance,
		primaryServiceDetailsData,
		detail,
		insuranceData,
		refetch,
	} = props;

	return (
		<div className={styles.service_details_container}>
			<div className={styles.footer}>
				<div className={styles.additional_services}>
					Cargo Insurance
				</div>

				<div className={styles.details}>
					<div
						className={styles.details_title}
						onClick={onClickInsurance}
						role="presentation"
					>
						Details
					</div>

					{!showInsurance ? (
						<IcMArrowDown onClick={onClickInsurance} />
					) : (
						<IcMArrowUp onClick={onClickInsurance} />
					)}
				</div>

			</div>

			{showInsurance ? (
				<CargoInsuranceApp
					primaryServiceDetailsData={
					primaryServiceDetailsData
                }
					detail={detail}
					insuranceData={insuranceData}
					refetch={refetch}
				/>
			) : null}
		</div>
	);
}

export default CargoInsuranceDetails;
