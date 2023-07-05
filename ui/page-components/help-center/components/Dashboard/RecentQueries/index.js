import { cl } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'react-i18next';

import FaqItem from '../../../common/FaqItem';
import useListFaqSearchHistory from '../../../hooks/useListFaqSearchHistory';

import styles from './styles.module.css';

const translationKey = 'helpCenter:faq_home_page';

function RecentQueries({ isMobile }) {
	const { t } = useTranslation(['helpCenter']);

	const { recentQueries = {}, recentQueriesLoading = false } = useListFaqSearchHistory();
	const { list = [] } = recentQueries || {};
	const activeQuestionsDoesNotExists = list.every(
		(itm) => !itm?.question_abstract,
	);
	const emptyCheck = (activeQuestionsDoesNotExists || isEmpty(list)) && !recentQueriesLoading;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{t(`${translationKey}_recent_queries`)}</div>
			</div>
			{emptyCheck ? (
				<div
					className={cl`${styles.faqs_container} ${styles.empty_container} ${
						isMobile ? styles.mobile_empty_container : ''
					}`}
				>
					<IcMSearchlight
						className={cl`${styles.search_icon} ${
							isMobile ? styles.mobie_search_icon : ''
						}`}
					/>
					{t(`${translationKey}_empty_recent_queries`)}
				</div>
			) : (
				<div className={styles.faqs_container}>
					{(recentQueriesLoading ? [...Array(4).keys()] : list).map((itm) => (
						<FaqItem
							faqData={itm}
							recentQueries
							key={itm?.id || itm}
							loading={recentQueriesLoading}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default RecentQueries;
