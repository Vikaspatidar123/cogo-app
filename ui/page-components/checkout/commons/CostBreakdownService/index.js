import { startCase } from '@cogoport/utils';

import LineItem from './LineItem';
import styles from './styles.module.css';

function CostBreakdownService({ mode, service }) {
	const {
		line_items,
		service_type,
		config,
		serviceDetails,
		is_rate_available,
	} = service;

	const renderDetails = () => {
		if (mode === 'fcl_freight') {
			return (
				<div className={styles.details}>
					{`(${serviceDetails?.container_size} ${serviceDetails?.container_type})`}
				</div>
			);
		}

		if (mode === 'air_freight' || mode === 'lcl_freight') {
			return (
				<div className={styles.details}>
					{serviceDetails?.volume && serviceDetails?.weight
						? `(${serviceDetails?.volume}cbm, ${serviceDetails?.weight}kg)`
						: ''}
				</div>
			);
		}

		return null;
	};

	return (
		<div className={styles.container}>
			<div className={`${styles.header} ${is_rate_available ? <div className={styles.marginBottom} /> : ''} `}>
				<div className={styles.title}>
					{config?.title || startCase(service_type)}
					{renderDetails()}
				</div>
				{!is_rate_available && (
					<div className={styles.comment}>
						{config?.title === 'fcl_freight_local'
							? '*billed at actuals'
							: 'No Rates'}
					</div>
				)}
			</div>
			<div className={styles.line_item_container}>
				{line_items?.map((lineItem) => (
					<LineItem key={lineItem.code} lineItem={lineItem} />
				))}
			</div>
		</div>
	);
}

export default CostBreakdownService;
