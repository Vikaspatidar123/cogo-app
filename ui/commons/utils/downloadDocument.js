export const downloadDocument = ({ docLink, docName, hsNumber }) => {
	const url = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}
	/saas/pdf/trade-engine?docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber || ''}`;
	window.open(url, '_self');
};
