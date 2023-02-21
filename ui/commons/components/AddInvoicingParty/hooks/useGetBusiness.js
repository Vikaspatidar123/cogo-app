import { useEffect } from 'react';

import { getPanHolderStatus } from '../utils/getPanHolderStatus';

import { useRequest } from '@/packages/request';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals.json';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';
import getValue from '@/ui/commons/utils/getValue';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const useGetBusiness = ({
	watchTaxNumber = '',
	setValues,
	registrationNumberType = '',
}) => {
	// const getBusinessApi = useRequest('get', false)('/get_business');
	const [trigger] = useRequest({
		url    : '/get_business',
		method : 'get',
	}, { manual: false });
	const getGstAddress = async () => {
		try {
			const response = await trigger({
				params: {
					identity_number : watchTaxNumber,
					identity_type   : registrationNumberType,
					country_code    : getCountryDetails({ country_id: INDIA_COUNTRY_ID })
						?.country_code,
					provider_name: 'cogoscore',
				},
			});

			const {
				addresses = [],
				business_name = '',
				business_type = '',
			} = response.data || {};

			const companyBasedOnPanNumber =				registrationNumberType === 'registration'
				? getPanHolderStatus(watchTaxNumber)
				: business_type || '';

			if (watchTaxNumber.length === 10) {
				setValues({
					business_name,
					company_type: companyBasedOnPanNumber,
				});
			}

			if (watchTaxNumber.length === 15) {
				setValues({
					tax_number : watchTaxNumber,
					pincode    : getValue(addresses, '[0].pincode', ''),
					address    : getValue(addresses, '[0].address', ''),
				});
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const onBlurTaxPanGstinControl = () => {
		if (
			registrationNumberType === ''
			|| ![10, 15].includes(watchTaxNumber.length)
		) {
			return;
		}

		getGstAddress();
	};

	useEffect(() => {
		if (registrationNumberType === 'tax') {
			onBlurTaxPanGstinControl();
		}
	}, [watchTaxNumber]);

	return {
		getBusinessApi: trigger,
		onBlurTaxPanGstinControl,
	};
};

export default useGetBusiness;
