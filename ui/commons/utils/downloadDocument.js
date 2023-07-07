import { isEmpty } from '@cogoport/utils';

const URL_MAPPING = {
	importExportDoc: `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/pdf/trade-engine`,
};

const queryGenerator = ({ payloadObj }) => Object.entries(payloadObj || {})
	.map(([key, value]) => `${key}=${value}`)
	.join('&');

export const downloadDocument = ({ urlKey = '', payloadObj = {} }) => {
	let mainUrl = URL_MAPPING?.[urlKey] || '';
	const restUrl = queryGenerator({ payloadObj });
	if (!isEmpty(payloadObj)) {
		mainUrl += `?${restUrl}`;
	}

	window.open(mainUrl, '_self');
};
