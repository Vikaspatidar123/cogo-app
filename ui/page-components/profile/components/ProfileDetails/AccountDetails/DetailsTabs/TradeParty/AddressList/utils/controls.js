import { patterns } from '@cogoport/front/constants';
import configAddressControls from '../configurations/address-controls.json';
import configPocControls from '../configurations/poc-controls.json';

const isAddressRegisteredGstControl = {
	type: 'checkbox',
	name: 'isAddressRegisteredGst',
	options: [{ value: true, label: 'Not Registered Under GST Law' }],
	multiple: true,
	span: 12,
};

const addressControls = configAddressControls.map((control) => {
	let newControl = { ...control };

	const { name, type } = newControl;

	if (type === 'file') {
		newControl = {
			...newControl,
		};
	}

	if (name === 'tax_number') {
		newControl = {
			...newControl,
			rules: {
				...(newControl.rules || {}),
				// pattern: {
				// 	value: patterns.GST_NUMBER,
				// 	message: 'TAX/GST is invalid',
				// },
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

	return newControl;
});

const pocControlsFieldArray = [
	{
		type: 'fieldArray',
		name: 'poc_details',
		label: 'POC Details',
		controls: pocControls,
	},
];

export const getIsAddressRegisteredGstControls = () => {
	return [isAddressRegisteredGstControl];
};

export const getAddressControls = () => {
	return addressControls;
};

export const getPocControls = () => {
	return pocControls;
};

export const getPocControlsFieldArray = () => {
	return pocControlsFieldArray;
};
