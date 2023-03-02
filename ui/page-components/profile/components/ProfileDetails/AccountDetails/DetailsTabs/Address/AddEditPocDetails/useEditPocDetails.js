/* eslint-disable no-unused-vars */
// import { useFormCogo } from '@cogoport/front/hooks';

import getControls from './controls';

import { useForm } from '@/packages/forms';
// import { useSelector } from '@/packages/store';

const useEditPocDetails = ({
	getOrganizationBillingAddress = () => { },
	getOrganizationOtherAddresses = () => { },
	type = '',
	pocToUpdate = {},
	address_data = {},
	showPocModal,
	setShowPocModal = () => { },
}) => {
	// const {
	// 	profile: { organization },
	// } = useSelector((state) => state);

	const fields = getControls();

	// const addPocAPI = type === 'billing_address'
	// 	? 'update_channel_partner_billing_address'
	// 	: 'update_channel_partner_address';

	// const apiName = showPocModal === 'edit' ? '/update_channel_partner_poc' : addPocAPI;

	// const addUpdatePocAPI = useRequest('post', false, 'partner')(apiName);

	// const { loading } = addUpdatePocAPI;

	const {
		formState, handleSubmit,
		control,
	} = useForm();

	// useEffect(() => {
	// 	if (showPocModal === 'edit') {
	// 		setValues({
	// 			name         : pocToUpdate.name,
	// 			email        : pocToUpdate.email,
	// 			phone_number : {
	// 				country_code : pocToUpdate.mobile_country_code,
	// 				number       : pocToUpdate.mobile_number,
	// 			},
	// 			alternate_phone_number: {
	// 				country_code : pocToUpdate.alternate_mobile_country_code,
	// 				number       : pocToUpdate.alternate_mobile_number,
	// 			},
	// 		});
	// 	}
	// }, []);

	// const onCreate = async (values) => {
	// 	try {
	// 		const poc_details = {
	// 			name                    : values.name,
	// 			email                   : values.email,
	// 			mobile_number           : values.phone_number?.number,
	// 			mobile_country_code     : values.phone_number?.country_code,
	// 			alternate_mobile_number :
	// 				values.alternate_phone_number?.number || undefined,
	// 			alternate_mobile_country_code:
	// 				values.alternate_phone_number?.country_code || undefined,
	// 		};

	// 		let body = {
	// 			partner_id: partner.id,
	// 		};

	// 		if (showPocModal === 'edit') {
	// 			body = { ...body, ...poc_details, poc_id: pocToUpdate.id };
	// 		} else {
	// 			body = {
	// 				...body,
	// 				address_id  : address_data.id,
	// 				poc_details : [poc_details],
	// 			};
	// 		}

	// 		await addUpdatePocAPI.trigger({
	// 			data: body,
	// 		});

	// 		Toast.success(
	// 			`POC ${showPocModal === 'edit'
	// 				? 'editPoc'
	// 				: 'toastMessage'
	// 			}

	// 	}`,
	// 		);

	// 		if (type === 'billing_address') {
	// 			getOrganizationBillingAddress();
	// 		} else {
	// 			getOrganizationOtherAddresses();
	// 		}

	// 		setShowPocModal(false);
	// 	} catch (err) {
	// 		Toast.error(err.data);
	// 	}
	// };

	return {
		fields,
		formState,
		handleSubmit,
		// onCreate,
		// loading,
		control,
	};
};

export default useEditPocDetails;
