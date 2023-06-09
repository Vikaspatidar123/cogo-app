import { Button } from '@cogoport/components';
import { IcMCustoms } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

function Details({
	summary,
	setCurrentView,
	trade_type,
	rate,
	shipping_line,
	primary_service,
	allServices,
	refetch,
}) {
	const proceed = () => {
		setCurrentView({
			detail    : 'success',
			invoice   : 'active',
			quotation : 'inactive',
		});
	};

	const ContainersDisplay = () => {
		const { packages } = summary;

		return packages.map((container) => (
			<div className={styles.multi_container}>

				<div>
					Quantity :
					{container?.packages_count}
				</div>
				<div>
					Commodity:
					{startCase(container?.commodity) || 'All'}
				</div>
				<div>
					Weight:
					{startCase(container?.weight)}
					{' '}
					kg
				</div>
				<div>
					Volume:
					{container?.volume}
					{' '}
					cbm
				</div>
			</div>
		));
	};

	return (
		<div className={styles.mobile_container}>
			<div className={styles.main_content}>
				<RouteDisplay
					trade_type={trade_type}
					port={rate.port}
					mode={summary.mode}
					origin={rate.origin}
					destination={rate.destination}
				/>

				<div className={styles.middle_content}>

					{shipping_line?.logo_url ? (
						<div className={styles.logo} src={shipping_line?.logo_url} alt="logo" />
					) : (
						<IcMCustoms width={40} height={40} />
					)}

					<div className={styles.data}>
						<div className={styles.title}>
							{shipping_line?.short_name || startCase(primary_service)}
						</div>
						<div className={styles.information}>
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
