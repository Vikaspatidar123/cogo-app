import { Toast } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import getBillingAddressControls from './get-billing-address-controls';

import {
	useForm,
	asyncFieldsLocations,
	useGetAsyncOptions,
} from '@/packages/forms';
import { useRequest } from '@/packages/request';

const MAPPING = {
	poc_email    : 'email',
	poc_name     : 'name',
	phone_number : 'mobile_number',
};
const useEditBillingAddress = ({
	addressIdxToUpdate,
	organizationBillingAddressesList,
	handleCloseModal,
	mobalType,
}) => {
	const endPoint = mobalType
		? '/update_organization_billing_address'
		: '/create_organization_billing_address';
	const [{ loading }, trigger] = useRequest(
		{
			url    : endPoint,
			method : 'post',
		},
		{ manual: true },
	);

	const valuesToPrefill = organizationBillingAddressesList?.[addressIdxToUpdate];
	console.log(valuesToPrefill, 'valuesToPrefill');
	const labelKey = 'postal_code';
	const valueKey = 'postal_code';
	const cityPincode = useGetAsyncOptions(
		merge(asyncFieldsLocations(labelKey, valueKey), {
			params: { filters: { type: ['pincode'] } },
		}),
	);
	const fields = getBillingAddressControls({ cityPincode }) || [];
	const {
		handleSubmit = () => {},
		watch,
		setValue = () => {},
		control,
		formState,
	} = useForm();
	const setValues = () => {
		fields?.map((item) => setValue(
			item?.name,
			item?.mode === 'poc'
				? valuesToPrefill?.organization_pocs?.[0]?.[MAPPING[item.name]]
				: valuesToPrefill[item.name],
		));
	};
	useEffect(() => {
		if (addressIdxToUpdate !== null) {
			setValues();
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);
	const onCreate = async (value) => {
		const {
			tax_number_document_url = {},
			sez_proof = {},
			is_sez = false,
			...prop
		} = value;
		try {
			await trigger({
				data: {
					...prop,
					tax_number_document_url:
            tax_number_document_url?.finalUrl || undefined,
					sez_proof : sez_proof?.finalUrl || undefined,
					is_sez,
					id        : mobalType ? valuesToPrefill?.id : undefined,
				},
			});
			Toast.success('Successfull Update');
			handleCloseModal(false);
		} catch (err) {
			const error = Object.values(err?.response?.data).map((x) => x);
			if (error) Toast.error(error);
		}
	};
	const isSez = watch('is_sez');

	const showElements = fields.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;
		if (name === 'sez_proof' && !isSez) {
			showElement = false;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});

	return {
		onCreate,
		formState,
		control,
		fields,
		showElements,
		handleSubmit,
		loading,
	};
};

export default useEditBillingAddress;
