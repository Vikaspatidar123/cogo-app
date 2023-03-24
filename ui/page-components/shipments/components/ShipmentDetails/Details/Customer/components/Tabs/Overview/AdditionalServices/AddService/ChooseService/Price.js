// import Button from '@cogoport/front/components/admin/Button';
// import React from 'react';
import { Button } from '@cogoport/components';

import styles from './styles.module.css';

// import { PriceDiv } from './styles';
// import useRequestRate from './useRequestRate';
import useRequestRate from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useRequestRate';

function Price({ item, isSeller, setAddRate, setShow, refetch = () => {} }) {
	const { requestRate, loading } = useRequestRate({ setShow, refetch });

	const handleClick = (e) => {
		e.stopPropagation();

		if (isSeller) {
			setAddRate(item);
		} else {
			requestRate(item);
		}
	};

	return (
		<div className={styles.price_div}>
			<Button
				className="secondary sm"
				onClick={(e) => handleClick(e)}
				disabled={loading}
			>
				{isSeller ? 'Add Rate' : 'Request Rate'}
			</Button>
		</div>
	);
}

export default Price;
