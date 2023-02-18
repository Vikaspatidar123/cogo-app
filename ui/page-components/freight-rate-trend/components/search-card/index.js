import { useRouter } from '@cogo/next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import TrackingLimitModal from '../../../../common/components/tracking-limit';
import { useSaasState } from '../../../../common/context';
import getField from '../../../../common/form/components';
import { FormItem, Button } from '../../../../common/ui';
import useCreateTrends from '../../hooks/useCreateTrends';

// import useFetchTrendsStoreQuota from '../../../../common/hooks/useFetchTrendsStoreQuota';

import styles from './style.modules.css';

function SearchCard({ refechTrends }) {
	const { push } = useRouter();
	const { general } = useSaasState();
	const { submitLoading, createTrend } = useCreateTrends();
	// const { storeQuota, refetchQuota } = useFetchTrendsStoreQuota(true);
	const [isTrackerLimitModalOpen, setTrackerLimitModal] = useState(
		general?.query?.openModal,
	);

	const handleTrackingLimitModal = () => {
		setTrackerLimitModal(!isTrackerLimitModalOpen);
	};

	const submitForm = async (values) => {
		const { origin, destination } = values;
		const data = await createTrend(origin, destination);
		if (data == null) return;
		// refetchQuota();
		await refechTrends();
		push(
			'/saas/freight-rate-trend/[trend_id]?isFirstVisit=true',
			`/saas/freight-rate-trend/${data.id}?isFirstVisit=true`,
		);
	};

	const controls = [
		{
			name           : 'origin',
			label          : 'origin',
			type           : 'select',
			placeholder    : 'Search origin port',
			value          : '',
			optionsListKey : 'locations',
			params         : { filters: { type: ['seaport'], is_icd: false } },
			rules          : { required: 'Please enter value' },
		},
		{
			name           : 'destination',
			label          : 'destination',
			type           : 'select',
			placeholder    : 'Search destination port',
			params         : { filters: { type: ['seaport'], is_icd: false } },
			value          : '',
			optionsListKey : 'locations',
			rules          : { required: 'Please enter value' },
		},
	];

	const {
		fields,
		handleSubmit,
		formState: { errors },
	} = useForm(controls);

	return (
		<div className={styles.card}>
			<div className={styles.flex}>
				<div className={styles.heading}>
					<span>Freight Rate Trends</span>
					<p>Get Access to Past Freight Rate Trends.</p>
				</div>
			</div>
			<form
				style={{
					width          : '100%',
					display        : 'flex',
					justifyContent : 'space-between',
					marginTop      : 24,
				}}
			>
				{controls.map((controlItem) => {
					const { type, name } = controlItem;
					const Element = getField(type);
					return (
						<div className={styles.styled_form_item}>
							<FormItem>
								<Element {...fields[name]} />
								{errors[name]?.type === 'required' || 'pattern' ? (
									<div className={styles.text}>
										{errors[name]?.message}
									</div>
								) : null}
							</FormItem>
						</div>
					);
				})}
				<div className={styles.styled_form_item}>
					<Button
						size="lg"
						onClick={handleSubmit(submitForm)}
						disabled={submitLoading}
						style={{ marginTop: -4 }}
					>
						Search Rate Trends
					</Button>
				</div>
			</form>

			{isTrackerLimitModalOpen && (
				<TrackingLimitModal overflow="visible" closeModal={handleTrackingLimitModal} />
			)}
		</div>
	);
}

export default SearchCard;
