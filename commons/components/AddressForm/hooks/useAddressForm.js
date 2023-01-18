import { isEmpty } from '@cogoport/front/utils';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import { patterns } from '@cogoport/front/constants';
import { getControls as getActualControl } from '../utils/controls';
import getValue from '../utils/getValue';
import useSaveAddress from './useSaveAddress';
import useGetGstInListByPan from '../../AddInvoicingParty/hooks/useGetGstInListByPan';
import useGetBusiness from '../../AddInvoicingParty/hooks/useGetBusiness';

const getControls = ({
	gstinOptions,
	showInvoiceTradeParty,
	action,
	organizationId,
	values,
	showSavedPOC,
	formState,
}) => {
	const {
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls,
		pocFieldArrayControls,
	} = getActualControl({
		gstinOptions,
		organizationId,
		action,
		values,
		showSavedPOC,
		formState,
	});

	return {
		invoiceTradePartyControls: showInvoiceTradeParty
			? invoiceTradePartyControls
			: [],
		isRegisteredUnderGstControls:
			action === 'create' ? isRegisteredUnderGstControls : [],
		addressControls,
		pocFieldArrayControls,
	};
};

const getAddressShowElements = ({ controls, addressType, isSez }) => {
	const hash = {};
	controls.forEach((control) => {
		const { name, showIn } = control;

		let showElement = showIn.includes(addressType);

		if (showElement) {
			if (name === 'sez_proof' && !isSez) {
				showElement = false;
			}
		}

		hash[name] = showElement;
	});

	return hash;
};

const getLayouts = ({
	invoiceTradePartyControls,
	isRegisteredUnderGstControls,
	addressControls,
	pocFieldArrayControls,
	addressType,
	isSez,
}) => {
	return {
		tradeParty: {
			controls: invoiceTradePartyControls,
		},
		registeredUnderGst: {
			controls: isRegisteredUnderGstControls,
		},
		address: {
			title: 'Billing Address',
			controls: addressControls,
			showElements: getAddressShowElements({
				controls: addressControls,
				addressType,
				isSez,
			}),
		},
		poc: {
			title: 'POC Details',
			controls: pocFieldArrayControls,
		},
	};
};

const formatPocDetails = ({ data }) => {
	return data.map((poc) => {
		return {
			name: getValue(poc, 'name'),
			email: getValue(poc, 'email'),
			mobile_country_code: getValue(poc, 'mobile_number.mobile_country_code'),
			mobile_number: getValue(poc, 'mobile_number.mobile_number'),
		};
	});
};

const getAddressValues = ({ data, controls, addressType }) => {
	const valuesHash = {};
	controls.forEach((control) => {
		const { type, name, showIn } = control;

		if (!showIn.includes(addressType)) {
			return;
		}

		let value = data[name];

		if (name === 'is_sez') {
			value = !isEmpty(value);
		}

		if (type === 'file') {
			value = getValue(data, `${name}.url`);
		}

		valuesHash[name] = value;
	});

	return valuesHash;
};

const formatValues = ({ values, addressControls, addressType }) => {
	const { isAddressRegisteredUnderGst } = values;

	return {
		organization_trade_party_id: getValue(
			values,
			'organization_trade_party_id',
		),
		isAddressRegisteredUnderGst: !isEmpty(isAddressRegisteredUnderGst),
		...getAddressValues({
			data: values,
			controls: addressControls,
			addressType,
		}),
		poc_details: formatPocDetails({
			data: getValue(values, 'poc_details', []),
		}),
	};
};

/**
 * @typedef  {Object} 		[props]
 * @property {string} 		[organizationId]
 * @property {string} 		[tradePartyId]
 * @property {boolean}		[isAddressRegisteredUnderGst]
 * @property {Object} 		[addressData]
 * @property {string} 		[addressType]
 * @property {boolean} 		[showInvoiceTradeParty]
 * @property {function} 	[onSuccess]
 * @property {function} 	[onFailure]
 * @property {boolean}		[saveAddressData]
 * @property {boolean}		[showSavedPOC]
 * @property {Object}		[formState]
 */
