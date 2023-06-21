import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import Charges from './Charges';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import SelectAddressComponent from '@/ui/commons/components/CreateOrganizationModel/Components/SelectAddressComponent';

function Summary({
	quotaValue = 0,
	tradeEngineId = '',
	isQuotaLeft = false,
	getPrice = () => {},
	paymentHandler = () => {},
	loading = false,
	address = {},
	setAddress = () => {},
}) {
	const { push } = useRouter();
	const check = !isQuotaLeft && isEmpty(address);
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
			{!isQuotaLeft && (
				<div className={`${styles.text_div} ${styles.billing}`}>
					<div className={styles.text_head}>Billing Details</div>
					<SelectAddressComponent address={address} setAddress={setAddress} />
				</div>
			)}
			<div className={styles.title}>
				<h3>Summary</h3>
			</div>
			<div className={styles.content}>
				<Charges quotaValue={quotaValue} isQuotaLeft={isQuotaLeft} getPrice={getPrice} />
			</div>
			<div className={styles.btn_container}>
				<Button onClick={submitHandler} loading={loading} disabled={check}>
					{renderBtn()}
				</Button>
			</div>
		</div>
	);
}

export default Summary;
