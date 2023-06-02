import { Button } from '@cogoport/components';
import { IcMAirport } from '@cogoport/icons-react';

import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

function Details({
	summary,
	rate,
	air_line,
	transit_time,
	allServices,
	refetch,
	setCurrentView,
}) {
	const proceed = () => {
		setCurrentView({
			detail    : 'success',
			invoice   : 'active',
			quotation : 'inactive',
		});
	};

	return (
		<div className={styles.mobile_container}>
			<div className={styles.main_content}>
				<div className={styles.route}>
					<IcMAirport width={40} height={40} className="icon" />
					<RouteDisplay
						mode={summary.mode}
						port={rate.port}
						origin={rate.origin}
						destination={rate.destination}
					/>
				</div>

				<div className={styles.air_content}>
					<div className={styles.air_container}>
						{air_line?.logo_url ? (
							<div className={styles.logo} src={air_line?.logo_url} />
						) : (
							<IcMAirport />
						)}
						<div className={styles.air_details}>
							<div className={styles.name}>{air_line?.short_name}</div>
							<div className={styles.transit_time}>
								{transit_time ? (
									<div>
										Transit time:
										{' '}
										<span className="bold">
											{transit_time}
											{' '}
											Hr
										</span>
									</div>
								) : (
									<div>Transit Time will be confirmed post booking</div>
								)}
							</div>
						</div>
					</div>
					<a
						className={styles.button_link}
						href="https://www.cogoport.com/privacy-policy"
						target="_blank"
						rel="noreferrer"
					>
						Cancellation Charges & Policy

					</a>
				</div>
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