const useSaveAddressForm = (props) => {
	const {
		organizationId,
		tradePartyId,
		isAddressRegisteredUnderGst,
		addressData,
		addressType,
		showInvoiceTradeParty = false,
		onSuccess,
		onFailure,
		saveAddressData,
		showSavedPOC,
		formState,
		registrationNumber = '',
		validateGst = true,
	} = props;

	const { gstinOptions = [] } = useGetGstInListByPan({ registrationNumber });

	const action = isEmpty(addressData) ? 'create' : 'edit';

	const {
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls,
		pocFieldArrayControls,
	} = getControls({
		gstinOptions,
		organizationId,
		showInvoiceTradeParty,
		action,
		values: {
			tradePartyId: showInvoiceTradeParty ? tradePartyId : '',
			isAddressRegisteredUnderGst,
			addressData,
		},
		showSavedPOC,
		formState,
	});

	const controls = [
		...invoiceTradePartyControls,
		...isRegisteredUnderGstControls,
		...addressControls,
		...pocFieldArrayControls,
	];

	const formProps = useFormCogo(controls);
	const { watch, getValues, setValues } = formProps;

	const watchIsSez = watch('is_sez');
	const watchGstList = watch('gst_list') || '';
	const watchIsAddressRegisteredUnderGst = watch('isAddressRegisteredUnderGst');

	const { getBusinessApi = {} } = useGetBusiness({
		watchTaxNumber: watchGstList.toUpperCase(),
		setValues,
		registrationNumberType: 'tax',
	});

	const isAddressRegisteredUnderGstChecked = !isEmpty(
		watchIsAddressRegisteredUnderGst,
	);

	let updatedAddressType = addressType;
	if (action === 'create') {
		updatedAddressType = isAddressRegisteredUnderGstChecked
			? 'otherAddress'
			: 'billingAddress';
	}

	const { loading, saveAddress } = useSaveAddress({
		organizationId,
		tradePartyId,
		addressData,
		addressType: updatedAddressType,
		action,
		onSuccess,
		onFailure,
		showSavedPOC,
	});

	const onSubmit = (values) => {
		const pocDetails = getValue(values, 'poc_details', []);

		if (action === 'create') {
			if (isEmpty(pocDetails)) {
				toast.info('Please create at-least one POC before proceeding ');

				return;
			}
		}

		const newValues = formatValues({
			values,
			addressControls,
			addressType: updatedAddressType,
		});

		if (!saveAddressData) {
			onSuccess({
				values: newValues,
			});

			return;
		}

		saveAddress({ values: newValues });
	};

	const layouts = getLayouts({
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls,
		pocFieldArrayControls,
		addressType: updatedAddressType,
		isSez: !isEmpty(watchIsSez),
	});

	const newFields = {};
	Object.entries(formProps.fields).forEach(([controlName, field]) => {
		let newField = { ...field };
		if (controlName === 'tax_number') {
			newField = {
				...newField,
				label: validateGst ? 'GST Number' : 'TAX Number',
				maxLength: undefined,
				...(validateGst && {
					maxLength: 15,
				}),
				rules: {
					...(newField.rules || {}),
					pattern: {},
					...(validateGst && {
						pattern: {
							value: patterns.GST_NUMBER,
							message: 'GST is invalid',
						},
					}),
				},
			};
		}

		if (controlName === 'tax_number_document_url') {
			newField = {
				...newField,
				label: validateGst ? 'GST Proof' : 'TAX Proof',
			};
		}

		newFields[controlName] = newField;
	});

	return {
		loading,
		layouts,
		formProps: { ...formProps, fields: newFields },
		errors: formProps.formState.errors,
		onSubmit,
		getFormattedValues: () => {
			return formatValues({
				values: getValues(),
				addressControls,
				addressType: updatedAddressType,
			});
		},
		getBusinessApi,
	};
};

export default useSaveAddressForm;
