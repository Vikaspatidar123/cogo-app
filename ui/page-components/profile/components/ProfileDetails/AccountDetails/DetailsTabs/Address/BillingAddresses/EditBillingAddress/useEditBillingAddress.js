import { useEffect } from 'react';

import getBillingAddressControls from './get-billing-address-controls';

import { useForm } from '@/packages/forms';
import { useDispatch, useSelector } from '@/packages/store';

const useEditBillingAddress = ({
	organizationType,
	addressIdxToUpdate,
	getOrganizationBillingAddress,
	organizationBillingAddressesList,
	handleCloseModal,
}) => {
	const dispatch = useDispatch();

	const valuesToPrefill = organizationBillingAddressesList?.[addressIdxToUpdate];

	const controls = getBillingAddressControls({ valuesToPrefill });

	const formProps = useForm(controls);

	const {
		fields = {},
		handleSubmit = () => { },
		watch,
		formState,
		setValues = () => { },
	} = formProps;

	useEffect(() => {
		if (addressIdxToUpdate !== null) {
			setValues({
				name: valuesToPrefill.name,
				tax_number: valuesToPrefill.tax_number,
				tax_number_document_url: valuesToPrefill.tax_number_document_url,
				is_sez: !!valuesToPrefill.is_sez,
				sez_proof: valuesToPrefill.sez_proof,
				address: valuesToPrefill.address,
				poc_name: valuesToPrefill.poc_details?.name,
				poc_email: valuesToPrefill.poc_details?.email,
				phone_number: {
					country_code: valuesToPrefill.poc_details?.mobile_country_code,
					number: valuesToPrefill.poc_details?.mobile_number,
				},
			});
		}
	}, []);

	const isSez = watch('is_sez');

	const showElements = controls.reduce((previousControls, currentControls) => {
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
		controls,
		fields,
		showElements,
		handleSubmit,
	};
};

export default useEditBillingAddress;
