import { Chips, Textarea } from '@cogoport/components';

import { FEEDBACK_MAPPING } from '../../../constants/feedback-mapping';
import { FEEDBACK_TITLE_MAPPING } from '../../../constants/feedback-title-mapping';

import styles from './styles.module.css';

function Feedback({ score = 10, feedback = {}, setFeedback = () => {} }) {
	const { selectedOptions = [], reason = '' } = feedback || {};
	const options = FEEDBACK_MAPPING[score];

	return (
		<div className={styles.container}>
			<div className={styles.text_1}>
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
					size="xl"
					enableMultiSelect
				/>
			</div>
			<div className={styles.text_area}>
				<Textarea
					size="lg"
					rows={4}
					placeholder="Want to share anything else? Type here..."
					value={reason}
					onChange={(e) => {
						setFeedback((prev) => ({
							...prev,
							reason: e,
						}));
					}}
				/>
			</div>
		</div>
	);
}

export default Feedback;
