import { getDetails } from './formatTradeParty';

export const mutateFields = ({
	fields = {},
	companyDetails = {},
	setValue = () => {},
	setCompanyDetails = () => {},
	compType = '',
}) => {
	const newFields = [...fields];
	newFields.forEach((field) => {
		if (
			field === 'business_name'
			&& (companyDetails?.business_list || []).length
			&& compType !== 'booking_party'
		) {
			newFields.business_name = {
				...fields.business_name,
				options      : companyDetails.business_list,
				handleChange : (obj) => {
					const tradePartyData = (companyDetails?.details || []).find(
						(item) => item.id === obj.value,
					);
					setValue('registration_number', tradePartyData.registration_number);
					const address_list = [
						...tradePartyData.billing_addresses,
						...tradePartyData.other_addresses,
					];
					const address_details = address_list.map((item) => ({
						label : item.address,
						value : item.address,
					}));
					setCompanyDetails({
						...companyDetails,
						address_list,
						address_details,
					});
				},
			};
		}
		if ((companyDetails.address_details || []).length && field === 'address') {
			newFields.address = {
				...fields.address,
				options      : companyDetails.address_details,
				handleChange : (obj) => {
					const address =						(companyDetails.address_list || []).find(
						(item) => item?.address === obj.value,
					) || {};
					setValue('pincode', address.pincode);

					if ((address.organization_pocs || []).length) {
						setCompanyDetails({
							...companyDetails,
							poc_data: [...address.organization_pocs],
						});
					}
				},
			};
		}
		if ((companyDetails.poc_data || []).length && field === 'name') {
			const poc_options = companyDetails.poc_data.map((item) => ({
				label : item.name,
				value : item.name,
			}));

			newFields.name = {
				...fields.name,
				options      : poc_options,
				handleChange : (obj) => {
					const poc =						(companyDetails.poc_data || []).find(
						(item) => item.name === obj.value,
					) || {};
					setValue('email', poc.email);
					setValue('mobile_number', {
						country_code : poc.mobile_country_code,
						number       : poc.mobile_number,
					});
					setValue('alternate_mobile_number', {
						country_code : poc.alternate_mobile_country_code,
						number       : poc.alternate_mobile_number,
					});
				},
			};
		}
	});

	return { newFields };
};

export const mutateShipConsFields = ({
	fields = [],
	firstFormProps = {},
	setValue = () => {},
	tradeParties = {},
	setTradeParties = () => {},
}) => {
	const newFields = fields;
	newFields.forEach((field) => {
		if (
			field === 'tax_number_document_url'
			&& firstFormProps.not_reg_under_gst
		) {
			newFields.tax_number_document_url = {
				...fields.tax_number_document_url,
				disabled : true,
				rules    : { required: false },
			};
			newFields.tax_number = {
				...fields.tax_number,
				disabled : true,
				rules    : { required: false },
			};
		}
		if ((tradeParties.address_list || []).length && field === 'address') {
			newFields.address = {
				...fields.address,
				options      : tradeParties.address_list,
				handleChange : (obj) => {
					if (
						(tradeParties.address_list || [])
							.map((item) => item.value)
							.includes(obj.value)
					) {
						const details = getDetails({
							selectedAddress : obj.value,
							list            : tradeParties.address_details,
						});
						if (details.business_name) {
							setValue('business_name', details.business_name);
						}
						if ((details.poc_data || []).length) {
							setTradeParties({
								...tradeParties,
								poc_data: details.poc_data,
							});
						}
						if (details.pincode) {
							setValue('pincode', details.pincode);
						}
					}
				},
			};
		}
		if (
			field === 'not_reg_under_gst'
			&& firstFormProps?.not_reg_under_gst === true
		) {
			setValue('tax_number_document_url', '');
			setValue('tax_number', '');
		}
		if (tradeParties?.poc_data?.length > 0 && field === 'name') {
			const poc_options = tradeParties.poc_data.map((item) => ({
				label : item.name,
				value : item.name,
			}));

			newFields.name = {
				...fields.name,
				options      : poc_options,
				handleChange : (obj) => {
					if (
						(tradeParties.poc_data || [])
							.map((item) => item.name)
							.includes(obj.value)
					) {
						const poc =							(tradeParties.poc_data || []).find(
							(item) => item.name === obj?.value,
						) || {};

						setValue('email', poc.email);
						setValue('mobile_number', {
							country_code : poc.mobile_country_code,
							number       : poc.mobile_number,
						});
						setValue('alternate_mobile_number', {
							country_code : poc.alternate_mobile_country_code,
							number       : poc.alternate_mobile_number,
						});
					}
				},
			};
		}
	});

	return {
		newFields,
	};
};
