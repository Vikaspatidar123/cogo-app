import { getByKey, isEmpty } from '@cogoport/utils';

import getConfigAddressControls from '../configurations/address-controls';
import getInvoiceTpControls from '../configurations/invoice-trade-party-controls';
import getIsAddressRegisteredControls from '../configurations/is-registered-under-gst-controls';
import getConfigPocControls from '../configurations/poc-controls';
import UploadIconSvg from '../icons/doc-attach-icon.svg';

import getValue from './getValue';

import patterns from '@/ui/commons/configurations/patterns';

const translationKey = 'common:components.addressForm.utils.controls';

const addressControls = ({ t = () => {} }) => {
	const controls = getConfigAddressControls({ t });
	const newControls = controls.map((control) => {
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

	return newControls;
};

const pocControls = ({ t = () => {} }) => {
	const controls = getConfigPocControls({ t });
	const newControls = controls.map((control) => {
		let newControl = { ...control };

		const { name } = newControl;

		if (name === 'email') {
			newControl = {
				...newControl,
				rules: {
					...(newControl.rules || {}),
					pattern: {
						value   : patterns.EMAIL,
						message : t(
							`${translationKey}.pocControls.email.rules.pattern.message`,
						),
					},
				},
			};
		}

		if (name === 'mobile_number') {
			newControl = {
				...newControl,
				rules: {
					...(newControl.rules || {}),
					validate: (value) => (value.mobile_country_code && value.mobile_number
						? undefined
						: t(`${translationKey}.pocControls.mobile_number.rules.validate`)),
				},
			};
		}

		return newControl;
	});

	return newControls;
};

const getInvoiceTradePartyControls = ({
	organizationId,
	values,
	formState = {},
	t = () => {},
}) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	const controls = getInvoiceTpControls({ t });

	return controls.map((control) => {
		const { name } = control;

		const value = getValue(newValues, name);

		if (name === 'organization_trade_party_id') {
			return {
				...control,
				params: {
					filters: {
						organization_id  : organizationId,
						trade_party_type : 'paying_party',
					},
					billing_address_data_required: true,
				},
				value,
			};
		}

		return { ...control, value };
	});
};

const getIsAddressRegisteredUnderGstControls = ({
	values,
	formState = {},
	t = () => {},
}) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	const controls = getIsAddressRegisteredControls({ t });

	return controls.map((control) => {
		const { name } = control;

		let value = getValue(newValues, name, '');

		if (control.name === 'isAddressRegisteredUnderGst') {
			value = value ? [value] : [];
		}

		return { ...control, value };
	});
};

const getAddressControls = ({
	values,
	formState = {},
	gstinOptions,
	t = () => {},
}) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	const controls = addressControls({ t });

	return controls.map((control) => {
		const { name, type } = control;

		const value = getByKey(newValues, name);
		let newControl = { ...control, value };

		if (name === 'gst_list') {
			newControl = {
				...newControl,
				label: isEmpty(gstinOptions)
					? ''
					: t(`${translationKey}.addressControls.gst_list.label`),
				options: gstinOptions,
			};
		}

		if (name === 'is_sez') {
			newControl.value = value ? [true] : [];
		}

		if (type === 'file' && value) {
			newControl.value = {
				name : decodeURIComponent(value.split('/').pop()),
				url  : value,
				uid  : value,
			};
		}

		return newControl;
	});
};

const getPocFieldArray = ({
	action,
	showSavedPOC,
	values,
	formState = {},
	t = () => {},
}) => {
	let pocDetailsValues = [];

	const controls = pocControls({ t });

	if (action === 'create') {
		pocDetailsValues = [];

		const hash = {};
		controls.forEach((control) => {
			const { name } = control;

			hash[name] = '';

			if (name === 'mobile_number') {
				hash[name] = {};
			}
		});

		pocDetailsValues = [hash];
	}

	const getPocDetailsValues = ({ dataList }) => dataList.map((value) => {
		const hash = {};
		controls.forEach((control) => {
			const { name } = control;

			hash[name] = getValue(value, name, '');

			if (name === 'mobile_number') {
				hash[name] = {
					mobile_country_code : getValue(value, 'mobile_country_code', ''),
					mobile_number       : getValue(value, 'mobile_number', ''),
				};
			}
		});

		return hash;
	});

	if (action === 'edit' && showSavedPOC) {
		pocDetailsValues = getPocDetailsValues({ dataList: values });
	}

	if (isEmpty(values) && !isEmpty(formState)) {
		pocDetailsValues = getPocDetailsValues({ dataList: formState });
	}

	return [
		{
			type                   : 'fieldArray',
			name                   : 'poc_details',
			showLabelOnce          : true,
			label                  : t(`${translationKey}.pocFieldArray.poc_details.label`),
			span                   : 12,
			showZerothIndexControl : action === 'create',
			controls,
			value                  : pocDetailsValues,
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
	t = () => {},
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
			t,
		}),
		isRegisteredUnderGstControls: getIsAddressRegisteredUnderGstControls({
			values: {
				isAddressRegisteredUnderGst,
			},
			formState: {
				isAddressRegisteredUnderGst: formStateIsAddressRegisteredUnderGst,
			},
			t,
		}),
		addressControls: getAddressControls({
			gstinOptions,
			values    : addressData,
			action,
			formState : formStateAddressData || {},
			t,
		}),
		pocFieldArrayControls: getPocFieldArray({
			action,
			showSavedPOC,
			values    : pocDetails,
			formState : formStatePocDetails || [],
			t,
		}),
	};
};
