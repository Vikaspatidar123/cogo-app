import { useState } from 'react';

import getConfiguration from '../../../hooks/configurations';

import setDefaultValues from './setDefaultValues';

/**
 * Get search form controls
 * @param {*} mode
 * @param {*} data
 * @param {*} mobile
 * @param {*} location
 * @param {*} isChannelPartner
 * @param {*} index
 * @returns
 */

const getControls = (
	mode,
	data,
	mobile = false,
	location = {},
	isChannelPartner = false,
	index,
	is_org_pass_through,
) => {
	const [operatorName, setOperatorName] = useState({});

	const controls = getConfiguration(
		'controls',
		mode,
		isChannelPartner,
		setOperatorName,
		is_org_pass_through,
	);

	const advancedControls = getConfiguration(
		'advanced-controls',
		mode,
		isChannelPartner,
	);

	const optionsControls = controls.filter(
		({ includedInOptions = true }) => includedInOptions,
	);
	const restControls = controls.filter(
		({ includedInOptions = true }) => !includedInOptions,
	);

	const withValueAdvancedControls = setDefaultValues(
		advancedControls,
		data,
		mobile,
		location,
	);

	return {
		optionsControls: {
			form: setDefaultValues(
				optionsControls,
				{
					...data,
					container_type_commodity: data.container_type
						? {
							container_type : data.container_type,
							commodity      : data.commodity,
						  }
						: null,
				},
				mobile,
				location,
				index,
			),
			display: optionsControls,
		},
		advancedControls        : withValueAdvancedControls,
		appliedAdvancedControls : withValueAdvancedControls.filter(
			(control) => !!control?.value,
		),
		restControls: setDefaultValues(restControls, data, mobile, location),
		operatorName,
	};
};

export default getControls;
