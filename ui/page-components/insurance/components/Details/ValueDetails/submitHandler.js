import { Toast } from '@cogoport/components';

const submitHandler = ({
	values,
	setError,
	setFinalData,
	setActiveStepper,
	setShowPreviewModal,
	setFormDetails,
	formDetails,
	checked,
	setAgree,
	uploadedFiles,
}) => {
	if (!checked) {
		setAgree(true);
		Toast.error('Please accept terms and conditions', {
			autoClose : 3000,
			style     : { background: '#FFD9D4', color: '#333' },
		});
	}
	Object.keys(values).forEach((itm) => {
		if (!values[itm]) {
			setError(itm, { type: 'required', message: 'required' });
		}
	});
	if (!Object.values(values).includes('')) {
		setFormDetails((prev) => ({
			...prev,
			verificationDoc: {
				aadharDoc  : uploadedFiles.aadharDoc || null,
				invoiceDoc : uploadedFiles.invoiceDoc || null,
				gstDoc     : uploadedFiles.gstDoc || null,
				panDoc     : uploadedFiles.panDoc || null,
			},
			...values,
		}));
		if (checked) {
			setShowPreviewModal(true);
			setFinalData(() => ({
				...formDetails,
				verificationDoc: {
					aadharDoc: {
						name    : 'Aadhar',
						url     : uploadedFiles.aadharDoc || null,
						success : true,
					},
					invoiceDoc : { name: 'Invoice', url: uploadedFiles.invoiceDoc || null, success: true },
					gstDoc     : { name: 'GstDoc', url: uploadedFiles.gstDoc || null, success: true },
					panDoc     : { name: 'Invoice', url: uploadedFiles.panDoc || null, success: true },
				},
				...values,
			}));
			setActiveStepper(() => ({
				1   : true,
				2   : true,
				3   : 'pro',
				svg : 3,
			}));
		}
	}
};

export default submitHandler;
