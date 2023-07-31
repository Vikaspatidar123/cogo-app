import { cl } from '@cogoport/components';

import { RATING_GRADIENT_MAPPING } from '../../../constants/color-mapping';

import styles from './styles.module.css';

const RATING_ARRAY = [...Array(10).fill().keys()];

function Rating({ score = 10, setScore = () => {} }) {
	return (
		<div className={styles.rating_container}>
			{RATING_ARRAY.map((rating) => (
				<div>
					<div
						className={rating !== score - 1
							? styles.rating : cl`${styles.rating} ${styles.selected_rating}`}
						key={rating + 1}
						onClick={() => setScore(rating + 1)}
						role="presentation"
					>
						<div className={rating === score - 1 ? styles.text : ''}>{rating + 1}</div>

					</div>
					<div
						className={rating < score ? styles.line : ''}
						style={{ background: RATING_GRADIENT_MAPPING[score] }}
					/>
				</div>
			))}
		</div>
	);
}

export default Rating;
