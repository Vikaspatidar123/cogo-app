/* eslint-disable react-hooks/rules-of-hooks */
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { getPanHolderStatus } from '../utils/getPanHolderStatus';

import { useRequest } from '@/packages/request';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import countriesHash from '@/ui/commons/utils/getCountryDetails';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const INDIA_COUNTRY_DETAILS = countriesHash({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

const useGetBusiness = (props) => {
	const [{ loading }, getBusinessApi] = useRequest({
		url    : 'get_business',
		method : 'get',
	}, { manual: true });

	if (!isEmpty(props?.addressData) && props?.source === 'addressPage') {
		return {};
	}

	const {
		watchTaxNumber = '',
		watchBusinessName = '',
		setValues = () => {},
		registrationNumberType = '',
	} = props;

	const getGstAddress = useCallback(async () => {
		try {
			const response = await getBusinessApi.trigger({
				params: {
					identity_number : watchTaxNumber,
					identity_type   : registrationNumberType,
					country_code    : INDIA_COUNTRY_CODE,
					provider_name   : 'cogoscore',
				},
			});

			const {
				addresses = [],
				trade_name = '',
				business_name = '',
				business_type = '',
			} = response.data || {};

			const companyBasedOnPanNumber =				registrationNumberType === 'registration'
				? getPanHolderStatus(watchTaxNumber)
				: business_type || '';

			if (watchTaxNumber.length === 10) {
				setValues({
					business_name : business_name || watchBusinessName || '',
					company_type  : companyBasedOnPanNumber,
				});
			} else if (watchTaxNumber.length === 15) {
				setValues({
					tax_number : watchTaxNumber,
					pincode    : (!isEmpty(addresses) && (addresses[0] || {}).pincode) || '',
					address    : (!isEmpty(addresses) && (addresses[0] || {}).address) || '',
					name       : trade_name || business_name || '',
				});
			} else {
				setValues({
					tax_number    : '',
					pincode       : '',
					address       : '',
					name          : '',
					business_name : '',
					company_type  : '',
				});
			}
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [getBusinessApi, registrationNumberType, setValues, watchBusinessName, watchTaxNumber]);

	const onBlurTaxPanGstinControl = useCallback(() => {
		if (
			registrationNumberType === ''
			|| ![10, 15].includes(watchTaxNumber.length)
		) {
			return;
		}

		getGstAddress();
	}, [getGstAddress, registrationNumberType, watchTaxNumber.length]);

	useEffect(() => {
		if (registrationNumberType === 'tax') {
			onBlurTaxPanGstinControl();
		}
		if (watchTaxNumber === 'GST_NOT_FOUND') {
			getGstAddress();
		}
	}, [getGstAddress, onBlurTaxPanGstinControl, registrationNumberType, watchTaxNumber]);

	return {
		getBusinessApi,
		onBlurTaxPanGstinControl,
		loading,
	};
};

export default useGetBusiness;
