import React from 'react';

import RateCard from '../RateCard';

import styles from './styles.module.css';

function ContractResults({ data = {} }) {
	return (
		<div className={styles.container}>
			<RateCard
				data={data?.checkout_detail?.rate}
				details={data?.checkout_detail?.detail}
				results_type="contract"
				id={data?.id}
			/>
		</div>
	);
}

export default ContractResults;
