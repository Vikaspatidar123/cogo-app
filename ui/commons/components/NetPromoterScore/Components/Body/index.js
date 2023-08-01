import { useTranslation } from 'next-i18next';

import Feedback from './Feedback';
import Rating from './Rating';
import styles from './styles.module.css';

const DEFAULT_NPS = 10;

function RatingText() {
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>
			<div className={styles.dissatisfied_text}>
				{t('common:net_promoter_score_text_5')}
			</div>
			<div className={styles.satisfied_text}>
				{t('common:net_promoter_score_text_6')}
			</div>
		</div>
	);
}

function Body({ score = DEFAULT_NPS, setScore = () => {}, feedback = {}, setFeedback = () => {} }) {
	return (
		<div className={styles.body}>
			<Rating score={score} setScore={setScore} />
			<RatingText />
			<Feedback score={score} feedback={feedback} setFeedback={setFeedback} />
		</div>
	);
}

export default Body;
