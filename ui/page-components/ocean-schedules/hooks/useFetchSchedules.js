import { merge } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useCallback } from 'react';

import getControls from '../config';

import useCreateSchedule from './useCreateSchedule';

import {
	useForm,
	useGetAsyncOptions,
	asyncFieldsLocations,
} from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const PAGE_LIMIT = 6;
const getPayload = ({ general, filters, currentPage }) => ({
	filters: {
		organization_branch_id : general?.query?.branch_id,
		...filters,
		status                 : 'active',
	},
	page       : currentPage,
	page_limit : PAGE_LIMIT,
});

const useFetchSchedules = () => {
	const { general } = useSelector((state) => state);

	const { t } = useTranslation(['oceanSchedule']);

	const [filters, setFilters] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [schedules, setSchedules] = useState({});
	const [errorMessage, setErrorMessage] = useState(false);

	const { control, watch } = useForm();

	const { createSchedule } = useCreateSchedule();

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_sailing_schedule_subscriptions',
	}, { manual: true });

	const formValues = watch();

	const portOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['seaport'] } },
		}),
	);

	const fields = getControls({ portOptions, t });

	const handleCreateSchedule = () => {
		if (formValues.origin_port === formValues.destination_port) {
			setErrorMessage(true);
			return;
		}
		setErrorMessage(false);
		createSchedule(formValues.origin_port, formValues.destination_port);
	};

	const fetchSchedules = useCallback(async () => {
		const payload = getPayload({ general, filters, currentPage });
		try {
			const res = await trigger({
				params: payload,
			});

			const { data } = res || {};
			setSchedules(data);
		} catch (err) {
			console.error(err);
		}
	}, [general, filters, currentPage, trigger]);

	useEffect(() => {
		fetchSchedules();
	}, [fetchSchedules]);

	return {
		loading,
		filters,
		setFilters,
		fetchSchedules,
		schedules,
		currentPage,
		setCurrentPage,
		control,
		watch,
		fields,
		handleCreateSchedule,
		errorMessage,
		formValues,
	};
};

export default useFetchSchedules;
