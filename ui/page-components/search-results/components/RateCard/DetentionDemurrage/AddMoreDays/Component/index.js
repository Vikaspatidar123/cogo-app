import { Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateDestinationDemurrageDays from '../../../../../hooks/useUpdateDestinationDemurrageDays';
import DaysSelect from '../../../commons/DaysSelect';

import styles from './styles.module.css';

function Component({
	freeLimit,
	maxLimit,
	additional_days,
	type,
	activeTab,
	refetch = () => {},
	rateData,
	rates = [],
	setShow,
}) {
	const { onSubmit, loading } = useUpdateDestinationDemurrageDays({
		data: rateData,
		rates,
		refetch,
		setShow,
	});
	const [days, setDays] = useState(
		additional_days > 0 ? additional_days + freeLimit : freeLimit,
	);
	const padding = type === 'detention' ? '12px 20px 8px 4px' : '12px 4px 8px 20px';
	const borderRight = type === 'detention' && type === 'rail_domestic_freight'
		? '1px solid #bdaff9'
		: null;
	const borderLeft = type === 'detention' && type !== 'rail_domestic_freight'
		? '1px solid #bdaff9'
		: null;
	return (
		<div>
			{maxLimit ? (
				<div className={styles.container} type={type} style={{ padding, borderRight, borderLeft }}>
					<div className={styles.flex}>
						<div className={styles.styled_text}>
							{freeLimit}
							{' '}
							{type}
							{' '}
							free days are included in your quotation
						</div>

						<div className={styles.styled_text} style={{ fontSize: '14px', fontWeight: '600' }}>
							Add additional
							{' '}
							{type}
							{' '}
							days for your
							{' '}
							{activeTab}
						</div>

						<DaysSelect
							days={days}
							setDays={setDays}
							minimumDays={freeLimit}
							maximumDays={maxLimit}
						/>
					</div>

					<div className={styles.flex} style={{ justifyContent: 'space-between' }}>
						<div
							className={styles.flex}
							style={{ alignItems: 'flex-end' }}
						>
							<div />
						</div>

						<Button
							size="md"
							themeType="secondary"
							onClick={() => {
								onSubmit({ destination_detention_days: days });
							}}
							disabled={loading}
						>
							Add
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}
export default Component;
