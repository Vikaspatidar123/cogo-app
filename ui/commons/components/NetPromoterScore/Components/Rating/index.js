import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { RATING_GRADIENT_MAPPING } from '../../constants/color-mapping';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const MAX_NPS = 10;

function Rating({ feedback, setFeedback }) {
	const { score } = feedback;

	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>

			<div className={styles.rating_container}>
				{[...Array(MAX_NPS).keys()].map((rating) => (
					<div key={rating}>

						<div
							className={cl`${styles.rating}
							${rating === score - GLOBAL_CONSTANTS.first_index ? styles.selected_rating : ''}`}
							onClick={() => {
								setFeedback({
									reason          : '',
									selectedOptions : [],
									score           : rating + GLOBAL_CONSTANTS.first_index,
								});
							}}
							role="presentation"
						>
							<div className={rating === score - GLOBAL_CONSTANTS.first_index
								? styles.text : ''}
							>
								{rating + GLOBAL_CONSTANTS.first_index}

							</div>
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
