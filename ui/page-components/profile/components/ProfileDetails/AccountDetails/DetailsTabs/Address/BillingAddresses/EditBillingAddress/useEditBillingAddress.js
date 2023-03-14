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
	getAddress,
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
		const phone_number = {
			number: valuesToPrefill?.organization_pocs?.[0]?.mobile_number || '',
			country_code:
        valuesToPrefill?.organization_pocs?.[0]?.mobile_country_code || '',
		};
		if (mobalType) setValue('phone_number', phone_number);
		const tax_number_document_url = {
			finalUrl: valuesToPrefill?.tax_number_document_url,
		};
		if (mobalType && tax_number_document_url) {
			setValue(
				'tax_number_document_url',
				valuesToPrefill?.tax_number_document_url,
			);
		}
	};
	useEffect(() => {
		if (addressIdxToUpdate !== null) {
			setValues();
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);
	const onCreate = async (value) => {
		const {
			tax_number_document_url,
			sez_proof,
			is_sez = false,
			poc_email,
			poc_name,
			phone_number,
			...prop
		} = value;
		const poc_details = [
			{
				email               : poc_email,
				name                : poc_name,
				mobile_number       : phone_number?.number || undefined,
				mobile_country_code : phone_number?.country_code || undefined,
			},
		];
		try {
			await trigger({
				data: {
					...prop,
					poc_details,
					tax_number_document_url : tax_number_document_url || undefined,
					sez_proof               : sez_proof || undefined,
					is_sez,
					id                      : mobalType ? valuesToPrefill?.id : undefined,
				},
			});
			Toast.success('Successfull Update');
			getAddress();
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
