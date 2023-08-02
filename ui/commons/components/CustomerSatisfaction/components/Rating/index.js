import { RatingComponent } from '@cogoport/components';

import styles from './styles.module.css';

function Rating({ setFeedback, feedback }) {
	const { rating } = feedback;

	return (
		<div className={styles.stars_container}>
			<RatingComponent
				type="star"
				size="xl"
				totalStars={5}
				value={rating}
				onChange={(e) => {
					setFeedback({
						rating          : e,
						selectedOptions : [],
						reason          : '',
					});
				}}
			/>
		</div>
	);
}

export default Rating;
