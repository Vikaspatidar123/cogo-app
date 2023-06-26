import { Input, cl } from '@cogoport/components';
import {
	IcMSearchlight,
	IcMArrowBack,
	IcMArrowDoubleDown,
	IcMArrowDoubleUp,
} from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';
import TopicsBody from './TopicsBody';

import { useRouter } from '@/packages/next';

function Topics({
	selectedTopic = {},
	setSelectedTopic = () => {},
	setShowTopics = () => {},
	topicsList = [],
	loading = false,
	showTopics = false,
	isMobile = false,
}) {
	const { push } = useRouter();
	const [inputQuery, setInputQuery] = useState('');

	if (!showTopics && isMobile) {
		return (
			<div
				className={styles.show_topics}
				onClick={() => setShowTopics(true)}
				role="presentation"
			>
				Show topics
				<IcMArrowDoubleDown className={styles.icon_styles} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<div className={styles.header}>
					<IcMArrowBack
						className={styles.back_arrow}
						onClick={() => push('/help-center')}
					/>

					<div className={styles.title}>
						Categories
					</div>
				</div>

				<Input
					size="md"
					value={inputQuery}
					placeholder="Type here to search topic..."
					prefix={<IcMSearchlight className={styles.search_icon} />}
					onChange={setInputQuery}
				/>
			</div>

			<div className={styles.topics_list_container}>
				<TopicsBody
					loading={loading}
					topicsList={topicsList}
					inputQuery={inputQuery}
					selectedTopic={selectedTopic}
					setSelectedTopic={setSelectedTopic}
				/>
			</div>

			{showTopics && isMobile && (
				<div
					className={cl`${styles.hide_topics} ${styles.show_topics}`}
					onClick={() => setShowTopics(false)}
					role="presentation"
				>
					Hide Topics
					<IcMArrowDoubleUp className={styles.icon_styles} />
				</div>
			)}
		</div>
	);
}

export default Topics;
