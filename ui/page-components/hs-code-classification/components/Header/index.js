import { Toggle } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

function Header({
	refetch,
	refetchSearch,
	loading,
	resetDrillDownHandler,
	setSearchTag,
}) {
	const { t } = useTranslation(['common', 'hsClassification']);

	const [labeledValue, setLabeledValue] = useState('normalSearch');
	const handleToggle = (value) => {
		setLabeledValue(value ? 'advanceSearch' : 'normalSearch');
		setSearchTag('');
	};
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>{t('hsClassification:hs_code_classification_label')}</div>
				<div>
					<Toggle
						name="a4"
						size="md"
						disabled={false}
						onLabel={t('hsClassification:hs_code_classification_toggle_on_label')}
						offLabel={t('hsClassification:hs_code_classification_toggle_off_label')}
						onChange={(value) => {
							handleToggle(value.target.checked);
						}}
					/>
				</div>
			</div>
			<Filters
				labeledValue={labeledValue}
				refetch={refetch}
				refetchSearch={refetchSearch}
				loading={loading}
				resetDrillDownHandler={resetDrillDownHandler}
				setSearchTag={setSearchTag}
			/>
		</div>
	);
}

export default Header;
