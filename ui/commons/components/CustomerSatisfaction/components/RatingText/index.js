import { Chips, Textarea } from '@cogoport/components';

import { FEEDBACK_MAPPING } from '../../constants/feedback-options';
import { FEEDBACK_TITLE_MAPPING } from '../../constants/feedback-title-mapping';

import styles from './styles.module.css';

function RatingText({ setFeedback, feedback }) {
	const { rating, selectedOptions = [], reason = '' } = feedback || {};

	const options = FEEDBACK_MAPPING[rating];
	return (
		<div className={styles.container}>

			<div className={styles.title}>
				{FEEDBACK_TITLE_MAPPING[rating]}
			</div>

			<div className={styles.chips}>
				<Chips
					items={options}
					selectedItems={selectedOptions}
					enableMultiSelect
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
