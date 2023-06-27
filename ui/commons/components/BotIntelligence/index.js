import { IcMCrossInCircle } from '@cogoport/icons-react';
import { useEffect } from 'react';

import { useDynamicIntelligence } from '../../hooks/useDynamicIntelligence';

import styles from './styles.module.css';

function BotIntelligence({ showIntelligence, setShowIntelligence = () => {} }) {
	const { chooseIntelligence = '' } = useDynamicIntelligence();
	useEffect(() => {
		setShowIntelligence(true);
	});

	if (!(showIntelligence && chooseIntelligence)) return null;

	return (
		<div className={styles.container}>
			<div className={styles.close_header}>
				<IcMCrossInCircle
					className="close-inetellegence"
					width={17}
					height={17}
					cursor="pointer"
					fill="#4F4F4F"
					onClick={() => setShowIntelligence(false)}
				/>
			</div>
			<div className={styles.intelligence_container}>
				{[
					'How can I help you today?',
					'Can I help you with anything today?',
				].includes(chooseIntelligence) ? (
					<>
						<div className={styles.label}>🎉 Hi there!</div>
						<div className={styles.sub_label}>{chooseIntelligence}</div>
					</>
					) : (
						<div className={styles.sub_label}>{chooseIntelligence}</div>
					)}
			</div>
			<div className={styles.triangle} />
		</div>
	);
}
export default BotIntelligence;
