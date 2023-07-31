import { useState } from 'react';

import CustomerSatisfactionModal from './components';
import useGetCsatScore from './hooks/useGetCsatScore';
import styles from './styles.module.css';

function CustomerSatisfaction({ serviceName = '', position = '', details = {} }) {
	const [show, setShow] = useState(false);

	const { data = {}, showRateUs, setShowRateUs } = useGetCsatScore({ serviceName });

	return (
		<>
			{showRateUs ? (
				<div
					role="presentation"
					onClick={() => setShow(true)}
					style={{ justifyContent: position }}
					className={styles.rate_us_button}
				>
					Rate us
				</div>
			) : ''}
			{show && (
				<CustomerSatisfactionModal
					show={show}
					setShow={setShow}
					serviceName={serviceName}
					csatInfo={data}
					setShowRateUs={setShowRateUs}
					details={details}
				/>
			)}
		</>
	);
}

export default CustomerSatisfaction;
