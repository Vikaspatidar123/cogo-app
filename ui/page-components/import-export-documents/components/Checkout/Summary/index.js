import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Charges from './Charges';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import SelectAddressComponent from '@/ui/commons/components/CreateOrganizationModel/Components/SelectAddressComponent';

const renderBtn = ({ isQuotaLeft, t }) => {
	if (isQuotaLeft) return t('common:proceed');
	return t('importExportDoc:checkout_summary_btn_txt');
};

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
	const { t } = useTranslation(['common', 'importExportDoc']);
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

	return (
		<div className={styles.container}>
			{!isQuotaLeft && (
				<div className={`${styles.text_div}`}>
					<div className={styles.text_head}>{t('importExportDoc:checkout_summary_address_title')}</div>
					<SelectAddressComponent address={address} setAddress={setAddress} />
				</div>
			)}
			<div className={styles.title}>
				<h3>{t('importExportDoc:checkout_summary_title')}</h3>
			</div>
			<div className={styles.content}>
				<Charges quotaValue={quotaValue} isQuotaLeft={isQuotaLeft} getPrice={getPrice} />
			</div>
			<div className={styles.btn_container}>
				<Button onClick={submitHandler} loading={loading} disabled={check}>
					{renderBtn({ isQuotaLeft, t })}
				</Button>
			</div>
		</div>
	);
}

export default Summary;
