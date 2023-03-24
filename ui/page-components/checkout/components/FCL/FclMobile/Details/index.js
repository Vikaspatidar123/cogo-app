import { Button } from '@cogoport/components';
import { IcMFcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ConfirmationTexts from '../../../../commons/ConfirmationTexts';
import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

import { AboutAction } from '@/ui/commons/components/webflow';

function Details({
	rate,
	detail,
	summary,
	refetch,
	shipping_line,
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

	const primaryServiceData = Object.values(summary.services).filter(
		(service) => service.service_type === summary.mode,
	)[0];

	const ContainersDisplay = () => {
		const { containers } = summary;

		return containers.map((container) => (
			<div className={styles.multi_container}>
				<div className="bold">
					{container?.container_size}
					Ft. Container (
					{startCase(container?.container_type)}
					)
				</div>
				<div>
					Quantity :
					{container?.containers_count}
				</div>
				<div>
					Commodity :
					{startCase(container?.commodity)}
				</div>
				<div>
					{container?.cargo_weight_per_container}
					MT
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
				<div>
					<div className={styles.middle_content}>
						{shipping_line?.logo_url ? (
							<dic className={styles.logo} src={shipping_line?.logo_url} />
						) : (
							<IcMFcl height={40} width={40} style={{ marginRight: 8 }} />
						)}
						<div className={styles.data}>
							<div className={styles.title}>{shipping_line?.short_name}</div>
							<div className={styles.information}>
								<div className={styles.transit_time}>
									{transit_time ? (
										<div>
											Transit time:
											{' '}
											<span className="bold">
												{transit_time}
												{' '}
												days
											</span>
										</div>
									) : (
										<div>Transit Time will be confirmed post booking</div>
									)}
								</div>

								<AboutAction slug="cancellation-terms">
									<div className={styles.button_link}>Cancellation Charges & Policy</div>
								</AboutAction>
							</div>
						</div>
					</div>
				</div>
				<ContainersDisplay />
			</div>

			<ConfirmationTexts
				detail={detail}
				services={rate?.services}
				primaryServiceData={primaryServiceData}
				trade_type={detail?.trade_type}
			/>

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
