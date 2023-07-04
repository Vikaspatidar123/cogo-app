import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function MapResultCard({ item }) {
	const { t } = useTranslation(['traderEligibilityCheck']);
	return (
		<>
			<div className={styles.row}>
				<div className={styles.name_column}>
					{item?.screeningName?.toUpperCase()}
					<div className={styles.flex}>
						{item?.screeningStateOrProvince && (
							<div className={styles.country}>
								{item?.screeningStateOrProvince}
								,
							</div>
						)}
						{item?.screeningCountry && (
							<div className={styles.country}>{item?.screeningCountry}</div>
						)}
					</div>
				</div>
				<div className={styles.score_column}>
					<div className={item?.screeningMatchWeight > 0.5 ? styles.good_percentage : styles.poor_percentage}>
						{(item.screeningMatchWeight || 0) * 100}
						%
					</div>
					<div className={styles.score_text}>{t('traderEligibilityCheck:tec_list_page_matching_score')}</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.column}>
					<div className={styles.heading}>
						{t('traderEligibilityCheck:tec_list_page_listing_name_heading')}
					</div>
					<div className={styles.text}>{item?.screeningListName}</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.department_column}>
					<div className={styles.heading}>{t('traderEligibilityCheck:tec_list_page_department_name')}</div>
					<div className={styles.text}>{item?.screeningDept}</div>
				</div>
				<div className={styles.date_column}>
					<div className={styles.heading}>{t('traderEligibilityCheck:tec_list_page_registered_date')}</div>
					<div className={styles.text}>{item?.screeningFedRegDate}</div>
				</div>
			</div>
		</>
	);
}

export default MapResultCard;
