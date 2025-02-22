import { IcMCloudUpload } from '@cogoport/icons-react';
import { getByKey, isEmpty } from '@cogoport/utils';

import getAddressMappingControls from '../configurations/address-controls';
import configInvoiceTradePartyControls from '../configurations/invoice-trade-party-controls.json';
import getAddressRegisteredUnderGst from '../configurations/is-registered-under-gst-controls';
import configPocControls from '../configurations/poc-controls.json';

import getValue from './getValue';

import patterns from '@/ui/commons/configurations/patterns';
import { CountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const getAddressNewControls = () => {
	const geo = getGeoConstants();
	const REGISTRATION_PATTERN = geo.others.registration_number;
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	const configAddressControls = getAddressMappingControls();

	return configAddressControls.map((control) => {
		let newControl = { ...control };

		const { name, type } = newControl;

		if (type === 'file') {
			newControl = {
				...newControl,
				uploadIcon: () => <IcMCloudUpload size={2} />,
			};
		}

		if (name === 'tax_number') {
			newControl = {
				...newControl,
				rules: {
					...getValue(newControl, 'rules', {}),
					pattern: {
						value   : REGISTRATION_PATTERN,
						message : `${REGISTRATION_LABEL} is invalid`,
					},
				},
			};
		}

		return newControl;
	});
};
const pocControls = configPocControls.map((control) => {
	let newControl = { ...control };

	const { name } = newControl;

	if (name === 'email') {
		newControl = {
			...newControl,
			rules: {
				...(newControl.rules || {}),
				pattern: {
					value   : patterns.EMAIL,
					message : 'Email is invalid',
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
					: 'POC Mobile Number is Required'),
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

const getIsAddressRegisteredUnderGstControls = ({ values, formState = {}, organizationCountryId }) => {
	let newValues = formState;
	const configIsRegisteredUnderGstControls = getAddressRegisteredUnderGst({
		organizationCountryId,
	});
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

const getAddressControls = ({ values, formState = {}, gstinOptions, organizationCountryId }) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}
	const addressControls = getAddressNewControls();

	return addressControls.map((control) => {
		const { name, type } = control;

		const value = getByKey(newValues, name);
		let newControl = { ...control, value };

		if (name === 'gst_list') {
			newControl = {
				...newControl,
				label: isEmpty(gstinOptions) ? (
					''
				) : (
					<>
						Select
						{' '}
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="registration_number"
							accessor="label"
						/>
					</>
				),
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

const getPocFieldArray = ({ action, showSavedPOC, values, formState }) => {
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

	const getPocDetailsValues = ({ dataList }) => dataList.map((value) => {
		const hash = {};
		pocControls.forEach((control) => {
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
			type     : 'fieldArray',
			name     : 'poc_details',
			label    : 'POC Details',
			controls : pocControls,
			value    : pocDetailsValues,
		},
	];
};

export const getControls = ({
	organizationId,
	action,
	values,
	showSavedPOC,
	formState,
	gstinOptions = [],
	organizationCountryId,
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
			organizationCountryId,
		}),
		addressControls: getAddressControls({
			gstinOptions,
			values    : addressData,
			formState : formStateAddressData || {},
			organizationCountryId,
		}),
		pocFieldArrayControls: getPocFieldArray({
			action,
			showSavedPOC,
			values    : pocDetails,
			formState : formStatePocDetails || [],
		}),
	};
};
