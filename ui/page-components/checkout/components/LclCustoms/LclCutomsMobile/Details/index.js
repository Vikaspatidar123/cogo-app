import { Button } from '@cogoport/components';
import { IcMCustoms } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import RouteDisplay from '../../../../commons/RouteDisplay';
import CheckoutServices from '../../../../commons/Services';
import styles from '../../styles.module.css';

// import { AboutAction } from '@/ui/commons/components/webflow';

function Details({
	setCurrentView,
	rate,
	summary,
	allServices,
	refetch,
	trade_type,
	shipping_line,
	primary_service,
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
					Commodity :
					{startCase(container?.commodity)}
				</div>
				<div>
					Weight :
					{startCase(container?.weight)}
				</div>
				<div>
					Volume :
					{container?.volume}
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
