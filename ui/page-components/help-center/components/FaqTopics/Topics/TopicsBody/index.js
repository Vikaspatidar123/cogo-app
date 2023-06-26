import { Placeholder, cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { snakeCase } from '@cogoport/utils';

import TopicIcon from '../../../../common/TopicIcon';

import styles from './styles.module.css';

const hasSearchValue = ({ display_name, description, inputQuery }) => {
	const toSearch = inputQuery.trim();

	return [
		snakeCase(display_name),
		snakeCase(description)].some((itm) => (toSearch ? itm.includes(snakeCase(toSearch)) : true));
};

function TopicsBody({
	loading = false,
	topicsList = [],
	inputQuery = '',
	selectedTopic = {},
	setSelectedTopic = () => {},
}) {
	if (loading) {
		return [...Array(14).keys()].map((itm) => (
			<Placeholder
				height="30px"
				width="80%"
				key={itm}
				className={styles.skeleton_styles}
			/>
		));
	}

	return (topicsList || []).map((itm) => {
		const toBeShown = hasSearchValue({
			display_name : itm?.display_name || '',
			description  : itm?.description || '',
			inputQuery,
		});

		if (!toBeShown) {
			return null;
		}

		return (
			<div
				key={itm?.id}
				role="presentation"
				onClick={() => setSelectedTopic(itm)}
				className={cl`${styles.topic_name} ${
					selectedTopic?.id === itm?.id ? styles.active_topic : ''
				}`}
			>
				<div className={styles.topic_container}>
					<TopicIcon item={itm} />
					{itm?.display_name}
				</div>

				{selectedTopic?.id === itm?.id && (
					<IcMArrowRight className={styles.arrow_icon} />
				)}
			</div>
		);
	});
}

export default TopicsBody;
