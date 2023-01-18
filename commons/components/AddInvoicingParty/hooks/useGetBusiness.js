import { useEffect } from 'react';
import useRequest from '@/utils/request/useRequest';
import getValue from '@/commons/utils/getValue';
import { getPanHolderStatus } from '../utils/getPanHolderStatus';

const useGetBusiness = ({
	watchTaxNumber = '',
	setValues,
	registrationNumberType = '',
}) => {
	const getBusinessApi = useRequest('get', false)('/get_business');

	const getGstAddress = async () => {
		try {
			const response = await getBusinessApi.trigger({
				params: {
					identity_number: watchTaxNumber,
					identity_type: registrationNumberType,
					country_code: 'IN',
					provider_name: 'cogoscore',
				},
			});

			const {
				addresses = [],
				business_name = '',
				business_type = '',
			} = response.data || {};

			const companyBasedOnPanNumber =
				registrationNumberType === 'registration'
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
					tax_number: watchTaxNumber,
					pincode: getValue(addresses, '[0].pincode', ''),
					address: getValue(addresses, '[0].address', ''),
				});
			}
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const onBlurTaxPanGstinControl = () => {
		if (
			registrationNumberType === '' ||
			![10, 15].includes(watchTaxNumber.length)
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
		getBusinessApi,
		onBlurTaxPanGstinControl,
	};
};

export default useGetBusiness;
