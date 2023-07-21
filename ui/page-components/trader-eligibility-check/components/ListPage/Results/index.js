import { Placeholder } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const LOADER_ARRAY = [...Array(3).keys()];

function Results({ loading, screeningRequestResponse, screeningPartyName }) {
	const { t } = useTranslation(['traderEligibilityCheck']);

	if (loading) {
		return LOADER_ARRAY.map((item) => (
			<div key={item}>
				<Placeholder className={styles.placeholder_styles}>
					{[...Array(5).keys()].map((itm) => (
						<div className={styles.line} key={itm} />
					))}
				</Placeholder>
			</div>
		));
	}
	if (screeningRequestResponse?.length > 0) {
		return (
			<>
				<div className={styles.title}>
					{t('traderEligibilityCheck:tec_list_page_total_results')}
					{' '}
					(
					{screeningRequestResponse.length}
					)
				</div>
				<div className={styles.list_wrapper}>
					{(screeningRequestResponse || []).map((item) => (
						<div
							className={styles.card}
							key={`${item?.screeningName}_${item?.screeningAka}`}
						>
							<div className={styles.styled_row}>
								<div className={styles.new_column}>
									{item?.screeningName?.toUpperCase()}
								</div>
								<div>
									<div className={styles.percentage}>
										{Number(item?.screeningMatchWeight) * 100}
										%
									</div>
									<div className={styles.score_text}>
										{t('traderEligibilityCheck:tec_list_page_matching_score')}
									</div>
								</div>
							</div>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.heading2}>
										{t('traderEligibilityCheck:tec_list_page_listing_name_heading')}
									</div>
									<div className={styles.text2}>
										{item?.screeningListName}
									</div>
								</div>
							</div>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.heading2}>
										{t('traderEligibilityCheck:tec_list_page_department_name')}
									</div>
									<div className={styles.text2}>
										{item?.screeningDept}
									</div>
								</div>
								<div>
									<div className={styles.heading2}>
										{t('traderEligibilityCheck:tec_list_page_registered_date')}
									</div>
									<div className={styles.text2}>
										{item?.screeningFedRegDate}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</>
		);
	}
	if (screeningRequestResponse == null) {
		return (
			<div className={styles.list_wrapper}>
				<div className={styles.label}>
					<div className={styles.emptytext}>
						{t('traderEligibilityCheck:tec_list_page_couldnt_fetch_details')}
						<div>{t('traderEligibilityCheck:tec_list_page_try_later_text')}</div>
					</div>
				</div>
			</div>
		);
	}
	if (screeningRequestResponse?.length === 0) {
		return (
			<div className={styles.list_wrapper}>
				<Image src={GLOBAL_CONSTANTS.image_url.secure_icon} alt="secure_icon" height={300} width={300} />
				<div className={styles.label}>
					<div className={styles.bold}>
						{screeningPartyName.toUpperCase()}
					</div>
					<div>{t('traderEligibilityCheck:tec_list_page_is_verified_user')}</div>
				</div>
			</div>
		);
	}
}

export default Results;
