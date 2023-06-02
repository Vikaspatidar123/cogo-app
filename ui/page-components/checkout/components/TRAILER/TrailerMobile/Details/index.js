import { Button } from '@cogoport/components';
import { IcCFtick, IcMFtl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

function Details({
	setCurrentView,
	rate,
	summary,
	allServices,
	refetch,
	transit_time,
	detention_free_time,
	container_size,
	container_type,
	containers_count,
	commodity,
	cargo_weight_per_container,
}) {
	const proceed = () => {
		setCurrentView({
			detail    : 'success',
			invoice   : 'active',
			quotation : 'inactive',
		});
	};
	function ContainersDisplay() {
		return (
			<div className={styles.multi_container}>
				<div>
					{container_size}
					{' '}
					Container (
					{startCase(container_type)}
					)
				</div>
				<div>
					Quantity :
					{containers_count}
				</div>
				<div>
					Commodity -
					{commodity || 'All'}
				</div>

				<div>
					{cargo_weight_per_container}
					MT
				</div>
			</div>
		);
	}

	return (
		<div className={styles.mobile_container}>
			<div className={styles.main_content}>
				<RouteDisplay
					port={rate.port}
					mode={summary.mode}
					origin={rate.origin}
					destination={rate.destination}
				/>
				<div>
					<div className={styles.middle_content}>
						<div className={styles.data}>
							<diov className={styles.information}>
								<div className="transit">
									<IcMFtl height={40} width={40} style={{ marginRight: 8 }} />
									{transit_time ? (
										<div>
											Transit Time -
											{transit_time}
										</div>
									) : (
										<div>Transit Time will be confirmed post booking</div>
									)}
								</div>

								<a
									className={styles.button_link}
									href="https://www.cogoport.com/privacy-policy"
									target="_blank"
									rel="noreferrer"
								>
									Cancellation Charges & Policy

								</a>
							</diov>
						</div>
					</div>
					<div className={styles.benefits}>
						{detention_free_time ? (
							<div className={styles.detention}>
								<IcCFtick height={20} width={32} fill="#EEAB30" />
								{detention_free_time}
								{' '}
								free Detention days
							</div>
						) : null}
						<div className={styles.detention}>
							<IcCFtick height={20} width={32} fill="#EEAB30" />
							Booking note issuance within 48hours
						</div>
					</div>
				</div>
				<ContainersDisplay />
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
