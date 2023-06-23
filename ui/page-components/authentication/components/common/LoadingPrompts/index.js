import { Loader } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { prompts } from '../../../configurations/loading-prompts';

import styles from './styles.module.css';

function LoadingPrompts({ type = '' }) {
	const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

	const modifiedPrompts = prompts[type] || [];

	const { length } = modifiedPrompts;

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % length);
		}, 2000);

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
