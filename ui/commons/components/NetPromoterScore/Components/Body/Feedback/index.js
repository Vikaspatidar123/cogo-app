import { Chips, Textarea } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { getFeedbackMapping } from '../../../constants/feedback-mapping';
import { getFeedbackTitleMapping } from '../../../constants/feedback-title-mapping';

import styles from './styles.module.css';

const DEFAULT_NPS = 10;

function Feedback({ score = DEFAULT_NPS, feedback = {}, setFeedback = () => {} }) {
	const { selectedOptions = [], reason = '' } = feedback || {};

	const { t } = useTranslation(['common']);

	const FEEDBACK_MAPPING = getFeedbackMapping({ t });
	const FEEDBACK_TITLE_MAPPING = getFeedbackTitleMapping({ t });

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
					placeholder={t('common:nps_feedback_placeholder')}
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
