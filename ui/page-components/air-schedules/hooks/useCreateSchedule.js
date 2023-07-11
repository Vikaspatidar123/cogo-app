import { merge } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getControls from '../config';

import {
	useForm,
	useGetAsyncOptions,
	asyncFieldsLocations,
} from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateSchedule = () => {
	const { t } = useTranslation(['airSchedule']);
	const { general, profile } = useSelector((state) => state);

	const { push } = useRouter();

	const [errorMessage, setErrorMessage] = useState(false);

	const { control, watch } = useForm();

	const formValues = watch();

	const airportOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['airport'] } },
		}),
	);
	const fields = getControls({ airportOptions, t });

	const [{ loading }, trigger] = useRequest({
		method: 'post',
		url: '/create_saas_air_schedule_subscription',
	}, { manual: true });

	const createSchedule = async (origin, destination) => {
		try {
			const requestData = {
				origin_airport_id: origin,
				destination_airport_id: destination,
				performed_by_user_id: profile.id,
				organization_id: profile.organization.id,
				organization_branch_id: general?.query?.branch_id,
			};

			const res = await trigger({
				data: requestData,
			});

			const { data } = res;

			if (res?.status === 200) {
				push(
					'/saas/air-schedules/[schedule_id]?isFirstVisit=true',
					`/saas/air-schedules/${data.id}?isFirstVisit=true`,
				);
			}

			return data;
		} catch (err) {
			console.error(err?.message || 'Unable to create schedules. Please try again.');
			return {};
		}
	};
	const handleCreateSchedule = () => {
		if (formValues?.origin_airport === formValues?.destination_airport) {
			setErrorMessage((prev) => !prev);
			return;
		}
		createSchedule(
			formValues.origin_airport,
			formValues.destination_airport,
		);
	};

	return { loading, errorMessage, handleCreateSchedule, control, formValues, fields };
};

export default useCreateSchedule;
