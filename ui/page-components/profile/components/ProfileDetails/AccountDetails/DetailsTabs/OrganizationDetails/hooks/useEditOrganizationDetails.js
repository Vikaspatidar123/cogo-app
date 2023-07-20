/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['settings']);

	const [errors, setErrors] = useState({});

	const { refetch } = useGetUser();

	const cityOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['city'] } },
		}),
	);
	const controls = getOrganizationControls({ cityOptions, organizationData, t });

	const { handleSubmit = () => {}, setValue, control } = useForm();

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

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_organization',
			method : 'post',
		},
		{ manual: true },
	);

	const onCreate = async (values = {}) => {
		const {
			business_name = '',
			country_id = '',
			city_id = '',
			registration_number = '',
			website = '',
			logo = '',
			about = '',
		} = values || {};
		try {
			const body = {
				business_name       : business_name || undefined,
				country_id          : country_id || undefined,
				city_id             : city_id || undefined,
				registration_number : registration_number || undefined,
				website             : website || undefined,
				logo                : logo || undefined,
				about               : about || undefined,
			};
			const rep = await trigger({ data: body });
			if (rep) {
				await refetch();
				setShowEditOrganizationDetails(false);
			}
			Toast.success(t('settings:billing_details_successfully_updated_toast'));
			if (values.city_id) {
				getOrganization();
			}
		} catch (err) {
			Toast.error(err.data);
		}
	};

	useEffect(() => {
		(controls || []).map((item) => setValue(item.name, organizationData[item.name]));
		if (organizationData.logo) {
			setValue('logo', organizationData.logo);
		}
	}, [organizationData]);

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
