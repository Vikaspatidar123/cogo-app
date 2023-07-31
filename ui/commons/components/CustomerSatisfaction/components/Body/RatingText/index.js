import { Chips, Textarea } from '@cogoport/components';

import { FEEDBACK_MAPPING } from '../../../constants/feedback-options';
import { FEEDBACK_TITLE_MAPPING } from '../../../constants/feedback-title-mapping';

import styles from './styles.module.css';

function RatingText({ score = 5, setFeedback = () => {}, feedback = {} }) {
	const { selectedOptions = [], reason = '' } = feedback || {};

	const options = FEEDBACK_MAPPING[score];
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{FEEDBACK_TITLE_MAPPING[score]}
			</div>
			<div className={styles.chips}>
				<Chips
					items={options}
					selectedItems={selectedOptions}
					onItemChange={(e) => {
						setFeedback((prev) => ({
							...prev,
							selectedOptions: e,
						}));
					}}
				/>
			</div>
			<div>
				<Textarea
					rows={4}
					value={reason}
					placeholder="Want to share anything else? type here..."
					onChange={(e) => setFeedback((prev) => ({
						...prev,
						reason: e,
					}))}
				/>
			</div>
		</div>
	);
}

export default RatingText;
