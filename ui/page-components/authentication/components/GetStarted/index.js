import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import LoadingPrompts from '../common/LoadingPrompts';

import DetailsForm from './DetailsForm';
import styles from './styles.module.css';

const GET_STARTED_FLOW_MAPPING = {
	details_form    : DetailsForm,
	loading_prompts : LoadingPrompts,
};

function GetStarted() {
	const { t } = useTranslation(['authentication']);

	const [mode, setMode] = useState('details_form');

	const componentProps = {
		details_form: {
			setMode,
		},
		loading_prompts: {
			type: 'signup',
		},
	};

	const Component = GET_STARTED_FLOW_MAPPING[mode] || null;
	return (
		<div className={styles.authentication_layout}>

			<LayoutLogo />

			<div className={styles.card_container}>
				<div className={styles.card}>
					{Component && (
						<Component
							key={mode}
							t={t}
							{...(componentProps[mode] || {})}
						/>
					)}
				</div>
			</div>

			<LayoutHelp />

		</div>
	);
}

export default GetStarted;
