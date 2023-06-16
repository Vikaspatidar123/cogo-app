import { cl, Toast } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Details({ voucherInfo = [] }) {
	const { t } = useTranslation(['cogoStore']);
	function handleCopy(voucherNo) {
		navigator.clipboard.writeText(voucherNo);
		Toast.success(t('cogoStore:text_copied'));
	}

	if (voucherInfo?.length === 0) {
		return (
			<div className={styles.container}>
				<div className={styles.empty_state}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipmentEmptyState.png"
						alt={t('cogoStore:orderHistory_infoModel_details_image_alt')}
					/>
					<div className={styles.message}>{t('cogoStore:empty_data')}</div>
				</div>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.card_header}`}>
				<div className={cl`${styles.col} ${styles.date}`}>
					{t('cogoStore:expiry_date')}
				</div>
				<div className={cl`${styles.col} ${styles.num}`}>
					{t('cogoStore:voucher_number')}
				</div>
				<div className={cl`${styles.col} ${styles.pin}`}>
					{t('cogoStore:voucher_pin')}
				</div>
			</div>
			<div className={styles.table_container}>
				{voucherInfo.map(
					({ Voucherpin = '', EndDate = '', VoucherNo = '' }) => (
						<div
							key={VoucherNo}
							className={cl`${styles.flex_box} ${styles.card_row}`}
						>
							<div className={cl`${styles.col} ${styles.date}`}>{EndDate}</div>
							<div className={cl`${styles.col} ${styles.num}`}>
								{VoucherNo}
								<IcMCopy
									className={styles.copy_icon}
									onClick={() => handleCopy(VoucherNo)}
								/>
							</div>
							<div className={cl`${styles.col} ${styles.pin}`}>
								{Voucherpin || t('cogoStore:not_available')}
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}
export default Details;
