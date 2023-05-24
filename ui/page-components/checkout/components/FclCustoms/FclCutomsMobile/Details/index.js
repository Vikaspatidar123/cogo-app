import { Button } from '@cogoport/components';
import { IcMCustoms } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

// import { AboutAction } from '@/ui/commons/components/webflow';

function Details({
	setCurrentView,
	summary,
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

	const ContainerDetails = () => {
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
					{startCase(container?.commodity) || 'All'}
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
							{/* <AboutAction slug="cancellation-terms"> */}
							<div className={styles.button_link}>Cancellation Charges & Policy</div>
							{/* </AboutAction> */}
						</div>
					</div>
				</div>

				<ContainerDetails />
			</div>
			<CheckoutServices
				allServices={allServices}
				rate={rate}
				summary={summary}
				refetch={refetch}
			/>

			<Button className="proceed" onClick={proceed}>
				Proceed
			</Button>
		</div>
	);
}

export default Details;
