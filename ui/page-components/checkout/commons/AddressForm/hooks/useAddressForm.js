/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetBusiness from '../../AddInvoicingParty/hooks/useGetBusiness';
import useGetGstInListByPan from '../../AddInvoicingParty/hooks/useGetGstInListByPan';
import { getControls as getActualControl } from '../utils/controls';
import getValue from '../utils/getValue';

import useSaveAddress from './useSaveAddress';

import { useForm } from '@/packages/forms';
import { useSelector } from '@/packages/store';
import patterns from '@/ui/commons/configurations/patterns';
import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const REGISTRATION_LABEL = getCountrySpecificData({
	country_id    : geo.country.id,
	accessorType  : 'registration_number',
	accessor      : 'label',
	isDefaultData : true,
});

const getControls = ({
	gstinOptions,
	showInvoiceTradeParty,
	action,
	organizationId,
	values,
	showSavedPOC,
	formState,
	organizationCountryId,
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
		organizationCountryId,
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

const getAddressShowElements = ({
	controls,
	addressType,
	isSez,
	isGstNumberSelected,
	isAddressRegisteredUnderGstChecked,
	action,
}) => {
	const hash = {};
	controls.forEach((control) => {
		const { name, showIn } = control;

		let showElement = showIn.includes(addressType);

		if (showElement) {
			if (
				(name === 'sez_proof' && !isSez)
				|| (action === 'edit' && name === 'gst_list')
			) {
				showElement = false;
			}
		}

		if (isAddressRegisteredUnderGstChecked) {
			if (name === 'gst_list') {
				showElement = false;
			}
		} else if (
			!isGstNumberSelected
			&& name !== 'gst_list'
			&& addressType === 'billingAddress'
		) {
			showElement = false;
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
	isGstNumberSelected,
	gstinOptions,
	isAddressRegisteredUnderGstChecked,
	action,
}) => ({
	tradeParty: {
		controls: invoiceTradePartyControls,
	},
	registeredUnderGst: {
		controls: isRegisteredUnderGstControls,
	},
	address: {
		title        : 'Billing Address',
		controls     : addressControls,
		showElements : getAddressShowElements({
			controls: addressControls,
			addressType,
			isSez,
			isGstNumberSelected,
			gstinOptions,
			isAddressRegisteredUnderGstChecked,
			action,
		}),
	},
	poc: {
		title: 'POC Details',
		controls:
				isAddressRegisteredUnderGstChecked || isGstNumberSelected
					? pocFieldArrayControls
					: [],
	},
});

const formatPocDetails = ({ data }) => data.map((poc) => ({
	name                : getValue(poc, 'name'),
	email               : getValue(poc, 'email'),
	mobile_country_code : getValue(poc, 'mobile_number.mobile_country_code'),
	mobile_number       : getValue(poc, 'mobile_number.mobile_number'),
}));

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
			value = getValue(data, `${name}`);
		}

		valuesHash[name] = value;
	});
	return valuesHash;
};

