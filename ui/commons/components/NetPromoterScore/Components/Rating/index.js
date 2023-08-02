import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { RATING_GRADIENT_MAPPING } from '../../constants/color-mapping';

import styles from './styles.module.css';

const MAX_NPS = 10;

const RATING_ARRAY = [...Array(MAX_NPS).keys()];

function Rating({ feedback, setFeedback }) {
	const { score } = feedback;

	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>

			<div className={styles.rating_container}>
				{RATING_ARRAY.map((rating) => (
					<div key={rating}>

						<div
							key={rating + 1}
							className={cl`${styles.rating} ${rating === score - 1 ? styles.selected_rating : ''}`}
							onClick={() => {
								setFeedback({
									reason          : '',
									selectedOptions : [],
									score           : rating + 1,
								});
							}}
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

			<div className={styles.rating_text_container}>
				<div className={styles.dissatisfied_text}>
					{t('common:net_promoter_score_text_5')}
				</div>

				<div className={styles.satisfied_text}>
					{t('common:net_promoter_score_text_6')}
				</div>
			</div>

		</div>

	);
}

export default Rating;
