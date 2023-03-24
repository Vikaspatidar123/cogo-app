import { useEffect, useMemo, useState } from 'react';
import { isEmpty } from '@cogoport/front/utils';
import global from '@cogo/commons/constants/global';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';

const { INDIA_COUNTRY_ID } = global;

const useBillingAddresses = (props) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

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

	const api = useRequest('get', false, scope)('/get_cogoscore_tax_numbers');

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
