import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo, useState, useCallack } from 'react';

import { useRequest } from '@/packages/request';

const { INDIA_COUNTRY_ID } = global;

const useBillingAddresses = (props) => {
	const { CONSTANTS, state } = props;

	const {
		COMPONENT_KEYS: { ORGANIZATION_DETAILS, ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const {
		[ORGANIZATION_DETAILS]: organizationDetails,
		[ACCOUNT_INFORMATION]: accountInformation,
	} = state || {};

	const { formValues: organizationDetailsFormValues } =		organizationDetails || {};

	const { addressDetails } = accountInformation || {};
	const { formList, isTaxApplicable } = addressDetails || {};

	const [showBookingContactForm, setShowBookingContactForm] = useState(() => isEmpty(formList || []));
	const [isGstApplicable, setIsGstApplicable] = useState(() => {
		if (isEmpty(accountInformation)) {
			return false;
		}

		if (isTaxApplicable !== null) {
			return !isTaxApplicable;
		}

		return false;
	});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogoscore_tax_numbers',
		method : 'get',
	}, { manual: true });

	const getGstinList = useCallack(async () => {
		const { country_id, panGstin } = organizationDetailsFormValues || {};
		if (country_id !== INDIA_COUNTRY_ID) {
			return;
		}

		await trigger({
			params: {
				registration_number: panGstin,
			},
		});
	}, []);

	useEffect(() => {
		getGstinList();
	}, [getGstinList]);

	const gstinList = ((data || {}).data || {}).gsts || [];

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const gstinOptions = useMemo(() => gstinList.map((gstin) => ({ label: gstin, value: gstin })), [gstinList.length]);

	return {
		showBookingContactForm,
		setShowBookingContactForm,
		isGstApplicable,
		setIsGstApplicable,
		gstinOptions,
		loading,
	};
};

export default useBillingAddresses;
