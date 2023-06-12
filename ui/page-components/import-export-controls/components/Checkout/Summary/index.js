import { Button, Toast } from '@cogoport/components';
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
	setAddress = () => {},
	address = {},
}) {
	const { push } = useRouter();

	const submitHandler = () => {
		if (isEmpty(address) && !isQuotaLeft) {
			Toast.error('Please select a billing address');
		} else if (isQuotaLeft) {
			push(
				'/saas/premium-services/import-export-controls/[trade_engine_id]/result',
				`/saas/premium-services/import-export-controls/${tradeEngineId}/result`,
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
				<div>
					<div className={styles.title}>
						<h3>Billing Details</h3>
					</div>
					<div className={styles.billing_address}>
						<SelectAddressComponent address={address} setAddress={setAddress} />
					</div>
				</div>
			)}
			<div className={styles.title}>
				<h3>Summary</h3>
			</div>
			<div className={styles.content}>
				<Charges
					quotaValue={quotaValue}
					isQuotaLeft={isQuotaLeft}
					getPrice={getPrice}
				/>
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
