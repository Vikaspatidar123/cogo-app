import { Button, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Charges from './Charges';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import SelectAddressComponent from '@/ui/commons/components/CreateOrganizationModel/Components/SelectAddressComponent';

const renderBtn = ({ isQuotaLeft, t }) => {
	if (isQuotaLeft) return t('common:proceed');
	return t('importExportControls:checkout_summary_btn_txt');
};

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
	const { t } = useTranslation(['common', 'importExportControls']);

	const submitHandler = () => {
		if (isEmpty(address) && !isQuotaLeft) {
			Toast.error(t('importExportControls:checkout_summary_address_err'));
		} else if (isQuotaLeft) {
			push(
				'/saas/premium-services/import-export-controls/[trade_engine_id]/result',
				`/saas/premium-services/import-export-controls/${tradeEngineId}/result`,
			);
		} else {
			paymentHandler();
		}
	};

	return (
		<div className={styles.container}>
			{!isQuotaLeft && (
				<div>
					<div className={styles.title}>
						<h3>{t('importExportControls:checkout_summary_address_title')}</h3>
					</div>
					<div className={styles.billing_address}>
						<SelectAddressComponent address={address} setAddress={setAddress} />
					</div>
				</div>
			)}
			<div className={styles.title}>
				<h3>{t('importExportControls:checkout_summary_title')}</h3>
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
					{renderBtn({ isQuotaLeft, t })}
				</Button>
			</div>
		</div>
	);
}

export default Summary;
