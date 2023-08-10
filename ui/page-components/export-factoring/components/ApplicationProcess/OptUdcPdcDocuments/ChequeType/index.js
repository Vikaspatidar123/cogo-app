import { RadioGroup } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const chequeTypeOptions = [{ label: 'Undated Cheque (UDC)', value: 'UDC' },
	{ label: 'Post Dated Cheque (PDC)', value: 'PDC' }];

function ChequeType({ selectedType = '', setSelectedType = () => {} }) {
	return (
		<div className={styles.container}>

			<RadioGroup
				className={styles.radio_grp}
				options={chequeTypeOptions}
				value={selectedType}
				onChange={setSelectedType}
			/>
		</div>
	);
}

export default ChequeType;
