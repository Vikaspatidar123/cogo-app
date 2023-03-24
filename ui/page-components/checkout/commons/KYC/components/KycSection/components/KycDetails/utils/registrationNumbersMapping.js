import patterns from '@/ui/commons/configurations/patterns';

const registrationNumbersMapping = {
	pan: {
		key     : 'pan',
		text    : 'PAN',
		pattern : patterns.PAN_NUMBER,
		length  : 10,
		type    : 'registration',
	},
	gstin: {
		key     : 'gstin',
		text    : 'GST',
		pattern : patterns.GST_NUMBER,
		length  : 15,
		type    : 'tax',
	},
};

export default registrationNumbersMapping;
