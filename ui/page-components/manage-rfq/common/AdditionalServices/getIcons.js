import {
	IcMCfs,
	IcMFtl,
	IcMLtl,
	IcMTrailorFull,
	IcMCustoms,
} from '@cogoport/icons-react';
import React from 'react';

const ICON_MAPPING = {
	ftl     : <IcMFtl height={15} width={15} />,
	ltl     : <IcMLtl height={15} width={15} />,
	trailer : <IcMTrailorFull height={15} width={15} />,
	customs : <IcMCustoms height={12} width={12} />,
	cfs     : <IcMCfs height={12} width={12} />,
};

const getIcons = (service) => {
	let serviceIcon = ICON_MAPPING.cfs;

	Object.keys(ICON_MAPPING).some((key) => {
		if (service.includes(key)) {
			serviceIcon = ICON_MAPPING[key];
			return true;
		}
		return false;
	});

	return serviceIcon;
};

export default getIcons;
