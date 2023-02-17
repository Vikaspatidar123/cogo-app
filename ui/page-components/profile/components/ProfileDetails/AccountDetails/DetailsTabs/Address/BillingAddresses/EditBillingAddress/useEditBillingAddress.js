/* eslint-disable max-len */
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import getBillingAddressControls from './get-billing-address-controls';

import {
	useForm,
	asyncFieldsLocations, useGetAsyncOptions,
} from '@/packages/forms';
import { useDispatch, useSelector } from '@/packages/store';

const useEditBillingAddress = ({
	addressIdxToUpdate,
	getOrganizationBillingAddress,
	organizationBillingAddressesList,
	handleCloseModal,
}) => {
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
		formState,
		control,
		fields,
		showElements,
		handleSubmit,
	};
};

export default useEditBillingAddress;
