import { IcMCrossInCircle } from '@cogoport/icons-react';

import { getDynamicIntelligence } from '../../utils/getDynamicIntelligence';

import styles from './styles.module.css';

const GREETING_OPTIONS = [
	'How can I help you today?',
	'Can I help you with anything today?',
];

function BotIntelligence({ showIntelligence, setShowIntelligence = () => {} }) {
	const { chooseIntelligence = '' } = getDynamicIntelligence();

	if (!(showIntelligence && chooseIntelligence)) return null;

	return (
		<div className={styles.container}>
			<div className={styles.close_header}>
				<IcMCrossInCircle
					className={styles.close_inetellegence}
					width={17}
					height={17}
					fill="#4F4F4F"
					onClick={() => setShowIntelligence(false)}
				/>
			</div>
			<div className={styles.intelligence_container}>
				{GREETING_OPTIONS.includes(chooseIntelligence) ? (
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