const formatValues = ({ values, addressControls, addressType }) => {
	const { isAddressRegisteredUnderGst } = values || {};

	return {
		organization_trade_party_id: getValue(
			values,
			'organization_trade_party_id',
		),
		isAddressRegisteredUnderGst,
		...getAddressValues({
			data     : values,
			controls : addressControls,
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
 * @property {string} 		[registrationNumber]
 * @property {boolean}		[validateGst]
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
		organizationCountryId,
		source = '',
	} = props;

	const action = isEmpty(addressData) ? 'create' : 'edit';

	const { gstinOptions = [], getCogoScoreTaxNumApi } = useGetGstInListByPan({
		registrationNumber,
		action,
	});

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
		organizationCountryId,
	});

	const controls = [
		...invoiceTradePartyControls,
		...isRegisteredUnderGstControls,
		...addressControls,
		...pocFieldArrayControls,
	];

	const {
		general: { unPrefixedPath = '' },
	} = useSelector((ReduxState) => ReduxState);
	const crm = unPrefixedPath.split('/')[2];
	let newControls = controls;
	if (crm !== 'supply' || action === 'edit') {
		newControls = controls.filter(
			(ctrl) => ctrl.name !== 'organization_branch_id',
		);
	}

	const { control, ...formProps } = useForm();
	const { watch, getValues, setValue, fields } = formProps;

	const watchIsSez = watch('is_sez');
	const watchGstList = watch('gst_list') || '';
	const watchPincode = watch('pincode');
	const watchIsAddressRegisteredUnderGst = watch('isAddressRegisteredUnderGst');
	const { getBusinessApi = {} } = useGetBusiness({
		watchTaxNumber         : watchGstList.toUpperCase(),
		setValue,
		registrationNumberType : 'tax',
		addressData,
		source                 : 'addressPage',
	});
	const isAddressRegisteredUnderGstChecked = 	watchIsAddressRegisteredUnderGst;

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
		source,
	});
	if (fields?.organization_branch_id) {
		fields.organization_branch_id.params = {
			filters: { organization_id: organizationId || undefined },
		};
	}

	const onSubmit = (values) => {
		const { poc_details = [], ...rest } = values;
		const poc = poc_details.map((item) => ({ ...item, ...item?.mobile_number }));
		const value = {
			...rest,
			poc_details: poc,
		};
		const pocDetails = getValue(value, 'poc_details', []);

		if (action === 'create') {
			if (isEmpty(pocDetails)) {
				Toast.info('Please create at-least one POC before proceeding ');

				return;
			}
		}

		const newValue = formatValues({
			values      : value,
			addressControls,
			addressType : updatedAddressType,
		});

		if (!saveAddressData) {
			onSuccess({
				values: { ...newValue, is_sez: watchIsSez },
			});

			return;
		}

		saveAddress({
			values: { ...newValue, is_sez: watchIsSez },
		});
	};
	const layouts = getLayouts({
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls,
		pocFieldArrayControls,
		addressType         : updatedAddressType,
		isSez               : watchIsSez,
		isGstNumberSelected : watchGstList,
		gstinOptions,
		isAddressRegisteredUnderGstChecked,
	});
	const newFields = {};
	Object.entries(newControls).forEach(([controlName, field]) => {
		let newField = { ...field };
		if (controlName === 'tax_number') {
			newField = {
				...newField,
				label     : validateGst ? `${REGISTRATION_LABEL} Number` : 'TAX Number',
				maxLength : undefined,
				...(validateGst && {
					maxLength: 15,
				}),
				rules: {
					...(newField.rules || {}),
					pattern: {},
					...(validateGst && {
						pattern: {
							value   : patterns.GST_NUMBER,
							message : `${REGISTRATION_LABEL} is invalid`,
						},
					}),
				},
				disabled: watchGstList !== 'gst_not_found',
			};
		}

		if (controlName === 'tax_number_document_url') {
			newField = {
				...newField,
				label: validateGst ? `${REGISTRATION_LABEL} Proof` : 'TAX Proof',
			};
		}

		newFields[controlName] = newField;
	});

	useEffect(() => {
		setValue('gst_list', addressData?.tax_number);
		setValue('tax_number', addressData?.tax_number);
	}, [addressData.tax_number]);

	useEffect(() => {
		setValue('gst_list', gstinOptions?.length > 1 ? null : 'gst_not_found');
	}, [JSON.stringify(gstinOptions)]);

	return {
		loading,
		control,
		layouts,
		formProps          : { ...formProps, fields: newFields },
		errors             : formProps.formState.errors,
		onSubmit,
		getFormattedValues : () => formatValues({
			values      : getValues(),
			addressControls,
			addressType : updatedAddressType,
		}),
		getBusinessApi,
		gstinOptions,
		getCogoScoreTaxNumApi,
		watchPincode,
		watchGstList,
		isAddressRegisteredUnderGstChecked,
	};
};

export default useSaveAddressForm;
