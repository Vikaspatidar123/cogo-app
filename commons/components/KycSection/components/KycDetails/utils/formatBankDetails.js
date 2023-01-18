import { isEmpty } from '@cogoport/front/utils';

const formatBankDetails = ({ documents = [] }) => {
	return documents.reduce((previousValues, currentDocument) => {
		const { id = '', document_type = '', image_url = '' } = currentDocument;

		let uploadedDocument = {};
		if (image_url) {
			uploadedDocument = {
				name: decodeURIComponent(image_url.split('/').pop()),
				url: image_url,
				uid: image_url,
			};
		}

		if (document_type === 'bank_account_details') {
			const {
				account_holder_name = '',
				bank_account_number = '',
				ifsc_number = '',
				bank_name = '',
				branch_name = '',
			} = currentDocument.data || {};

			let cancelledChequeDocument = {};
			if (!isEmpty(uploadedDocument)) {
				cancelledChequeDocument = {
					id,
					...uploadedDocument,
				};
			}

			return {
				...previousValues,
				account_holder_name,
				bank_account_number,
				ifsc_number,
				bank_name,
				branch_name,
				cancelled_cheque: cancelledChequeDocument,
			};
		}

		// if (document_type === 'sample_invoice') {
		// 	let invoices = [...(previousValues.invoices || [])];

		// 	if (!isEmpty(uploadedDocument)) {
		// 		invoices = [...invoices, uploadedDocument];
		// 	}

		// 	return {
		// 		...previousValues,
		// 		invoices,
		// 	};
		// }

		return {
			...previousValues,
		};
	}, {});
};

export default formatBankDetails;
