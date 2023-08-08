import React from 'react';

import Details from './Details';
import Ports from './ports';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';

function QuotationCard({ contractList, activeFilter }) {
	return (
		<>
			{(contractList || []).map((item) => (
				<div className={styles.container}>
					<Details item={item} activeFilter={activeFilter} />
					<ServiceDetails item={item} />
					<Ports item={item} />
				</div>
			))}
		</>
	);
}

export default QuotationCard;
