import { Loader } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import { prompts } from '../../../configurations/loading-prompts';

import styles from './styles.module.css';

const TIME_INTERVAL = 2000;

function LoadingPrompts({ type = '' }) {
	const { t } = useTranslation(['common', 'authentication']);
	const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

	const modifiedPrompts = prompts(t)[type] || [];

	const { length } = modifiedPrompts;

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % length);
		}, TIME_INTERVAL);

		return () => {
			clearInterval(interval);
		};
	}, [length]);

	const currentPrompt = modifiedPrompts[currentPromptIndex] || '';
	return (
		<div className={styles.loading_container}>

			<Loader className={styles.loading_circle} />

			<p className={styles.loading_prompts}>{currentPrompt}</p>

		</div>
	);
}
export default LoadingPrompts;
