import { Placeholder, cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import TopicIcon from '../../../common/TopicIcon';
import { NO_OF_TOPICS_TO_BE_SHOWN } from '../../../constants';
import useListFaqTopics from '../../../hooks/useListFaqTopics';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function FaqTopics() {
	const { push } = useRouter();
	const { loading = false, faqTopics = {} } = useListFaqTopics({
		listAll: false,
	});

	const { list = [], total_count = 0 } = faqTopics;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Browse by Products/Category</div>
			<div className={styles.topics_container}>
				{loading ? (
					[...Array(8).keys()].map((itm) => (
						<div key={itm} className={styles.topic_container}>
							<div className={styles.square_div}>
								<div
									className={cl`${styles.icon_container} ${styles.icon_loading}`}
								>
									<Placeholder height="100%" className={styles.placeholder} />
								</div>
								<div className={styles.display_name}>
									<Placeholder height="20px" className={styles.text_skeleton} />
								</div>

								<div className={styles.question_count}>
									<Placeholder height="20px" className={styles.text_skeleton} />
								</div>
							</div>
						</div>
					))
				) : (
					<>
						{(list || []).map((item) => {
							const {
								id = '',
								display_name = '',
								question_count = '',
							} = item || {};

							return (
								<div
									key={id}
									role="presentation"
									className={styles.topic_container}
									onClick={() => push(
										'/help-center/topic/[topic_id]',
										`/help-center/topic/${id}`,
									)}
								>
									<div role="presentation" className={styles.square_div}>
										<div
											className={cl`${styles.icon_container} ${
												loading ? styles.icon_loading : ''
											}`}
										>
											<TopicIcon item={item} homePage />
										</div>

										<div className={styles.display_name}>
											{startCase(display_name)}
										</div>

										<div className={styles.question_count}>
											{question_count}
											{' '}
											Questions
										</div>
									</div>
								</div>
							);
						})}

						{total_count > NO_OF_TOPICS_TO_BE_SHOWN
							&& (list || []).length === NO_OF_TOPICS_TO_BE_SHOWN && (
								<div className={styles.topic_container}>
									<div
										role="presentation"
										className={styles.square_div}
										onClick={() => push('/help-center/topics', '/help-center/topics')}
									>
										<div
											className={cl`${styles.icon_container} ${
												loading ? styles.icon_loading : ''
											}`}
										>
											<IcMArrowNext className={styles.arrow_icon} />
										</div>
										<div className={styles.display_name}>See all</div>
										<div className={styles.question_count}>
											{total_count - NO_OF_TOPICS_TO_BE_SHOWN}
											<span className={styles.add_margin_between}>more queries</span>
										</div>
									</div>
								</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default FaqTopics;
