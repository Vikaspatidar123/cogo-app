import { Button } from '@cogoport/components';
// import { isEmpty } from '@cogoport/utils';
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
	// mainServices,
	// localServicesDetails,
	// spot_search_id,
	refetch = () => {},
	// service_rates,
	rateData,
	setShow,
	rates = [],
}) {
	// const { fetchApi, loading } = useAddMoreDays({ refetch, setShow });
	const { onSubmit, loading } = useUpdateDestinationDemurrageDays({
		data: rateData,
		rates,
		refetch,
		setShow,
	});
	const [days, setDays] = useState(
		additional_days > 0 ? additional_days + freeLimit : freeLimit,
	);
	return (
		<div>
			{maxLimit ? (
				<div className={styles.container} type={type}>
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
							className="secondary sm"
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
