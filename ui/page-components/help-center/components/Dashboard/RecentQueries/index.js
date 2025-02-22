import { cl } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import FaqItem from '../../../common/FaqItem';
import useListFaqSearchHistory from '../../../hooks/useListFaqSearchHistory';

import styles from './styles.module.css';

const translationKey = 'helpCenter:faq_home_page';

const EMPTY_ARR = [...Array(4).keys()];

function RecentQueries() {
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
					className={cl`${styles.faqs_container} ${styles.empty_container}`}
				>
					<IcMSearchlight className={styles.search_icon} />
					{t(`${translationKey}_empty_recent_queries`)}
				</div>
			) : (
				<div className={styles.faqs_container}>
					{(recentQueriesLoading ? EMPTY_ARR : list).map((itm) => (
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
