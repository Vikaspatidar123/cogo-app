// import { Toast } from '@cogoport/components';
// import { useEffect } from 'react';

import getOtherAddressControls from './get-other-address-controls';

import { useForm } from '@/packages/forms';
import useRequest from '@/packages/request';

const useEditOtherAddress = ({
	// organizationType = '',
	// address_key,
	// handleCloseModal,
	otherAddressObjToUpdate = {},
	// getOrganizationOtherAddresses = () => { },
	organizationOtherAddressesList,
}) => {
	const valuesToPrefill = organizationOtherAddressesList?.[
		`${otherAddressObjToUpdate.address_type}_address`
	]?.[otherAddressObjToUpdate.index];

	const controls = getOtherAddressControls({ valuesToPrefill });

	const formProps = useForm();

	const {
		fields = {},
		handleSubmit = () => { },
		setValues,
		formState,
	} = formProps;

	// const createOrgOtherAddressAPI = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// )('/create_channel_partner_address');

	// const updateOrgOtherAddressAPI = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// )('/update_channel_partner_address');

	// useEffect(() => {
	// 	if (
	// 		Object.keys(otherAddressObjToUpdate).length
	// 		&& otherAddressObjToUpdate.index !== null
	// 	) {
	// 		setValues({
	// 			name: valuesToPrefill.name,
	// 			address: valuesToPrefill.address,
	// 			poc_name: valuesToPrefill.poc_details?.name,
	// 			poc_email: valuesToPrefill.poc_details?.email,
	// 			phone_number: {
	// 				country_code: valuesToPrefill.poc_details?.mobile_country_code,
	// 				number: valuesToPrefill.poc_details?.mobile_number,
	// 			},
	// 		});
	// 	}
	// }, [otherAddressObjToUpdate]);

	// const onCreate = async (values = {}) => {
	// 	try {
	// 		const key_to_send = address_key?.api_property_key?.split('_')[0]
	// 			|| otherAddressObjToUpdate.address_type;

	// 		const body = {
	// 			account_types: [organizationType],
	// 			address_type: key_to_send,
	// 			name: values.name || undefined,
	// 			address: values.address || undefined,
	// 			country_id: values.country_id || undefined,
	// 			pincode: values.pincode || undefined,
	// 		};

	// 		const poc_details = [
	// 			{
	// 				name: values.poc_name || undefined,
	// 				email: values.poc_email || undefined,
	// 				mobile_country_code: values?.phone_number?.country_code || undefined,
	// 				mobile_number: values?.phone_number?.number || undefined,
	// 			},
	// 		];

	// 		if (
	// 			Object.keys(otherAddressObjToUpdate).length
	// 			&& otherAddressObjToUpdate.index !== null
	// 		) {
	// 			await updateOrgOtherAddressAPI.trigger({
	// 				data: { ...body, address_id: valuesToPrefill.id },
	// 			});

	// 			toast.success(
	// 				t(
	// 					'profile:accountDetails.tabOptions.address.otherAddresses.edit.toastMessages.updated',
	// 				),
	// 			);
	// 		} else {
	// 			await createOrgOtherAddressAPI.trigger({
	// 				data: { ...body, poc_details },
	// 			});

	// 			toast.success(
	// 				t(
	// 					'profile:accountDetails.tabOptions.address.otherAddresses.edit.toastMessages.added',
	// 				),
	// 			);
	// 		}

	// 		handleCloseModal();

	// 		getOrganizationOtherAddresses();
	// 	} catch (err) {
	// 		toast.error(getApiErrorString(err.data));
	// 	}
	// };

	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;

		if (
			(name === 'poc_name'
				|| name === 'phone_number'
				|| name === 'poc_email')
			&& Object.keys(otherAddressObjToUpdate).length
			&& otherAddressObjToUpdate.index !== null
		) {
			showElement = false;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});

	return {
		controls,
		showElements,
		fields,
		// loading:
		// 	createOrgOtherAddressAPI.loading || updateOrgOtherAddressAPI.loading,
		formState,
		handleSubmit,
		// onCreate,
	};
};

export default useEditOtherAddress;
