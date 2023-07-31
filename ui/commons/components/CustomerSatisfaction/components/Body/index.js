import Rating from './Rating';
import RatingText from './RatingText';

function Body({ rating = 5, setRating = () => {}, setFeedback = () => {}, feedback = {} }) {
	return (
		<div>
			<Rating rating={rating} setRating={setRating} />
			<RatingText rating={rating} feedback={feedback} setFeedback={setFeedback} />
		</div>
	);
}

export default Body;
