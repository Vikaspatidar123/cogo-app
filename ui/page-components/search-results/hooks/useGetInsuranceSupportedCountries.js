import { useRequest } from '@cogo/commons/hooks';

const useGetCargoInsuranceSupportedCountries = (country_id) => {
	const apiData = useRequest('get', true, 'saas', {
		authkey: 'saas_insurance_country_supported',
	})('saas/insurance/country-supported', {
		params: {
			policyCountryId: country_id,
		},
	});

	return {
		isEligible : apiData?.data,
		loading    : apiData?.loading,
	};
};

export default useGetCargoInsuranceSupportedCountries;
