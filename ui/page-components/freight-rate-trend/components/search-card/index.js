import { Button } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import FormItem from '../../common/FormItem';
import TrackingLimitModal from '../../common/tracking-limit';
import useCreateTrends from '../../hooks/useCreateTrends';

import styles from './styles.module.css';

import { useForm, useGetAsyncOptions, asyncFieldsLocations } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRouter } from '@/packages/next';

function SearchCard({ refechTrends }) {
	const { push } = useRouter();
	const { general } = useSelector((state) => state);
	const { submitLoading, createTrend } = useCreateTrends();
	const [isTrackerLimitModalOpen, setTrackerLimitModal] = useState(
		general?.query?.openModal,
	);

	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['seaport'], is_icd: false } },
	}));

	const handleTrackingLimitModal = () => {
		setTrackerLimitModal(!isTrackerLimitModalOpen);
	};

	const controls = [
		{
			name        : 'origin',
			label       : 'origin',
			type        : 'select',
			placeholder : 'Search origin port',
			value       : '',
			rules       : { required: 'Please enter value' },
		},
		{
			name        : 'destination',
			label       : 'destination',
			type        : 'select',
			placeholder : 'Search destination port',
			value       : '',
			rules       : { required: 'Please enter value' },
		},
	];
	const filed = controls.map((control) => {
		const { name } = control;
		let newControl = { ...control };

		if (name === 'origin') {
			newControl = { ...newControl, ...cityOptions };
		}
		if (name === 'destination') {
			newControl = { ...newControl, ...cityOptions };
		}
		return { ...newControl };
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const submitForm = async (values) => {
		const { origin, destination } = values;
		const data = await createTrend(origin, destination);
		if (data == null) return;
		await refechTrends();
		push(
			'/saas/freight-rate-trend/[trend_id]?isFirstVisit=true',
			`/saas/freight-rate-trend/${data.id}?isFirstVisit=true`,
		);
	};

	return (
		<div className={styles.card}>
			<div className={styles.flex}>
				<div className={styles.heading}>
					<span>Freight Rate Trends</span>
					<p>Get Access to Past Freight Rate Trends.</p>
				</div>
			</div>
			<form
				className={styles.form}
			>
				{filed.map((controlItem) => {
					const { type, name } = controlItem;
					const Element = getField(type);
					return (
						<div className={styles.styled_form_item}>
							<FormItem>
								<Element {...controlItem} control={control} />
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
