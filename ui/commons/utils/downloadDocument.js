import { isEmpty } from '@cogoport/utils';

const URL_MAPPING = {
	importExportDoc: `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/pdf/trade-engine`,
};

const queryGenerator = ({ payloadObj }) => Object.entries(payloadObj || {})
	.map((arr) => arr.join('='))
	.join('&');

export const downloadDocument = ({ urlKey = '', payloadObj = {} }) => {
	let mainUrl = URL_MAPPING?.[urlKey] || '';

	if (!isEmpty(payloadObj)) {
		const restUrl = queryGenerator({ payloadObj });
		mainUrl += `?${restUrl}`;
	}
	window.open(mainUrl, '_self');
};
