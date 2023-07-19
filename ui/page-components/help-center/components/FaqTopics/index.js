/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListFaqTopics from '../../hooks/useListFaqTopics';

import FaqQuestions from './FaqQuestions';
import styles from './styles.module.css';
import Topics from './Topics';

import { useSelector } from '@/packages/store';

function FaqTopics() {
	const { query = '' } = useSelector((state) => state.general);
	const [showTopics, setShowTopics] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState(null);
	const { loading = false, faqTopics = {} } = useListFaqTopics({
		listAll: true,
	});

	const { topic_id = '' } = query || {};
	const { list: topicsList = [] } = faqTopics || {};

	useEffect(() => {
		setShowTopics(!(topic_id || !isEmpty(selectedTopic)));
	}, [topic_id, selectedTopic]);

	useEffect(() => {
		if (!isEmpty(topicsList) && selectedTopic?.id !== topic_id) {
			const selectedData = topicsList.find((itm) => itm.id === topic_id) || {};
			setSelectedTopic(selectedData);
		}
	}, [topicsList]);

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<Topics
					setSelectedTopic={setSelectedTopic}
					selectedTopic={selectedTopic}
					topicsList={topicsList}
					loading={loading}
					showTopics={showTopics}
					setShowTopics={setShowTopics}
				/>
			</div>
			<div className={styles.right_container}>
				<FaqQuestions
					selectedTopic={selectedTopic}
					setSelectedTopic={setSelectedTopic}
					faqTopics={faqTopics}
					topicsLoading={loading}
				/>
			</div>
		</div>
	);
}

export default FaqTopics;
