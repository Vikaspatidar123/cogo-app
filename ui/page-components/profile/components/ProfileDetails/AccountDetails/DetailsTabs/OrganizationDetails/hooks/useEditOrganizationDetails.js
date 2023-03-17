/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getOrganizationControls from '../EditOrganizationDetails/get-organization-controls';

import {
	useForm,
	asyncFieldsLocations,
	useGetAsyncOptions,
} from '@/packages/forms';
import { useRequest } from '@/packages/request';
import useGetUser from '@/ui/page-components/profile/hooks/useGetUser';

const useEditOrganizationDetails = ({
	organizationData = {},
	getOrganization = () => {},
	setShowEditOrganizationDetails = () => {},
}) => {
	const [errors, setErrors] = useState({});
	const { refetch } = useGetUser();
	const cityOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['city'] } },
		}),
	);
	const controls = getOrganizationControls({ cityOptions, organizationData });

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_organization',
			method : 'post',
		},
		{ manual: true },
	);

	const { handleSubmit = () => {}, setValue, control } = useForm();
	useEffect(() => {
		(controls || []).map((item) => setValue(item.name, organizationData[item.name]));
		if (organizationData.logo) {
			setValue('logo', organizationData.logo);
		}
	}, [organizationData]);

	const onError = (err) => {
		setErrors({ ...err });
	};

	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;
		if (name === 'city_id' && organizationData.kyc_status === 'verified') {
			showElement = false;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});

	const onCreate = async (values = {}) => {
		try {
			const body = {
				business_name       : values.business_name || undefined,
				country_id          : values.country_id || undefined,
				city_id             : values.city_id || undefined,
				registration_number : values.registration_number || undefined,
				website             : values.website || undefined,
				logo                : values.logo || undefined,
				about               : values.about || undefined,
			};
			const rep = await trigger({ data: body });
			if (rep) {
				await refetch();
				setShowEditOrganizationDetails(false);
			}
			Toast.success('Successfull Update');
			if (values.city_id) {
				getOrganization();
			}
		} catch (err) {
			Toast.error(err.data);
		}
	};

	return {
		showElements,
		control,
		fields: controls,
		errors,
		loading,
		handleSubmit,
		onError,
		onCreate,
	};
};

export default useEditOrganizationDetails;
