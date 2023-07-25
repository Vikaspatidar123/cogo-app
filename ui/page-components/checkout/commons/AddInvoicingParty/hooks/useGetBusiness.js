/* eslint-disable react-hooks/rules-of-hooks */
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { getPanHolderStatus } from '../utils/getPanHolderStatus';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetBusiness = (props) => {
	const { organization } = useSelector((state) => state.profile);

	const [{ loading }, trigger] = useRequest({
		url    : 'get_business',
		method : 'get',
	}, { manual: true });

	if (!isEmpty(props?.addressData) && props?.source === 'addressPage') {
		return {};
	}

	const {
		watchTaxNumber = '',
		watchBusinessName = '',
		setValue = () => {},
		registrationNumberType = '',
		action = '',
	} = props;

	const getGstAddress = useCallback(async () => {
		try {
			const response = await trigger({
				params: {
					identity_number : watchTaxNumber,
					identity_type   : registrationNumberType,
					country_code    : organization.country?.country_code,
					provider_name   : 'cogoscore',
				},
			});

			const {
				addresses = [],
				trade_name = '',
				business_name = '',
				business_type = '',
			} = response.data || {};

			const companyBasedOnPanNumber =	registrationNumberType === 'registration'
				? getPanHolderStatus(watchTaxNumber)
				: business_type || '';

			if (watchTaxNumber.length === 10) {
				setValue('business_name', business_name || watchBusinessName || '');
				setValue('company_type', companyBasedOnPanNumber);
			} else if (watchTaxNumber.length === 15) {
				setValue('tax_number', watchTaxNumber);
				setValue('pincode', (!isEmpty(addresses) && (addresses[0] || {}).pincode) || '');
				setValue('address', (!isEmpty(addresses) && (addresses[0] || {}).address) || '');
				setValue('name', trade_name || business_name || '');
			}
		} catch (error) {
			console.error('error :: ', error);
		}
	}, [trigger, organization, registrationNumberType, setValue, watchBusinessName, watchTaxNumber]);

	const onBlurTaxPanGstinControl = () => {
		if (registrationNumberType === '' || ![10, 15].includes(watchTaxNumber.length)) {
			return;
		}

		getGstAddress();
	};

	useEffect(() => {
		if (action === 'edit') {
			return;
		}

		if (registrationNumberType === 'tax') {
			onBlurTaxPanGstinControl();
		}
		if (watchTaxNumber === 'GST_NOT_FOUND') {
			setValue('tax_number', '');
			setValue('pincode', '');
			setValue('address', '');
			setValue('name', '');
			setValue('business_name', '');
			setValue('company_type', '');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchTaxNumber]);

	return {
		onBlurTaxPanGstinControl,
		getBusinessLoading: loading,
	};
};

export default useGetBusiness;
