import GET_MAPPING from '../../constant/card';

import styles from './styles.module.css';

function CardInfo({ activeTab, type = '', input }) {
	const { CARD_TITLE } = GET_MAPPING?.[activeTab] || {};

	if (activeTab === 'ocean') {
		return (
			<div className={styles.header}>
				{CARD_TITLE?.[type]}
				{' '}
				:
				{' '}
				{input}
			</div>
		);
	}
	return (
		<div className={styles.header}>
			{CARD_TITLE}
			{' '}
			:
			{' '}
			{input}
		</div>
	);
}

export default CardInfo;
