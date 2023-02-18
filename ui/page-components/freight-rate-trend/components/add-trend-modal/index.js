import { useRouter } from '@cogo/next';
import { Button } from '@cogoport/components';
import {
	Formik, Field, Form, ErrorMessage,
} from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select/async';
import * as Yup from 'yup';

import TrackingLimitModal from '../../../../common/components/tracking-limit';
import { useSaasState } from '../../../../common/context';
import getField from '../../../../common/form/components';
import IconCross from '../../../../common/icons/cross.svg';
import IconSchedules from '../../../../common/icons/schedules-banner.svg';
import { FormItem } from '../../../../common/ui';
import useCreateTrends from '../../hooks/useCreateTrends';

import styles from './style.modules.css';

// import useFetchTrendsStoreQuota from '../../../../common/hooks/useFetchTrendsStoreQuota';

function AddTrendModal({ isOpen, handleModal, refectTrends }) {
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
		refectTrends();
		push('/saas/freight-rate-trend/[trend_id]?isFirstVisit=true', `/saas/freight-rate-trend/${data.id}?isFirstVisit=true`);
	};
	const controls = [
		{
			name           : 'origin',
			label          : 'origin',
			type           : 'select',
			placeholder    : 'Search origin port',
			value          : '',
			optionsListKey : 'locations',
			params         : { filters: { type: ['seaport'] } },
			rules          : { required: 'Please enter value' },
		},
		{
			name           : 'destination',
			label          : 'destination',
			type           : 'select',
			placeholder    : 'Search destination port',
			params         : { filters: { type: ['seaport'] } },
			value          : '',
			optionsListKey : 'locations',
			rules          : { required: 'Please enter value' },
		},
	];

	const { fields, handleSubmit, formState: { errors } } = useForm(controls);

	return (
		<div>
			<div className={styles.mobile_icon_container} onClick={handleModal}>
				<IconCross size={1.5} style={{ fill: 'white' }} />
			</div>
			<div className={styles.flex}>
				<div className={styles.heading}>Freight Rate Trends</div>
			</div>

			<div className={styles.mobile_content}>
				<IconSchedules style={{ width: '300px', height: '100px' }} />
				<div className={styles.details}>
					<p>Mobile Get Access to Past Freight Rate Trends</p>
				</div>
				<form
					style={{
						width     : '100%',
						marginTop : 24,
					}}
				>
					{
						controls.map((controlItem) => {
							const { type, name } = controlItem;
							const Element = getField(type);
							return (
								<div className={styles.styled_form_item}>
									<FormItem>
										<Element {...fields[name]} />
										{errors[name]?.type === 'required' || 'pattern'
											? (
												<div className={styles.text}>
													{errors[name]?.message}
												</div>
											)
											: null}
									</FormItem>
								</div>
							);
						})
					}
				</form>
			</div>
			<Button
				// size="lg"
				onClick={handleSubmit(submitForm)}
				disabled={submitLoading}
				// style={{ marginTop: -8 }}
			>
				Search Rate Trends
			</Button>
			{isTrackerLimitModalOpen && (
				<TrackingLimitModal
					overflow="visible"
					closeModal={handleTrackingLimitModal}
				/>
			)}
		</div>
	);
}

export default AddTrendModal;
