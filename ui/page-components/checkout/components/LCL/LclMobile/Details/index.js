import { Button } from '@cogoport/components';
import { IcMFcl } from '@cogoport/icons-react';

import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

function Details({
	rate,
	summary,
	refetch,
	transit_time,
	allServices,
	setCurrentView,
}) {
	const proceed = () => {
		setCurrentView({
			detail    : 'success',
			invoice   : 'active',
			quotation : 'inactive',
		});
	};

	const Packages = () => {
		const { packages = [] } = summary;

		return packages.map((packageInfo) => (
			<div className={styles.packages_info}>
				<div>
					Commodity -
					{packageInfo.commodity || 'All'}
				</div>
				<div>
					Weight -
					{packageInfo?.weight}
					{' '}
					kgs
				</div>
				<div>
					Volume -
					{packageInfo?.volume}
					{' '}
					cc
				</div>
			</div>
		));
	};
	return (
		<div className={styles.mobile_container}>
			<div className={styles.main_content}>
				<RouteDisplay
					port={rate.port}
					mode={summary.mode}
					origin={rate.origin}
					destination={rate.destination}
				/>
				<div className={styles.data}>
					<div className={styles.information}>

						<div className={styles.transit}>
							<IcMFcl height={40} width={40} style={{ marginRight: 8 }} />
							{transit_time ? (
								<div>
									Transit Time -
									{transit_time}
									{' '}
									Hr
								</div>
							) : (
								<div>Transit Time will be confirmed post booking</div>
							)}
						</div>

						{/* <AboutAction slug="cancellation-terms"> */}
						<div className={styles.button_link}>Cancellation Policy</div>
						{/* </AboutAction> */}
					</div>
				</div>
				<Packages />
			</div>
			<div className={styles.service_details_container}>
				<CheckoutServices
					allServices={allServices}
					rate={rate}
					summary={summary}
					refetch={refetch}
				/>
			</div>
			<Button className="proceed" onClick={proceed}>
				Proceed
			</Button>
		</div>
	);
}

export default Details;
