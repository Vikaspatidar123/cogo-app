import { startCase } from '@cogoport/utils';

const SHORT_FORMS = ['fcl', 'lcl', 'ftl', 'ltl', 'cfs', 'rail'];

export const getItemDisplayString = ({ count, itemType }) => {
	if (count === 1) {
		return `${count} ${itemType}`;
	}
	return `${count} ${itemType}s`;
};

export const generateServiceDisplayName = (serviceName) => {
	if (typeof serviceName !== 'string') {
		return '';
	}

	const service = serviceName.split('_');

	return String(
		service.reduce((accStr, str) => `${accStr} ${
			SHORT_FORMS.includes(str) ? str.toUpperCase() : startCase(str)
		}`, ''),
	);
};
