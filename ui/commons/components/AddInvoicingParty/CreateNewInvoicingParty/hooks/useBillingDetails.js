import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import getBillingAddressControls from '../../utils/billingAddressControls';
import { getPocFieldArray } from '../../utils/controls';

import { useForm } from '@/packages/forms';

const translationKey =	'common:components.addInvoicingParty.createNewInvoicingParty.hooks.useBillingAddress.';

const useBillingDetails = ({
	checkedNotRegisteredUnderGst = false,
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) => {
	const { t } = useTranslation(['common']);

	const billingAddressControls = getBillingAddressControls({
		values: filledDetails.billing_address,
		t,
	});

	const pocControlsFieldArray =		getPocFieldArray({
		action    : 'create',
		pocValues : filledDetails.billing_address,
		t,
	}) || {};

	const billingDetailsControls = [
		...billingAddressControls,
		...pocControlsFieldArray,
	];

	const billingDetailsFormProps = useForm();

	const watchIsSezValue = billingDetailsFormProps.watch('is_sez');

	const showElementsForOrgWithGst = [
		'tax_number',
		'tax_number_document_url',
		'is_sez',
		'sez_proof',
	];

	const showElementsForOrgWithoutGst = ['address_type', 'country_id'];

	const showElements = useMemo(() => billingDetailsControls.reduce((pv, cv) => {
		const { name = '' } = cv;

		let showElement = true;
		if (
			(showElementsForOrgWithGst.includes(name)
					&& checkedNotRegisteredUnderGst)
				|| (showElementsForOrgWithoutGst.includes(name)
					&& !checkedNotRegisteredUnderGst)
				|| (name === 'sez_proof' && (watchIsSezValue || []).length === 0)
		) {
			showElement = false;
		}

		return { ...pv, [name]: showElement };
	}, {}), [watchIsSezValue, checkedNotRegisteredUnderGst]);

	const onProceed = (values = {}) => {
		setFilledDetails((previousState) => ({
			...previousState,
			billing_address: values,
		}));

		const { poc_details = {} } = values;

		if (poc_details.length === 0) {
			Toast.info(t(`${translationKey}toasts.info`));
			return;
		}
		setCurrentStep('bank_details');
	};

	return {
		onProceed,
		showElements,
		billingDetailsControls,
		billingDetailsFormProps,
	};
};

export default useBillingDetails;
