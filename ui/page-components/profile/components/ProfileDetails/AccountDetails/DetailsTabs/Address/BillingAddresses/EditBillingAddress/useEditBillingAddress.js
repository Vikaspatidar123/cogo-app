/* eslint-disable max-len */
import { Toast } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import getBillingAddressControls from './get-billing-address-controls';

import {
	useForm,
	asyncFieldsLocations, useGetAsyncOptions,
} from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useDispatch, useSelector } from '@/packages/store';

const useEditBillingAddress = ({
	addressIdxToUpdate,
	getOrganizationBillingAddress,
	organizationBillingAddressesList,
	handleCloseModal,
}) => {
	const [{ loading, data }, trigger] = useRequest({
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
			// setValues({
			// 	name: valuesToPrefill.name,
			// 	tax_number: valuesToPrefill.tax_number,
			// 	tax_number_document_url: valuesToPrefill.tax_number_document_url,
			// 	is_sez: !!valuesToPrefill.is_sez,
			// 	sez_proof: valuesToPrefill.sez_proof,
			// 	address: valuesToPrefill.address,
			// 	poc_name: valuesToPrefill.poc_details?.name,
			// 	poc_email: valuesToPrefill.poc_details?.email,
			// 	phone_number: {
			// 		country_code: valuesToPrefill.poc_details?.mobile_country_code,
			// 		number: valuesToPrefill.poc_details?.mobile_number,
			// 	},
			// });
		}
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
