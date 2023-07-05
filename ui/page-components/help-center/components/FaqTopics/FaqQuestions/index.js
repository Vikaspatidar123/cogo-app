import { Pagination, Placeholder, cl } from '@cogoport/components';
import { IcMHelp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'react-i18next';

import FaqItem from '../../../common/FaqItem';
import useListFaqTopicQuestions from '../../../hooks/useListFaqTopicQuestions';

import styles from './styles.module.css';

const translationKey = 'helpCenter:faq_topics';

function FaqQuestions({
	selectedTopic = {},
	topicsLoading = false,
	isMobile = false,
}) {
	const { t } = useTranslation(['helpCenter']);

	const { display_name = '', description = '', id = '' } = selectedTopic || {};

	const {
		faqListTopicData = {},
		topicLoading = false,
		currentPage = 1,
		fetchFaqTopicQuestions,
	} = useListFaqTopicQuestions({
		topicId: id || '',
	});

	const {
		list = [],
		total_count = 0,
		total = 0,
		page_limit = 0,
	} = faqListTopicData || {};

	const loading = topicsLoading || topicLoading;

	if (isEmpty(selectedTopic)) {
		return (
			<div className={styles.empty_container}>
				<IcMHelp className={styles.help_icon} />
				<div className={styles.empty_text}>
					{t(`${translationKey}_empty_text`)}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>{display_name}</div>
			<div className={styles.sub_header}>{description}</div>
			<div
				className={cl`${styles.list_container} ${
					isMobile ? styles.mobile_list_container : ''
				}`}
			>
				<div>
					{loading
						? [...Array(10).keys()].map((itm) => (
							<Placeholder
								key={itm}
								width="90%"
								height="30px"
								className={styles.list_loading}
							/>
						))
						: list.map((itm) => (
							<div key={itm?.id} className={styles.faq_list_item}>
								<FaqItem faqData={itm} fromTopics />
							</div>
						))}
				</div>

				<div className={styles.pagination_container}>
					{total > 1 && !loading && (
						<Pagination
							type="number"
							currentPage={currentPage}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={(val) => fetchFaqTopicQuestions({ page: val })}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default FaqQuestions;
