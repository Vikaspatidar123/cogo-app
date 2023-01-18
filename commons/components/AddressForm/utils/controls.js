import { patterns } from '@cogoport/front/constants';
import { get, isEmpty } from '@cogoport/front/utils';
import getValue from './getValue';
import configInvoiceTradePartyControls from '../configurations/invoice-trade-party-controls.json';
import configIsRegisteredUnderGstControls from '../configurations/is-registered-under-gst-controls.json';
import configAddressControls from '../configurations/address-controls.json';
import configPocControls from '../configurations/poc-controls.json';
import UploadIconSvg from '../icons/doc-attach-icon.svg';

const addressControls = configAddressControls.map((control) => {
	let newControl = { ...control };

	const { name, type } = newControl;

	if (type === 'file') {
		newControl = {
			...newControl,
			uploadIcon: () => <UploadIconSvg width={24} height={24} />,
		};
	}

	if (name === 'tax_number') {
		newControl = {
			...newControl,
			rules: {
				...getValue(newControl, 'rules', {}),
			},
		};
	}

	return newControl;
});

const pocControls = configPocControls.map((control) => {
	let newControl = { ...control };

	const { name } = newControl;

	if (name === 'email') {
		newControl = {
			...newControl,
			rules: {
				...(newControl.rules || {}),
				pattern: {
					value: patterns.EMAIL,
					message: 'Email is invalid',
				},
			},
		};
	}

	if (name === 'mobile_number') {
		newControl = {
			...newControl,
			rules: {
				...(newControl.rules || {}),
				validate: (value) =>
					value.mobile_country_code && value.mobile_number
						? undefined
						: 'POC Mobile Number is Required',
			},
		};
	}

	return newControl;
});

const getInvoiceTradePartyControls = ({
	organizationId,
	values,
	formState = {},
}) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	return configInvoiceTradePartyControls.map((control) => {
		const { name } = control;

		const value = getValue(newValues, name);

		if (name === 'organization_trade_party_id') {
			return {
				...control,
				params: {
					filters: {
						organization_id: organizationId,
						trade_party_type: 'paying_party',
					},
					billing_address_data_required: true,
				},
				value,
			};
		}

		return { ...control, value };
	});
};

const getIsAddressRegisteredUnderGstControls = ({ values, formState = {} }) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	return configIsRegisteredUnderGstControls.map((control) => {
		const { name } = control;

		let value = getValue(newValues, name, '');

		if (control.name === 'isAddressRegisteredUnderGst') {
			value = value ? [value] : [];
		}

		return { ...control, value };
	});
};

const getAddressControls = ({ values, formState = {}, gstinOptions }) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	return addressControls.map((control) => {
		const { name, type } = control;

		const value = get(newValues, name);
		let newControl = { ...control, value };

		if (name === 'gst_list') {
			newControl = {
				...newControl,
				label: isEmpty(gstinOptions) ? '' : 'Select GST',
				options: gstinOptions,
			};
		}

		if (name === 'is_sez') {
			newControl.value = value ? [true] : [];
		}

		if (type === 'file' && value) {
			newControl.value = {
				name: decodeURIComponent(value.split('/').pop()),
				url: value,
				uid: value,
			};
		}

		return newControl;
	});
};

const getPocFieldArray = ({ action, showSavedPOC, values, formState = {} }) => {
	let pocDetailsValues = [];

	if (action === 'create') {
		pocDetailsValues = [];

		const hash = {};
		pocControls.forEach((control) => {
			const { name } = control;

			hash[name] = '';

			if (name === 'mobile_number') {
				hash[name] = {};
			}
		});

		pocDetailsValues = [hash];
	}

	const getPocDetailsValues = ({ dataList }) => {
		return dataList.map((value) => {
			const hash = {};
			pocControls.forEach((control) => {
				const { name } = control;

				hash[name] = getValue(value, name, '');

				if (name === 'mobile_number') {
					hash[name] = {
						mobile_country_code: getValue(value, 'mobile_country_code', ''),
						mobile_number: getValue(value, 'mobile_number', ''),
					};
				}
			});

			return hash;
		});
	};

	if (action === 'edit' && showSavedPOC) {
		pocDetailsValues = getPocDetailsValues({ dataList: values });
	}

	if (isEmpty(values) && !isEmpty(formState)) {
		pocDetailsValues = getPocDetailsValues({ dataList: formState });
	}

	return [
		{
			type: 'fieldArray',
			name: 'poc_details',
			label: 'POC Details',
			span: 12,
			controls: pocControls,
			value: pocDetailsValues,
		},
	];
};

export const getControls = ({
	organizationId,
	action,
	values,
	showSavedPOC,
	formState = {},
	gstinOptions = [],
}) => {
	const {
		organization_trade_party_id: formStateTradePartyId,
		isAddressRegisteredUnderGst: formStateIsAddressRegisteredUnderGst,
		poc_details: formStatePocDetails,
		...formStateAddressData
	} = formState || {};

	const tradePartyId = getValue(values, 'tradePartyId');

	const isAddressRegisteredUnderGst = getValue(
		values,
		'isAddressRegisteredUnderGst',
	);

	const addressData = getValue(values, 'addressData', {});
	const pocDetails = getValue(addressData, 'organization_pocs', []);

	return {
		invoiceTradePartyControls: getInvoiceTradePartyControls({
			organizationId,
			values: {
				organization_trade_party_id: tradePartyId,
			},
			formState: {
				organization_trade_party_id: formStateTradePartyId,
			},
		}),
		isRegisteredUnderGstControls: getIsAddressRegisteredUnderGstControls({
			values: {
				isAddressRegisteredUnderGst,
			},
			formState: {
				isAddressRegisteredUnderGst: formStateIsAddressRegisteredUnderGst,
			},
		}),
		addressControls: getAddressControls({
			gstinOptions,
			values: addressData,
			formState: formStateAddressData || {},
		}),
		pocFieldArrayControls: getPocFieldArray({
			action,
			showSavedPOC,
			values: pocDetails,
			formState: formStatePocDetails || [],
		}),
	};
};
