import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useGetBusiness from '../../AddInvoicingParty/hooks/useGetBusiness';
import useGetGstInListByPan from '../../AddInvoicingParty/hooks/useGetGstInListByPan';
import { getControls as getActualControl } from '../utils/controls';
import getValue from '../utils/getValue';

import useSaveAddress from './useSaveAddress';

import { useForm } from '@/packages/forms';
import patterns from '@/ui/commons/configurations/patterns';

const translationKey = 'common:components.addressForm.hooks.useAddressForm';

const getControls = ({
	gstinOptions,
	showInvoiceTradeParty,
	action,
	organizationId,
	values,
	showSavedPOC,
	formState,
	t = () => {},
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
		t,
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

		let showElement = showIn?.includes(addressType);

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
	t = () => {},
}) => ({
	tradeParty: {
		controls: invoiceTradePartyControls,
	},
	registeredUnderGst: {
		controls: isRegisteredUnderGstControls,
	},
	address: {
		title        : t(`${translationKey}.getLayouts.address.title`),
		controls     : addressControls,
		showElements : getAddressShowElements({
			controls: addressControls,
			addressType,
			isSez,
		}),
	},
	poc: {
		title    : t(`${translationKey}.getLayouts.poc.title`),
		controls : pocFieldArrayControls,
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
			value = value === true;
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

	const { t } = useTranslation(['common']);

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
		t,
	});

	const controls = [
		...invoiceTradePartyControls,
		...isRegisteredUnderGstControls,
		...addressControls,
		...pocFieldArrayControls,
	];

	const formProps = useForm();
	const { watch, getValues, setValues } = formProps;

	const watchIsSez = watch('is_sez');
	const watchGstList = watch('gst_list') || '';
	const watchIsAddressRegisteredUnderGst = watch('isAddressRegisteredUnderGst');

	const { getBusinessApi = {} } = useGetBusiness({
		watchTaxNumber         : watchGstList.toUpperCase(),
		setValues,
		registrationNumberType : 'tax',
	});

	const isAddressRegisteredUnderGstChecked =		watchIsAddressRegisteredUnderGst === true;

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
				Toast.info(t(`${translationKey}.toasts.info`));

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

	const newControlItems = [];
	controls.forEach((controlItem) => {
		const controlName = controlItem.name;
		let newControlItem = { ...controlItem };
		if (controlName === 'tax_number') {
			newControlItem = {
				...newControlItem,
				label: validateGst
					? t(`${translationKey}.controlItems.tax_number.label.gst`)
					: t(`${translationKey}.controlItems.tax_number.label.tax`),
				maxLength: undefined,
				...(validateGst && {
					maxLength: 15,
				}),
				rules: {
					...(newControlItem.rules || {}),
					pattern: {},
					...(validateGst && {
						pattern: {
							value   : patterns.GST_NUMBER,
							message : t(
								`${translationKey}.controlItems.tax_number.rules.pattern.message`,
							),
						},
					}),
				},
			};
		}

		if (controlName === 'tax_number_document_url') {
			newControlItem = {
				...newControlItem,
				label: validateGst
					? t(
						`${translationKey}.controlItems.tax_number_document_url.label.gst`,
					  )
					: t(
						`${translationKey}.controlItems.tax_number_document_url.label.tax`,
					  ),
			};
		}

		newControlItems.push(newControlItem);
	});

	const layouts = getLayouts({
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls : newControlItems,
		pocFieldArrayControls,
		addressType     : updatedAddressType,
		isSez           : watchIsSez === true,
		t,
	});

	return {
		loading,
		layouts,
		formProps          : { ...formProps },
		errors             : formProps.formState.errors,
		onSubmit,
		getFormattedValues : () => formatValues({
			values      : getValues(),
			addressControls,
			addressType : updatedAddressType,
		}),
		getBusinessApi,
		t,
	};
};

export default useSaveAddressForm;
