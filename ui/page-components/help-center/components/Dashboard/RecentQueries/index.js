import { cl } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FaqItem from '../../../common/FaqItem';
import useListFaqSearchHistory from '../../../hooks/useListFaqSearchHistory';

import styles from './styles.module.css';

function RecentQueries({ isMobile }) {
	const { recentQueries = {}, recentQueriesLoading = false } = useListFaqSearchHistory();
	const { list = [] } = recentQueries || {};
	const activeQuestionsDoesNotExists = list.every(
		(itm) => !itm?.question_abstract,
	);
	const emptyCheck = (activeQuestionsDoesNotExists || isEmpty(list)) && !recentQueriesLoading;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Recent Queries</div>
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
					User Doesn&apos;t have Any Recent Queries.
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
