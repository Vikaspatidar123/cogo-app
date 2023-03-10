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
}) => {
	const {
		aadharDoc = null,
		gstDoc = null,
		panDoc = null,
		invoiceDoc = null,
		...rest
	} = values || {};

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
				aadharDoc  : aadharDoc || null,
				gstDoc     : gstDoc || null,
				invoiceDoc : invoiceDoc || null,
				panDoc     : panDoc || null,
			},
			...values,
		}));
		if (checked) {
			setShowPreviewModal(true);
			setFinalData(() => ({
				...formDetails,
				verificationDoc: {
					aadharDoc  : aadharDoc || null,
					gstDoc     : gstDoc || null,
					invoiceDoc : invoiceDoc || null,
					panDoc     : panDoc || null,
				},
				...rest,
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
