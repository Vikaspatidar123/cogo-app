import { cl } from '@cogoport/components';

import GET_MAPPING from '../../constant/card';

import styles from './styles.module.css';

function CardInfo({ activeTab, type = '', input, reference_no = '', serialId = '' }) {
	const { CARD_TITLE } = GET_MAPPING?.[activeTab] || {};

	return (
		<div className={styles.container}>

			<div className={cl`${styles.tag} ${styles.header}`}>
				{activeTab === 'ocean' ? CARD_TITLE?.[type] : CARD_TITLE}
				{' '}
				:
				{' '}
				{input}
			</div>

			{reference_no && (
				<div className={cl`${styles.tag} ${styles.reference_no}`}>
					Ref No. :
					{' '}
					{reference_no}
				</div>
			)}

			{serialId &&	(
				<div className={`${styles.book_cogo_tag}`}>
					<div className={cl`${styles.tag} ${styles.book_cogo}`}>Booked with Cogoport</div>
					<div className={cl`${styles.tag} ${styles.book_cogo}`}>
						SID:
						{' '}
						{serialId}
					</div>
				</div>
			)}

		</div>

	);
}

export default CardInfo;
