import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function TraderEligibilityModal({ tradeEngineResponse = {} }) {
	const { screeningRequestResponse = {}, screeningPartyName = '' } = tradeEngineResponse || {};
	const { t } = useTranslation(['orderHistory']);

	return (
		<>
			<div className={styles.styled_tag}>
				{t(':tec_trader_name')}
				{' '}
				{screeningPartyName.toUpperCase()}
			</div>
			{screeningRequestResponse?.length > 0 && (
				<>
					<div className={styles.title}>
						{t('orderHistory:tec_total_result')}
						{' '}
						(
						{screeningRequestResponse.length}
						)
					</div>

					<div className={styles.list_wrapper}>
						{(screeningRequestResponse || []).map(
							({
								screeningAka = '',
								screeningListName = '',
								screeningName = '',
								screeningMatchWeight = 0,
								screeningFedRegDate = '',
								screeningDept = '',
							}) => (
								<div
									className={styles.card}
									key={`${screeningName}_${screeningAka}`}
								>
									<div className={styles.styled_row}>
										<div className={styles.name_column}>{screeningName?.toUpperCase()}</div>
										<div className={styles.column}>
											<div className={styles.percentage}>
												{screeningMatchWeight * 100}
												%
											</div>
											<div className={styles.score_text}>{t('orderHistory:tec_match_score')}</div>
										</div>
									</div>
									<div className={styles.styled_row}>
										<div className={styles.column}>
											<div className={styles.heading2}>{t('orderHistory:tec_list_name')}</div>
											<div className={styles.text2}>{screeningListName}</div>
										</div>
									</div>
									<div className={styles.styled_row}>
										<div className={styles.column}>
											<div className={styles.heading2}>{t('orderHistory:tec_dept_name')}</div>
											<div className={styles.text2}>{screeningDept}</div>
										</div>
										<div className={styles.column}>
											<div className={styles.heading2}>{t('orderHistory:tec_date')}</div>
											<div className={styles.text2}>{screeningFedRegDate}</div>
										</div>
									</div>
								</div>
							),
						)}
					</div>
				</>
			)}
			{screeningRequestResponse?.length === 0 && (
				<div className={cl`${styles.list_wrapper} ${styles.verifieduser}`}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.secure_icon}
						alt={t('orderHistory:tec_secure_alt')}
						height={100}
						width={100}
					/>
					<div className={styles.label}>
						<b className={styles.bold}>{screeningPartyName.toUpperCase()}</b>
						<div>{t('orderHistory:tec_trader_msg')}</div>
					</div>
				</div>
			)}
		</>
	);
}

export default TraderEligibilityModal;
