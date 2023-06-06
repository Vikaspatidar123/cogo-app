import { Button } from '@cogoport/components';
import { IcMLocalCharges } from '@cogoport/icons-react';
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
					trade_type={trade_type}
					port={rate.port}
					mode={summary.mode}
					origin={rate.origin}
					destination={rate.destination}
				/>

				<div>
					<div className={styles.middle_content}>
						{shipping_line?.logo_url ? (
							<div className={styles.logo} src={shipping_line?.logo_url} alt="logo" />
						) : (
							<IcMLocalCharges width={40} height={40} fill="#2D3342" />
						)}

						<div className={styles.data}>
							<div className={styles.title}>
								{shipping_line?.short_name
									|| startCase(summary.primary_service)}
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
