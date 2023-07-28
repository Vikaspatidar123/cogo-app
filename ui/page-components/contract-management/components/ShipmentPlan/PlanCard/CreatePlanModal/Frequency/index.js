import { Input, RadioGroup, Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { FREQUENCY_OPTIONS } from '../../../constants';

import styles from './styles.module.css';

function Frequency({
	frequency,
	setFrequency = () => {},
	setFreqCount = () => {},
	freqCount,
	disableOptions,
}) {
	useEffect(() => {
		if (freqCount > 365) {
			Toast.error('Frequency cannot exceed more than 365');
			setFreqCount('');
		}
	}, [freqCount, setFreqCount]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Shipment Frequency</div>

			<div className={styles.options}>
				<RadioGroup
					options={FREQUENCY_OPTIONS}
					value={frequency}
					onChange={(item) => setFrequency(item)}
					disabled={disableOptions}
				/>

				<div className={styles.input_container}>
					{frequency === 'others' && (
						<div className={`${styles.input_field} ${styles.input_box}`}>
							<div className={styles.label}>Frequency Count</div>
							<Input
								type="number"
								value={freqCount}
								disabled={disableOptions}
								onChange={(e) => setFreqCount(e.target.value)}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Frequency;
