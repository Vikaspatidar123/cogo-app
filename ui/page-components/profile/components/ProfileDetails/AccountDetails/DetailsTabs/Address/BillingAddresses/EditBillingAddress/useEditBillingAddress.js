import { Toast } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import getBillingAddressControls from './get-billing-address-controls';

import {
	useForm,
	asyncFieldsLocations, useGetAsyncOptions,
} from '@/packages/forms';
import { useRequest } from '@/packages/request';

const useEditBillingAddress = ({
	addressIdxToUpdate,
	organizationBillingAddressesList,
}) => {
	const [trigger] = useRequest({
		url    : '/create_organization_billing_address',
		method : 'post',
	}, { manual: true });
	const valuesToPrefill = organizationBillingAddressesList?.[addressIdxToUpdate];
	const labelKey = 'postal_code';
	const valueKey = 'postal_code';
	const cityPincode = useGetAsyncOptions(merge(asyncFieldsLocations(labelKey, valueKey), {
		params: { filters: { type: ['pincode'] } },
	}));
	const fields = getBillingAddressControls({ cityPincode });
	const {
		handleSubmit = () => { },
		watch,
		formState,
		setValue = () => { },
		control,
	} = useForm();

	useEffect(() => {
		if (addressIdxToUpdate !== null) {
			fields.map((item) => setValue(item.name, valuesToPrefill[item.name]));
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);
	const onCreate = async (value) => {
		const { tax_number_document_url = {}, ...prop } = value;
		try {
			await trigger({
				data: {
					...prop,
					tax_number_document_url: tax_number_document_url?.finalUrl || undefined
					,
				},
			});
			Toast.success('Successfull Update');
		} catch (err) {
			if (err?.response?.data)Toast.error(err?.response?.data?.gst_number[0]);
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
	};
};

export default useEditBillingAddress;
