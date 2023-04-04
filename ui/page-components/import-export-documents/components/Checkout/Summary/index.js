import { Button } from '@cogoport/components';
import { useRouter } from 'next/router';

import Charges from './Charges';
import styles from './styles.module.css';

function Summary({
	quotaValue = 0,
	tradeEngineId = '',
	isQuotaLeft = false,
	getPrice = () => {},
	paymentHandler = () => {},
	loading = false,
}) {
	const { push } = useRouter();

	const submitHandler = () => {
		if (isQuotaLeft) {
			push(
				'/saas/premium-services/import-export-doc/[trade_engine_id]/result',
				`/saas/premium-services/import-export-doc/${tradeEngineId}/result`,
			);
		} else {
			paymentHandler();
		}
	};

	const renderBtn = () => {
		if (isQuotaLeft) return 'Proceed';
		return 'Buy Now';
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h3>Summary</h3>
			</div>
			<div className={styles.content}>
				<Charges quotaValue={quotaValue} isQuotaLeft={isQuotaLeft} getPrice={getPrice} />
			</div>
			<div className={styles.btn_container}>
				<Button onClick={submitHandler} loading={loading}>
					{renderBtn()}
				</Button>
			</div>
		</div>
	);
}

export default Summary;
