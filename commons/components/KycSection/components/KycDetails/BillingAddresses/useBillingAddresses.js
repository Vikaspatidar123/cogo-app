import { useEffect, useMemo, useState } from 'react';
import useRequest from '@/temp/request/useRequest';
import { isEmpty } from '@cogoport/front/utils';
import { getIndiaCountryId } from '@/commons/utils/getIndiaCountryId';

const INDIA_COUNTRY_ID = getIndiaCountryId();

const useBillingAddresses = (props) => {
	const { CONSTANTS, state } = props;

	const {
		COMPONENT_KEYS: { ORGANIZATION_DETAILS, ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const {
		[ORGANIZATION_DETAILS]: organizationDetails,
		[ACCOUNT_INFORMATION]: accountInformation,
	} = state || {};

	const { formValues: organizationDetailsFormValues } =
		organizationDetails || {};

	const { addressDetails } = accountInformation || {};
	const { formList, isTaxApplicable } = addressDetails || {};

	const [showBookingContactForm, setShowBookingContactForm] = useState(() => {
		return isEmpty(formList || []);
	});
	const [isGstApplicable, setIsGstApplicable] = useState(() => {
		if (isEmpty(accountInformation)) {
			return false;
		}

		if (isTaxApplicable !== null) {
			return !isTaxApplicable;
		}

		return false;
	});

	const api = useRequest('get', false)('/get_cogoscore_tax_numbers', {
		params: {
			registration_number: '',
		},
	});

	useEffect(() => {
		getGstinList();
	}, []);

	const getGstinList = async () => {
		const { country_id, panGstin } = organizationDetailsFormValues || {};
		if (country_id !== INDIA_COUNTRY_ID) {
			return;
		}

		await api.trigger({
			params: {
				registration_number: panGstin,
			},
		});
	};

	const gstinList = ((api.data || {}).data || {}).gsts || [];

	const gstinOptions = useMemo(() => {
		return gstinList.map((gstin) => ({ label: gstin, value: gstin }));
	}, [gstinList.length]);

	return {
		showBookingContactForm,
		setShowBookingContactForm,
		isGstApplicable,
		setIsGstApplicable,
		gstinOptions,
	};
};

export default useBillingAddresses;
