import { cl } from '@cogoport/components';

import { RATING_GRADIENT_MAPPING } from '../../../constants/color-mapping';

import styles from './styles.module.css';

const MAX_NPS = 10;

const DEFAULT_NPS = 10;

const RATING_ARRAY = [...Array(MAX_NPS).fill().keys()];

function Rating({ score = DEFAULT_NPS, setScore = () => {} }) {
	return (
		<div className={styles.rating_container}>
			{RATING_ARRAY.map((rating) => (
				<div key={rating + 1}>
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
