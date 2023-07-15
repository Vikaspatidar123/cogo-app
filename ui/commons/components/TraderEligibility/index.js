import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import GLOBAL_CONSTANTS from '../../constants/globals';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function TraderEligibilityModal({ tradeEngineResponse = {}, isModal = false }) {
	const { screeningRequestResponse = {}, screeningPartyName = '' } = tradeEngineResponse || {};
	const { t } = useTranslation(['tecResult']);

	return (
		<div className={isModal ? styles.modal_styles : ''}>
			<div className={styles.styled_tag}>
				{t('tecResult:tec_trader_name')}
				{' '}
				{screeningPartyName.toUpperCase()}
			</div>
			{!isEmpty(screeningRequestResponse) ? (
				<>
					<div className={styles.title}>
						{t('tecResult:tec_total_result')}
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
											<div className={styles.score_text}>{t('tecResult:tec_match_score')}</div>
										</div>
									</div>
									<div className={styles.styled_row}>
										<div className={styles.column}>
											<div className={styles.heading2}>{t('tecResult:tec_list_name')}</div>
											<div className={styles.text2}>{screeningListName}</div>
										</div>
									</div>
									<div className={styles.styled_row}>
										<div className={styles.column}>
											<div className={styles.heading2}>{t('tecResult:tec_dept_name')}</div>
											<div className={styles.text2}>{screeningDept}</div>
										</div>
										<div className={styles.column}>
											<div className={styles.heading2}>{t('tecResult:tec_date')}</div>
											<div className={styles.text2}>{screeningFedRegDate}</div>
										</div>
									</div>
								</div>
							),
						)}
					</div>
				</>
			) : (
				<div className={cl`${styles.list_wrapper} ${styles.verifieduser}`}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.secure_profile_icon}
						alt={t('tecResult:tec_secure_alt')}
						height={150}
						width={150}
					/>
					<div className={styles.label}>
						<b className={styles.bold}>{screeningPartyName.toUpperCase()}</b>
						<div>
							{' '}
							{t('tecResult:tec_trader_msg')}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default TraderEligibilityModal;
