import { merge } from '@cogoport/utils';

import getOtherAddressControls from './get-other-address-controls';

import {
	useForm,
	asyncFieldsLocations,
	useGetAsyncOptions,
} from '@/packages/forms';

const useEditOtherAddress = ({ otherAddressObjToUpdate = {} }) => {
	const labelKey = 'postal_code';
	const valueKey = 'postal_code';
	const cityPincode = useGetAsyncOptions(
		merge(asyncFieldsLocations(labelKey, valueKey), {
			params: { filters: { type: ['pincode'] } },
		}),
	);
	const fields = getOtherAddressControls({ cityPincode });

	const formProps = useForm();

	const {
		handleSubmit = () => {},
		// setValues,
		formState,
		control,
	} = formProps;

	const showElements = fields.reduce((previousControls, currentControls) => {
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
		control,
		showElements,
		fields,
		formState,
		handleSubmit,
	};
};

export default useEditOtherAddress;
