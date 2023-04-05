import { cl } from '@cogoport/components';
import { useState } from 'react';

import SearchResultsServiceCost from '../../../CostBreakdownService';
import SearchResultsServiceItem from '../../../ServiceItem';

import styles from './styles.module.css';

function CheckoutServicesItem({ service, summary, refetch }) {
	const [show, setShow] = useState(false);

	const services = (service.data || []).map((item) => ({
		...item,
		...service,
	}));

	const onToggle = () => {
		if (!services.length) {
			return null;
		}

		setShow((prevState) => !prevState);

		return null;
	};

	return (
		<div className={cl`${styles.container} ${show ? styles.active : styles.inactive}`}>
			<div className={styles.header} role="presentation" onClick={onToggle}>
				<SearchResultsServiceItem
					service={service}
					summary={summary}
					refetchResults={refetch}
					source="checkout"
				/>
			</div>

			{services.length ? (
				<div className={cl`${styles.body} ${styles.active}`}>
					{services.map((item) => (
						<SearchResultsServiceCost
							key={`${item.id}_${item.container}`}
							source="checkout"
							service={{
								...item,
								config         : { title: service.title },
								serviceDetails : {
									container_size : (item.container?.split(' ') || [])[0],
									container_type : (item.container?.split(' ') || [])[1],
								},
							}}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}

export default CheckoutServicesItem;
