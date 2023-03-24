import { Button } from '@cogoport/components';
import { IcMFtl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

import { AboutAction } from '@/ui/commons/components/webflow';

function Details({
	setCurrentView,
	rate,
	summary,
	touchPointsToShow,
	allServices,
	refetch,
	trip_type,
	transit_time,
	transitTime,
	free_detention_hours,
	packages,
}) {
	const proceed = () => {
		setCurrentView({
			detail    : 'success',
			invoice   : 'active',
			quotation : 'inactive',
		});
	};

	const Truck = () => packages.map((truck) => (
		<div className={styles.truck_container}>
			<div className="icon">
				<IcMFtl height={40} width={40} />
			</div>
			<div className={styles.content}>
				<div className={styles.first_row}>
					<div className="row">
						{startCase(trip_type)}
						{' '}
						Trip
					</div>
					<div className="row">
						{truck.trucks_count}
						{' '}
						Truck
					</div>
					<div className="row">{startCase(truck?.truck_type)}</div>
				</div>
				<div className={styles.transit_time}>
					{transit_time ? (
						<h3>
							Transit time:
							{transitTime}
						</h3>
					) : (
						<div>Transit Time will be confirmed post booking</div>
					)}
				</div>
				<div
					className={`${styles.cancellation_changes} ${free_detention_hours ? 'space-between' : 'end'}`}
				>
					{free_detention_hours && <div>24 Hours Free Detention</div>}

					<AboutAction slug="cancellation-terms">
						<div className={styles.button_link}>Cancellation Charges & Policy</div>
					</AboutAction>
				</div>
			</div>
		</div>
	));

	return (
		<div className={styles.mobile_container}>
			<div className={styles.main_content}>
				<RouteDisplay
					port={rate.port}
					mode={summary.mode}
					origin={rate.origin}
					destination={rate.destination}
				/>
				{touchPointsToShow.length > 0 ? (
					<div className={styles.touch_points}>
						<div>Touch Point(s): </div>
						{touchPointsToShow.map((touchPoint) => (
							<div className={styles.touch_point_name}>
								{touchPoint.name}
								{' '}
								|
							</div>
						))}
					</div>
				) : null}

				<Truck />
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
