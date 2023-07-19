import { Pagination, Placeholder } from '@cogoport/components';
import { IcMHelp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import FaqItem from '../../../common/FaqItem';
import useListFaqTopicQuestions from '../../../hooks/useListFaqTopicQuestions';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'helpCenter:faq_topics';

const EMPTY_ARR = [...Array(10).keys()];

function FaqQuestions({
	selectedTopic = {},
	topicsLoading = false,
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
		total_count = GLOBAL_CONSTANTS.zeroth_index,
		total = GLOBAL_CONSTANTS.zeroth_index,
		page_limit = GLOBAL_CONSTANTS.zeroth_index,
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
			<div className={styles.list_container}>
				<div>
					{loading
						? EMPTY_ARR.map((itm) => (
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
