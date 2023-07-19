import { useState } from 'react';

import LayoutHelp from '../common/LayoutHelp';
import LayoutLogo from '../common/LayoutLogo';
import LoadingPrompts from '../common/LoadingPrompts';

import DetailsForm from './DetailsForm';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const GET_STARTED_FLOW_MAPPING = {
	details_form    : DetailsForm,
	loading_prompts : LoadingPrompts,
};

function GetStarted() {
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
		<div
			className={styles.authentication_layout}
			style={{
				backgroundImage: `url(${GLOBAL_CONSTANTS.image_url.neo_background_image})`,
			}}
		>
			<LayoutLogo />

			<div className={styles.card_container}>
				<div className={styles.card}>
					{Component && (
						<Component
							key={mode}
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
