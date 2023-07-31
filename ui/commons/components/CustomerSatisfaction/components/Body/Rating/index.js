import { IcCStar, IcMStarfull } from '@cogoport/icons-react';

import styles from './styles.module.css';

const RATING_ARRAY = [...Array(5).fill().keys()];

function Rating({ rating = 5, setRating = () => {} }) {
	return (
		<div className={styles.stars_container}>
			{RATING_ARRAY.map((star, index) => (
				<div role="presentation" onClick={() => setRating(index + 1)} className={styles.star}>
					{index < rating ? <IcCStar width={22} height={22} key={star} />
						: <IcMStarfull width={19} height={19} key={star} className={styles.unselected_star} />}
				</div>
			))}
		</div>
	);
}

export default Rating;
