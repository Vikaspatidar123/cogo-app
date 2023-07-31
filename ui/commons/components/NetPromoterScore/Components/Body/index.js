import Feedback from './Feedback';
import Rating from './Rating';
import styles from './styles.module.css';

function RatingText() {
	return (
		<div className={styles.container}>
			<div className={styles.dissatisfied_text}>
				Extremely Dissatisfied
			</div>
			<div className={styles.satisfied_text}>
				Extremely Satisfied
			</div>
		</div>
	);
}

function Body({ score = 10, setScore = () => {}, feedback = {}, setFeedback = () => {} }) {
	return (
		<div style={{ width: '100%' }}>
			<Rating score={score} setScore={setScore} />
			<RatingText />
			<Feedback score={score} feedback={feedback} setFeedback={setFeedback} />
		</div>
	);
}

export default Body;
