/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListFaqTopics from '../../hooks/useListFaqTopics';

import FaqQuestions from './FaqQuestions';
import styles from './styles.module.css';
import Topics from './Topics';

import { useSelector } from '@/packages/store';

function FaqTopics() {
	const { query = '', isMobile = false } = useSelector(
		(state) => state.general,
	);
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
		<div
			className={cl`${styles.container} ${
				isMobile ? styles.mobile_container : ''
			}`}
		>
			<div
				className={cl`${styles.left_container} ${
					isMobile ? styles.mobile_child_container : ''
				}`}
			>
				<Topics
					setSelectedTopic={setSelectedTopic}
					selectedTopic={selectedTopic}
					topicsList={topicsList}
					loading={loading}
					isMobile={isMobile}
					showTopics={showTopics}
					setShowTopics={setShowTopics}
				/>
			</div>
			<div
				className={cl`${styles.right_container} ${
					isMobile ? styles.mobile_child_container : ''
				}`}
			>
				<FaqQuestions
					selectedTopic={selectedTopic}
					setSelectedTopic={setSelectedTopic}
					faqTopics={faqTopics}
					isMobile={isMobile}
					topicsLoading={loading}
				/>
			</div>
		</div>
	);
}

export default FaqTopics;
