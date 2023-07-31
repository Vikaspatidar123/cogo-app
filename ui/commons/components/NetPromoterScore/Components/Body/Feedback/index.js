import { Chips, Textarea } from '@cogoport/components';

import { FEEDBACK_MAPPING } from '../../../constants/feedback-mapping';

import styles from './styles.module.css';

function Feedback({ score = 10, feedback = {}, setFeedback = () => {} }) {
	const { selectedOptions = [], reason = '' } = feedback || {};
	const options = FEEDBACK_MAPPING[score].map((option) => ({
		key      : option,
		children : option,
	}));

	return (
		<div className={styles.container}>
			<div className={styles.text_1}>
				Your Opinion Counts! Tell Us About Your Experience.
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
					size="lg"
					enableMultiSelect
				/>
			</div>
			<div>
				<Textarea
					size="lg"
					rows={4}
					placeholder="Want to share anything else? type here..."
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
